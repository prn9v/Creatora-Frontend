

import GeneratedPosts from "@/components/Dashboard/GeneratedPosts";
import { FC } from "react";

const GeneratedPostsPage : FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <GeneratedPosts />
    </div>
  );
};

export default GeneratedPostsPage;