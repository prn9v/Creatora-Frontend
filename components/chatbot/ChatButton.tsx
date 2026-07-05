import React from "react";
import { MessageSquareCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function ChatButton({ onClick, isOpen }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        // Fixed positioning in bottom-right corner
        "fixed bottom-6 right-6 z-50 flex items-center justify-center gap-2 px-5 py-3 rounded-full cursor-pointer",
        // Gradient styling and hover effects matching existing design patterns
        "bg-gradient-to-r from-secondary via-primary to-accent text-primary-foreground font-bold text-xs tracking-wider uppercase",
        "shadow-[0_0_24px_rgba(139,92,246,0.4)] transition-all duration-300 ease-out hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(139,92,246,0.6)]",
        "animate-fade-in-up",
        // If the chat window is open, highlight or animate differently
        isOpen && "scale-95 opacity-90 shadow-none border border-primary/40 bg-card backdrop-blur-xl bg-none text-foreground hover:bg-card/80"
      )}
    >
      <MessageSquareCode size={18} className="animate-pulse" />
      <span>CHIT-CHAT</span>
    </button>
  );
}
