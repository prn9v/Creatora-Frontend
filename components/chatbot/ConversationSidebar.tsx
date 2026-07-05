import React from "react";
import { Conversation } from "@/types/Chatbot";
import ConversationItem from "./ConversationItem";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversationSidebarProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  isOpen: boolean;
  onSelect: (conv: Conversation) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onNewChat: () => void;
  onClose: () => void;
  loading: boolean;
}

export default function ConversationSidebar({
  conversations,
  activeConversation,
  isOpen,
  onSelect,
  onRename,
  onDelete,
  onNewChat,
  onClose,
  loading,
}: ConversationSidebarProps) {
  return (
    <>
      {/* Sidebar Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/40 z-20 transition-opacity duration-300 cursor-pointer"
        />
      )}

      {/* Sidebar Panel Container */}
      <div
        className={cn(
          "absolute top-[57px] bottom-[63px] left-0 w-[260px] bg-[rgb(22,22,34)] border-r border-[rgb(48,48,64)] z-30 transition-transform duration-300 ease-out flex flex-col shadow-xl",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Actions header inside sidebar */}
        <div className="p-3 border-b border-[rgb(48,48,64)]">
          <button
            onClick={() => {
              onNewChat();
              onClose();
            }}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={14} />
            <span>New Chat</span>
          </button>
        </div>

        {/* Scrollable conversation items */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-xs text-muted-foreground">
              No conversations yet
            </div>
          ) : (
            conversations.map((conv) => (
              <ConversationItem
                key={conv.id}
                conversation={conv}
                isActive={activeConversation?.id === conv.id}
                onSelect={() => {
                  onSelect(conv);
                  onClose();
                }}
                onRename={(title) => onRename(conv.id, title)}
                onDelete={() => onDelete(conv.id)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
