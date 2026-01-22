// InstagramGenerate/components/RegenerateButton.tsx
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

type Props = {
  onGenerate: () => void;
  isGenerating: boolean;
};

const RegenerateButton = ({ onGenerate, isGenerating }: Props) => {
  return (
    <div className="flex justify-center">
      <Button
        variant="outline-glow"
        size="lg"
        onClick={onGenerate}
        disabled={isGenerating}
      >
        <Sparkles size={18} />
        Generate New Content
      </Button>
    </div>
  );
};

export default RegenerateButton;
