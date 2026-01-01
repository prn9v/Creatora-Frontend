import { ShieldCheck, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface VerifyStepProps {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
  isLoading: boolean;
  onOtpChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const VerifyStep = ({
  email,
  otp,
  newPassword,
  confirmPassword,
  isLoading,
  onOtpChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onBack,
}: VerifyStepProps) => {
  return (
    <>
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
          <ShieldCheck className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Verify & Reset</h1>
        <p className="text-muted-foreground">
          Enter the OTP sent to <span className="text-primary">{email}</span>
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <Input
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => onOtpChange(e.target.value)}
          maxLength={6}
          className="text-center tracking-widest"
        />

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <KeyRound className="w-4 h-4" />
            New Password
          </label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => onNewPasswordChange(e.target.value)}
          />
        </div>

        <Input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Resetting Password..." : "Reset Password"}
        </Button>

        <button
          type="button"
          onClick={onBack}
          className="w-full text-sm text-muted-foreground"
        >
          Didn’t receive code? Go back
        </button>
      </form>
    </>
  );
};

export default VerifyStep;
