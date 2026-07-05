import React from "react";
import { X, PanelLeftOpen, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  onClose: () => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  activeTitle?: string;
}

export default function ChatHeader({
  onClose,
  onToggleSidebar,
  sidebarOpen,
  activeTitle,
}: ChatHeaderProps) {
  return (
    <header className="px-4 py-3 bg-[rgb(28,28,40)] border-b border-[rgb(48,48,64)] flex items-center justify-between z-10 shrink-0">
      <div className="flex items-center gap-2 min-w-0">
        <button
          onClick={onToggleSidebar}
          className={cn(
            "p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-[rgb(38,38,54)] transition-colors cursor-pointer shrink-0",
            sidebarOpen && "text-primary bg-primary/10"
          )}
          title="View chat history"
        >
          <PanelLeftOpen size={18} />
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-accent select-none">
              CHIT-CHAT
            </span>
            <span className="text-[10px] bg-primary/20 text-primary border border-primary/30 rounded px-1 font-semibold uppercase tracking-wider scale-[0.9] select-none">
              AI
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground truncate max-w-[160px]">
            {activeTitle || "AI Assistant"}
          </span>
        </div>
      </div>

      <button
        onClick={onClose}
        className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-[rgb(38,38,54)] transition-colors cursor-pointer"
        title="Close chat"
      >
        <X size={18} />
      </button>
    </header>
  );
}
