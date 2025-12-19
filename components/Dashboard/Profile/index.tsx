'use client'
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  Calendar,
  Camera,
  Save,
  Lock,
  AlertTriangle,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Tech entrepreneur and content creator passionate about startups and productivity.",
    joinDate: "December 2024",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSaveProfile = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Profile updated");
    }, 1000);
  };

  const handleUpdatePassword = () => {
    if (passwords.new !== passwords.confirm) {
      toast("Passwords don't match");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPasswords({ current: "", new: "", confirm: "" });
      toast("Password updated");
    }, 1000);
  };

  return (
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold mb-1">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences.
          </p>
        </div>

        <div className=" space-y-8 gap-6">
          {/* Sidebar - Avatar & Info */}
          <GlassCard className="p-6 text-center lg:sticky lg:top-8 h-fit">
            {/* Avatar */}
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-secondary via-primary to-accent flex items-center justify-center text-3xl font-bold text-primary-foreground">
                JD
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-primary-foreground hover:bg-primary/90 transition-colors shadow-glow-sm">
                <Camera size={14} />
              </button>
            </div>

            <h2 className="font-heading font-semibold text-xl mb-1">{profile.name}</h2>
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
                  <label className="text-sm font-medium mb-2 block">Display Name</label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      value={profile.email}
                      className="pl-10"
                      disabled
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Contact support to change your email
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    className="w-full bg-background-secondary border border-border rounded-lg p-3 text-sm resize-none h-24 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <Button
                  variant="gradient"
                  onClick={handleSaveProfile}
                  isLoading={isLoading}
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
                  <label className="text-sm font-medium mb-2 block">Current Password</label>
                  <Input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">New Password</label>
                  <Input
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Confirm New Password</label>
                  <Input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    placeholder="Confirm new password"
                  />
                </div>

                <Button
                  variant="outline-glow"
                  onClick={handleUpdatePassword}
                  disabled={!passwords.current || !passwords.new || !passwords.confirm}
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
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive">
                <Trash2 size={18} />
                Delete Account
              </Button>
            </GlassCard>
          </div>
        </div>
      </div>
  );
};

export default Profile;
