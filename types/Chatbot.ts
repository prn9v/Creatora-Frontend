export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
  _count?: {
    messages: number;
  };
}

export interface Message {
  id?: string;
  conversationId: string;
  role: 'USER' | 'ASSISTANT' | string;
  message: string;
  createdAt?: string;
}

export interface ChatResponse {
  id?: string;
  conversationId: string;
  role: 'ASSISTANT' | string;
  message: string;
  createdAt?: string;
  answer?: string; // Fallback
}
