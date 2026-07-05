import axios from "axios";
import { getBackendUrl } from "@/lib/env";
import { Conversation, Message, ChatResponse } from "@/types/Chatbot";

export const chatbotService = {
  async createConversation(title?: string): Promise<Conversation> {
    const response = await axios.post<Conversation>(
      `${getBackendUrl()}/users/chatbot/conversations`,
      title ? { title } : {},
      { withCredentials: true },
    );
    return response.data;
  },

  async getConversations(): Promise<Conversation[]> {
    const response = await axios.get<Conversation[]>(
      `${getBackendUrl()}/users/chatbot/conversations`,
      { withCredentials: true },
    );
    return response.data;
  },

  async getConversationMessages(conversationId: string): Promise<Message[]> {
    const response = await axios.get<Message[]>(
      `${getBackendUrl()}/users/chatbot/conversations/${conversationId}`,
      { withCredentials: true },
    );
    return response.data;
  },

  async renameConversation(
    conversationId: string,
    title: string,
  ): Promise<Conversation> {
    const response = await axios.patch<Conversation>(
      `${getBackendUrl()}/users/chatbot/conversations/${conversationId}`,
      { title },
      { withCredentials: true },
    );
    return response.data;
  },

  async deleteConversation(conversationId: string): Promise<void> {
    await axios.delete(
      `${getBackendUrl()}/users/chatbot/conversations/${conversationId}`,
      { withCredentials: true },
    );
  },

  async sendMessage(
    conversationId: string,
    question: string,
  ): Promise<ChatResponse> {
    const response = await axios.post<ChatResponse>(
      `${getBackendUrl()}/users/chatbot/chat`, // ✅ correct route
      { conversationId, question },
      { withCredentials: true },
    );
    return response.data;
  },
};
