

import { WeeklyPlannerView } from "@/components/Dashboard/Planner";
import { FC } from "react";

const PlannerPage : FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <WeeklyPlannerView />
    </div>
  );
};

export default PlannerPage;