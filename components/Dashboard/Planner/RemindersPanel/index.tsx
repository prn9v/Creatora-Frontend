"use client";

import { Bell } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import { DAY_LABELS, REMINDER_ICON } from "@/types/Planner";
import type { DayIndex, PlanReminder } from "@/types/Planner";

interface RemindersPanelProps {
  reminders: PlanReminder[];
}

export function RemindersPanel({ reminders }: RemindersPanelProps) {
  return (
    <GlassCard className="p-5">
      <div className="mb-4 flex items-center gap-2">
        <Bell size={16} className="text-amber-400" />
        <h3 className="font-heading font-semibold">
          This week&apos;s reminders
        </h3>
        <Badge variant="outline" className="ml-auto text-xs">
          {reminders.length}
        </Badge>
      </div>

      {reminders.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          No reminders for this week.
        </p>
      ) : (
        <div className="space-y-3">
          {reminders.map((r) => {
            const Icon = REMINDER_ICON[r.type] ?? Bell;
            return (
              <div
                key={r.id}
                className="rounded-lg border border-amber-500/30 border-l-[3px] border-l-amber-500 bg-amber-500/5 p-3"
              >
                <div className="mb-1 flex items-center gap-2">
                  <Icon size={12} className="text-amber-400" />
                  <p className="text-sm font-semibold">{r.title}</p>
                </div>
                <p className="mb-1 font-mono text-[11px] text-amber-300/80">
                  {DAY_LABELS[r.dayOfWeek as DayIndex].long} at{" "}
                  {r.scheduledTime}
                </p>
                <p className="text-xs text-muted-foreground">{r.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}