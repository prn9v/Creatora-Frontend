"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import Logo from "@/components/Logo";
import {
  ArrowRight,
  Plus,
  X,
  Twitter,
  Linkedin,
  FileText,
  Loader2,
  Brain,
  Instagram,
  Mail,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Link,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getBackendUrl } from "@/lib/env";

// --- Types & Constants ---

type PlatformType =
  | "twitter"
  | "linkedin"
  | "blog"
  | "instagram"
  | "email"
  | "thread";

interface Post {
  id: string;
  url: string;
  platform: PlatformType;
  isAnalyzing: boolean;
  isAnalyzed: boolean;
  error?: string;
}

const PLATFORMS: {
  value: PlatformType;
  label: string;
  icon: any;
  hint: string;
}[] = [
  {
    value: "twitter",
    label: "Twitter / X",
    icon: Twitter,
    hint: "Paste URL of a high-performing tweet.",
  },
  {
    value: "thread",
    label: "X Thread",
    icon: MessageCircle,
    hint: "Paste URL of the thread.",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    hint: "Paste URL of a LinkedIn post.",
  },
  {
    value: "instagram",
    label: "Instagram Caption",
    icon: Instagram,
    hint: "Paste URL of an Instagram post.",
  },
  {
    value: "blog",
    label: "Blog / Article",
    icon: FileText,
    hint: "Paste URL of your blog post.",
  },
  {
    value: "email",
    label: "Newsletter",
    icon: Mail,
    hint: "Paste URL of your newsletter.",
  },
];

// --- Sub-Component: Post Editor ---

const PostEditor = ({
  post,
  index,
  onUpdate,
  onRemove,
  onAnalyze,
  canRemove,
}: {
  post: Post;
  index: number;
  onUpdate: (id: string, field: keyof Post, value: string) => void;
  onRemove: (id: string) => void;
  onAnalyze: (id: string) => void;
  canRemove: boolean;
}) => {
  const currentPlatform =
    PLATFORMS.find((p) => p.value === post.platform) || PLATFORMS[0];
  const isValidUrl = post.url.trim().length > 0 && post.url.includes("http");

  return (
    <div className="group bg-background-secondary/50 hover:bg-background-secondary rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 p-5 animate-fade-in">
      {/* Header: Platform Select & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap mr-2">
            Sample {index + 1} Source:
          </span>
          {PLATFORMS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => onUpdate(post.id, "platform", p.value)}
              disabled={post.isAnalyzing || post.isAnalyzed}
              className={cn(
                "p-2 rounded-lg transition-all duration-200 border border-transparent",
                post.platform === p.value
                  ? "bg-primary/10 text-primary border-primary/20 shadow-sm"
                  : "text-muted-foreground hover:bg-secondary/10 hover:text-foreground",
                (post.isAnalyzing || post.isAnalyzed) &&
                  "opacity-50 cursor-not-allowed"
              )}
              title={p.label}
            >
              <p.icon size={18} />
            </button>
          ))}
        </div>

        {canRemove && !post.isAnalyzed && (
          <button
            onClick={() => onRemove(post.id)}
            disabled={post.isAnalyzing}
            className="self-end sm:self-auto text-muted-foreground hover:text-destructive transition-colors p-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* URL Input Area */}
      <div className="relative mb-3">
        <div className="relative">
          <Link
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <input
            type="url"
            value={post.url}
            onChange={(e) => onUpdate(post.id, "url", e.target.value)}
            disabled={post.isAnalyzing || post.isAnalyzed}
            placeholder={`Paste ${currentPlatform.label} URL here...`}
            className="w-full bg-background/50 border border-border/50 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {currentPlatform.hint}
        </p>
      </div>

      {/* Error Message */}
      {post.error && (
        <div className="mb-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-xs text-destructive flex items-center gap-2">
            <AlertCircle size={14} />
            {post.error}
          </p>
        </div>
      )}

      {/* Analyze Button & Status */}
      <div className="flex items-center justify-between">
        {!post.isAnalyzed ? (
          <Button
            type="button"
            size="sm"
            onClick={() => onAnalyze(post.id)}
            disabled={!isValidUrl || post.isAnalyzing}
            className={cn(
              "transition-all cursor-pointer",
              !isValidUrl && "opacity-50 cursor-not-allowed"
            )}
          >
            {post.isAnalyzing ? (
              <>
                <Loader2 className="mr-2 animate-spin" size={14} />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Post
                <ArrowRight className="ml-2" size={14} />
              </>
            )}
          </Button>
        ) : (
          <div className="flex items-center gap-2 text-success bg-success/10 px-3 py-1.5 rounded-full">
            <CheckCircle2 size={14} />
            <span className="text-xs font-semibold">Analyzed Successfully</span>
          </div>
        )}

        {post.isAnalyzing && (
          <span className="text-xs text-muted-foreground italic">
            This may take a minute...
          </span>
        )}
      </div>
    </div>
  );
};

// --- Main Component ---

