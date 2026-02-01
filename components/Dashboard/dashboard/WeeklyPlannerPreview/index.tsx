import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowRight, Calendar, Link } from "lucide-react";

const WeeklyPlannerPreview = ({ postsThisMonth }: { postsThisMonth: number }) => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-semibold text-lg">This Week</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/planner">
            View Full
            <ArrowRight size={14} />
          </Link>
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={`flex-shrink-0 w-16 p-3 rounded-lg text-center border ${
              index === 0
                ? "border-primary bg-primary/10"
                : "border-border bg-background-secondary"
            }`}
          >
            <p className="text-xs text-muted-foreground mb-1">{day}</p>
            <p className="text-sm font-medium">{17 + index}</p>
            {index < 3 && (
              <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-2" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <Calendar size={14} className="text-primary" />
        <span>{postsThisMonth} posts this month</span>
      </div>
    </GlassCard>
  );
};

export default WeeklyPlannerPreview;