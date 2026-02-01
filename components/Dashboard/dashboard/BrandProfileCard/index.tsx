import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/GlassCard";
import { UserData } from "@/types/User";
import { Link } from "lucide-react";

const BrandProfileCard = ({ userData }: { userData: UserData }) => (
  <GlassCard className="p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-heading font-semibold text-lg">Brand Profile</h2>
      <Button>
        <a href="/profile"> Edit </a>
      </Button>
    </div>

    <div className="space-y-4">
      {userData.brandProfile ? (
        <>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Tone</p>
            <Badge variant="glass">
              {userData.brandProfile.tone.charAt(0) +
                userData.brandProfile.tone.slice(1).toLowerCase()}
            </Badge>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">Niche</p>
            <p className="text-sm">{userData.brandProfile.niche}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1">
              Target Audience
            </p>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {userData.brandProfile.audience}
            </p>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          No brand profile set up yet
        </p>
      )}
    </div>

    <Button variant="outline" className="w-full mt-4 cursor-pointer" >
      <a href="/onboarding/brand">
        {userData.brandProfile ? "Update" : "Create"} Brand Settings
      </a>
    </Button>
  </GlassCard>
);

export default BrandProfileCard;
