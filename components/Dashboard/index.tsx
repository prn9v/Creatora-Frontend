'use client'

import { getBackendUrl } from "@/lib/env";
import { getTimeAgo } from "@/lib/utils";
import { RecentPost } from "@/types/Post";
import { StatItem, UserData } from "@/types/User";
import axios from "axios";
import { BarChart3, PenTool, Target, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import StatsGrid from "./dashboard/StatsGrid";
import BrandProfileCard from "./dashboard/BrandProfileCard";
import WeeklyPlannerPreview from "./dashboard/WeeklyPlannerPreview";
import QuickActions from "./dashboard/QuickActions";
import RecentPostsList from "./dashboard/RecentPostsList";
import { PostDetailsModal } from "./dashboard/PostDetailModal";

const Dashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<UserData>(
          `${getBackendUrl()}/users/auth/me`,
          { withCredentials: true }
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading)
    return <div className="p-8 text-center">Loading dashboard...</div>;

  if (!userData)
    return <div className="p-8 text-center">Failed to load user data</div>;

  const totalPosts = userData.generatedPosts.length;
  const remainingCredits =
    userData.creditsLimit - userData.creditsUsed;

  const postsThisMonth = userData.generatedPosts.filter(
    post => new Date(post.createdAt).getMonth() === new Date().getMonth()
  ).length;

  const stats: StatItem[] = [
    {
      label: "Total Posts Generated",
      value: totalPosts,
      icon: PenTool,
      color: "primary",
    },
    {
      label: "Remaining Credits",
      value: remainingCredits,
      subtext: `of ${userData.creditsLimit}`,
      icon: Zap,
      color: "warning",
    },
    {
      label: "Current Plan",
      value: userData.plan,
      icon: Target,
      color: "secondary",
    },
    {
      label: "Posts Generated This Month",
      value: postsThisMonth,
      icon: BarChart3,
      color: "success",
    },
  ];

  const recentPosts: RecentPost[] = userData.generatedPosts
    .slice(-3)
    .reverse()
    .map(post => {
      let preview = "";
      try {
        const parsed = JSON.parse(post.content);
        preview = parsed.text?.caption || parsed.caption || post.content;
      } catch {
        preview = post.content;
      }

      return {
        id: post.id,
        platform: post.platform.toLowerCase(),
        preview: preview.substring(0, 100),
        time: getTimeAgo(new Date(post.createdAt)),
        status: "published",
      };
    });

  return (
    <div className="p-8">
      <DashboardHeader name={userData.name} />

      <StatsGrid stats={stats} />

      <div className="grid lg:grid-cols-3 gap-6">
        <BrandProfileCard userData={userData} />
        <WeeklyPlannerPreview postsThisMonth={postsThisMonth} />
        <QuickActions />
      </div>

      {recentPosts.length > 0 && (
        <RecentPostsList
          posts={recentPosts}
          onClick={(id) => {
            setSelectedPostId(id);
            setIsModalOpen(true);
          }}
        />
      )}

      {selectedPostId && (
        <PostDetailsModal
          postId={selectedPostId}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPostId(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;