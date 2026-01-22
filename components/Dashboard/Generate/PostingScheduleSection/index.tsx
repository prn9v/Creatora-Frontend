// InstagramGenerate/components/PostingScheduleSection.tsx
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Lightbulb, Play, TrendingUp } from "lucide-react";
import { PostingSchedule } from "@/types/GeneratePost";

type Props = {
  schedule: PostingSchedule;
};

const PostingScheduleSection = ({ schedule }: Props) => {
  return (
    <GlassCard className="overflow-hidden">
      <div className="bg-gradient-to-br from-green-500/10 to-transparent p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <Calendar className="text-green-400" size={20} />
          </div>
          <div>
            <h2 className="font-heading text-xl font-semibold">Posting Schedule</h2>
            <p className="text-sm text-muted-foreground">
              AI-optimized timing for maximum engagement
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Image Post */}
        <div className="bg-gradient-to-br from-purple-500/5 to-transparent border border-purple-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <TrendingUp className="text-purple-400" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Image Post</h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="glass">{schedule.imagePost.dayOfWeek}</Badge>
                <Badge variant="glass">{schedule.imagePost.timeSlot}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {schedule.imagePost.reason}
              </p>
            </div>
          </div>
        </div>

        {/* Video Post */}
        <div className="bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Play className="text-blue-400" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Video/Reel Post</h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="glass">{schedule.videoPost.dayOfWeek}</Badge>
                <Badge variant="glass">{schedule.videoPost.timeSlot}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {schedule.videoPost.reason}
              </p>
            </div>
          </div>
        </div>

        {/* Gap */}
        <div className="bg-background-secondary border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-primary" size={18} />
            <h3 className="font-semibold text-sm">Optimal Gap</h3>
          </div>
          <p className="text-2xl font-bold mb-1">
            {schedule.gapBetweenPosts.days} days
            <span className="text-muted-foreground text-sm ml-2">
              ({schedule.gapBetweenPosts.hours} hours)
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            {schedule.gapBetweenPosts.reason}
          </p>
        </div>

        {/* Best Times */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="text-primary" size={18} />
            Best Posting Times This Week
          </h3>

          <div className="grid md:grid-cols-2 gap-3">
            {schedule.bestPostingTimes.map((time, i) => (
              <div
                key={i}
                className="bg-background-secondary border border-border rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{time.dayOfWeek}</span>
                  <Badge
                    variant={
                      time.engagement === "Very High"
                        ? "success"
                        : time.engagement === "High"
                          ? "glass"
                          : "outline"
                    }
                    className="text-xs"
                  >
                    {time.engagement}
                  </Badge>
                </div>

                <div className="space-y-1">
                  {time.timeSlots.map((slot, j) => (
                    <div
                      key={j}
                      className="text-xs text-muted-foreground flex items-center gap-1"
                    >
                      <Clock size={12} />
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default PostingScheduleSection;
