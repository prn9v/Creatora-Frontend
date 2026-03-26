import { ReactNode } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Sparkles } from "lucide-react";
import IdeaCard, { type ContentIdea } from "../IdeaCard";

interface IdeasSectionProps {
  title: string;
  icon: ReactNode;
  ideas: ContentIdea[];
  emptyMessage: string;
  onToggleFavorite: (id: string) => void;
  onSelect: (idea: ContentIdea) => void;
  children?: ReactNode;
  favoritingId?: string | null;
}

const IdeasSection = ({
  title,
  icon,
  ideas,
  emptyMessage,
  onToggleFavorite,
  onSelect,
  children,
  favoritingId,
}: IdeasSectionProps) => {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="font-heading text-2xl font-bold">{title}</h2>
          <span className="text-xs text-white ml-1 ">({ideas.length})</span>
        </div>
        {children}
      </div>

      {ideas.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ideas.map((idea, i) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              index={i}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelect}
              isFavoriting={favoritingId === idea.id}
            />
          ))}
        </div>
      ) : (
        <GlassCard className="p-10 text-center">
          <Sparkles size={28} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">{emptyMessage}</p>
        </GlassCard>
      )}
    </section>
  );
};

export default IdeasSection;
