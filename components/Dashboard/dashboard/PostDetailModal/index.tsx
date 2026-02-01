"use client";

import { useEffect, useState } from "react";
import {
  X,
  Instagram,
  Copy,
  Check,
  Image as ImageIcon,
  Video,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { getBackendUrl } from "@/lib/env";
import axios from "axios";
import { PostContent, PostDetails } from "@/types/Post";


interface PostDetailsModalProps {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const PostDetailsModal = ({
  postId,
  isOpen,
  onClose,
}: PostDetailsModalProps) => {
  const [postDetails, setPostDetails] = useState<PostDetails | null>(null);
  const [parsedContent, setParsedContent] = useState<PostContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState< "image" | "text" | "video">(
    "image",
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && postId) {
      fetchPostDetails();
    }
  }, [isOpen, postId]);

  const fetchPostDetails = async () => {
    try {
      setLoading(true);

      const response = await axios.get<PostDetails>(
        `${getBackendUrl()}/users/generated-posts/${postId}`,
        {
          withCredentials: true,
        },
      );

      const data = response.data;
      setPostDetails(data);

      // Parse the content JSON
      const content: PostContent = JSON.parse(data.content);
      setParsedContent(content);

      // Set default active tab based on available content
      if (content.text) setActiveTab("text");
      else if (content.image) setActiveTab("image");
      else if (content.video) setActiveTab("video");
    } catch (error) {
      console.error("Failed to fetch post details:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard className="p-0 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between bg-background-secondary/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Instagram size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="font-heading font-semibold text-lg">
                  Post Details
                </h2>
                {postDetails && (
                  <p className="text-xs text-muted-foreground">
                    {formatDate(postDetails.createdAt)}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full w-8 h-8 p-0 cursor-pointer"
            >
              <X size={18} />
            </Button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            {loading ? (
              <div className="p-8 flex items-center justify-center">
                <p className="text-muted-foreground">Loading post details...</p>
              </div>
            ) : parsedContent ? (
              <>
                {/* Tabs */}
                <div className="flex gap-2 p-4 border-b border-border bg-background-secondary/30">
                  {parsedContent.text && (
                    <Button
                      variant={activeTab === "text" ? "gradient" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab("text")}
                      className="gap-2 cursor-pointer"
                    >
                      <FileText size={16} />
                      Text Post
                    </Button>
                  )}
                  {parsedContent.image && (
                    <Button
                      variant={activeTab === "image" ? "gradient" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab("image")}
                      className="gap-2 cursor-pointer"
                    >
                      <ImageIcon size={16} />
                      Image Post
                    </Button>
                  )}
                  {parsedContent.video && (
                    <Button
                      variant={activeTab === "video" ? "gradient" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTab("video")}
                      className="gap-2 cursor-pointer"
                    >
                      <Video size={16} />
                      Video Post
                    </Button>
                  )}
                </div>

                {/* Tab Content */}
                <div className="p-6 space-y-6">
                  {/* Text Post Content */}
                  {activeTab === "text" && parsedContent.text && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="p-4 rounded-lg bg-background-secondary border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm">Caption</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() =>
                              copyToClipboard(
                                parsedContent.text!.caption,
                                "text-caption",
                              )
                            }
                          >
                            {copiedField === "text-caption" ? (
                              <Check size={16} className="text-success" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </Button>
                        </div>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {parsedContent.text.caption}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-3">Hashtags</h3>
                        <div className="flex flex-wrap gap-2">
                          {parsedContent.text.hashtags.map((hashtag, index) => (
                            <Badge key={index} variant="glass">
                              {hashtag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image Post Content */}
                  {activeTab === "image" && parsedContent.image && (
                    <div className="space-y-4 animate-fade-in">
                      {parsedContent.image.imageUrl && (
                        <div className="rounded-lg overflow-hidden border border-border">
                          <img
                            src={parsedContent.image.imageUrl}
                            alt="Generated post"
                            className="w-full h-auto"
                          />
                        </div>
                      )}

                      <div className="p-4 rounded-lg bg-background-secondary border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm">Caption</h3>
                          <Button
                            variant="ghost"
                            className="cursor-pointer"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(
                                parsedContent.image!.caption,
                                "image-caption",
                              )
                            }
                          >
                            {copiedField === "image-caption" ? (
                              <Check size={16} className="text-success" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </Button>
                        </div>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {parsedContent.image.caption}
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-background-secondary border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm">
                            Image Prompt
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() =>
                              copyToClipboard(
                                parsedContent.image!.imagePrompt,
                                "image-prompt",
                              )
                            }
                          >
                            {copiedField === "image-prompt" ? (
                              <Check size={16} className="text-success" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {parsedContent.image.imagePrompt}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-3">Hashtags</h3>
                        <div className="flex flex-wrap gap-2">
                          {parsedContent.image.hashtags.map(
                            (hashtag, index) => (
                              <Badge key={index} variant="glass">
                                {hashtag}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Video Post Content */}
                  {activeTab === "video" && parsedContent.video && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm text-primary">
                            Hook
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() =>
                              copyToClipboard(
                                parsedContent.video!.hook,
                                "video-hook",
                              )
                            }
                          >
                            {copiedField === "video-hook" ? (
                              <Check size={16} className="text-success" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </Button>
                        </div>
                        <p className="text-sm font-medium">
                          {parsedContent.video.hook}
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-background-secondary border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm">Caption</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() =>
                              copyToClipboard(
                                parsedContent.video!.caption,
                                "video-caption",
                              )
                            }
                          >
                            {copiedField === "video-caption" ? (
                              <Check size={16} className="text-success" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </Button>
                        </div>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {parsedContent.video.caption}
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-background-secondary border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm">Script</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() =>
                              copyToClipboard(
                                parsedContent.video!.script,
                                "video-script",
                              )
                            }
                          >
                            {copiedField === "video-script" ? (
                              <Check size={16} className="text-success" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </Button>
                        </div>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {parsedContent.video.script}
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-background-secondary border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm">
                            Shooting Instructions
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() =>
                              copyToClipboard(
                                parsedContent.video!.shootingInstructions,
                                "video-instructions",
                              )
                            }
                          >
                            {copiedField === "video-instructions" ? (
                              <Check size={16} className="text-success" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {parsedContent.video.shootingInstructions}
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-background-secondary border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm">
                            Audience Engagement
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() =>
                              copyToClipboard(
                                parsedContent.video!.audienceEngagement,
                                "video-engagement",
                              )
                            }
                          >
                            {copiedField === "video-engagement" ? (
                              <Check size={16} className="text-success" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {parsedContent.video.audienceEngagement}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mb-3">Hashtags</h3>
                        <div className="flex flex-wrap gap-2">
                          {parsedContent.video.hashtags.map(
                            (hashtag, index) => (
                              <Badge key={index} variant="glass">
                                {hashtag}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-8 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Failed to load post details
                </p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
