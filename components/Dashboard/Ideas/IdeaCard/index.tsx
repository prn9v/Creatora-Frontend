import { Heart, Loader2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ContentIdea {
  id: string;
  title: string;
  hook?: string;
  description?: string;
  format?: string;
  angle?: string;
  cta?: string;
  platform?: string;
  source?: string;
  trendSource?: string;
  trendTitle?: string;
  isFavorite: boolean;
}

interface IdeaCardProps {
  idea: ContentIdea;
  index: number;
  onToggleFavorite: (id: string) => void;
  onSelect: (idea: ContentIdea) => void;
  isFavoriting?: boolean;
}

const platformColors: Record<string, string> = {
  Instagram: "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border-pink-500/30",
  YouTube: "bg-red-500/15 text-red-300 border-red-500/30",
  Twitter: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  LinkedIn: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  TikTok: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

const IdeaCard = ({ idea, index, onToggleFavorite, onSelect, isFavoriting }: IdeaCardProps) => {
  return (
    <GlassCard
      hover
      className="p-5 animate-fade-in flex flex-col cursor-pointer"
      style={{ animationDelay: `${index * 0.04}s`, animationFillMode: "forwards" }}
      onClick={() => onSelect(idea)}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-heading font-semibold text-base leading-tight line-clamp-2">
          {idea.title}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(idea.id);
          }}
          disabled={isFavoriting}
          className={cn(
            "flex-shrink-0 p-1.5 cursor-pointer rounded-lg transition-colors",
            idea.isFavorite
              ? "text-red-400 bg-red-500/15"
              : "text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
          )}
        >
          {isFavoriting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Heart size={16} fill={idea.isFavorite ? "currentColor" : "none"} />
          )}
        </button>
      </div>

      {idea.hook && (
        <p className="text-xs text-accent mb-2 italic line-clamp-1">"{idea.hook}"</p>
      )}

      {idea.description && (
        <p className="text-sm text-muted-foreground mb-3 flex-1 line-clamp-3">
          {idea.description}
        </p>
      )}

      <div className="flex items-center gap-2 flex-wrap mt-auto">
        {idea.platform && (
          <Badge
            variant="outline"
            className={cn("text-[10px] px-2 py-0.5", platformColors[idea.platform] || "border-border")}
          >
            {idea.platform}
          </Badge>
        )}
        {idea.format && (
          <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-primary/30 text-primary bg-primary/10">
            {idea.format}
          </Badge>
        )}
        {idea.trendSource && (
          <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-warning/30 text-warning bg-warning/10">
            {idea.trendSource}
          </Badge>
        )}
      </div>
    </GlassCard>
  );
};

export default IdeaCard;
