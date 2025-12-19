
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Sparkles, Users, Zap } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div className="absolute inset-0 hero-mesh" />
      
      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-1.5s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <Badge variant="glass" className="px-4 py-2 gap-2">
              <Sparkles size={14} className="text-accent" />
              <span>Now with AI Voice Learning</span>
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Create Content That
            <br />
            <span className="gradient-text">Sounds Like YOU</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            CREATORA learns your unique writing style and generates{" "}
            <span className="text-foreground font-medium">on-brand content</span>{" "}
            in seconds. No more writer's block, no more off-brand posts.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="gradient" size="xl" asChild className="group">
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline-glow" size="xl" className="group">
              <Play size={18} className="group-hover:scale-110 transition-transform" />
              See How It Works
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-muted-foreground animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2">
              <Users size={18} className="text-primary" />
              <span className="text-sm">
                <span className="text-foreground font-mono font-bold">10,000+</span> creators trust us
              </span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-accent" />
              <span className="text-sm">
                <span className="text-foreground font-mono font-bold">1M+</span> posts generated
              </span>
            </div>
          </div>

          {/* Hero Preview */}
          <div className="mt-16 relative animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="relative mx-auto max-w-4xl">
              <div className="glass-card p-1 rounded-2xl overflow-hidden shadow-elevated">
                <div className="bg-background-secondary rounded-xl p-6">
                  {/* Mock Dashboard Preview */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive/80" />
                      <div className="w-3 h-3 rounded-full bg-warning/80" />
                      <div className="w-3 h-3 rounded-full bg-success/80" />
                    </div>
                    <div className="flex-1 h-6 bg-background-tertiary rounded-lg" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <div className="glass-card p-4 h-32">
                        <div className="h-4 w-24 bg-primary/30 rounded mb-3" />
                        <div className="space-y-2">
                          <div className="h-3 w-full bg-muted rounded" />
                          <div className="h-3 w-4/5 bg-muted rounded" />
                          <div className="h-3 w-3/4 bg-muted rounded" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="glass-card p-3 h-14 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/30" />
                        <div className="flex-1">
                          <div className="h-2 w-12 bg-muted rounded mb-1" />
                          <div className="h-3 w-8 bg-accent/50 rounded font-mono" />
                        </div>
                      </div>
                      <div className="glass-card p-3 h-14 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-secondary/30" />
                        <div className="flex-1">
                          <div className="h-2 w-12 bg-muted rounded mb-1" />
                          <div className="h-3 w-8 bg-success/50 rounded font-mono" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
