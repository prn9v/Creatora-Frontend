export interface MeResponse {
  id: string;
  email: string;
  name: string;
  bio: string | null;
  profileImageUrl: string | null;
  plan: "FREE" | "PRO" | string;
  creditsUsed: number;
  creditsLimit: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  bio: string;
  plan: string;
  creditsUsed: number;
  creditsLimit: number;
  brandProfile?: {
    tone: string;
    niche: string;
    audience: string;
  };
  generatedPosts: Array<{
    id: string;
    content: string;
    platform: string;
    createdAt: string;
  }>;
}

export type StatItem = {
  label: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down";
  subtext?: string;
  icon: React.ElementType;
  color: string;
  progress?: number;
};

