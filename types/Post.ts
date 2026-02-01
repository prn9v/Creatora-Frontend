export interface PostContent {
  text?: {
    caption: string;
    hashtags: string[];
  };
  image?: {
    caption: string;
    hashtags: string[];
    imagePrompt: string;
    imageUrl: string;
  };
  video?: {
    hook: string;
    caption: string;
    script: string;
    shootingInstructions: string;
    audienceEngagement: string;
    hashtags: string[];
  };
}

export interface PostDetails {
  id: string;
  content: string;
  platform: string;
  sourceIdeaId: string | null;
  userId: string;
  createdAt: string;
  sourceIdea: null;
}

export interface RecentPost {
  id: string;
  platform: string;
  preview: string;
  time: string;
  status: string;
}