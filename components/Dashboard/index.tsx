
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PenTool,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  BarChart3,
  Calendar,
  ArrowRight,
  Sparkles,
  Twitter,
  Linkedin,
  FileText,
  Clock,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    label: "Posts Generated",
    value: "47",
    change: "+12%",
    trend: "up",
    icon: PenTool,
    color: "primary",
  },
  {
    label: "Remaining Credits",
    value: "53",
    subtext: "of 100",
    icon: Zap,
    color: "warning",
    progress: 53,
  },
  {
    label: "Active Campaigns",
    value: "3",
    icon: Target,
    color: "secondary",
  },
  {
    label: "Engagement Score",
    value: "87%",
    change: "+5%",
    trend: "up",
    icon: BarChart3,
    color: "success",
  },
];

const recentPosts = [
  {
    platform: "twitter",
    preview: "Just launched our new feature! Here's how it can transform your workflow...",
    time: "2 hours ago",
    status: "published",
  },
  {
    platform: "linkedin",
    preview: "The future of content creation is here. AI-powered, but authentically you...",
    time: "Yesterday",
    status: "draft",
  },
  {
    platform: "blog",
    preview: "10 Ways to Boost Your Productivity Without Burning Out",
    time: "2 days ago",
    status: "scheduled",
  },
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  blog: FileText,
};

const statusColors = {
  published: "success",
  draft: "warning",
  scheduled: "accent",
};

const Dashboard = () => {
  return (
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold mb-1">Welcome back!</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your content.
            </p>
          </div>
          <Button variant="gradient" asChild className="group">
            <Link href="/generate">
              <Sparkles size={18} />
              Generate New Post
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <GlassCard
              key={stat.label}
              className="p-5 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
                  <stat.icon size={20} className={`text-${stat.color}`} />
                </div>
                {stat.change && (
                  <Badge variant={stat.trend === "up" ? "success" : "destructive"} className="text-xs">
                    {stat.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {stat.change}
                  </Badge>
                )}
              </div>
              <div className="font-mono text-3xl font-bold mb-1">
                {stat.value}
                {stat.subtext && (
                  <span className="text-sm text-muted-foreground font-normal ml-1">
                    {stat.subtext}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              {stat.progress !== undefined && (
                <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warning rounded-full transition-all"
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Brand Profile */}
          <GlassCard className="p-6 animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-lg">Brand Profile</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/profile">Edit</Link>
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Tone</p>
                <Badge variant="glass">Professional</Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Niche</p>
                <p className="text-sm">Tech & Startups</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Target Audience</p>
                <p className="text-sm text-muted-foreground">Entrepreneurs & founders building their first startup</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4" asChild>
              <Link href="/onboarding/brand">Update Brand Settings</Link>
            </Button>
          </GlassCard>

          {/* Weekly Planner Preview */}
          <GlassCard className="p-6 animate-fade-in" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-lg">This Week</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/planner">
                  View Full
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {weekDays.map((day, index) => (
                <div
                  key={day}
                  className={`flex-shrink-0 w-16 p-3 rounded-lg text-center border transition-colors ${
                    index === 0
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background-secondary"
                  }`}
                >
                  <p className="text-xs text-muted-foreground mb-1">{day}</p>
                  <p className="text-sm font-medium">{17 + index}</p>
                  {index < 3 && (
                    <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-2" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={14} className="text-primary" />
                <span>3 posts planned this week</span>
              </div>
            </div>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard className="p-6 animate-fade-in" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            <h2 className="font-heading font-semibold text-lg mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button variant="gradient" className="w-full justify-start" asChild>
                <Link href="/generate">
                  <PenTool size={18} />
                  Generate New Post
                </Link>
              </Button>
              <Button variant="outline-glow" className="w-full justify-start" asChild>
                <Link href="/ideas">
                  <Lightbulb size={18} />
                  Get Content Ideas
                </Link>
              </Button>
              <Button variant="glass" className="w-full justify-start" asChild>
                <Link href="/planner">
                  <Calendar size={18} />
                  Plan This Week
                </Link>
              </Button>
            </div>
          </GlassCard>
        </div>

        {/* Recent Posts */}
        <GlassCard className="p-6 mt-6 animate-fade-in" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-lg">Recent Generated Posts</h2>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight size={14} />
            </Button>
          </div>
          <div className="space-y-4">
            {recentPosts.map((post, index) => {
              const PlatformIcon = platformIcons[post.platform as keyof typeof platformIcons];
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg bg-background-secondary border border-border hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-muted">
                    <PlatformIcon size={18} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{post.preview}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {post.time}
                    </div>
                  </div>
                  <Badge variant={statusColors[post.status as keyof typeof statusColors] as "success" | "warning" | "accent"}>
                    {post.status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>
  );
};

export default Dashboard;
