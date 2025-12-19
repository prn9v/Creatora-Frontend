import { GlassCard } from "@/components/ui/GlassCard";
import { Upload, Cpu, PenTool, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Content",
    description: "Share your past posts, articles, or any content that represents your voice. The more you share, the better CREATORA learns.",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Learns Your Style",
    description: "Our advanced AI analyzes your writing patterns, tone, vocabulary, and unique expressions to create your personal voice profile.",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    number: "03",
    icon: PenTool,
    title: "Generate & Refine",
    description: "Create content that sounds authentically you. Fine-tune outputs, save favorites, and build your content library.",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            How{" "}
            <span className="gradient-text">CREATORA</span>{" "}
            Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to transform your content creation workflow forever.
          </p>
        </div>

        {/* Steps */}
        <div >
          {/* Connecting Line */}
          <div className="lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s`, animationFillMode: "forwards" }}
              >
                <GlassCard className="px-8 pt-16 text-center relative z-20 aspect-square" >
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${step.iconBg}`}>
                    <step.icon size={32} className={step.iconColor} />
                  </div>
                  
                  <h3 className="font-heading font-semibold text-xl mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>

                  {/* Success indicator for last step */}
                  {index === steps.length - 1 && (
                    <div className="mt-6 flex items-center justify-center gap-2 text-success">
                      <CheckCircle size={18} />
                      <span className="text-sm font-medium">Ready to publish</span>
                    </div>
                  )}
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;