"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DAY_LABELS, DayIndex, FavoritedIdea, FORMAT_OPTIONS, PLATFORM_OPTIONS, PostFormat, SlotCreatePayload, SocialPlatform } from "@/types/Planner";

interface AddSlotModalProps {
  open: boolean;
  defaultDay: DayIndex;
  unscheduledIdeas: FavoritedIdea[];
  isSaving: boolean;
  onClose: () => void;
  onSave: (payload: SlotCreatePayload) => void;
}

export function AddSlotModal({
  open,
  defaultDay,
  unscheduledIdeas,
  isSaving,
  onClose,
  onSave,
}: AddSlotModalProps) {
  const [dayOfWeek, setDayOfWeek] = useState<DayIndex>(defaultDay);
  const [scheduledTime, setScheduledTime] = useState("09:00");
  const [platform, setPlatform] = useState<SocialPlatform>("INSTAGRAM");
  const [format, setFormat] = useState<PostFormat>("Reel");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [ideaId, setIdeaId] = useState<string>("none");

  useEffect(() => {
    if (open) {
      setDayOfWeek(defaultDay);
      setScheduledTime("09:00");
      setPlatform("INSTAGRAM");
      setFormat("Reel");
      setTitle("");
      setCaption("");
      setHashtags("");
      setIdeaId("none");
    }
  }, [open, defaultDay]);

  const handleIdeaSelect = (val: string) => {
    setIdeaId(val);
    if (val === "none") return;
    const idea = unscheduledIdeas.find((i) => i.id === val);
    if (idea) {
      setTitle(idea.hook);
      if (idea.format) setFormat(idea.format as PostFormat);
      if (idea.platform) setPlatform(idea.platform as SocialPlatform);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = hashtags
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);
    onSave({
      dayOfWeek,
      scheduledTime,
      platform,
      format,
      title,
      caption,
      hashtags: tags,
      contentIdeaId: ideaId !== "none" ? ideaId : null,
      sourceType: ideaId !== "none" ? "IDEA" : "NEW",
    });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add post</DialogTitle>
          <DialogDescription>
            Manually schedule a post in this week&apos;s plan.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {unscheduledIdeas.length > 0 && (
            <div className="space-y-1.5">
              <Label>Link to content idea (optional)</Label>
              <Select value={ideaId} onValueChange={handleIdeaSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {unscheduledIdeas.map((i) => (
                    <SelectItem key={i.id} value={i.id}>
                      {i.hook.slice(0, 60)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Day</Label>
              <Select
                value={String(dayOfWeek)}
                onValueChange={(v) => setDayOfWeek(Number(v) as DayIndex)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(DAY_LABELS) as unknown as string[]).map(
                    (k) => (
                      <SelectItem key={k} value={k}>
                        {DAY_LABELS[Number(k) as DayIndex].long}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Time</Label>
              <Input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Platform</Label>
              <Select
                value={platform}
                onValueChange={(v) => setPlatform(v as SocialPlatform)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORM_OPTIONS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Format</Label>
              <Select
                value={format}
                onValueChange={(v) => setFormat(v as PostFormat)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FORMAT_OPTIONS.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label>Caption</Label>
            <Textarea
              rows={5}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Hashtags</Label>
            <Input
              placeholder="#growth, #content"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={isSaving}>
              {isSaving && <Loader2 className="animate-spin" size={14} />}
              Add post
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}