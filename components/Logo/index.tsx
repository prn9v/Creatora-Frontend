import { Sparkles } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-accent rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative h-full w-full bg-gradient-to-br from-secondary via-primary to-accent rounded-xl flex items-center justify-center">
          <Sparkles className="text-primary-foreground" size={size === "sm" ? 16 : size === "md" ? 20 : 24} />
        </div>
      </div>
      {showText && (
        <span className={`font-heading font-bold ${textSizeClasses[size]} gradient-text`}>
          CREATORA
        </span>
      )}
    </Link>
  );
};

export default Logo;
