"use client";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { GeneratedPost, ParsedContent } from "@/types/GeneratePost";
import {
  Badge,
  Calendar,
  Check,
  Copy,
  Download,
  Eye,
  ImageIcon,
  Send,
  Video,
  Type,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PostCard = ({ post }: { post: GeneratedPost }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const parseContent = (content: string): ParsedContent => {
    try {
      const parsed = JSON.parse(content);
      return {
        isJson: true,
        text: parsed.text,
        image: parsed.image,
        video: parsed.video,
      };
    } catch {
      return {
        isJson: false,
        plainText: content,
      };
    }
  };

  const parsed = parseContent(post.content);

  const handleCopy = async (text: string, section: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedSection(section);
    toast.success("Caption copied to clipboard!");
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleDownloadImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `post-image-${post.id.slice(0, 8)}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully");
    } catch {
      toast.error("Image Download failed");
    }
  };

  const handlePostToInstagram = () => {
    toast.success("Opening Instagram...");
    // In production, integrate with Instagram API or deep link
    window.open("https://instagram.com", "_blank");
  };

  const getDisplayCaption = () => {
    if (parsed.isJson) {
      return (
        parsed.text?.caption ||
        parsed.image?.caption ||
        parsed.video?.caption ||
        ""
      );
    }
    return parsed.plainText || "";
  };

  const getHashtags = () => {
    if (parsed.isJson) {
      return (
        parsed.text?.hashtags ||
        parsed.image?.hashtags ||
        parsed.video?.hashtags ||
        []
      );
    }
    return [];
  };

  return (
    <GlassCard
      className="p-6 animate-fade-in"
      style={{ animationFillMode: "forwards" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
            <Calendar size={12} />
            {format(new Date(post.createdAt), "MMM dd, yyyy 'at' h:mm a")}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-4">
        {/* Image Section */}
        {parsed.image?.imageUrl &&
          !parsed.image.imageUrl.includes("placehold.co") && (
            <div className="relative group">
              <div className="aspect-square rounded-xl overflow-hidden bg-background-secondary">
                <img
                  src={parsed.image.imageUrl}
                  alt="Generated post"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3">
                <Button
                  className=" cursor-pointer"
                  variant="glass"
                  size="sm"
                  onClick={() => handleDownloadImage(parsed.image!.imageUrl!)}
                >
                  <Download size={16} />
                  Download
                </Button>
              </div>
            </div>
          )}

        {/* Text Caption */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Type size={14} />
            Caption
          </div>
          <p className="text-sm leading-relaxed line-clamp-4">
            {getDisplayCaption()}
          </p>
          {getHashtags().length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {getHashtags()
                .slice(0, 5)
                .map((tag, index) => (
                  <Badge key={index} className="text-xs">
                    {tag.startsWith("#") ? tag : `#${tag}`}
                  </Badge>
                ))}
              {getHashtags().length > 5 && (
                <Badge className="text-xs">
                  +{getHashtags().length - 5} more
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Image Caption (if different from text) */}
        {parsed.image?.caption &&
          parsed.image.caption !== parsed.text?.caption && (
            <div className="space-y-2 p-3 rounded-lg bg-background-secondary/50">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <ImageIcon size={14} />
                Image Caption
              </div>
              <p className="text-sm leading-relaxed line-clamp-3">
                {parsed.image.caption}
              </p>
            </div>
          )}

        {/* Video Script Dialog */}
        {parsed.video && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline-glow" size="sm" className="w-full cursor-pointer">
                <Video size={16} />
                View Video Script
                <Eye size={14} className="ml-auto" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Video size={20} className="text-primary" />
                  Video Content Details
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                {parsed.video.hook && (
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">
                      Hook
                    </h4>
                    <p className="text-sm bg-background-secondary p-3 rounded-lg">
                      {parsed.video.hook}
                    </p>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-2">
                    Caption
                  </h4>
                  <p className="text-sm bg-background-secondary p-3 rounded-lg">
                    {parsed.video.caption}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-2">
                    Script
                  </h4>
                  <p className="text-sm bg-background-secondary p-3 rounded-lg whitespace-pre-wrap">
                    {parsed.video.script}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className=" mt-2 cursor-pointer"
                    onClick={() => handleCopy(parsed.video!.script, "Script")}
                  >
                    {copiedSection === "Script" ? (
                      <Check size={14} />
                    ) : (
                      <Copy size={14} />
                    )}
                    Copy Script
                  </Button>
                </div>
                {parsed.video.shootingInstructions && (
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">
                      Shooting Instructions
                    </h4>
                    <p className="text-sm bg-background-secondary p-3 rounded-lg">
                      {parsed.video.shootingInstructions}
                    </p>
                  </div>
                )}
                {parsed.video.audienceEngagement && (
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">
                      Audience Engagement
                    </h4>
                    <p className="text-sm bg-background-secondary p-3 rounded-lg">
                      {parsed.video.audienceEngagement}
                    </p>
                  </div>
                )}
                {parsed.video.hashtags && parsed.video.hashtags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">
                      Hashtags
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {parsed.video.hashtags.map((tag, index) => (
                        <Badge key={index}>
                          {tag.startsWith("#") ? tag : `#${tag}`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-6 pt-4 border-t border-border">
        {parsed.image?.imageUrl &&
          !parsed.image.imageUrl.includes("placehold.co") && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 cursor-pointer"
              onClick={() => handleDownloadImage(parsed.image!.imageUrl!)}
            >
              <Download size={14} />
              Download
            </Button>
          )}
        <Button
          variant="outline"
          size="sm"
          className="flex-1 cursor-pointer"
          onClick={() => handleCopy(getDisplayCaption(), "Caption")}
        >
          {copiedSection === "Caption" ? (
            <Check size={14} />
          ) : (
            <Copy size={14} />
          )}
          Copy
        </Button>
        <Button
          variant="gradient"
          size="sm"
          className="flex-1 cursor-pointer"
          onClick={handlePostToInstagram}
        >
          <Send size={14} />
          Post
        </Button>
      </div>
    </GlassCard>
  );
};

export default PostCard;
