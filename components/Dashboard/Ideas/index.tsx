"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { getBackendUrl } from "@/lib/env";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, TrendingUp, Heart } from "lucide-react";
import DashboardLayout from "@/app/(dashboard)/layout";
import { ContentIdea } from "./IdeaCard";
import IdeasSection from "./IdeasSection";
import IdeaDetailDialog from "./IdeaDetailDialog";

// ─── API Response Types ───────────────────────────────────────────────────────

interface ApiIdea {
  id?: string;
  _id?: string;
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
  isFavorite?: boolean;
}

interface GenerateIdeasResponse {
  ideas?: ApiIdea[];
  data?: ApiIdea[];
}

interface TrendingIdeasResponse {
  ideas?: ApiIdea[];
  data?: ApiIdea[];
}

// ─── Mapper ───────────────────────────────────────────────────────────────────

const mapApiIdeaToContentIdea = (
  idea: ApiIdea,
  source: "AI" | "TRENDING",
): ContentIdea => ({
  id: idea.id ?? idea._id ?? crypto.randomUUID(),
  title: idea.title,
  hook: idea.hook,
  description: idea.description,
  format: idea.format,
  angle: idea.angle,
  cta: idea.cta,
  platform: idea.platform,
  source: idea.source ?? source,
  trendSource: idea.trendSource,
  trendTitle: idea.trendTitle,
  isFavorite: idea.isFavorite ?? false,
});

// ─── Component ────────────────────────────────────────────────────────────────

const Ideas = () => {
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isGeneratingTrending, setIsGeneratingTrending] = useState(false);
  const [isFetchingFavorites, setIsFetchingFavorites] = useState(true);
  const [favoritingId, setFavoritingId] = useState<string | null>(null);

  const [aiIdeas, setAiIdeas] = useState<ContentIdea[]>([]);
  const [trendingIdeas, setTrendingIdeas] = useState<ContentIdea[]>([]);
  const [favoriteIdeas, setFavoriteIdeas] = useState<ContentIdea[]>([]);

  const [selectedIdea, setSelectedIdea] = useState<ContentIdea | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    handleFetchFavoriteIdeas();
  }, []);

  // ── Generate AI Ideas ────────────────────────────────────────────────────────
  const handleGenerateAiIdeas = async () => {
    setIsGeneratingAi(true);
    try {
      const response = await axios.post<GenerateIdeasResponse>(
        `${getBackendUrl()}/ideas/generate`,
        {},
        { withCredentials: true },
      );

      const raw = response.data?.ideas ?? response.data?.data ?? [];
      const mapped = raw.map((idea) => mapApiIdeaToContentIdea(idea, "AI"));
      setAiIdeas(mapped);
      toast.success("AI ideas generated successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to generate AI ideas",
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // ── Fetch Trending Ideas ─────────────────────────────────────────────────────
  const handleFetchTrendingIdeas = async () => {
    setIsGeneratingTrending(true);
    try {
      const response = await axios.get<TrendingIdeasResponse>(
        `${getBackendUrl()}/ideas/trending`,
        { withCredentials: true },
      );

      const raw = response.data?.ideas ?? response.data?.data ?? [];
      const mapped = raw.map((idea) =>
        mapApiIdeaToContentIdea(idea, "TRENDING"),
      );
      setTrendingIdeas(mapped);
      toast.success("Trending ideas fetched successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to fetch trending ideas",
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsGeneratingTrending(false);
    }
  };

  // ── Toggle Favorite (API Call) ───────────────────────────────────────────────
  const toggleFavorite = async (id: string) => {
    setFavoritingId(id);
    try {
      await axios.post(
        `${getBackendUrl()}/ideas/favorite`,
        { ideaId: id },
        { withCredentials: true },
      );

      // Local state update
      const updateList = (prev: ContentIdea[]) =>
        prev.map((idea) =>
          idea.id === id ? { ...idea, isFavorite: !idea.isFavorite } : idea,
        );

      setAiIdeas(updateList);
      setTrendingIdeas(updateList);
      setFavoriteIdeas(updateList);

      if (selectedIdea?.id === id) {
        setSelectedIdea((prev) =>
          prev ? { ...prev, isFavorite: !prev.isFavorite } : null,
        );
      }

      toast.success("Favorites updated!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to update favorite",
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setFavoritingId(null);
    }
  };

  // ── Fetch Favorite Ideas ─────────────────────────────────────────────────────
  const handleFetchFavoriteIdeas = async () => {
    setIsFetchingFavorites(true);
    try {
      const response = await axios.get<ApiIdea[]>(
        `${getBackendUrl()}/ideas/favorites`,
        { withCredentials: true },
      );

      const mapped = response.data.map((idea) =>
        mapApiIdeaToContentIdea(idea, "AI"),
      );

      setFavoriteIdeas(mapped);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to fetch favorite ideas",
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsFetchingFavorites(false);
    }
  };

  const openDetail = (idea: ContentIdea) => {
    setSelectedIdea(idea);
    setDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mt-10">Content Ideas</h1>
            <p className="text-muted-foreground">
              AI-generated &amp; trending ideas tailored to your brand.
            </p>
          </div>
        </div>

        {/* AI Generated Ideas */}
        <IdeasSection
          title="AI Generated Ideas"
          icon={<Sparkles size={20} className="text-primary" />}
          ideas={aiIdeas}
          emptyMessage="Generate your first batch of AI content ideas."
          onToggleFavorite={toggleFavorite}
          onSelect={openDetail}
          favoritingId={favoritingId}
        >
          <Button
            variant="gradient"
            size="lg"
            onClick={handleGenerateAiIdeas}
            disabled={isGeneratingAi}
            className="cursor-pointer"
          >
            {isGeneratingAi ? (
              <>
                <Loader2 className="animate-spin" size={14} />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={14} />
                Generate New AI Ideas
              </>
            )}
          </Button>
        </IdeasSection>

        {/* Trending Ideas */}
        <IdeasSection
          title="Trending Ideas"
          icon={<TrendingUp size={20} className="text-warning" />}
          ideas={trendingIdeas}
          emptyMessage="No trending ideas available right now."
          onToggleFavorite={toggleFavorite}
          onSelect={openDetail}
          favoritingId={favoritingId}
        >
          <Button
            variant="gradient"
            size="lg"
            onClick={handleFetchTrendingIdeas}
            disabled={isGeneratingTrending}
            className="cursor-pointer"
          >
            {isGeneratingTrending ? (
              <>
                <Loader2 className="animate-spin" size={14} />
                Fetching...
              </>
            ) : (
              <>
                <TrendingUp size={14} />
                Generate Trending Ideas
              </>
            )}
          </Button>
        </IdeasSection>

        {/* Favorites */}
        <IdeasSection
          title="Your Favorites"
          icon={<Heart size={20} className="text-destructive" />}
          ideas={favoriteIdeas}
          emptyMessage={
            isFetchingFavorites
              ? "Loading your favorites..."
              : "Tap the heart on any idea to save it here."
          }
          onToggleFavorite={toggleFavorite}
          onSelect={openDetail}
          favoritingId={favoritingId}
        />

        {/* Detail Dialog */}
        <IdeaDetailDialog
          idea={selectedIdea}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onToggleFavorite={toggleFavorite}
          isFavoriting={favoritingId === selectedIdea?.id}
        />
      </div>
    </DashboardLayout>
  );
};

export default Ideas;
