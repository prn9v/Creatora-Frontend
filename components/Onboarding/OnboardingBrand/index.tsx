'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/GlassCard";
import Logo from "@/components/Logo";
import { ArrowRight, Palette, Users, Target } from "lucide-react";
import { useRouter } from "next/navigation";

const toneOptions = [
  { value: "professional", label: "Professional", description: "Clear, authoritative, and business-focused" },
  { value: "casual", label: "Casual", description: "Friendly, conversational, and relatable" },
  { value: "inspiring", label: "Inspiring", description: "Motivational, uplifting, and energizing" },
  { value: "educational", label: "Educational", description: "Informative, clear, and structured" },
];

const BrandSetup = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    tone: "",
    niche: "",
    audience: "",
  });

  const isValid = formData.tone && formData.niche && formData.audience;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding/posts");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-6 animate-fade-in">
          <Logo size="md" />
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in">
          {[1, 2].map((step) => (
            <div
              key={step}
              className={`h-2 w-12 rounded-full transition-colors ${
                step === 1 ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <GlassCard className="p-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold mb-2">Tell us about your brand</h1>
            <p className="text-muted-foreground text-sm">
              Help CREATORA understand your unique voice and style.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tone Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Palette size={16} className="text-primary" />
                Brand Tone
              </label>
              <div className="grid grid-cols-2 gap-3">
                {toneOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, tone: option.value })}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      formData.tone === option.value
                        ? "border-primary bg-primary/10 shadow-glow-sm"
                        : "border-border bg-background-secondary hover:border-primary/50"
                    }`}
                  >
                    <span className="font-medium block mb-1">{option.label}</span>
                    <span className="text-xs text-muted-foreground">{option.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Niche */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Target size={16} className="text-secondary" />
                Your Niche
              </label>
              <Input
                placeholder="e.g., Tech startups, Personal finance, Health & wellness"
                value={formData.niche}
                onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
              />
            </div>

            {/* Target Audience */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Users size={16} className="text-accent" />
                Target Audience
              </label>
              <textarea
                placeholder="Describe who you're creating content for (e.g., Aspiring entrepreneurs aged 25-40 looking to start their first business)"
                className="flex min-h-[100px] w-full rounded-lg border border-border bg-background-secondary px-4 py-3 text-sm text-foreground ring-offset-background transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                value={formData.audience}
                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                className="flex-1"
                onClick={() => router.push("/onboarding/posts")}
              >
                Skip for now
              </Button>
              <Button
                type="submit"
                variant="gradient"
                className="flex-1 group"
                disabled={!isValid}
                isLoading={isLoading}
              >
                Continue
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default BrandSetup;
