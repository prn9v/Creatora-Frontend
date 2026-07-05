import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 p-4 bg-[rgb(38,38,54)]/50 border border-[rgb(48,48,64)]/50 rounded-xl max-w-[80%] self-start animate-fade-in">
      <div className="flex gap-1.5 items-center">
        <span className="h-2.5 w-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="h-2.5 w-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="h-2.5 w-2.5 bg-primary rounded-full animate-bounce" />
      </div>
      <span className="text-sm font-medium text-muted-foreground">Thinking...</span>
    </div>
  );
}
