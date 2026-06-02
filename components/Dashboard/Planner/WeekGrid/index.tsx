"use client";


import { addDays, DAY_INDICES, isSameDay } from "@/types/Planner";
import type { DayIndex, PlanReminder, ScheduledPost } from "@/types/Planner";
import { DayColumn } from "../DayColumn";

interface WeekGridProps {
  weekStart: Date;
  posts: ScheduledPost[];
  reminders: PlanReminder[];
  onAdd: (dayIndex: DayIndex) => void;
  onEditPost: (post: ScheduledPost) => void;
  onDeletePost: (slotId: string) => void;
  onMarkPosted: (slotId: string) => void;
  onMarkSkipped: (slotId: string) => void;
}

export function WeekGrid({
  weekStart,
  posts,
  reminders,
  onAdd,
  onEditPost,
  onDeletePost,
  onMarkPosted,
  onMarkSkipped,
}: WeekGridProps) {
  const today = new Date();

  return (
    <div className="-mx-2 overflow-x-auto px-2">
      <div className="grid min-w-[1100px] grid-cols-7 gap-3">
        {DAY_INDICES.map((d) => {
          const date = addDays(weekStart, d);
          return (
            <DayColumn
              key={d}
              dayIndex={d}
              date={date}
              isToday={isSameDay(date, today)}
              posts={posts.filter((p) => p.dayOfWeek === d)}
              reminders={reminders.filter((r) => r.dayOfWeek === d)}
              onAdd={onAdd}
              onEditPost={onEditPost}
              onDeletePost={onDeletePost}
              onMarkPosted={onMarkPosted}
              onMarkSkipped={onMarkSkipped}
            />
          );
        })}
      </div>
    </div>
  );
}