'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import Logo from "@/components/Logo";
import { ArrowRight, Plus, X, Twitter, Linkedin, FileText, Loader2, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Post {
  id: string;
  content: string;
  platform: "twitter" | "linkedin" | "blog";
}

const platforms = [
  { value: "twitter", label: "Twitter", icon: Twitter },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
  { value: "blog", label: "Blog", icon: FileText },
];

const PostsUpload = () => {
  const router = useRouter();
  const [isTraining, setIsTraining] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    { id: "1", content: "", platform: "twitter" },
  ]);

  const addPost = () => {
    setPosts([
      ...posts,
      { id: Date.now().toString(), content: "", platform: "twitter" },
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

  const validPosts = posts.filter((p) => p.content.trim().length > 20);
  const canContinue = validPosts.length >= 3;

  const handleSubmit = async () => {
    if (!canContinue) return;
    setIsTraining(true);
    // Simulate training
    setTimeout(() => {
      setIsTraining(false);
      router.push("/dashboard");
    }, 3000);
  };

  if (isTraining) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="relative text-center">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-accent rounded-full blur-xl animate-pulse-glow" />
            <div className="relative w-full h-full bg-background-secondary rounded-full flex items-center justify-center">
              <Brain size={48} className="text-primary animate-pulse" />
            </div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin-slow" />
          </div>
          <h2 className="font-heading text-2xl font-bold mb-2">Training Your AI</h2>
          <p className="text-muted-foreground">Analyzing your writing style...</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-primary">
            <Loader2 className="animate-spin" size={18} />
            <span className="text-sm">This usually takes 10-30 seconds</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-2xl">
        <div className="text-center mb-6 animate-fade-in">
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

        <GlassCard className="p-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold mb-2">Upload Your Past Content</h1>
            <p className="text-muted-foreground text-sm">
              Share at least 3 posts so CREATORA can learn your unique voice.
            </p>
          </div>

          {/* Info Card */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary font-medium">💡 Tip:</span> The more content you share, the better CREATORA understands your style. Include posts from different topics for best results.
            </p>
          </div>

          {/* Posts List */}
          <div className="space-y-4 mb-6">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="bg-background-secondary rounded-lg p-4 border border-border animate-fade-in"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    Post {index + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    {/* Platform Selector */}
                    <div className="flex gap-1">
                      {platforms.map((platform) => (
                        <button
                          key={platform.value}
                          type="button"
                          onClick={() =>
                            updatePost(post.id, "platform", platform.value)
                          }
                          className={cn(
                            "p-2 rounded-md transition-colors",
                            post.platform === platform.value
                              ? "bg-primary/20 text-primary"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                          title={platform.label}
                        >
                          <platform.icon size={16} />
                        </button>
                      ))}
                    </div>
                    {posts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePost(post.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
                <textarea
                  placeholder="Paste your content here..."
                  className="w-full bg-transparent border-0 resize-none focus:outline-none text-sm min-h-[80px] placeholder:text-muted-foreground"
                  value={post.content}
                  onChange={(e) => updatePost(post.id, "content", e.target.value)}
                />
                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                  <span>{post.content.length} characters</span>
                  {post.content.length >= 20 && (
                    <span className="text-success">✓ Valid</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Post Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full mb-6"
            onClick={addPost}
          >
            <Plus size={18} />
            Add Another Post
          </Button>

          {/* Status */}
          <div className="text-center mb-6">
            <p className={cn(
              "text-sm",
              canContinue ? "text-success" : "text-muted-foreground"
            )}>
              {validPosts.length}/3 valid posts added
              {canContinue && " - Ready to train!"}
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              className="flex-1"
              onClick={() => router.push("/dashboard")}
            >
              Skip for now
            </Button>
            <Button
              type="button"
              variant="gradient"
              className="flex-1 group"
              disabled={!canContinue}
              onClick={handleSubmit}
            >
              Train My AI
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default PostsUpload;
