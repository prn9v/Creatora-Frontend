import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize height based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }, [text]);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 bg-[rgb(28,28,40)] border-t border-[rgb(48,48,64)] flex items-end gap-2"
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={disabled}
        className={cn(
          "flex-1 max-h-[120px] resize-none overflow-y-auto rounded-lg border border-[rgb(48,48,64)] bg-input/20 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-[color,box-shadow]",
          "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
        style={{ height: "38px" }}
      />
      <button
        type="submit"
        disabled={!text.trim() || disabled}
        className={cn(
          "h-[38px] w-[38px] rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95",
          text.trim() && !disabled
            ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow-sm"
            : "bg-[rgb(38,38,54)] text-muted-foreground border border-[rgb(48,48,64)] cursor-not-allowed opacity-50"
        )}
      >
        <SendHorizontal size={16} />
      </button>
    </form>
  );
}
