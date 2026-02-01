import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { RecentPost } from "@/types/Post";
import { ArrowRight, Clock, FileText, Instagram } from "lucide-react";
import Link from "next/link";

type RecentPostsListProps = {
  posts: RecentPost[];
  onClick: (id: string) => void;
};

const platformIcons = {
  INSTAGRAM: Instagram,
  TWITTER: Instagram,
  LINKEDIN: Instagram,
  BLOG: FileText,
};

const RecentPostsList = ({ posts, onClick }: RecentPostsListProps) => (
  <GlassCard className="p-6 mt-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-heading font-semibold text-lg">
        Recent Generated Posts
      </h2>
      <Button variant="ghost" size="sm" asChild>
        <Link href="/generated-posts">
          View All
          <ArrowRight size={14} />
        </Link>
      </Button>
    </div>

    <div className="space-y-4">
      {posts.map((post) => {
        const PlatformIcon =
          platformIcons[
            post.platform.toUpperCase() as keyof typeof platformIcons
          ] || FileText;

        return (
          <div
            key={post.id}
            onClick={() => onClick(post.id)}
            className="flex items-center gap-4 p-4 rounded-lg bg-background-secondary border border-border hover:border-primary/30 transition-colors cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-muted">
              <PlatformIcon size={18} className="text-muted-foreground" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{post.preview}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <Clock size={12} />
                {post.time}
              </div>
            </div>

            <Badge variant="success">{post.status}</Badge>
          </div>
        );
      })}
    </div>
  </GlassCard>
);

export default RecentPostsList;
