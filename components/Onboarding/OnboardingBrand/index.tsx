"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/GlassCard";
import Logo from "@/components/Logo";
import { ArrowRight, Palette, Users, Target } from "lucide-react";
import { useRouter } from "next/navigation";
import { getBackendUrl } from "@/lib/env";
import { toast } from "sonner";
const toneOptions = [
  {
    value: "professional",
    label: "Professional",
    description: "Clear, authoritative, and business-focused",
  },
  {
    value: "casual",
    label: "Casual",
    description: "Friendly, conversational, and relatable",
  },
  {
    value: "inspiring",
    label: "Inspiring",
    description: "Motivational, uplifting, and energizing",
  },
  {
    value: "educational",
    label: "Educational",
    description: "Informative, clear, and structured",
  },
];

const BrandSetup = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    tone: "",
    niche: "",
    audience: "",
  });

  const isValid = Boolean(formData.tone && formData.niche && formData.audience);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsLoading(true);

    try {
      await axios.post(
        `${getBackendUrl()}/onboarding/brand`,
        {
          tone: formData.tone.toUpperCase(),
          niche: formData.niche,
          audience: formData.audience,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Added the brand Tone");
      router.push("/onboarding/posts");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Brand onboarding failed:",
          error.response?.data ?? error.message
        );
        toast.error("Brand onboarding failed");
      } else if (error instanceof Error) {
        console.error("Brand onboarding failed:", error.message);
        toast.error("Brand onboarding failed");
      } else {
        console.error("Brand onboarding failed: Unknown error");
        toast.error("Brand onboarding failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4">
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-lg">
        <div className="text-center mb-6 animate-fade-in">
          <Logo size="md" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in">
          {[1, 2].map((step) => (
            <div
              key={step}
              className={`h-2 w-12 rounded-full ${
                step === 1 ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <GlassCard className="p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold mb-2">
              Tell us about your brand
            </h1>
            <p className="text-muted-foreground text-sm">
              Help CREATORA understand your unique voice and style.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                    onClick={() =>
                      setFormData({ ...formData, tone: option.value })
                    }
                    className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${
                      formData.tone === option.value
                        ? "border-primary bg-primary/10"
                        : "border-border bg-background-secondary hover:border-primary/50"
                    }`}
                  >
                    <span className="font-medium block mb-1">
                      {option.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Target size={16} className="text-secondary" />
                Your Niche
              </label>
              <Input
                value={formData.niche}
                onChange={(e) =>
                  setFormData({ ...formData, niche: e.target.value })
                }
                placeholder="e.g., Tech startups"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Users size={16} className="text-accent" />
                Target Audience
              </label>
              <textarea
                placeholder="Describe who you're creating content for (e.g., Early-stage founders and product managers)"
                className="min-h-[100px] w-full rounded-lg border px-4 py-3 text-sm resize-none placeholder:text-muted-foreground"
                value={formData.audience}
                onChange={(e) =>
                  setFormData({ ...formData, audience: e.target.value })
                }
              />
            </div>

            <Button
              type="submit"
              variant="gradient"
              disabled={!isValid}
              isLoading={isLoading}
              className="w-full group cursor-pointer"
            >
              Continue
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default BrandSetup;
