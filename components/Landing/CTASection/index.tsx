
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star, Quote } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";

const testimonials = [
  {
    quote: "CREATORA has completely transformed how I create content. It's like having a writing partner who knows my voice perfectly.",
    author: "Sarah Chen",
    role: "Tech Blogger",
    avatar: "SC",
  },
  {
    quote: "I've 5x'd my content output without sacrificing quality. My audience can't tell the difference.",
    author: "Marcus Johnson",
    role: "LinkedIn Creator",
    avatar: "MJ",
  },
  {
    quote: "The weekly planner feature alone is worth the price. I'm more consistent than ever.",
    author: "Emily Rodriguez",
    role: "Freelance Writer",
    avatar: "ER",
  },
];

const CTASection = () => {
  return (
    <section className="pb-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <GlassCard
              key={testimonial.author}
              className="p-6 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
            >
              <Quote size={24} className="text-primary/30 mb-4" />
              <p className="text-foreground mb-6">{testimonial.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-sm font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* CTA Card */}
        <GlassCard className="p-12 text-center relative overflow-hidden">
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-primary/10 to-accent/5" />
          
          <div className="relative">
            {/* Rating */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-warning text-warning" />
              ))}
              <span className="ml-2 text-muted-foreground text-sm">
                4.9/5 from 500+ reviews
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Ready to Sound Like{" "}
              <span className="gradient-text">Yourself</span>?
            </h2>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Join thousands of content creators who've transformed their workflow with CREATORA. Start your free trial today—no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="xl" asChild className="group shimmer">
                <Link href="/signup">
                  <Sparkles size={20} />
                  Start Creating for Free
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default CTASection;
