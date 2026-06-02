"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import type {
  DayIndex,
  FavoritedIdea,
  ScheduledPost,
  SlotCreatePayload,
  SlotUpdatePayload,
  WeeklyPlan,
} from "@/types/Planner";

import {
  addDays,
  formatWeekLabel,
  formatYMD,
  getWeekMonday,
} from "@/types/Planner";

import PlannerHeader from "./PlannerHeader";
import { HistoryDialog } from "./HistoryDialog";
import { PlannerSkeleton } from "./PlannerSkeleton";
import { EmptyPlannerState } from "./EmptyPlannerState";
import { GeneratePlanBar } from "./GeneratePlanBar";
import { WeekGrid } from "./WeekGrid";
import { UnscheduledIdeasPanel } from "./UnscheduledIdeasPanel";
import { RemindersPanel } from "./RemindersPanel";
import { EditSlotModal } from "./EditSlotModal";
import { AddSlotModal } from "./AddSlotModal";
import { getBackendUrl } from "@/lib/env";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ApiIdea {
  id: string;
  hook: string;
  description?: string;
  format?: string;
  platform?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mapApiIdeaToFavoritedIdea(idea: ApiIdea): FavoritedIdea {
  return {
    id: idea.id,
    hook: idea.hook,
    description: idea.description,
    format: idea.format as FavoritedIdea["format"],
    platform: idea.platform as FavoritedIdea["platform"],
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function WeeklyPlannerView() {
  // ── Week navigation ───────────────────────────────────────────────────────
  const [currentMonday, setCurrentMonday] = useState<Date>(() =>
    getWeekMonday(new Date())
  );

  const weekLabel = formatWeekLabel(currentMonday);

  const goToPrevWeek = () =>
    setCurrentMonday((prev) => addDays(prev, -7));

  const goToNextWeek = () =>
    setCurrentMonday((prev) => addDays(prev, 7));

  const goToCurrentWeek = () =>
    setCurrentMonday(getWeekMonday(new Date()));

  const goToWeek = (date: Date) =>
    setCurrentMonday(getWeekMonday(date));

  // ── Core state ────────────────────────────────────────────────────────────
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [favoriteIdeas, setFavoriteIdeas] = useState<FavoritedIdea[]>([]);

  const [isPlanLoading, setIsPlanLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // shared mutation loading

  const [is404, setIs404] = useState(false);

  // ── Modal / UI state ──────────────────────────────────────────────────────
  const [editingPost, setEditingPost] = useState<ScheduledPost | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addDay, setAddDay] = useState<DayIndex>(0);
  const [prefilledIdea, setPrefilledIdea] = useState<FavoritedIdea | null>(
    null
  );
  const [historyOpen, setHistoryOpen] = useState(false);

  const planId = plan?.id ?? null;

  // ── Derived: unscheduled ideas ────────────────────────────────────────────
  const unscheduledIdeas = useMemo<FavoritedIdea[]>(() => {
    if (!plan || !favoriteIdeas.length) return [];
    const ids = new Set(plan.plan.unscheduledIdeaIds);
    return favoriteIdeas.filter((i) => ids.has(i.id));
  }, [plan, favoriteIdeas]);

  // ── Fetch plan for current week ───────────────────────────────────────────
  useEffect(() => {
    const fetchPlan = async () => {
      setIsPlanLoading(true);
      setIs404(false);
      setPlan(null);

      try {
        const weekStart = formatYMD(currentMonday);
        const response = await axios.get<WeeklyPlan>(
          `${getBackendUrl()}/planner/${weekStart}`,
          { withCredentials: true }
        );
        setPlan(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setIs404(true);
          } else {
            toast.error(
              error.response?.data?.message ?? "Failed to load plan"
            );
          }
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setIsPlanLoading(false);
      }
    };

    fetchPlan();
  }, [currentMonday]);

  // ── Fetch favorite ideas (once) ───────────────────────────────────────────
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get<ApiIdea[]>(
          `${getBackendUrl()}/ideas/favorites`,
          { withCredentials: true }
        );
        setFavoriteIdeas(response.data.map(mapApiIdeaToFavoritedIdea));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message ?? "Failed to fetch ideas"
          );
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    };

    fetchFavorites();
  }, []);

  // ── Generate / regenerate plan ────────────────────────────────────────────
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const weekStart = formatYMD(currentMonday);
      const response = await axios.post<WeeklyPlan>(
        `${getBackendUrl()}/planner/generate`,
        { weekStart },
        { withCredentials: true }
      );
      setPlan(response.data);
      setIs404(false);
      toast.success("Plan generated!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to generate plan"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Add slot ──────────────────────────────────────────────────────────────
  const handleAddSave = async (payload: SlotCreatePayload) => {
    if (!planId) return;
    setIsLoading(true);
    try {
      const response = await axios.post<WeeklyPlan>(
        `${getBackendUrl()}/planner/${planId}/slots`,
        payload,
        { withCredentials: true }
      );
      setPlan(response.data);
      setAddOpen(false);
      toast.success("Post added!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to add post"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── Edit / update slot ────────────────────────────────────────────────────
  const handleEditSave = async (
    slotId: string,
    payload: SlotUpdatePayload
  ) => {
    if (!planId) return;
    setIsLoading(true);
    try {
      const response = await axios.patch<WeeklyPlan>(
        `${getBackendUrl()}/planner/${planId}/slots/${slotId}`,
        payload,
        { withCredentials: true }
      );
      setPlan(response.data);
      setEditingPost(null);
      toast.success("Post updated!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to update post"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── Delete slot ───────────────────────────────────────────────────────────
  const handleDeletePost = async (slotId: string) => {
    if (!planId) return;
    setIsLoading(true);
    try {
      await axios.delete(
        `${getBackendUrl()}/planner/${planId}/slots/${slotId}`,
        { withCredentials: true }
      );
      // DELETE returns 204 — remove the slot from local state directly
      setPlan((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          plan: {
            ...prev.plan,
            posts: prev.plan.posts.filter((p) => p.id !== slotId),
          },
        };
      });
      toast.success("Post removed");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to delete post"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── Mark posted ───────────────────────────────────────────────────────────
  const handleMarkPosted = async (slotId: string) => {
    if (!planId) return;
    setIsLoading(true);
    try {
      const response = await axios.patch<WeeklyPlan>(
        `${getBackendUrl()}/planner/${planId}/slots/${slotId}/posted`,
        {},
        { withCredentials: true }
      );
      setPlan(response.data);
      toast.success("Marked as posted!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to mark as posted"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── Mark skipped ──────────────────────────────────────────────────────────
  const handleMarkSkipped = async (slotId: string) => {
    if (!planId) return;
    setIsLoading(true);
    try {
      const response = await axios.patch<WeeklyPlan>(
        `${getBackendUrl()}/planner/${planId}/slots/${slotId}/skipped`,
        {},
        { withCredentials: true }
      );
      setPlan(response.data);
      toast.success("Post skipped");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to mark as skipped"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ── Add slot handlers ─────────────────────────────────────────────────────
  const handleAdd = (day: DayIndex) => {
    setAddDay(day);
    setPrefilledIdea(null);
    setAddOpen(true);
  };

  const handleScheduleIdea = (idea: FavoritedIdea) => {
    setAddDay(0);
    setPrefilledIdea(idea);
    setAddOpen(true);
  };

  // ── Render grid area ──────────────────────────────────────────────────────
  const renderGridArea = () => {
    if (isPlanLoading) return <PlannerSkeleton />;

    if (is404 || !plan) {
      return (
        <EmptyPlannerState
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      );
    }

    return (
      <>
        <GeneratePlanBar plan={plan} />
        <WeekGrid
          weekStart={currentMonday}
          posts={plan.plan.posts}
          reminders={plan.plan.reminders}
          onAdd={handleAdd}
          onEditPost={setEditingPost}
          onDeletePost={handleDeletePost}
          onMarkPosted={handleMarkPosted}
          onMarkSkipped={handleMarkSkipped}
        />
      </>
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 lg:p-8">
      <PlannerHeader
        weekLabel={weekLabel}
        onPrev={goToPrevWeek}
        onNext={goToNextWeek}
        onToday={goToCurrentWeek}
        onGenerate={handleGenerate}
        onOpenHistory={() => setHistoryOpen(true)}
        isGenerating={isGenerating}
        hasExistingPlan={!!plan}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">{renderGridArea()}</div>

        {plan && (
          <div className="flex flex-col gap-4">
            <UnscheduledIdeasPanel
              ideas={unscheduledIdeas}
              onSchedule={handleScheduleIdea}
            />
            <RemindersPanel reminders={plan.plan.reminders} />
          </div>
        )}
      </div>

      <EditSlotModal
        open={!!editingPost}
        post={editingPost}
        isSaving={isLoading}
        onClose={() => setEditingPost(null)}
        onSave={handleEditSave}
      />

      <AddSlotModal
        open={addOpen}
        defaultDay={addDay}
        unscheduledIdeas={
          prefilledIdea
            ? [
                prefilledIdea,
                ...unscheduledIdeas.filter((i) => i.id !== prefilledIdea.id),
              ]
            : unscheduledIdeas
        }
        isSaving={isLoading}
        onClose={() => setAddOpen(false)}
        onSave={handleAddSave}
      />

      <HistoryDialog
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onOpenPlan={(p) => goToWeek(new Date(p.weekStart))}
      />
    </div>
  );
}