"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/GlassCard";
import Logo from "@/components/Logo";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { getBackendUrl } from "@/lib/env";
import axios from "axios";

type ApiErrorResponse = {
  message?: string;
  error?: string;
  errors?: Array<{ message?: string }>;
};

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "Contains uppercase", met: /[A-Z]/.test(formData.password) },
    { label: "Contains number", met: /[0-9]/.test(formData.password) },
  ];

  const passwordStrength = passwordRequirements.filter((r) => r.met).length;
  const isPasswordValid = passwordStrength === passwordRequirements.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error("Please meet all password requirements.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${getBackendUrl()}/users/auth/signup`, {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      toast.success("Successfully created account");
      router.push("/onboarding/brand");
    } catch (err: unknown) {
      let message = "Something went wrong. Please try again.";

      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        // try different common backend response formats
        message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.response?.data?.errors?.[0]?.message ||
          err.message ||
          message;

        // Optional: customize common status codes
        if (err.response?.status === 409) {
          message = "An account with this email already exists.";
        }
        if (err.response?.status === 400) {
          message = message || "Invalid signup details.";
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      toast.error(message);
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div className="absolute inset-0 hero-mesh" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <Logo size="lg" />
        </div>

        <GlassCard
          className="p-8 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold mb-2">
              Create your account
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="space-y-10">
              <label className="text-sm font-medium pb-2 pl-2">Full name</label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="John Doe"
                  className="pl-10"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium pl-2 pb-2">
                Email address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium pb-2 pl-2">Password</label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="pl-10 pr-10 cursor-pointer"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password Strength */}
              {formData.password && (
                <div className="space-y-2 pt-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-colors",
                          passwordStrength >= level
                            ? passwordStrength === 3
                              ? "bg-success"
                              : passwordStrength === 2
                              ? "bg-warning"
                              : "bg-destructive"
                            : "bg-muted"
                        )}
                      />
                    ))}
                  </div>
                  <ul className="space-y-1">
                    {passwordRequirements.map((req) => (
                      <li
                        key={req.label}
                        className={cn(
                          "flex items-center gap-2 text-xs",
                          req.met ? "text-success" : "text-muted-foreground"
                        )}
                      >
                        {req.met ? <Check size={12} /> : <X size={12} />}
                        {req.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full group cursor-pointer"
              isLoading={isLoading}
            >
              Create Account
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium cursor-pointer"
            >
              Log in
            </Link>
          </div>
        </GlassCard>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing up, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
