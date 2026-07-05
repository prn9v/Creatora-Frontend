import React, { useEffect, useRef } from "react";
import { Message } from "@/types/Chatbot";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { Loader2 } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  sending: boolean;
}

export default function MessageList({ messages, loading, sending }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages or when loading states change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, sending]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-2">
        <Loader2 className="animate-spin text-primary" size={24} />
        <span className="text-sm">Loading message history...</span>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-3 select-none">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xl font-bold animate-pulse-glow">
            💬
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-foreground">CHIT-CHAT AI Assistant</h3>
            <p className="text-xs text-muted-foreground max-w-[240px] leading-relaxed">
              Ask me about your Weekly Planner, content ideas, or how to generate posts for Instagram and TikTok!
            </p>
          </div>
        </div>
      ) : (
        messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))
      )}

      {sending && <TypingIndicator />}

      <div ref={messagesEndRef} />
    </div>
  );
}
