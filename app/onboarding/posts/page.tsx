
import PostsUpload from "@/components/Onboarding/OnboardingPostsUpload";
import { FC } from "react";

const OnboardingPostsPage : FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <PostsUpload />
    </div>
  );
};

export default OnboardingPostsPage;