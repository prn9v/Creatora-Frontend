import React from "react";
import { Message } from "@/types/Chatbot";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role?.toUpperCase() === "USER";

  // Simple, safe inline parser for basic Markdown (*bold*, **bold**, `code`, code blocks, newlines)
  const renderContent = (content: string) => {
    if (!content) return null;

    const parts = content.split(/(\`\`\`[a-zA-Z]*[\s\S]*?\`\`\`|\`[^\`]+\`|\*\*[^*]+\*\*|\*[^*]+\*)/g);

    return parts.map((part, i) => {
      // Code block: ```lang ... ```
      if (part.startsWith("```") && part.endsWith("```")) {
        const lines = part.slice(3, -3).trim().split("\n");
        // Check if first line is language
        const firstLine = lines[0] || "";
        const hasLang = /^[a-zA-Z]+$/.test(firstLine);
        const codeContent = hasLang ? lines.slice(1).join("\n") : lines.join("\n");

        return (
          <pre key={i} className="my-2 p-3 bg-black/40 rounded-lg overflow-x-auto border border-white/5 text-xs font-mono text-emerald-400">
            <code>{codeContent}</code>
          </pre>
        );
      }
      
      // Inline code: `code`
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="px-1.5 py-0.5 bg-black/30 rounded font-mono text-xs text-secondary-foreground border border-white/5">
            {part.slice(1, -1)}
          </code>
        );
      }

      // Bold: **text**
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Italic/Alternative bold: *text*
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={i} className="italic text-gray-200">{part.slice(1, -1)}</em>;
      }

      // Plain text with line breaks
      return (
        <span key={i} className="whitespace-pre-wrap leading-relaxed">
          {part}
        </span>
      );
    });
  };

  const formattedTime = message.createdAt
    ? (() => {
        try {
          return new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
        } catch {
          return null;
        }
      })()
    : null;

  return (
    <div
      className={cn(
        "flex flex-col gap-1 max-w-[85%] animate-fade-in",
        isUser ? "self-end items-end" : "self-start items-start"
      )}
    >
      <div
        className={cn(
          "p-3 rounded-2xl text-sm border shadow-sm transition-all duration-200",
          isUser
            ? "bg-primary/10 text-foreground border-primary/30 rounded-tr-none"
            : "bg-[rgb(38,38,54)]/40 text-foreground/95 border-[rgb(48,48,64)]/50 rounded-tl-none"
        )}
      >
        {renderContent(message.message)}
      </div>
      {formattedTime && (
        <span className="text-[10px] text-muted-foreground/75 px-1">
          {formattedTime}
        </span>
      )}
    </div>
  );
}
