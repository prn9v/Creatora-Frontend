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
