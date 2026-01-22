// InstagramGenerate/components/ActionButtons.tsx
import { Button } from "@/components/ui/button";
import { Loader2, Download, Copy, Instagram, Play, Calendar } from "lucide-react";

type Props = {
  onDownload: () => void;
  onCopyCaption: () => void;
  onPostNow: () => void;
  onViewVideoScript: () => void;
  onViewSchedule: () => void;
  loadingScript: boolean;
  loadingSchedule: boolean;
};

const ActionButtons = ({
  onDownload,
  onCopyCaption,
  onPostNow,
  onViewVideoScript,
  onViewSchedule,
  loadingScript,
  loadingSchedule,
}: Props) => {
  return (
    <div className="p-6 border-t border-border space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline-glow" className="cursor-pointer" onClick={onDownload}>
          <Download size={18} />
          Download
        </Button>

        <Button variant="outline-glow" className="cursor-pointer" onClick={onCopyCaption}>
          <Copy size={18} />
          Copy Caption
        </Button>

        <Button variant="gradient" className="cursor-pointer" onClick={onPostNow}>
          <Instagram size={18} />
          Post Now
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline-glow"
          className="cursor-pointer"
          onClick={onViewVideoScript}
          disabled={loadingScript}
        >
          {loadingScript ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Play size={18} />
          )}
          View Video Script
        </Button>

        <Button
          variant="outline-glow"
          className="cursor-pointer"
          onClick={onViewSchedule}
          disabled={loadingSchedule}
        >
          {loadingSchedule ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Calendar size={18} />
          )}
          When to Post
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
