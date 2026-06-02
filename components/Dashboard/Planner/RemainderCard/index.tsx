import { Bell, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { REMINDER_ICON } from "@/types/Planner";
import type { PlanReminder } from "@/types/Planner";

interface ReminderCardProps {
  reminder: PlanReminder;
}

export function ReminderCard({ reminder }: ReminderCardProps) {
  const TypeIcon = REMINDER_ICON[reminder.type] ?? Bell;

  return (
    <div className="rounded-lg border border-amber-500/30 border-l-[3px] border-l-amber-500 bg-amber-500/5 p-3">
      <div className="flex items-center gap-2 mb-1">
        <Bell size={12} className="text-amber-400" />
        <p className="text-xs font-semibold text-amber-100 line-clamp-1">
          {reminder.title}
        </p>
      </div>
      <div className="flex items-center gap-1 text-[10px] text-amber-300/80 font-mono mb-1">
        <Clock size={10} />
        {reminder.scheduledTime}
      </div>
      <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2">
        {reminder.description}
      </p>
      <Badge
        variant="outline"
        className="text-[10px] px-1.5 py-0 h-5 gap-1 border-amber-500/30 text-amber-300 bg-amber-500/10"
      >
        <TypeIcon size={10} />
        {reminder.type.replace("_", " ")}
      </Badge>
    </div>
  );
}
