'use client'

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  Loader2,
  Twitter,
  Linkedin,
  FileText,
  Edit2,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PlannerDay {
  date: number;
  day: string;
  topic?: string;
  platform?: string;
  status: "empty" | "planned" | "generated" | "posted";
}

const initialDays: PlannerDay[] = [
  { date: 17, day: "Mon", topic: "The Hidden Cost of Context Switching", platform: "twitter", status: "posted" },
  { date: 18, day: "Tue", topic: "5 Morning Habits of Successful Founders", platform: "linkedin", status: "generated" },
  { date: 19, day: "Wed", topic: "Why Your First 100 Users Matter", platform: "twitter", status: "planned" },
  { date: 20, day: "Thu", status: "empty" },
  { date: 21, day: "Fri", topic: "Building in Public: Lessons Learned", platform: "blog", status: "planned" },
  { date: 22, day: "Sat", status: "empty" },
  { date: 23, day: "Sun", status: "empty" },
];

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  blog: FileText,
};

const statusColors = {
  empty: "border-dashed border-border",
  planned: "border-warning/50 bg-warning/5",
  generated: "border-accent/50 bg-accent/5",
  posted: "border-success/50 bg-success/5",
};

const statusLabels = {
  empty: { label: "Empty", color: "outline" },
  planned: { label: "Planned", color: "warning" },
  generated: { label: "Ready", color: "accent" },
  posted: { label: "Posted", color: "success" },
};

const Planner = () => {
  const [days, setDays] = useState<PlannerDay[]>(initialDays);
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [editTopic, setEditTopic] = useState("");
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);

  const startEditing = (date: number, currentTopic: string = "") => {
    setEditingDay(date);
    setEditTopic(currentTopic);
  };

  const saveEdit = (date: number) => {
    if (editTopic.trim()) {
      setDays(days.map((d) =>
        d.date === date
          ? { ...d, topic: editTopic, status: "planned", platform: d.platform || "twitter" }
          : d
      ));
    }
    setEditingDay(null);
    setEditTopic("");
  };

  const cancelEdit = () => {
    setEditingDay(null);
    setEditTopic("");
  };

  const deleteTopic = (date: number) => {
    setDays(days.map((d) =>
      d.date === date
        ? { ...d, topic: undefined, platform: undefined, status: "empty" }
        : d
    ));
  };

  const generateAll = () => {
    setIsGeneratingAll(true);
    setTimeout(() => {
      setDays(days.map((d) =>
        d.status === "planned" ? { ...d, status: "generated" } : d
      ));
      setIsGeneratingAll(false);
    }, 3000);
  };

  const clearWeek = () => {
    setDays(days.map((d) => ({
      ...d,
      topic: undefined,
      platform: undefined,
      status: "empty",
    })));
  };

  const plannedCount = days.filter((d) => d.status !== "empty").length;

  return (
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold mb-1">Weekly Planner</h1>
            <p className="text-muted-foreground">
              Plan and schedule your content for the week.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={clearWeek}
              disabled={plannedCount === 0}
            >
              <Trash2 size={18} />
              Clear Week
            </Button>
            <Button
              variant="gradient"
              onClick={generateAll}
              disabled={isGeneratingAll || days.filter((d) => d.status === "planned").length === 0}
            >
              {isGeneratingAll ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate All
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon">
            <ChevronLeft size={20} />
          </Button>
          <div className="text-center">
            <h2 className="font-heading font-semibold text-lg">December 2024</h2>
            <p className="text-sm text-muted-foreground">Week 51</p>
          </div>
          <Button variant="ghost" size="icon">
            <ChevronRight size={20} />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-4">
          {days.map((day, index) => {
            const isEditing = editingDay === day.date;
            const PlatformIcon = day.platform ? platformIcons[day.platform as keyof typeof platformIcons] : null;

            return (
              <div
                key={day.date}
                className={cn(
                  " animate-fade-in"
                )}
                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "forwards" }}
              >
                <GlassCard
                  className={cn(
                    "p-4 min-h-[200px] flex flex-col transition-all",
                    statusColors[day.status]
                  )}
                >
                  {/* Day Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">{day.day}</p>
                      <p className="font-mono font-bold text-lg">{day.date}</p>
                    </div>
                    {day.status !== "empty" && (
                      <Badge variant={statusLabels[day.status].color as "warning" | "accent" | "success" | "outline"} className="text-xs">
                        {statusLabels[day.status].label}
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-2">
                        <textarea
                          autoFocus
                          placeholder="Enter topic..."
                          className="w-full bg-background-secondary border border-border rounded p-2 text-sm resize-none h-20 focus:outline-none focus:border-primary/50"
                          value={editTopic}
                          onChange={(e) => setEditTopic(e.target.value)}
                        />
                        <div className="flex gap-1">
                          <Button size="sm" variant="default" className="flex-1" onClick={() => saveEdit(day.date)}>
                            <Check size={14} />
                          </Button>
                          <Button size="sm" variant="ghost" className="flex-1" onClick={cancelEdit}>
                            <X size={14} />
                          </Button>
                        </div>
                      </div>
                    ) : day.topic ? (
                      <div>
                        <p className="text-sm font-medium mb-2 line-clamp-3">{day.topic}</p>
                        {PlatformIcon && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <PlatformIcon size={14} />
                            <span className="text-xs capitalize">{day.platform}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditing(day.date)}
                        className="w-full h-full flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Plus size={24} />
                        <span className="text-xs mt-1">Add Topic</span>
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  {day.topic && !isEditing && (
                    <div className="flex gap-1 mt-3 pt-3 border-t border-border/50">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-1 h-8"
                        onClick={() => startEditing(day.date, day.topic)}
                      >
                        <Edit2 size={14} />
                      </Button>
                      {day.status === "planned" && (
                        <Button size="sm" variant="ghost" className="flex-1 h-8">
                          <Sparkles size={14} />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-1 h-8 text-destructive hover:text-destructive"
                        onClick={() => deleteTopic(day.date)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  )}
                </GlassCard>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-8 flex flex-wrap gap-4">
          <GlassCard className="px-4 py-3 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-sm">
              {days.filter((d) => d.status === "planned").length} Planned
            </span>
          </GlassCard>
          <GlassCard className="px-4 py-3 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-sm">
              {days.filter((d) => d.status === "generated").length} Ready
            </span>
          </GlassCard>
          <GlassCard className="px-4 py-3 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-sm">
              {days.filter((d) => d.status === "posted").length} Posted
            </span>
          </GlassCard>
        </div>
      </div>
  );
};

export default Planner;
