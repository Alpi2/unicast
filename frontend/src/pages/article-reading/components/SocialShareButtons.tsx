import React, { useState } from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface ShareArticle {
  id: string | number;
  title: string;
  [key: string]: any;
}

interface SocialShareButtonsProps {
  article?: ShareArticle | null;
  isSticky?: boolean;
}

interface ShareOption {
  name: string;
  icon: string;
  url: string;
  color: string;
}

// Component

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  article,
  isSticky = false,
}) => {
  const [showShareMenu, setShowShareMenu] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // SSR (Server Side Rendering) check: window may be undefined
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = article ? `${origin}/article-reading?id=${article.id}` : "";
  const shareText = article ? `Check out this article: ${article.title}` : "";

  const shareOptions: ShareOption[] = [
    {
      name: "Twitter",
      icon: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
      color: "text-blue-500",
    },
    {
      name: "Facebook",
      icon: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      color: "text-blue-600",
    },
    {
      name: "LinkedIn",
      icon: "Linkedin",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      color: "text-blue-700",
    },
    {
      name: "WhatsApp",
      icon: "MessageCircle",
      url: `https://wa.me/?text=${encodeURIComponent(
        `${shareText} ${shareUrl}`
      )}`,
      color: "text-green-600",
    },
  ];

  const handleShare = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "width=600,height=400");
      setShowShareMenu(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleNativeShare = async () => {
    // TypeScript may not always recognize navigator.share; cast to any for safety.
    const nav = navigator as any;

    if (nav.share) {
      try {
        await nav.share({
          title: article?.title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  if (isSticky) {
    return (
      <div className="hidden md:block fixed left-6 top-1/2 transform -translate-y-1/2 z-30">
        <div className="bg-background/95 border border-border rounded-lg p-2 glassmorphism">
          <div className="flex flex-col space-y-2">
            {shareOptions.map((option) => (
              <Button
                key={option.name}
                variant="ghost"
                size="icon"
                onClick={() => handleShare(option.url)}
                className={`${option.color} hover:bg-muted`}
                title={`Share on ${option.name}`}
              >
                {/* Icon name comes from a string, so cast to any */}
                <Icon name={option.icon as any} size={18} />
              </Button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyLink}
              className={copySuccess ? "text-success" : "text-muted-foreground"}
              title="Copy link"
            >
              <Icon name={copySuccess ? "Check" : "Link"} size={18} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Mobile FAB */}
      <div className="md:hidden fixed bottom-6 left-6 z-40">
        <Button
          variant="default"
          size="icon"
          onClick={handleNativeShare}
          className="w-12 h-12 rounded-full shadow-lg"
        >
          <Icon name="Share" size={20} />
        </Button>
      </div>
      {/* Desktop Inline Buttons */}
      <div className="hidden md:flex items-center space-x-3 py-4">
        <span className="text-sm font-medium text-muted-foreground">
          Share:
        </span>
        {shareOptions.map((option) => (
          <Button
            key={option.name}
            variant="outline"
            size="sm"
            onClick={() => handleShare(option.url)}
            className={`${option.color} border-current hover:bg-current hover:text-white`}
          >
            <Icon name={option.icon as any} size={16} className="mr-2" />
            {option.name}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className={copySuccess ? "text-success border-success" : ""}
        >
          <Icon
            name={copySuccess ? "Check" : "Link"}
            size={16}
            className="mr-2"
          />
          {copySuccess ? "Copied!" : "Copy Link"}
        </Button>
      </div>
      {/* Share Menu for devices without native share */}
      {showShareMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background border border-border rounded-lg p-6 m-4 max-w-sm w-full glassmorphism">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-medium">Share Article</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowShareMenu(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  variant="outline"
                  onClick={() => handleShare(option.url)}
                  className="flex items-center justify-center space-x-2 p-3"
                >
                  <Icon
                    name={option.icon as any}
                    size={20}
                    className={option.color}
                  />
                  <span>{option.name}</span>
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={handleCopyLink}
              className="w-full mt-3 flex items-center justify-center space-x-2"
            >
              <Icon name={copySuccess ? "Check" : "Link"} size={16} />
              <span>{copySuccess ? "Link Copied!" : "Copy Link"}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShareButtons;
