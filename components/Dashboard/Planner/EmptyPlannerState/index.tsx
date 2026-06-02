"use client";

import { Loader2, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";

interface EmptyPlannerStateProps {
  onGenerate: () => void;
  isGenerating: boolean;
}

export function EmptyPlannerState({
  onGenerate,
  isGenerating,
}: EmptyPlannerStateProps) {
  return (
    <GlassCard className="flex flex-col items-center p-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Sparkles size={28} className="text-primary" />
      </div>
      <h2 className="mb-2 font-heading text-2xl font-bold">
        No plan for this week yet
      </h2>
      <p className="mb-6 max-w-md text-muted-foreground">
        Generate an AI-powered content schedule based on your brand profile,
        favorited ideas, and posting history.
      </p>
      <Button
        variant="default"
        size="lg"
        onClick={onGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Generating...
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Generate plan
          </>
        )}
      </Button>
    </GlassCard>
  );
}