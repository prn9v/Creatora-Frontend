import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

import { DAY_LABELS } from "@/types/Planner";
import type {
  DayIndex,
  PlanReminder,
  ScheduledPost,
} from "@/types/Planner";
import { ReminderCard } from "../RemainderCard";
import { PostCard } from "../PostCard";

interface DayColumnProps {
  dayIndex: DayIndex;
  date: Date;
  posts: ScheduledPost[];
  reminders: PlanReminder[];
  isToday: boolean;
  onAdd: (dayIndex: DayIndex) => void;
  onEditPost: (post: ScheduledPost) => void;
  onDeletePost: (slotId: string) => void;
  onMarkPosted: (slotId: string) => void;
  onMarkSkipped: (slotId: string) => void;
}

export function DayColumn({
  dayIndex,
  date,
  posts,
  reminders,
  isToday,
  onAdd,
  onEditPost,
  onDeletePost,
  onMarkPosted,
  onMarkSkipped,
}: DayColumnProps) {
  const sortedPosts = [...posts].sort((a, b) =>
    a.scheduledTime.localeCompare(b.scheduledTime)
  );

  return (
    <div className="flex flex-col min-w-[180px]">
      <div className="mb-3 px-1">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
          {DAY_LABELS[dayIndex].short}
        </p>
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "font-mono font-bold text-lg",
              isToday && "text-primary"
            )}
          >
            {date.getDate()}
          </span>
          {isToday && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {sortedPosts.map((p) => (
          <PostCard
            key={p.id}
            post={p}
            onEdit={onEditPost}
            onDelete={onDeletePost}
            onMarkPosted={onMarkPosted}
            onMarkSkipped={onMarkSkipped}
          />
        ))}
        {reminders.map((r) => (
          <ReminderCard key={r.id} reminder={r} />
        ))}

        <button
          onClick={() => onAdd(dayIndex)}
          className="mt-1 flex items-center justify-center gap-1 rounded-lg border border-dashed border-border py-3 text-xs text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
        >
          <Plus size={14} />
          Add post
        </button>
      </div>
    </div>
  );
}
