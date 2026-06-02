import {
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  FileText,
  Mail,
  Leaf,
  BarChart3,
  Pencil,
  Bell,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// src/lib/planner/types.ts
export type SocialPlatform =
  | "INSTAGRAM"
  | "YOUTUBE"
  | "FACEBOOK"
  | "TWITTER"
  | "LINKEDIN"
  | "THREAD"
  | "BLOG"
  | "EMAIL";

export type PostFormat =
  | "Reel"
  | "Carousel"
  | "Talking-head"
  | "BTS"
  | "Trend hijack"
  | "Story/Poll"
  | "POV"
  | "Behind-the-scenes"
  | string;

export type PostStatus = "SCHEDULED" | "POSTED" | "SKIPPED";

export type PostSourceType = "GENERATED" | "IDEA" | "NEW";

export type ReminderType =
  | "HARVEST"
  | "ENGAGEMENT_CHECK"
  | "CONTENT_PREP"
  | "GENERAL";

export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface ScheduledPost {
  id: string;
  dayOfWeek: DayIndex;
  scheduledTime: string;
  platform: SocialPlatform;
  format: PostFormat;
  title: string;
  caption: string;
  hashtags: string[];
  contentIdeaId: string | null;
  generatedPostId: string | null;
  sourceType: PostSourceType;
  status: PostStatus;
  aiRationale: string;
}

export interface PlanReminder {
  id: string;
  dayOfWeek: DayIndex;
  scheduledTime: string;
  title: string;
  description: string;
  type: ReminderType;
}

export interface WeeklyPlanData {
  weekStart: string;
  generatedAt: string;
  summary: string;
  posts: ScheduledPost[];
  reminders: PlanReminder[];
  unscheduledIdeaIds: string[];
}

export interface WeeklyPlan {
  id: string;
  weekStart: string;
  userId: string;
  createdAt: string;
  plan: WeeklyPlanData;
}

export interface FavoritedIdea {
  id: string;
  hook: string;
  description?: string;
  format?: PostFormat;
  platform?: SocialPlatform;
}

export interface SlotUpdatePayload {
  dayOfWeek?: DayIndex;
  scheduledTime?: string;
  platform?: SocialPlatform;
  title?: string;
  caption?: string;
  hashtags?: string[];
  status?: PostStatus;
}

export interface SlotCreatePayload {
  dayOfWeek: DayIndex;
  scheduledTime: string;
  platform: SocialPlatform;
  format: PostFormat;
  title: string;
  caption: string;
  hashtags?: string[];
  contentIdeaId?: string | null;
  sourceType?: PostSourceType;
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}


export const DAY_LABELS: Record<DayIndex, { short: string; long: string }> = {
  0: { short: "Mon", long: "Monday" },
  1: { short: "Tue", long: "Tuesday" },
  2: { short: "Wed", long: "Wednesday" },
  3: { short: "Thu", long: "Thursday" },
  4: { short: "Fri", long: "Friday" },
  5: { short: "Sat", long: "Saturday" },
  6: { short: "Sun", long: "Sunday" },
};

export const DAY_INDICES: DayIndex[] = [0, 1, 2, 3, 4, 5, 6];

export const PLATFORM_OPTIONS: SocialPlatform[] = [
  "INSTAGRAM",
  "YOUTUBE",
  "FACEBOOK",
  "TWITTER",
  "LINKEDIN",
  "THREAD",
  "BLOG",
  "EMAIL",
];

export const FORMAT_OPTIONS: PostFormat[] = [
  "Reel",
  "Carousel",
  "Talking-head",
  "BTS",
  "Trend hijack",
  "Story/Poll",
  "POV",
  "Behind-the-scenes",
];

interface PlatformBadgeConfig {
  label: string;
  icon: LucideIcon;
  classes: string;
}

export const PLATFORM_BADGE: Record<SocialPlatform, PlatformBadgeConfig> = {
  INSTAGRAM: {
    label: "Instagram",
    icon: Instagram,
    classes: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  },
  YOUTUBE: {
    label: "YouTube",
    icon: Youtube,
    classes: "bg-red-500/15 text-red-300 border-red-500/30",
  },
  FACEBOOK: {
    label: "Facebook",
    icon: Facebook,
    classes: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  },
  TWITTER: {
    label: "Twitter",
    icon: Twitter,
    classes: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  },
  LINKEDIN: {
    label: "LinkedIn",
    icon: Linkedin,
    classes: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  },
  THREAD: {
    label: "Thread",
    icon: MessageCircle,
    classes: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  },
  BLOG: {
    label: "Blog",
    icon: FileText,
    classes: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  EMAIL: {
    label: "Email",
    icon: Mail,
    classes: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
};

export const REMINDER_ICON: Record<ReminderType, LucideIcon> = {
  HARVEST: Leaf,
  ENGAGEMENT_CHECK: BarChart3,
  CONTENT_PREP: Pencil,
  GENERAL: Bell,
};

export function getWeekMonday(d: Date): Date {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  const day = date.getDay(); // 0 Sun..6 Sat
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  return date;
}

export function addDays(d: Date, n: number): Date {
  const next = new Date(d);
  next.setDate(next.getDate() + n);
  return next;
}

export function formatYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatWeekLabel(monday: Date): string {
  const sunday = addDays(monday, 6);
  const startMonth = MONTHS[monday.getMonth()];
  const endMonth = MONTHS[sunday.getMonth()];
  const year = sunday.getFullYear();
  return `${String(monday.getDate()).padStart(2, "0")} ${startMonth} – ${String(
    sunday.getDate()
  ).padStart(2, "0")} ${endMonth} ${year}`;
}

export function formatDateTimeReadable(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const day = String(d.getDate()).padStart(2, "0");
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${day} ${month} ${year} at ${hh}:${mm}`;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
