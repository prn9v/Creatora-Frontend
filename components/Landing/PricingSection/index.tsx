"use client";
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    description: "Perfect for getting started",
    monthlyPrice: 19,
    yearlyPrice: 15,
    features: [
      "50 posts per month",
      "Basic voice learning",
      "3 platform templates",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
    color: "border-border",
  },
  {
    name: "Pro",
    description: "For serious content creators",
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      "Unlimited posts",
      "Advanced voice learning",
      "All platform templates",
      "Content calendar",
      "Priority support",
      "Analytics dashboard",
    ],
    cta: "Start Free Trial",
    popular: true,
    color: "border-primary",
  },
  {
    name: "Team",
    description: "For agencies & teams",
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      "Everything in Pro",
      "Multiple brand profiles",
      "Dedicated account manager",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
    color: "border-accent",
  },
];

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section id="pricing" className="pt-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-secondary/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Choose the plan that fits your content needs. All plans include a
            14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={cn(
                "text-sm",
                !isYearly && "text-foreground font-medium"
              )}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={cn(
                "relative w-14 h-8 rounded-full transition-colors duration-200",
                isYearly ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "absolute top-1 w-6 h-6 bg-foreground rounded-full transition-transform duration-200",
                  isYearly ? "translate-x-1" : "-translate-x-7"
                )}
              />
            </button>
            <span
              className={cn(
                "text-sm flex items-center gap-2",
                isYearly && "text-foreground font-medium"
              )}
            >
              Yearly
              <Badge variant="success" className="text-xs">
                Save 20%
              </Badge>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={cn(
                "relative animate-fade-in",
                plan.popular && "lg:-mt-4 lg:mb-4"
              )}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge variant="gradient" className="px-4 py-1">
                    <Sparkles size={12} className="mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <GlassCard
              key={plan.name}
                hover
                className="p-6 animate-fade-in"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="mb-6">
                  <h3 className="font-heading font-bold text-2xl mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="font-heading font-bold text-5xl">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                  {isYearly && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Billed annually
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check size={18} className="text-success" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "gradient" : "outline-glow"}
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <Link href="/signup">{plan.cta}</Link>
                </Button>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
