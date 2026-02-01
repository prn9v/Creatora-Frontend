import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Calendar, Lightbulb, Link, PenTool } from "lucide-react";

const QuickActions = () => (
  <GlassCard
    className="p-6 animate-fade-in"
    style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
  >

    <h2 className="font-heading font-semibold text-lg mb-4">
      Quick Actions
    </h2>
    <div className=" pt-10 space-y-5">
      <Button variant="gradient" className="w-full justify-start" >
        <a href="/generate" className=" flex gap-2 text-md items-center ml-36">
          <PenTool size={18} /> Generate New Post
        </a>
      </Button>
      <Button variant="outline-glow" className="w-full justify-start cursor-pointer" >
        <a href="/ideas" className=" flex gap-2 items-center ml-36">
          <Lightbulb size={18} /> Get Content Ideas
        </a>
      </Button>
      <Button variant="glass" className="w-full justify-start " >
        
        <a href="/planner" className=" flex gap-2 items-center ml-36">
          <Calendar size={18} /> Plan This Week
        </a >
      </Button>
    </div>
  </GlassCard>
);

export default QuickActions;
