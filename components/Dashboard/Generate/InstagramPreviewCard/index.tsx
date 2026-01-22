// InstagramGenerate/components/InstagramPreviewCard.tsx
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
} from "lucide-react";
import { GenerateResponse } from "@/types/GeneratePost";
import ActionButtons from "../ActionButtons";

type Props = {
  generatedData: GenerateResponse;
  onDownload: () => void;
  onCopyCaption: () => void;
  onPostNow: () => void;
  onViewVideoScript: () => void;
  onViewSchedule: () => void;
  loadingScript: boolean;
  loadingSchedule: boolean;
};

const InstagramPreviewCard = ({
  generatedData,
  onDownload,
  onCopyCaption,
  onPostNow,
  onViewVideoScript,
  onViewSchedule,
  loadingScript,
  loadingSchedule,
}: Props) => {
  return (
    <GlassCard className="overflow-hidden">
      <div className="bg-gradient-to-br from-primary/5 to-transparent p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
            <CheckCircle2 className="text-primary" size={24} />
            Instagram Post Preview
          </h2>
          <Badge variant="success">Generated</Badge>
        </div>
      </div>

      {/* Instagram Post Mockup */}
      <div className="p-6 flex justify-center">
        <div className="w-full max-w-[470px] bg-black rounded-lg overflow-hidden border border-zinc-800">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 p-[2px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <img
                    src={generatedData.preview.userProfilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-white text-sm font-semibold">
                {generatedData.preview.username}
              </span>
            </div>
            <MoreHorizontal className="text-white" size={20} />
          </div>

          {/* Image */}
          <div className="relative bg-zinc-900 aspect-square">
            <img
              src={generatedData.preview.postImage}
              alt="Post"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Actions + Caption */}
          <div className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Heart className="text-white" size={24} />
                <MessageCircle className="text-white" size={24} />
                <Send className="text-white" size={24} />
              </div>
              <Bookmark className="text-white" size={24} />
            </div>

            <div className="text-white text-sm font-semibold">
              {generatedData.preview.likes.toLocaleString()} likes
            </div>

            <div className="text-white text-sm space-y-1">
              <div>
                <span className="font-semibold">
                  {generatedData.preview.username}
                </span>{" "}
                <span className="text-zinc-300">
                  {generatedData.preview.caption}
                </span>
              </div>

              <div className="flex flex-wrap gap-1">
                {generatedData.preview.hashtags.slice(0, 5).map((tag, i) => (
                  <span key={i} className="text-blue-400 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-zinc-500 text-xs">
              {generatedData.preview.timestamp}
            </div>
          </div>
        </div>
      </div>

      <ActionButtons
        onDownload={onDownload}
        onCopyCaption={onCopyCaption}
        onPostNow={onPostNow}
        onViewVideoScript={onViewVideoScript}
        onViewSchedule={onViewSchedule}
        loadingScript={loadingScript}
        loadingSchedule={loadingSchedule}
      />
    </GlassCard>
  );
};

export default InstagramPreviewCard;
