import { Button } from "@/components/ui/button";
import { ArrowRight, Link, Sparkles } from "lucide-react";

const DashboardHeader = ({ name }: { name: string }) => (
  <div className="flex items-center justify-between mb-8">
    <div>
      <h1 className="font-heading text-3xl font-bold mb-1">
        Welcome back, {name.split(" ")[0]}!
      </h1>
      <p className="text-muted-foreground">
        Here's what's happening with your content.
      </p>
    </div>
    <Button variant="gradient" asChild className="group">
      <Link href="/generate">
        <Sparkles size={18} />
        Generate New Post
        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
      </Link>
    </Button>
  </div>
);

export default DashboardHeader;
