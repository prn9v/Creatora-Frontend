import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatItem } from "@/types/User";
import { TrendingDown, TrendingUp } from "lucide-react";

const StatsGrid = ({ stats }: { stats: StatItem[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    {stats.map((stat, index) => (
      <GlassCard
        key={stat.label}
        className="p-5 animate-fade-in"
        style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
            <stat.icon size={20} className={`text-${stat.color}`} />
          </div>

          {stat.change && stat.trend && (
            <Badge variant={stat.trend === "up" ? "success" : "destructive"} className="text-xs">
              {stat.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {stat.change}
            </Badge>
          )}
        </div>

        <div className="font-mono text-3xl font-bold mb-1">
          {stat.value}
          {stat.subtext && (
            <span className="text-sm text-muted-foreground font-normal ml-1">
              {stat.subtext}
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground">{stat.label}</p>

        {stat.progress !== undefined && (
          <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-warning rounded-full transition-all"
              style={{ width: `${stat.progress}%` }}
            />
          </div>
        )}
      </GlassCard>
    ))}
  </div>
);

export default StatsGrid;