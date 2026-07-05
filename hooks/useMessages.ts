import { useState, useCallback } from "react";
import { Message } from "@/types/Chatbot";
import { chatbotService } from "@/services/chatbot";
import { toast } from "sonner";

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const loadMessages = useCallback(async (conversationId: string) => {
    setLoading(true);
    try {
      const data = await chatbotService.getConversationMessages(conversationId);
      setMessages(data);
    } catch (error) {
      console.error("Failed to load messages:", error);
      toast.error("Failed to load message history");
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const sendMessage = useCallback(async (conversationId: string, content: string) => {
    if (!content.trim()) return;

    // 1. Add user message instantly to UI (Optimistic UI)
    const userMessage: Message = {
      role: 'USER',
      message: content.trim(),
      conversationId,
      createdAt: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setSending(true);

    try {
      // 2. Call POST chat endpoint
      const response = await chatbotService.sendMessage(conversationId, content);
      
      // 3. Append assistant response
      const assistantMessage: Message = {
        role: 'ASSISTANT',
        message: response.message || response.answer || (response as any).content || "",
        conversationId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
      
      // Remove the user message if it failed
      setMessages((prev) => prev.filter((m) => m !== userMessage));
    } finally {
      setSending(false);
    }
  }, []);

  return {
    messages,
    loading,
    sending,
    loadMessages,
    sendMessage,
    clearMessages,
    setMessages,
  };
}
