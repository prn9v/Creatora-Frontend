import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glow?: "primary" | "secondary" | "accent" | "none"
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = false, glow = "none", children, ...props }, ref) => {
    const glowClasses = {
      primary: "shadow-[0_0_40px_rgba(139,92,246,0.3)]",
      secondary: "shadow-[0_0_40px_rgba(168,85,247,0.3)]",
      accent: "shadow-[0_0_40px_rgba(34,211,238,0.3)]",
      none: ""
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Solid dark background with subtle transparency
          "bg-[rgb(28,28,40)] backdrop-blur-xl border border-[rgb(48,48,64)] rounded-xl",
          // Hover effects
          hover && "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[rgb(139,92,246)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]",
          // Glow effects
          glow !== "none" && glowClasses[glow],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }