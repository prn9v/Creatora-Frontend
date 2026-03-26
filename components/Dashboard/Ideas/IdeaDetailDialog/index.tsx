import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Heart, Loader2, Lightbulb, MessageSquareQuote, Target, Megaphone, Tv, Compass, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContentIdea } from "../IdeaCard";

interface IdeaDetailDialogProps {
  idea: ContentIdea | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggleFavorite: (id: string) => void;
  isFavoriting?: boolean;
}

const platformColors: Record<string, string> = {
  Instagram: "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border-pink-500/30",
  YouTube: "bg-red-500/15 text-red-300 border-red-500/30",
  Twitter: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  LinkedIn: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  TikTok: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

const IdeaDetailDialog = ({ idea, open, onOpenChange, onToggleFavorite, isFavoriting }: IdeaDetailDialogProps) => {
  if (!idea) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card border-card-border/50 backdrop-blur-xl">
        <DialogHeader className=" mt-6">
          <div className="flex items-start justify-between gap-3">
            <DialogTitle className="font-heading text-2xl leading-tight pr-4">
              {idea.title}
            </DialogTitle>
            <button
              onClick={() => onToggleFavorite(idea.id)}
              disabled={isFavoriting}
              className={cn(
                "flex-shrink-0 p-2 cursor-pointer rounded-lg transition-colors",
                idea.isFavorite
                  ? "text-red-400 bg-red-500/15"
                  : "text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
              )}
            >
              {isFavoriting ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Heart size={20} fill={idea.isFavorite ? "currentColor" : "none"} />
              )}
            </button>
          </div>
          <DialogDescription className="sr-only">Content idea details</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {idea.platform && (
              <Badge variant="outline" className={cn("text-xs py-1 px-3", platformColors[idea.platform] || "border-border")}>
                <Tv size={12} className="mr-1.5" />
                {idea.platform}
              </Badge>
            )}
            {idea.format && (
              <Badge variant="outline" className="text-xs py-1 px-3 border-primary/30 text-primary bg-primary/10">
                <Layers size={12} className="mr-1.5" />
                {idea.format}
              </Badge>
            )}
            {idea.source && (
              <Badge variant="outline" className="text-xs py-1 px-3 border-secondary/30 text-secondary bg-secondary/10">
                <Compass size={12} className="mr-1.5" />
                {idea.source}
              </Badge>
            )}
            {idea.trendSource && (
              <Badge variant="outline" className="text-xs py-1 px-3 border-warning/30 text-warning bg-warning/10">
                via {idea.trendSource}
              </Badge>
            )}
          </div>

          <div className="space-y-4">
            {/* Hook */}
            {idea.hook && (
              <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
                <div className="flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-wider mb-2">
                  <MessageSquareQuote size={14} />
                  Hook
                </div>
                <p className="text-base text-foreground italic leading-relaxed">&quot;{idea.hook}&quot;</p>
              </div>
            )}

            {/* Description */}
            {idea.description && (
              <div className="px-1">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
                  <Lightbulb size={14} />
                  Description
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">{idea.description}</p>
              </div>
            )}

            {/* Angle */}
            {idea.angle && (
              <div className="px-1">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
                  <Target size={14} />
                  Strategy & Angle
                </div>
                <p className="text-sm text-foreground/80">{idea.angle}</p>
              </div>
            )}

            {/* Trend Title */}
            {idea.trendTitle && (
              <div className="px-1">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
                  <Megaphone size={14} />
                  Trending Context
                </div>
                <p className="text-sm text-foreground/80">{idea.trendTitle}</p>
              </div>
            )}

            {/* CTA */}
            {idea.cta && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <div className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">Call to Action</div>
                <p className="text-sm text-foreground/90 font-medium">{idea.cta}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IdeaDetailDialog;
