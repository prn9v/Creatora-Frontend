// InstagramGenerate/components/GeneratingLoader.tsx
import { GlassCard } from "@/components/ui/GlassCard";
import { Loader2 } from "lucide-react";

const GeneratingLoader = () => {
  return (
    <div className="mt-8">
      <GlassCard className="p-12">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
          <h3 className="font-heading text-xl font-semibold mb-2">
            Creating Your Content
          </h3>
          <p className="text-muted-foreground">This may take a minute...</p>
        </div>
      </GlassCard>
    </div>
  );
};

export default GeneratingLoader;
