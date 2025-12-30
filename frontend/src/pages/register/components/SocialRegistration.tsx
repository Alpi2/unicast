import React from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface SocialProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
  textColor: string;
}

interface SocialRegistrationProps {
  onSocialRegister: (providerId: string) => void;
  isLoading: boolean;
}

// Component

const SocialRegistration: React.FC<SocialRegistrationProps> = ({
  onSocialRegister,
  isLoading,
}) => {
  const socialProviders: SocialProvider[] = [
    {
      id: "google",
      name: "Google",
      icon: "Chrome",
      color: "hover:bg-red-50 hover:border-red-200",
      textColor: "text-red-600",
    },
    {
      id: "github",
      name: "GitHub",
      icon: "Github",
      color: "hover:bg-gray-50 hover:border-gray-200",
      textColor: "text-gray-700",
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: "Twitter",
      color: "hover:bg-blue-50 hover:border-blue-200",
      textColor: "text-blue-600",
    },
  ];

  const handleSocialClick = (providerId: string) => {
    if (onSocialRegister) {
      onSocialRegister(providerId);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => handleSocialClick(provider.id)}
            disabled={isLoading}
            className={`transition-colors ${provider.color} group`}
          >
            <div className="flex items-center justify-center space-x-3">
              {/* Icon name is a string so cast to any */}
              <Icon
                name={provider.icon as any}
                size={18}
                className={`${provider.textColor} group-hover:scale-110 transition-transform`}
              />
              <span className="font-medium">Continue with {provider.name}</span>
            </div>
          </Button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SocialRegistration;
