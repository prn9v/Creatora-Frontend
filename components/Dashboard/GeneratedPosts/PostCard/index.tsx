// components/Planner/PostCard.tsx
"use client";

import { cn } from "@/lib/utils";
import type { ScheduledPost } from "@/types/Planner";
import {
  Ban,
  Check,
  Clock,
  Edit2,
  Instagram,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface PostCardProps {
  post: ScheduledPost;
  onEdit: (post: ScheduledPost) => void;
  onDelete: (slotId: string) => void;
  onMarkPosted: (slotId: string) => void;
  onMarkSkipped: (slotId: string) => void;
}

const STATUS_STYLES: Record<ScheduledPost["status"], string> = {
  SCHEDULED: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  POSTED:    "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
  SKIPPED:   "bg-muted text-muted-foreground border-border",
};

const STATUS_LABELS: Record<ScheduledPost["status"], string> = {
  SCHEDULED: "Scheduled",
  POSTED:    "Posted",
  SKIPPED:   "Skipped",
};

export function PostCard({
  post,
  onEdit,
  onDelete,
  onMarkPosted,
  onMarkSkipped,
}: PostCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const visibleHashtags = post.hashtags.slice(0, 4);
  const extraCount = post.hashtags.length - visibleHashtags.length;

  const isPosted  = post.status === "POSTED";
  const isSkipped = post.status === "SKIPPED";
  const isDone    = isPosted || isSkipped;

  const handleDeleteClick = () => {
    if (confirmDelete) {
      onDelete(post.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-border bg-background p-3 text-sm transition-opacity",
        isDone && "opacity-60"
      )}
    >
      {/* Time + badges */}
      <div className="flex items-start justify-between gap-2">
        <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
          <Clock size={11} />
          {post.scheduledTime}
        </span>
        <div className="flex flex-wrap justify-end gap-1">
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-[10px] font-medium",
              STATUS_STYLES[post.status]
            )}
          >
            {STATUS_LABELS[post.status]}
          </span>
          <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
            {post.platform}
          </span>
          {post.format && (
            <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              {post.format}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <p className="line-clamp-2 text-[13px] font-medium leading-snug text-foreground">
        {post.title}
      </p>

      {/* Caption */}
      {post.caption && (
        <p className="line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">
          {post.caption}
        </p>
      )}

      {/* Hashtags */}
      {visibleHashtags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {visibleHashtags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-blue-500 dark:text-blue-400"
            >
              {tag.startsWith("#") ? tag : `#${tag}`}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="text-[10px] text-muted-foreground">
              +{extraCount}
            </span>
          )}
        </div>
      )}

      {/* AI rationale */}
      {post.aiRationale && (
        <p className="line-clamp-2 border-l-2 border-border pl-2 text-[11px] italic text-muted-foreground">
          {post.aiRationale}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-1.5 border-t border-border pt-2">
        {!isPosted && !isSkipped && (
          <button
            onClick={() => onMarkPosted(post.id)}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-border py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-950 dark:hover:text-green-300"
          >
            <Check size={12} />
            Posted
          </button>
        )}

        {isSkipped && (
          <button
            onClick={() => onMarkPosted(post.id)}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-border py-1.5 text-[11px] text-muted-foreground transition-colors hover:bg-muted"
          >
            <Instagram size={12} />
            Reschedule
          </button>
        )}

        <button
          onClick={() => onEdit(post)}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-border py-1.5 text-[11px] text-muted-foreground transition-colors hover:bg-muted"
        >
          <Edit2 size={12} />
          Edit
        </button>

        {!isPosted && !isSkipped && (
          <button
            onClick={() => onMarkSkipped(post.id)}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-border py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 dark:hover:bg-orange-950 dark:hover:text-orange-300"
          >
            <Ban size={12} />
            Skip
          </button>
        )}

        <button
          onClick={handleDeleteClick}
          className={cn(
            "flex items-center justify-center rounded-lg border px-2.5 py-1.5 text-[11px] transition-colors",
            confirmDelete
              ? "border-red-300 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
              : "border-border text-muted-foreground hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950 dark:hover:text-red-300"
          )}
          title={confirmDelete ? "Click again to confirm" : "Delete slot"}
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
}