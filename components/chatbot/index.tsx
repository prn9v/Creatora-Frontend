"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import ChatButton from "./ChatButton";
import { useChatbot } from "@/hooks/useChatbot";
import { useConversations } from "@/hooks/useConversations";
import { useMessages } from "@/hooks/useMessages";

// Lazy load ChatWindow to optimize bundles and initial load performance
const ChatWindow = dynamic(() => import("./ChatWindow"), {
  ssr: false,
  loading: () => null,
});

export default function ChatBot() {
  const pathname = usePathname();
  const { isOpen, isInitialized, toggleChat, closeChat } = useChatbot();
  const {
    conversations,
    activeConversation,
    loading: loadingConversations,
    loadConversations,
    createNewConversation,
    switchConversation,
    renameConversation,
    deleteConversation,
  } = useConversations();

  const {
    messages,
    loading: loadingMessages,
    sending: sendingMessage,
    loadMessages,
    sendMessage,
  } = useMessages();

  // Hide the chatbot on specified public routes
  const isHiddenRoute =
    pathname === "/" || pathname === "/login" || pathname === "/signup";

  // Trigger conversation loading only when the chat is opened for the first time
  useEffect(() => {
    if (isInitialized) {
      loadConversations();
    }
  }, [isInitialized, loadConversations]);

  // Load message history when the active conversation changes
  useEffect(() => {
    if (isInitialized && activeConversation?.id) {
      loadMessages(activeConversation.id);
    }
  }, [isInitialized, activeConversation?.id, loadMessages]);

  if (isHiddenRoute) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button always visible on authenticated screens */}
      <ChatButton onClick={toggleChat} isOpen={isOpen} />

      {/* Lazy-loaded Chat Window panel */}
      {isInitialized && (
        <ChatWindow
          isOpen={isOpen}
          onClose={closeChat}
          conversations={conversations}
          activeConversation={activeConversation}
          messages={messages}
          loadingConversations={loadingConversations}
          loadingMessages={loadingMessages}
          sendingMessage={sendingMessage}
          onSelectConversation={switchConversation}
          onRenameConversation={renameConversation}
          onDeleteConversation={deleteConversation}
          onNewChat={createNewConversation}
          onSendMessage={(text) => {
            if (activeConversation) {
              sendMessage(activeConversation.id, text);
            }
          }}
        />
      )}
    </>
  );
}
