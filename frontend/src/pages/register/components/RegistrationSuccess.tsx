import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface RegistrationSuccessProps {
  email: string;
  onResendVerification: (email: string) => Promise<void>;
}

// Component

const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({
  email,
  onResendVerification,
}) => {
  const [countdown, setCountdown] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendClick = async () => {
    setIsResending(true);
    try {
      await onResendVerification(email);
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      console.error("Failed to resend verification email:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-xl p-6 soft-shadow glassmorphism text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={32} className="text-success" />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Account Created Successfully!
        </h1>

        <p className="text-muted-foreground mb-6">
          We've sent a verification email to{" "}
          <span className="font-medium text-foreground">{email}</span>
        </p>

        {/* Email Verification Instructions */}
        <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
          <h3 className="font-heading font-medium text-foreground mb-2 flex items-center">
            <Icon name="Mail" size={16} className="mr-2" />
            Next Steps
          </h3>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Check your email inbox (and spam folder)</li>
            <li>Click the verification link in the email</li>
            <li>Return here to start creating content</li>
          </ol>
        </div>

        {/* Resend Verification */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Didn't receive the email?
          </p>

          {canResend ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResendClick}
              loading={isResending}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Resend Verification Email
            </Button>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>Resend available in {countdown}s</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3 mt-6 pt-6 border-t border-border">
          <Link to="/login">
            <Button variant="default" size="lg" fullWidth>
              Continue to Sign In
            </Button>
          </Link>

          <Link to="/homepage">
            <Button variant="ghost" size="sm" fullWidth>
              Browse Content
            </Button>
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">
            Need help with verification?
          </p>
          <div className="flex justify-center space-x-4 text-xs">
            <Link to="/help" className="text-primary hover:text-primary/80">
              Help Center
            </Link>
            <span className="text-border">•</span>
            <Link to="/contact" className="text-primary hover:text-primary/80">
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      {/* Welcome Tips */}
      <div className="mt-6 bg-card border border-border rounded-xl p-4 soft-shadow">
        <h3 className="font-heading font-medium text-foreground mb-3 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-accent" />
          While You Wait
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start space-x-2">
            <Icon name="BookOpen" size={14} className="mt-0.5 text-primary" />
            <span>Explore trending articles on our homepage</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="Users" size={14} className="mt-0.5 text-primary" />
            <span>Follow your favorite authors and topics</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="PenTool" size={14} className="mt-0.5 text-primary" />
            <span>Start drafting your first article</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
