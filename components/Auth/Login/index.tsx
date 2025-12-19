"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/GlassCard";
import Logo from "@/components/Logo";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { getBackendUrl } from "@/lib/env";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(
        `${getBackendUrl()}/users/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error) {
      let message = "Invalid email or password";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.message ??
          error.response?.data?.error ??
          message;
      }

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      <div className="absolute inset-0 hero-mesh" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

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
              Welcome back
            </h1>
            <p className="text-muted-foreground text-sm">
              Log in to continue creating amazing content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium pb-2 pl-2">
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
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium pl-2 ">Password</label>
                <a href="#" className="text-sm text-primary hover:underline cursor-pointer">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full group cursor-pointer"
              isLoading={isLoading}
            >
              Log in
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up for free
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Login;
