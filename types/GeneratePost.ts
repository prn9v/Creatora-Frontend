export interface InstagramPreview {
  postId: string;
  username: string;
  userProfilePicture: string;
  postImage: string;
  caption: string;
  hashtags: string[];
  likes: number;
  comments: number;
  timestamp: string;
}

export interface VideoScriptScene {
  sceneNumber: number;
  title: string;
  duration: string;
  shotType: 'closeup' | 'wide' | 'medium' | 'b-roll' | 'talking-head';
  voiceoverScript: string;
  visualNotes: string;
  shootingTips: string;
}

export interface VideoScript {
  postId: string;
  hook: string;
  caption: string;
  totalDuration: string;
  scenes: VideoScriptScene[];
  audienceEngagement: string;
  hashtags: string[];
  shootingInstructions: string;
}

export interface PostRecommendation {
  recommendedDate: string;
  dayOfWeek: string;
  timeSlot: string;
  reason: string;
}

export interface PostingSchedule {
  postId: string;
  imagePost: PostRecommendation;
  videoPost: PostRecommendation;
  gapBetweenPosts: {
    days: number;
    hours: number;
    reason: string;
  };
  nextPostSuggestion: {
    contentType: 'text' | 'image' | 'video';
    recommendedDate: string;
    dayOfWeek: string;
    reason: string;
  };
  bestPostingTimes: {
    dayOfWeek: string;
    timeSlots: string[];
    engagement: string;
  }[];
}

export interface GenerateResponse {
  postId: string;
  preview: InstagramPreview;
  hasVideoScript: boolean;
  generatedAt: string;
  creditsUsed: number;
}

export interface GeneratedPost {
  id: string;
  content: string;
  platform: string;
  sourceIdeaId: string | null;
  userId: string;
  createdAt: string;
}

export interface ParsedContent {
  isJson: boolean;
  text?: {
    caption: string;
    hashtags?: string[];
  };
  image?: {
    caption: string;
    hashtags?: string[];
    imagePrompt?: string;
    imageUrl?: string;
  };
  video?: {
    hook?: string;
    caption: string;
    script: string;
    shootingInstructions?: string;
    audienceEngagement?: string;
    hashtags?: string[];
  };
  plainText?: string;
}

export type GeneratedPostsMeta = {
  total: number;
  noofpages: number;
  page: number;
  limit: number;
};

export type GeneratedPostsResponse = {
  data: GeneratedPost[];
  meta: GeneratedPostsMeta;
};