const PostsUpload = () => {
  const router = useRouter();
  const [isTrainingModel, setIsTrainingModel] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      url: "",
      platform: "twitter",
      isAnalyzing: false,
      isAnalyzed: false,
    },
    {
      id: "2",
      url: "",
      platform: "linkedin",
      isAnalyzing: false,
      isAnalyzed: false,
    },
    {
      id: "3",
      url: "",
      platform: "instagram",
      isAnalyzing: false,
      isAnalyzed: false,
    },
  ]);

  const addPost = () => {
    setPosts([
      ...posts,
      {
        id: Date.now().toString(),
        url: "",
        platform: "twitter",
        isAnalyzing: false,
        isAnalyzed: false,
      },
    ]);
  };

  const removePost = (id: string) => {
    if (posts.length > 1) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const updatePost = (id: string, field: keyof Post, value: string) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const analyzePost = async (id: string) => {
    const post = posts.find((p) => p.id === id);
    if (!post || !post.url.trim()) return;

    // Set analyzing state
    setPosts(
      posts.map((p) =>
        p.id === id
          ? { ...p, isAnalyzing: true, error: undefined }
          : p
      )
    );

    try {
      await axios.post(`${getBackendUrl()}/onboarding/add-post`, {
        url: post.url,
      });

      // Set analyzed state
      setPosts(
        posts.map((p) =>
          p.id === id
            ? { ...p, isAnalyzing: false, isAnalyzed: true }
            : p
        )
      );
    } catch (error: any) {
      // Handle error
      setPosts(
        posts.map((p) =>
          p.id === id
            ? {
                ...p,
                isAnalyzing: false,
                error:
                  error.response?.data?.message ||
                  "Failed to analyze post. Please try again.",
              }
            : p
        )
      );
    }
  };

  const analyzedPosts = posts.filter((p) => p.isAnalyzed);
  const canContinue = analyzedPosts.length >= 3;
  const isAnyAnalyzing = posts.some((p) => p.isAnalyzing);

  const handleTrainModel = async () => {
    if (!canContinue || isAnyAnalyzing) return;

    setIsTrainingModel(true);

    try {
      await axios.post(`${getBackendUrl()}/onboarding/analyze-profile`);

      // Navigate to dashboard after successful training
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error: any) {
      console.error("Failed to train model:", error);
      setIsTrainingModel(false);
      alert(
        error.response?.data?.message ||
          "Failed to train AI model. Please try again."
      );
    }
  };

  if (isTrainingModel) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        <div className="relative text-center z-10 px-4">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-accent rounded-full blur-2xl animate-pulse-glow" />
            <div className="relative w-full h-full bg-background-secondary rounded-full flex items-center justify-center border border-primary/20">
              <Brain size={48} className="text-primary animate-pulse" />
            </div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin-slow" />
          </div>
          <h2 className="font-heading text-3xl font-bold mb-3 tracking-tight">
            Training Your AI Model
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-4">
            We are analyzing your writing patterns, sentence structures, and
            tone from {analyzedPosts.length} distinct samples.
          </p>
          <p className="text-sm text-amber-500 font-medium">
            This may take a minute...
          </p>
          <div className="flex items-center justify-center gap-3 mt-8 bg-secondary/10 py-2 px-4 rounded-full w-fit mx-auto border border-secondary/20">
            <Loader2 className="animate-spin text-primary" size={18} />
            <span className="text-sm font-medium text-foreground">
              Finalizing semantic analysis...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-x-hidden py-12 px-4 bg-background">
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-mesh opacity-40 pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="relative w-full max-w-3xl z-10">
        <div className="text-center mb-8 animate-fade-in">
          <Logo size="md" />
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in">
          {[1, 2].map((step) => (
            <div
              key={step}
              className={`h-2 w-12 rounded-full transition-colors ${
                step <= 2 ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <GlassCard className="p-6 sm:p-10 animate-fade-in border-primary/10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="font-heading text-3xl font-bold mb-3">
              Upload Your Best Content
            </h1>
            <p className="text-muted-foreground text-base max-w-lg mx-auto">
              To sound exactly like you, CREATORA needs to analyze your past
              work. Add URLs of at least 3 posts from different platforms.
            </p>
          </div>

          {/* Posts List */}
          <div className="space-y-6 mb-8">
            {posts.map((post, index) => (
              <PostEditor
                key={post.id}
                index={index}
                post={post}
                onUpdate={updatePost}
                onRemove={removePost}
                onAnalyze={analyzePost}
                canRemove={posts.length > 1}
              />
            ))}
          </div>

          {/* Add Post Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full py-6 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 mb-8 group transition-all"
            onClick={addPost}
            disabled={isAnyAnalyzing}
          >
            <div className="flex items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer">
              <Plus
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="font-medium">Add Another Sample Post</span>
            </div>
          </Button>

          {/* Footer Actions */}
          <div className="flex flex-col-reverse sm:flex-row gap-4 items-center justify-between border-t border-border/50 pt-8">
            <Button
              type="button"
              variant="ghost"
              className="text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={() => router.push("/dashboard")}
              disabled={isAnyAnalyzing}
            >
              Skip setup (Not recommended)
            </Button>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              {!canContinue && (
                <span className="text-xs text-muted-foreground">
                  {analyzedPosts.length === 0
                    ? "Analyze at least 3 posts to continue"
                    : `Need ${3 - analyzedPosts.length} more analyzed post${
                        3 - analyzedPosts.length > 1 ? "s" : ""
                      }`}
                </span>
              )}
              <Button
                type="button"
                variant="gradient"
                className={cn(
                  "w-full sm:w-auto min-w-[160px] shadow-lg shadow-primary/20 cursor-pointer",
                  (!canContinue || isAnyAnalyzing) &&
                    "opacity-50 cursor-not-allowed"
                )}
                disabled={!canContinue || isAnyAnalyzing}
                onClick={handleTrainModel}
              >
                Analyze & Train AI
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </GlassCard>

        {/* Info Note */}
        <p className="text-center text-xs text-muted-foreground mt-8 opacity-60">
          Your data is encrypted and used solely for training your personal
          model.
        </p>
      </div>
    </div>
  );
};

export default PostsUpload;