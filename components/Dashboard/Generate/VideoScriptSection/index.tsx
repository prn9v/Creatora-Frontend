// InstagramGenerate/components/VideoScriptSection.tsx
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  ChevronDown,
  ChevronUp,
  Clock,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoScript } from "@/types/GeneratePost";
import { shotTypeColors } from "@/lib/constants";

type Props = {
  show: boolean;
  videoScript: VideoScript;
  onToggle: () => void;
};

const VideoScriptSection = ({ show, videoScript, onToggle }: Props) => {
  return (
    <GlassCard className="overflow-hidden">
      <div
        className="bg-gradient-to-br from-purple-500/10 to-transparent p-6 border-b border-border cursor-pointer hover:from-purple-500/15 transition-all"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Camera className="text-purple-400" size={20} />
            </div>
            <div>
              <h2 className="font-heading text-xl font-semibold">Video Script</h2>
              <p className="text-sm text-muted-foreground">
                {videoScript.scenes.length} scenes · {videoScript.totalDuration} duration
              </p>
            </div>
          </div>
          {show ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {show && (
        <div className="p-6 space-y-6">
          {/* Hook */}
          <div className="bg-gradient-to-br from-yellow-500/5 to-transparent border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="text-yellow-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-sm text-yellow-400 mb-1">
                  Opening Hook
                </h3>
                <p className="text-sm">{videoScript.hook}</p>
              </div>
            </div>
          </div>

          {/* Scenes */}
          <div className="space-y-4">
            {videoScript.scenes.map((scene) => (
              <div
                key={scene.sceneNumber}
                className="bg-background-secondary border border-border rounded-lg p-4 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {scene.sceneNumber}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{scene.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="glass" className="text-xs">
                          <Clock size={12} className="mr-1" />
                          {scene.duration}
                        </Badge>
                        <Badge
                          className={cn(
                            "text-xs border",
                            shotTypeColors[scene.shotType],
                          )}
                        >
                          {scene.shotType}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground font-medium">Voiceover:</span>
                    <p className="mt-1">{scene.voiceoverScript}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-medium">Visual Notes:</span>
                    <p className="mt-1 text-muted-foreground">{scene.visualNotes}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground font-medium">Shooting Tips:</span>
                    <p className="mt-1 text-muted-foreground">{scene.shootingTips}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <MessageCircle className="text-blue-400 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-sm text-blue-400 mb-1">
                  Audience Engagement
                </h3>
                <p className="text-sm">{videoScript.audienceEngagement}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default VideoScriptSection;
