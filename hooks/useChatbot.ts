import { useState, useEffect, useCallback } from "react";

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setIsInitialized(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setIsInitialized(true);
      }
      return next;
    });
  }, []);

  // Listen to Escape key to close the chat
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeChat();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeChat]);

  return {
    isOpen,
    isInitialized,
    openChat,
    closeChat,
    toggleChat,
  };
}
