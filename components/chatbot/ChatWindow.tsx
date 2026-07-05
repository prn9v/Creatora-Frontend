import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ConversationSidebar from "./ConversationSidebar";
import { Conversation, Message } from "@/types/Chatbot";
import { cn } from "@/lib/utils";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  loadingConversations: boolean;
  loadingMessages: boolean;
  sendingMessage: boolean;
  onSelectConversation: (conv: Conversation) => void;
  onRenameConversation: (id: string, title: string) => void;
  onDeleteConversation: (id: string) => void;
  onNewChat: () => void;
  onSendMessage: (text: string) => void;
}

export default function ChatWindow({
  isOpen,
  onClose,
  conversations,
  activeConversation,
  messages,
  loadingConversations,
  loadingMessages,
  sendingMessage,
  onSelectConversation,
  onRenameConversation,
  onDeleteConversation,
  onNewChat,
  onSendMessage,
}: ChatWindowProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        // Window container styling: GlassCard styling, absolute positioning, responsive layout
        "fixed z-50 flex flex-col overflow-hidden shadow-2xl bg-[rgb(22,22,32)] backdrop-blur-xl border border-[rgb(48,48,64)]/80 transition-all duration-300 ease-out",
        // Desktop / Tablet layout
        "sm:w-[380px] sm:h-[580px] sm:bottom-24 sm:right-6 sm:rounded-2xl sm:border",
        // Mobile layout
        "w-full h-full bottom-0 right-0 rounded-none border-none",
        // Animation
        "animate-fade-in"
      )}
    >
      {/* Header bar */}
      <ChatHeader
        onClose={onClose}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        sidebarOpen={sidebarOpen}
        activeTitle={activeConversation?.title}
      />

      {/* Main interaction content area */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-transparent">
        {/* Slide-out Sidebar for chat sessions */}
        <ConversationSidebar
          conversations={conversations}
          activeConversation={activeConversation}
          isOpen={sidebarOpen}
          onSelect={onSelectConversation}
          onRename={onRenameConversation}
          onDelete={onDeleteConversation}
          onNewChat={onNewChat}
          onClose={() => setSidebarOpen(false)}
          loading={loadingConversations}
        />

        {loadingConversations ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-2">
            <div className="h-6 w-6 animate-spin border-2 border-primary border-t-transparent rounded-full" />
            <span className="text-xs">Loading conversations...</span>
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-4 animate-fade-in">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-2xl font-bold animate-pulse-glow">
              💬
            </div>
            <div className="flex flex-col gap-1.5 max-w-[260px]">
              <h3 className="font-semibold text-base text-foreground">No conversations found</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Please add a conversation to start chatting with the CHIT-CHAT AI Assistant.
              </p>
            </div>
            <button
              onClick={onNewChat}
              className="mt-2 flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow-sm transition-all duration-200 cursor-pointer"
            >
              Add Conversation
            </button>
          </div>
        ) : (
          <>
            {/* Scrollable message timeline */}
            <MessageList
              messages={messages}
              loading={loadingMessages}
              sending={sendingMessage}
            />

            {/* Text Input area */}
            <MessageInput
              onSend={onSendMessage}
              disabled={sendingMessage || loadingMessages || !activeConversation}
            />
          </>
        )}
      </div>
    </div>
  );
}
