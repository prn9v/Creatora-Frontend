"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { History, Loader2, Calendar } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  formatDateTimeReadable,
  formatWeekLabel,
} from "@/types/Planner";
import type { WeeklyPlan } from "@/types/Planner";
import { getBackendUrl } from "@/lib/env";


interface HistoryDialogProps {
  open: boolean;
  onClose: () => void;
  onOpenPlan: (plan: WeeklyPlan) => void;
}

export function HistoryDialog({
  open,
  onClose,
  onOpenPlan,
}: HistoryDialogProps) {
  const [history, setHistory] = useState<WeeklyPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch only when dialog opens
  useEffect(() => {
    if (!open) return;

    const fetchHistory = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get<WeeklyPlan[]>(
          `${getBackendUrl()}/planner/history`,
          { withCredentials: true }
        );
        setHistory(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data?.message ?? "Failed to load history";
          setError(message);
          toast.error(message);
        } else {
          setError("An unexpected error occurred");
          toast.error("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History size={18} />
            Plan history
          </DialogTitle>
          <DialogDescription>
            All weekly plans you&apos;ve generated, newest first.
          </DialogDescription>
        </DialogHeader>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-10 text-muted-foreground">
            <Loader2 className="mr-2 animate-spin" size={16} />
            Loading history...
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <p className="py-6 text-center text-sm text-destructive">
            {error}
          </p>
        )}

        {/* Empty */}
        {!isLoading && !error && history.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            You haven&apos;t generated any plans yet.
          </p>
        )}

        {/* List */}
        {!isLoading && !error && history.length > 0 && (
          <div className="space-y-2">
            {history.map((plan) => {
              const monday = new Date(plan.weekStart);
              const totalPosts = plan.plan?.posts?.length ?? 0;
              const posted =
                plan.plan?.posts?.filter((p) => p.status === "POSTED")
                  .length ?? 0;

              return (
                <div
                  key={plan.id}
                  className="flex flex-col gap-3 rounded-lg border border-border bg-card/40 p-4 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Calendar size={14} className="text-primary" />
                      <p className="font-mono text-sm font-semibold">
                        {formatWeekLabel(monday)}
                      </p>
                    </div>
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {plan.plan?.summary ?? "No summary"}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Generated {formatDateTimeReadable(plan.createdAt)}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {posted}/{totalPosts} posted
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        onOpenPlan(plan);
                        onClose();
                      }}
                    >
                      Open
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}