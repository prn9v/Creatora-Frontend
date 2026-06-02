"use client";

import { Calendar, Lightbulb } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FavoritedIdea } from "@/types/Planner";

interface UnscheduledIdeasPanelProps {
  ideas: FavoritedIdea[];
  onSchedule: (idea: FavoritedIdea) => void;
}

const FORMAT_COLOR: Record<string, string> = {
  Reel: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  Carousel: "bg-teal-500/15 text-teal-300 border-teal-500/30",
  "Story/Poll": "bg-amber-500/15 text-amber-300 border-amber-500/30",
};

export function UnscheduledIdeasPanel({
  ideas,
  onSchedule,
}: UnscheduledIdeasPanelProps) {
  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb size={16} className="text-primary" />
        <h3 className="font-heading font-semibold">Unscheduled ideas</h3>
        <Badge variant="outline" className="ml-auto text-xs">
          {ideas.length}
        </Badge>
      </div>

      {ideas.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          All your favorited ideas are scheduled this week 🎉
        </p>
      ) : (
        <div className="space-y-3">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="rounded-lg border border-border bg-card/40 p-3"
            >
              <p className="mb-2 line-clamp-2 text-sm font-medium">
                {idea.hook}
              </p>
              <div className="flex items-center justify-between gap-2">
                {idea.format && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px]",
                      FORMAT_COLOR[idea.format] ??
                        "bg-muted text-muted-foreground"
                    )}
                  >
                    {idea.format}
                  </Badge>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-auto h-7 text-xs"
                  onClick={() => onSchedule(idea)}
                >
                  <Calendar size={12} />
                  Schedule
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}