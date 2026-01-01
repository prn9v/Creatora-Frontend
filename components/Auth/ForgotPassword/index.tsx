"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import Logo from "@/components/Logo";
import { toast } from "sonner";
import Link from "next/link";
import VerifyStep from "./VerifyStep";
import EmailStep from "./EmailStep";
import axios from "axios";
import { getBackendUrl } from "@/lib/env";
import { useRouter } from "next/navigation";

type Step = "email" | "verify";

const ForgotPassword = () => {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email required");
      return;
    }

    try {
      setIsLoading(true);

      await axios.post(`${getBackendUrl()}/users/auth/forgot-password`, {
        email,
      });

      toast.success("OTP sent successfully");
      setStep("verify");
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || !newPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);

      await axios.post(
        `${getBackendUrl()}/users/auth/reset-password`,
        {
          email,
          otp,
          newPassword,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Password reset successful");
    } catch (error) {
      toast.error("Invalid OTP or reset failed");
    } finally {
      setIsLoading(false);
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/login" className="inline-flex items-center gap-2 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        <GlassCard className="p-8">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>

          {step === "email" ? (
            <EmailStep
              email={email}
              isLoading={isLoading}
              onEmailChange={setEmail}
              onSubmit={handleSendOtp}
            />
          ) : (
            <VerifyStep
              email={email}
              otp={otp}
              newPassword={newPassword}
              confirmPassword={confirmPassword}
              isLoading={isLoading}
              onOtpChange={setOtp}
              onNewPasswordChange={setNewPassword}
              onConfirmPasswordChange={setConfirmPassword}
              onSubmit={handleVerifyOtp}
              onBack={() => setStep("email")}
            />
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default ForgotPassword;
