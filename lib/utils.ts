import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Glass card classes
export const glassCard = "backdrop-blur-xl rounded-xl bg-card/50 border border-card-border/50 shadow-[0_4px_24px_-4px_rgba(10,14,26,0.5)]"

export const glassCardHover = `${glassCard} transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.4),0_8px_32px_-8px_rgba(10,14,26,0.6)]`

export const gradientText = "bg-clip-text text-transparent bg-gradient-to-r from-secondary via-primary to-accent"

export const btnGradient = "relative overflow-hidden transition-all duration-200 bg-gradient-to-r from-secondary via-primary to-accent hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] active:scale-[0.98]"

export const btnOutlineGlow = "border border-primary/50 bg-transparent transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]"