import { GlassCard } from "@/components/ui/GlassCard";
import { Brain, Sparkles, Calendar, Target, Zap, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Learn Your Voice",
    description: "Upload your past content and CREATORA learns your unique writing style, tone, and personality.",
    color: "primary",
  },
  {
    icon: Sparkles,
    title: "Generate On-Brand",
    description: "Every piece of content sounds authentically you. No more generic AI outputs.",
    color: "secondary",
  },
  {
    icon: Calendar,
    title: "Weekly Planning",
    description: "Plan your content calendar with AI-suggested topics and optimal posting times.",
    color: "accent",
  },
  {
    icon: Target,
    title: "Platform Optimized",
    description: "Content tailored for each platform—Twitter threads, LinkedIn posts, blog articles.",
    color: "primary",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate weeks of content in minutes. Beat writer's block every single time.",
    color: "warning",
  },
  {
    icon: TrendingUp,
    title: "Engagement Insights",
    description: "Track what resonates with your audience and refine your strategy.",
    color: "success",
  },
];

const colorClasses = {
  primary: "text-primary bg-primary/10",
  secondary: "text-secondary bg-secondary/10",
  accent: "text-accent bg-accent/10",
  warning: "text-warning bg-warning/10",
  success: "text-success bg-success/10",
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 from-transparent via-background-secondary/50 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Create More</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features designed for content creators who want to scale their output without sacrificing authenticity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <GlassCard
              key={feature.title}
              hover
              className="p-6 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                <feature.icon size={24} />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
