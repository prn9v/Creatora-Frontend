"use client";

import {
  ChevronLeft,
  ChevronRight,
  History,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PlannerHeaderProps {
  weekLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onGenerate: () => void;
  onOpenHistory: () => void;
  isGenerating: boolean;
  hasExistingPlan: boolean;
}

export default function PlannerHeader({
  weekLabel,
  onPrev,
  onNext,
  onToday,
  onGenerate,
  onOpenHistory,
  isGenerating,
  hasExistingPlan,
}: PlannerHeaderProps) {
  const generateButton = (
    <Button
      variant="default"
      disabled={isGenerating}
      onClick={!hasExistingPlan ? onGenerate : undefined}
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          {hasExistingPlan ? "Regenerate Plan" : "Generate Plan"}
        </>
      )}
    </Button>
  );

  return (
    <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className="mb-1 text-3xl font-bold">Weekly Planner</h1>
        <p className="text-muted-foreground">
          AI-generated schedule based on your brand profile and ideas
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg border bg-card/40 px-2 py-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrev}
            aria-label="Previous week"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="min-w-[180px] px-2 text-center font-mono text-sm">
            {weekLabel}
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            aria-label="Next week"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="ghost" onClick={onToday}>
          Today
        </Button>

        <Button variant="outline" onClick={onOpenHistory}>
          <History className="mr-2 h-4 w-4" />
          History
        </Button>

        {hasExistingPlan ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>{generateButton}</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Regenerate this week&apos;s plan?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will replace your current plan for this week. Continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onGenerate}>
                  Regenerate
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          generateButton
        )}
      </div>
    </div>
  );
}