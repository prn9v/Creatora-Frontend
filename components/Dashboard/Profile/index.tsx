"use client";

import { useState } from "react";
import { useEffect, useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Calendar,
  Camera,
  Save,
  Lock,
  AlertTriangle,
  Trash2,
  User,
  EyeOff,
  Eye,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { getBackendUrl } from "@/lib/env";
import { MeResponse } from "@/types/User";

const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get<MeResponse>(
          `${getBackendUrl()}/users/auth/me`,
          { withCredentials: true },
        );

        const user = res.data;

        setProfile({
          name: user.name,
          email: user.email,
          bio: user.bio ?? "",
          joinDate: new Date(user.createdAt).toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          }),
          profileImageUrl: user.profileImageUrl ?? "",
        });
      } catch (error) {
        const err = error as AxiosError<{ message?: string }>;
        toast.error(err.response?.data?.message ?? "Failed to load profile");
      }
    };

    fetchMe();
  }, []);

  const getInitials = (name: string) => {
    if (!name?.trim()) return "U";

    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";

    return (first + last).toUpperCase();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    joinDate: "",
    profileImageUrl: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const router = useRouter();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    setIsUploadingImage(true);

    try {
      // Upload image to get URL
      const formData = new FormData();
      formData.append('image', file);

      const uploadResponse = await axios.post<{ url: string; publicId: string }>(
        `${getBackendUrl()}/image/upload`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const imageUrl = uploadResponse.data.url;

      // Update profile with new image URL
      await axios.put(
        `${getBackendUrl()}/users/profile/update-profile`,
        {
          name: profile.name,
          email: profile.email,
          bio: profile.bio,
          profileImageUrl: imageUrl,
        },
        { withCredentials: true }
      );

      // Update local state
      setProfile((prev) => ({
        ...prev,
        profileImageUrl: imageUrl,
      }));

      toast.success("Profile picture updated successfully");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message ?? "Failed to upload image");
    } finally {
      setIsUploadingImage(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);

    try {
      await axios.put(
        `${getBackendUrl()}/users/profile/update-profile`,
        {
          name: profile.name,
          email: profile.email,
          bio: profile.bio,
          profileImageUrl: profile.profileImageUrl,
        },
        { withCredentials: true },
      );

      toast.success("Profile updated successfully");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message ?? "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await axios.put(
        `${getBackendUrl()}/users/auth/update-password`,
        {
          currentPassword: passwords.current,
          newPassword: passwords.new,
          confirmNewPassword: passwords.confirm,
        },
        { withCredentials: true },
      );

      toast.success("Password updated successfully");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      toast.error(err.response?.data?.message ?? "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error("Password is required to delete your account");
      return;
    }

    setIsLoading(true);

    try {
      await axios.delete(`${getBackendUrl()}/users/auth`, {
        data: { password: deletePassword },
        withCredentials: true,
      });

      toast.success("Account deleted successfully");

      router.push("/");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error(err.response?.data?.message ?? "Failed to delete account");
      toast.error(err.response?.data?.message ?? "Failed to delete account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold mb-1">
          Profile Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences.
        </p>
      </div>

      <div className=" space-y-8 gap-6">
        {/* Sidebar - Avatar & Info */}
        <GlassCard className="p-6 text-center lg:sticky lg:top-8 h-fit">
          <div className="relative w-24 h-24 mx-auto mb-4">
            {profile.profileImageUrl ? (
              <img
                src={profile.profileImageUrl}
                alt={`${profile.name} profile`}
                className="w-full h-full rounded-full object-cover border border-border shadow-glow-sm"
                onError={(e) => {
                  // if image fails to load, fallback to initials
                  e.currentTarget.style.display = "none";
                  setProfile((prev) => ({ ...prev, profileImageUrl: "" }));
                }}
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-secondary via-primary to-accent flex items-center justify-center text-3xl font-bold text-primary-foreground">
                {getInitials(profile.name)}
              </div>
            )}

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Camera button */}
            <button
              type="button"
              onClick={handleImageClick}
              disabled={isUploadingImage}
              className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-primary-foreground hover:bg-primary/90 transition-colors shadow-glow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isUploadingImage ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Camera size={14} />
              )}
            </button>
          </div>

          <h2 className="font-heading font-semibold text-xl mb-1">
            {profile.name}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">{profile.email}</p>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Calendar size={14} />
            <span>Joined {profile.joinDate}</span>
          </div>
        </GlassCard>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <GlassCard className="p-6">
            <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
              <User size={20} className="text-primary" />
              Personal Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Display Name
                </label>
                <Input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <Input value={profile.email} className="pl-10" disabled />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Contact support to change your email
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  placeholder="Tell us about yourself..."
                  className="w-full bg-background-secondary border border-border rounded-lg p-3 text-sm resize-none h-24 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <Button
                variant="gradient"
                onClick={handleSaveProfile}
                isLoading={isLoading}
                className="cursor-pointer"
              >
                <Save size={18} />
                Save Changes
              </Button>
            </div>
          </GlassCard>

          {/* Password */}
          <GlassCard className="p-6">
            <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
              <Lock size={20} className="text-secondary" />
              Change Password
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Current Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword.current ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords({ ...passwords, current: e.target.value })
                    }
                    placeholder="Enter current password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        current: !showPassword.current,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPassword.current ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword.new ? "text" : "password"}
                    value={passwords.new}
                    onChange={(e) =>
                      setPasswords({ ...passwords, new: e.target.value })
                    }
                    placeholder="Enter new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        new: !showPassword.new,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPassword.new ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword.confirm ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords({ ...passwords, confirm: e.target.value })
                    }
                    placeholder="Confirm new password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        confirm: !showPassword.confirm,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPassword.confirm ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <Button
                variant="outline-glow"
                onClick={handleUpdatePassword}
                disabled={
                  !passwords.current || !passwords.new || !passwords.confirm
                }
                className="cursor-pointer"
              >
                Update Password
              </Button>
            </div>
          </GlassCard>

          {/* Danger Zone */}
          <GlassCard className="p-6 border-destructive/30 bg-destructive/5">
            <h3 className="font-heading font-semibold text-lg mb-2 flex items-center gap-2 text-destructive">
              <AlertTriangle size={20} />
              Danger Zone
            </h3>

            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-destructive">
                  Confirm Password
                </label>

                <div className="relative">
                  <Input
                    type={showDeletePassword ? "text" : "password"}
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="Enter your password to confirm"
                    className="pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowDeletePassword(!showDeletePassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showDeletePassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <Button
                className="cursor-pointer"
                variant="destructive"
                onClick={handleDeleteAccount}
                isLoading={isLoading}
                disabled={!deletePassword}
              >
                <Trash2 size={18} />
                Delete Account
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;