
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Zap,
  FileText,
  Download,
  ArrowUpRight,
  Crown,
  Check,
  PenTool,
  Lightbulb,
  HardDrive,
} from "lucide-react";

const currentPlan = {
  name: "Pro",
  price: 49,
  billingPeriod: "monthly",
  features: [
    "Unlimited posts",
    "Advanced voice learning",
    "All platform templates",
    "Content calendar",
    "Priority support",
    "Analytics dashboard",
  ],
};

const usage = [
  {
    label: "Posts Generated",
    current: 47,
    max: "Unlimited",
    icon: PenTool,
    color: "primary",
  },
  {
    label: "Ideas Generated",
    current: 23,
    max: "Unlimited",
    icon: Lightbulb,
    color: "secondary",
  },
  {
    label: "Storage Used",
    current: 2.3,
    max: 10,
    unit: "GB",
    icon: HardDrive,
    color: "accent",
  },
];

const billingHistory = [
  { date: "Dec 1, 2024", description: "Pro Plan - Monthly", amount: "$49.00", status: "paid" },
  { date: "Nov 1, 2024", description: "Pro Plan - Monthly", amount: "$49.00", status: "paid" },
  { date: "Oct 1, 2024", description: "Pro Plan - Monthly", amount: "$49.00", status: "paid" },
  { date: "Sep 1, 2024", description: "Starter Plan - Monthly", amount: "$19.00", status: "paid" },
];

const Account = () => {
  return (
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold mb-1">Account & Billing</h1>
          <p className="text-muted-foreground">
            Manage your subscription and view usage statistics.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Current Plan */}
          <GlassCard className="p-6 lg:col-span-2">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Crown size={20} className="text-warning" />
                  <h2 className="font-heading font-semibold text-xl">Current Plan</h2>
                </div>
                <div className="flex items-baseline gap-2">
                  <Badge variant="gradient" className="text-sm px-3 py-1">
                    {currentPlan.name}
                  </Badge>
                  <span className="text-muted-foreground text-sm">
                    ${currentPlan.price}/month
                  </span>
                </div>
              </div>
              <Button variant="outline-glow">
                <ArrowUpRight size={16} />
                Upgrade Plan
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {currentPlan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Check size={16} className="text-success" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Next billing date: <span className="text-foreground font-medium">January 1, 2025</span>
              </p>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Cancel Subscription
              </Button>
            </div>
          </GlassCard>

          {/* Payment Method */}
          <GlassCard className="p-6">
            <h2 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
              <CreditCard size={20} className="text-primary" />
              Payment Method
            </h2>
            <div className="bg-background-secondary rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gradient-to-r from-primary to-secondary rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">VISA</span>
                </div>
                <div>
                  <p className="font-mono text-sm">•••• •••• •••• 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/26</p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Update Payment Method
            </Button>
          </GlassCard>
        </div>

        {/* Usage Statistics */}
        <div className="mt-6">
          <h2 className="font-heading font-semibold text-xl mb-4 flex items-center gap-2">
            <Zap size={20} className="text-warning" />
            Usage This Month
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {usage.map((item, index) => (
              <GlassCard
                key={item.label}
                className="p-5 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
              >
                <div className={`w-10 h-10 rounded-lg bg-${item.color}/10 flex items-center justify-center mb-3`}>
                  <item.icon size={20} className={`text-${item.color}`} />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-2xl font-bold">{item.current}</span>
                  {item.unit && <span className="text-muted-foreground">{item.unit}</span>}
                  <span className="text-muted-foreground text-sm">
                    / {typeof item.max === "number" ? `${item.max}${item.unit || ""}` : item.max}
                  </span>
                </div>
                {typeof item.max === "number" && (
                  <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-${item.color} rounded-full transition-all`}
                      style={{ width: `${(item.current / item.max) * 100}%` }}
                    />
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Usage resets on January 1, 2025
          </p>
        </div>

        {/* Billing History */}
        <div className="mt-8">
          <h2 className="font-heading font-semibold text-xl mb-4 flex items-center gap-2">
            <FileText size={20} className="text-accent" />
            Billing History
          </h2>
          <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Description</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((item, index) => (
                    <tr key={index} className="border-b border-border last:border-0">
                      <td className="p-4 text-sm">{item.date}</td>
                      <td className="p-4 text-sm">{item.description}</td>
                      <td className="p-4 text-sm font-mono">{item.amount}</td>
                      <td className="p-4">
                        <Badge variant="success" className="capitalize">
                          {item.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm">
                          <Download size={14} />
                          PDF
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </div>
  );
};

export default Account;
