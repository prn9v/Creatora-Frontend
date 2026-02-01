"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { getBackendUrl } from "@/lib/env";

import {
  GenerateResponse,
  PostingSchedule,
  VideoScript,
} from "@/types/GeneratePost";

import InstagramHeader from "./InstagramHeader";
import GenerateCard from "./GenerateCard";
import GeneratingLoader from "./GeneratingLoader";
import InstagramPreviewCard from "./InstagramPreviewCard";
import VideoScriptSection from "./VideoScriptSection";
import PostingScheduleSection from "./PostingScheduleSection";
import RegenerateButton from "./RegenerateButton";

const InstagramGenerate = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<GenerateResponse | null>(
    null,
  );
  const [videoScript, setVideoScript] = useState<VideoScript | null>(null);
  const [schedule, setSchedule] = useState<PostingSchedule | null>(null);
  const [showVideoScript, setShowVideoScript] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [loadingScript, setLoadingScript] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedData(null);
    setVideoScript(null);
    setSchedule(null);
    setShowVideoScript(false);
    setShowSchedule(false);

    try {
      const response = await axios.post<GenerateResponse>(
        `${getBackendUrl()}/content-generation/generate`,
        {},
        {
          withCredentials: true,
          timeout: 130000,
        },
      );

      setGeneratedData(response.data);
      toast.success("Content generated successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to generate content",
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!generatedData?.preview.postImage) return;

    try {
      const response = await fetch(generatedData.preview.postImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `instagram-post-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully!");
    } catch {
      toast.error("Failed to download image");
    }
  };

  const handleCopyCaption = () => {
    if (!generatedData?.preview.caption) return;

    const fullCaption = `${generatedData.preview.caption}\n\n${generatedData.preview.hashtags.join(" ")}`;

    navigator.clipboard
      .writeText(fullCaption)
      .then(() => toast.success("Caption copied to clipboard!"))
      .catch(() => toast.error("Failed to copy caption"));
  };

  const handlePostToInstagram = async () => {
    if (!generatedData?.preview.caption || !generatedData?.preview.postImage)
      return;

    try {
      const fullCaption = `${generatedData.preview.caption}\n\n${generatedData.preview.hashtags.join(" ")}`;

      // Step 1: Download the image automatically
      const response = await fetch(generatedData.preview.postImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `instagram-post-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Step 2: Copy caption to clipboard
      await navigator.clipboard.writeText(fullCaption);

      // Step 3: Open Instagram
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        window.location.href = "instagram://library?AssetPath=";
        setTimeout(() => {
          window.open("https://www.instagram.com/", "_blank");
        }, 1000);
      } else {
        window.open("https://www.instagram.com/create/style/", "_blank");
      }

      toast.success("Ready to post!", {
        description:
          "Image downloaded & caption copied. Select the image in Instagram and paste the caption.",
        duration: 6000,
      });
    } catch {
      toast.error("Failed to prepare Instagram post");
    }
  };

  const handleViewVideoScript = async () => {
    if (!generatedData?.postId) return;

    setLoadingScript(true);
    try {
      const response = await axios.get<VideoScript>(
        `${getBackendUrl()}/content-generation/${generatedData.postId}/video-script`,
        { withCredentials: true },
      );

      setVideoScript(response.data);
      setShowVideoScript(true);
      toast.success("Video script loaded!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to load video script",
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoadingScript(false);
    }
  };

  const handleViewSchedule = async () => {
    if (!generatedData?.postId) return;

    setLoadingSchedule(true);
    try {
      const response = await axios.get<PostingSchedule>(
        `${getBackendUrl()}/content-generation/${generatedData.postId}/posting-schedule`,
        { withCredentials: true },
      );

      setSchedule(response.data);
      setShowSchedule(true);
      toast.success("Posting schedule loaded!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to load schedule");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoadingSchedule(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <InstagramHeader />

      {!generatedData && (
        <GenerateCard isGenerating={isGenerating} onGenerate={handleGenerate} />
      )}

      {isGenerating && <GeneratingLoader />}

      {generatedData && (
        <div className="space-y-6">
          <InstagramPreviewCard
            generatedData={generatedData}
            onDownload={handleDownloadImage}
            onCopyCaption={handleCopyCaption}
            onPostNow={handlePostToInstagram}
            onViewVideoScript={handleViewVideoScript}
            onViewSchedule={handleViewSchedule}
            loadingScript={loadingScript}
            loadingSchedule={loadingSchedule}
          />

          {showVideoScript && videoScript && (
            <VideoScriptSection
              show={showVideoScript}
              videoScript={videoScript}
              onToggle={() => setShowVideoScript(!showVideoScript)}
            />
          )}

          {showSchedule && schedule && (
            <PostingScheduleSection schedule={schedule} />
          )}

          <RegenerateButton
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>
      )}
    </div>
  );
};

export default InstagramGenerate;
