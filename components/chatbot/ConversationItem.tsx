import React, { useState, useRef, useEffect } from "react";
import { Conversation } from "@/types/Chatbot";
import { cn, getTimeAgo } from "@/lib/utils";
import { Trash2, Pencil, Check, X, MessageSquare } from "lucide-react";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onRename: (title: string) => void;
  onDelete: () => void;
}

export default function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onRename,
  onDelete,
}: ConversationItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(conversation.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSaveRename = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (editTitle.trim() && editTitle.trim() !== conversation.title) {
      onRename(editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setEditTitle(conversation.title);
      setIsEditing(false);
    }
  };

  // Safe wrapper for date parsing
  const timeLabel = (() => {
    try {
      const date = conversation.updatedAt ? new Date(conversation.updatedAt) : new Date(conversation.createdAt);
      return getTimeAgo(date);
    } catch {
      return "";
    }
  })();

  return (
    <div
      onClick={isEditing ? undefined : onSelect}
      className={cn(
        "group flex items-center justify-between gap-2 p-2.5 rounded-lg border text-sm transition-all duration-200 cursor-pointer",
        isActive
          ? "bg-primary/10 border-primary/30 text-primary"
          : "border-transparent text-foreground/80 hover:bg-muted hover:text-foreground"
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <MessageSquare size={16} className={cn("shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
        
        {isEditing ? (
          <form onSubmit={handleSaveRename} className="flex-1 flex items-center gap-1 min-w-0" onClick={e => e.stopPropagation()}>
            <input
              ref={inputRef}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => setIsEditing(false)}
              className="w-full bg-black/40 border border-primary/50 rounded px-1.5 py-0.5 text-xs text-foreground outline-none"
            />
            <button type="submit" className="text-success hover:text-success-foreground p-0.5 rounded cursor-pointer">
              <Check size={14} />
            </button>
            <button
              type="button"
              onClick={() => {
                setEditTitle(conversation.title);
                setIsEditing(false);
              }}
              className="text-destructive hover:text-destructive-foreground p-0.5 rounded cursor-pointer"
            >
              <X size={14} />
            </button>
          </form>
        ) : (
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-medium text-xs truncate leading-normal">
              {conversation.title}
            </span>
            {timeLabel && (
              <span className="text-[10px] text-muted-foreground/70 mt-0.5">
                {timeLabel}
              </span>
            )}
          </div>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-1 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded cursor-pointer"
            title="Rename chat"
          >
            <Pencil size={12} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Are you sure you want to delete this chat?")) {
                onDelete();
              }
            }}
            className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded cursor-pointer"
            title="Delete chat"
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
