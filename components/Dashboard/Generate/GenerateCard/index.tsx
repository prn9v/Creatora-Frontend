// InstagramGenerate/components/GenerateCard.tsx
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

type Props = {
  isGenerating: boolean;
  onGenerate: () => void;
};

const GenerateCard = ({ isGenerating, onGenerate }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <GlassCard className="p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="text-primary" size={40} />
        </div>
        <h2 className="font-heading text-2xl font-bold mb-2">
          Ready to Create Magic?
        </h2>
        <p className="text-muted-foreground mb-6">
          Generate Instagram-ready content tailored to your brand in seconds
        </p>
        <Button
          variant="gradient"
          size="lg"
          className="px-8 cursor-pointer"
          onClick={onGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Generating Content...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Generate Now
            </>
          )}
        </Button>
      </GlassCard>
    </div>
  );
};

export default GenerateCard;
