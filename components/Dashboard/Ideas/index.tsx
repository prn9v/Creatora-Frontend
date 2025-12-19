'use client'
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Loader2,
  Bookmark,
  RefreshCw,
  ArrowRight,
  Twitter,
  Linkedin,
  FileText,
  TrendingUp,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sampleIdeas = [
  {
    id: "1",
    title: "The Hidden Cost of Context Switching",
    description: "Explore how constantly switching between tasks can reduce productivity by up to 40% and share practical strategies to minimize it.",
    platforms: ["twitter", "linkedin"],
    engagement: "high",
    saved: false,
  },
  {
    id: "2",
    title: "5 Morning Habits of Successful Founders",
    description: "Share the morning routines that helped successful entrepreneurs build their companies, backed by research and personal insights.",
    platforms: ["linkedin", "blog"],
    engagement: "very-high",
    saved: true,
  },
  {
    id: "3",
    title: "Why Your First 100 Users Matter Most",
    description: "Discuss the importance of early adopters and how to turn them into brand advocates.",
    platforms: ["twitter"],
    engagement: "medium",
    saved: false,
  },
  {
    id: "4",
    title: "The Art of Saying No",
    description: "How declining opportunities strategically can accelerate your path to success.",
    platforms: ["linkedin", "blog"],
    engagement: "high",
    saved: false,
  },
  {
    id: "5",
    title: "Building in Public: Lessons Learned",
    description: "Share your journey of building in public, including wins, failures, and key takeaways.",
    platforms: ["twitter", "linkedin"],
    engagement: "very-high",
    saved: false,
  },
  {
    id: "6",
    title: "The Compound Effect of Daily Learning",
    description: "How dedicating just 30 minutes a day to learning can transform your career over time.",
    platforms: ["linkedin"],
    engagement: "medium",
    saved: false,
  },
];

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  blog: FileText,
};

const engagementLabels = {
  medium: { label: "Medium", color: "warning" },
  high: { label: "High", color: "accent" },
  "very-high": { label: "Very High", color: "success" },
};

type FilterType = "all" | "twitter" | "linkedin" | "blog";

const Ideas = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideas, setIdeas] = useState(sampleIdeas);
  const [filter, setFilter] = useState<FilterType>("all");

  const generateIdeas = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const toggleSave = (id: string) => {
    setIdeas(ideas.map((idea) =>
      idea.id === id ? { ...idea, saved: !idea.saved } : idea
    ));
  };

  const filteredIdeas = filter === "all"
    ? ideas
    : ideas.filter((idea) => idea.platforms.includes(filter));

  return (
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold mb-1">Content Ideas</h1>
            <p className="text-muted-foreground">
              AI-generated ideas tailored to your brand and audience.
            </p>
          </div>
          <Button
            variant="gradient"
            size="lg"
            onClick={generateIdeas}
            disabled={isGenerating}
            className="group"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate New Ideas
              </>
            )}
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(["all", "twitter", "linkedin", "blog"] as FilterType[]).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className={cn(
                "capitalize",
                filter === f && "shadow-glow-sm"
              )}
            >
              {f === "all" ? "All Ideas" : f}
            </Button>
          ))}
        </div>

        {/* Ideas Grid */}
        {isGenerating ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <GlassCard key={i} className="p-6 animate-pulse">
                <div className="h-4 w-3/4 bg-muted rounded mb-3" />
                <div className="space-y-2 mb-4">
                  <div className="h-3 w-full bg-muted rounded" />
                  <div className="h-3 w-5/6 bg-muted rounded" />
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-muted rounded-full" />
                  <div className="h-6 w-16 bg-muted rounded-full" />
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIdeas.map((idea, index) => (
              <GlassCard
                key={idea.id}
                hover
                className="p-6 animate-fade-in flex flex-col"
                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "forwards" }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-heading font-semibold text-lg leading-tight">
                    {idea.title}
                  </h3>
                  <button
                    onClick={() => toggleSave(idea.id)}
                    className={cn(
                      "flex-shrink-0 p-1.5 rounded-lg transition-colors",
                      idea.saved
                        ? "text-warning bg-warning/10"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Bookmark size={18} fill={idea.saved ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {idea.description}
                </p>

                {/* Platforms */}
                <div className="flex items-center gap-2 mb-4">
                  {idea.platforms.map((platform) => {
                    const Icon = platformIcons[platform as keyof typeof platformIcons];
                    return (
                      <div
                        key={platform}
                        className="p-1.5 rounded-lg bg-muted"
                        title={platform}
                      >
                        <Icon size={14} className="text-muted-foreground" />
                      </div>
                    );
                  })}
                  <div className="flex-1" />
                  <Badge variant={engagementLabels[idea.engagement as keyof typeof engagementLabels].color as "warning" | "accent" | "success"}>
                    <TrendingUp size={12} className="mr-1" />
                    {engagementLabels[idea.engagement as keyof typeof engagementLabels].label}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="gradient" size="sm" className="flex-1 group">
                    Use This
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
                  </Button>
                  <Button variant="outline" size="sm" className="px-3">
                    <RefreshCw size={14} />
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredIdeas.length === 0 && !isGenerating && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={32} className="text-muted-foreground" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-2">No ideas yet</h3>
            <p className="text-muted-foreground mb-6">
              Generate your first batch of content ideas.
            </p>
            <Button variant="gradient" onClick={generateIdeas}>
              <Sparkles size={18} />
              Generate Ideas
            </Button>
          </div>
        )}
      </div>
  );
};

export default Ideas;
