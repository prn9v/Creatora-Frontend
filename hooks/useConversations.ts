import { useState, useCallback } from "react";
import { Conversation } from "@/types/Chatbot";
import { chatbotService } from "@/services/chatbot";
import { toast } from "sonner";
import axios from "axios";

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(false);

  const createNewConversation = useCallback(async (title?: string) => {
    setLoading(true);
    try {
      const newConv = await chatbotService.createConversation(title);
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversation(newConv);
      return newConv;
    } catch (error) {
      console.error("Failed to create conversation:", error);
      toast.error("Failed to create new conversation");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadConversations = useCallback(async () => {
    setLoading(true);
    try {
      const data = await chatbotService.getConversations();
      // Sort conversations by updated/created time, or just keep order from backend (backend usually returns newest first or we can sort them)
      // The user request says "Display previous conversations. Newest first."
      // Let's sort them by createdAt desc (or keep them if backend does).
      const sorted = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setConversations(sorted);

      if (sorted.length > 0) {
        // Load most recent conversation automatically
        setActiveConversation(sorted[0]);
      } else {
        setActiveConversation(null);
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
      toast.error("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  }, []);

  const switchConversation = useCallback((conv: Conversation) => {
    setActiveConversation(conv);
  }, []);

  const renameConversation = useCallback(async (id: string, title: string) => {
    try {
      const updated = await chatbotService.renameConversation(id, title);
      setConversations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, title: updated.title } : c))
      );
      if (activeConversation?.id === id) {
        setActiveConversation((prev) => (prev ? { ...prev, title: updated.title } : null));
      }
      toast.success("Conversation renamed");
    } catch (error) {
      console.error("Failed to rename conversation:", error);
      toast.error("Failed to rename conversation");
    }
  }, [activeConversation]);

  const deleteConversation = useCallback(async (id: string) => {
    try {
      await chatbotService.deleteConversation(id);
      
      setConversations((prev) => {
        const filtered = prev.filter((c) => c.id !== id);
        
        // If the deleted conversation was the active one
        if (activeConversation?.id === id) {
          if (filtered.length > 0) {
            // Automatically switch to latest conversation
            setActiveConversation(filtered[0]);
          } else {
            setActiveConversation(null);
          }
        }
        return filtered;
      });
      toast.success("Conversation deleted");
    } catch (error) {
      console.error("Failed to delete conversation:", error);
      toast.error("Failed to delete conversation");
    }
  }, [activeConversation, createNewConversation]);

  return {
    conversations,
    activeConversation,
    loading,
    loadConversations,
    createNewConversation,
    switchConversation,
    renameConversation,
    deleteConversation,
  };
}
