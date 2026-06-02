"use client";

import { Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatDateTimeReadable, WeeklyPlan } from "@/types/Planner";

interface GeneratePlanBarProps {
  plan: WeeklyPlan;
}

export function GeneratePlanBar({ plan }: GeneratePlanBarProps) {
  const total = plan.plan.posts.length;
  const scheduled = plan.plan.posts.filter(
    (p) => p.status === "SCHEDULED"
  ).length;

  return (
    <GlassCard className="mb-6 flex flex-col justify-between gap-4 bg-muted/30 p-4 md:flex-row md:items-center">
      <div className="flex flex-1 items-start gap-3">
        <Sparkles className="mt-0.5 shrink-0 text-primary" size={18} />
        <p className="text-sm leading-relaxed text-muted-foreground">
          {plan.plan.summary}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-start text-xs text-muted-foreground md:items-end">
        <span className="font-mono text-sm text-foreground">
          {scheduled} of {total} posts scheduled
        </span>
        <span>Generated {formatDateTimeReadable(plan.plan.generatedAt)}</span>
      </div>
    </GlassCard>
  );
}