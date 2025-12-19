'use client'
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Loader2,
  Copy,
  RefreshCw,
  Save,
  Calendar,
  Twitter,
  Linkedin,
  FileText,
  Check,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const platforms = [
  { id: "twitter", name: "Twitter", icon: Twitter, maxLength: 280 },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, maxLength: 3000 },
  { id: "blog", name: "Blog", icon: FileText, maxLength: 10000 },
];

const lengths = [
  { id: "short", name: "Short", description: "Quick & punchy" },
  { id: "medium", name: "Medium", description: "Balanced depth" },
  { id: "long", name: "Long", description: "Comprehensive" },
];

const sampleOutput = `🚀 The Hidden Cost of Context Switching

Ever feel like you're busy all day but accomplish nothing meaningful?

Here's the uncomfortable truth:
Every time you switch tasks, your brain needs 23 minutes to refocus.

Do that 10 times a day?
You've lost nearly 4 HOURS to mental lag.

The fix isn't complicated:
→ Batch similar tasks together
→ Block 2-hour "deep work" windows
→ Turn off notifications during focus time
→ Say no to "quick" meetings

Your most valuable asset isn't time—it's attention.

Protect it fiercely.

What's your biggest distraction? 👇`;

const Generate = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("twitter");
  const [selectedLength, setSelectedLength] = useState("medium");
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const platform = platforms.find((p) => p.id === selectedPlatform);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    // Simulate generation with typing effect
    setTimeout(() => {
      setIsGenerating(false);
      setOutput(sampleOutput);
    }, 2500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold mb-1">Generate Post</h1>
          <p className="text-muted-foreground">
            Create on-brand content in seconds.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel - Configuration */}
          <GlassCard className="p-6">
            <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
              <Sliders size={20} className="text-primary" />
              Configuration
            </h2>

            {/* Platform Selection */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Platform</label>
              <div className="grid grid-cols-3 gap-3">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlatform(p.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-lg border transition-all",
                      selectedPlatform === p.id
                        ? "border-primary bg-primary/10 shadow-glow-sm"
                        : "border-border bg-background-secondary hover:border-primary/50"
                    )}
                  >
                    <p.icon size={24} className={selectedPlatform === p.id ? "text-primary" : "text-muted-foreground"} />
                    <span className="text-sm font-medium">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Input */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Topic or Idea</label>
              <textarea
                placeholder="e.g., The hidden cost of context switching for productivity"
                className="w-full bg-background-secondary border border-border rounded-lg p-4 text-sm resize-none h-24 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            {/* Length Selection */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Length</label>
              <div className="flex gap-2">
                {lengths.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLength(l.id)}
                    className={cn(
                      "flex-1 p-3 rounded-lg border text-left transition-all",
                      selectedLength === l.id
                        ? "border-primary bg-primary/10"
                        : "border-border bg-background-secondary hover:border-primary/50"
                    )}
                  >
                    <span className="text-sm font-medium block">{l.name}</span>
                    <span className="text-xs text-muted-foreground">{l.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              variant="gradient"
              size="lg"
              className="w-full group"
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Post
                </>
              )}
            </Button>
          </GlassCard>

          {/* Right Panel - Output */}
          <GlassCard className="p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-lg">Output</h2>
              {output && (
                <Badge variant="success">
                  <Check size={12} className="mr-1" />
                  Ready
                </Badge>
              )}
            </div>

            {/* Output Area */}
            <div className="flex-1 relative">
              {isGenerating ? (
                <div className="bg-background-secondary border border-border rounded-lg p-4 h-full min-h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Loader2 className="animate-spin text-primary" size={24} />
                    </div>
                    <p className="text-sm text-muted-foreground">Crafting your post...</p>
                  </div>
                </div>
              ) : output ? (
                <div className="bg-background-secondary border border-border rounded-lg h-full min-h-[300px] flex flex-col">
                  <textarea
                    className="flex-1 bg-transparent p-4 text-sm resize-none focus:outline-none"
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                  />
                  <div className="p-3 border-t border-border flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {output.length} / {platform?.maxLength} characters
                      {output.length > (platform?.maxLength || 0) && (
                        <span className="text-destructive ml-2">
                          (exceeds limit)
                        </span>
                      )}
                    </div>
                    <Badge variant="glass" className="text-xs">
                      {selectedPlatform}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="bg-background-secondary border border-border border-dashed rounded-lg p-4 h-full min-h-[300px] flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles size={32} className="text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">
                      Your generated post will appear here
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {output && (
              <div className="flex gap-3 mt-4">
                <Button
                  variant="outline-glow"
                  className="flex-1"
                  onClick={handleCopy}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                >
                  <RefreshCw size={18} />
                  Regenerate
                </Button>
                <Button variant="glass" className="flex-1">
                  <Save size={18} />
                  Save Draft
                </Button>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
  );
};

export default Generate;
