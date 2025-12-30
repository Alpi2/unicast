import React, { useState } from "react";
import Image from "../../../components/AppImage.js";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface User {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  isVerified: boolean;
  location: string;
  joinedDate: string;
  socialLinks?: SocialLink[];
}

interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onEditProfile?: () => void;
  onImageUpload: (file: File) => void;
}

// Component

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  isOwnProfile = false,
  isFollowing = false,
  onFollow,
  onEditProfile,
  onImageUpload,
}) => {
  const [isEditingBio, setIsEditingBio] = useState<boolean>(false);
  // If `user.bio` is undefined, use an empty string
  const [bioText, setBioText] = useState<string>(user.bio || "");
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false);

  const handleBioSave = () => {
    setIsEditingBio(false);
    // Save bio logic would go here
    // Typically an `onSaveBio(bioText)` prop would be called here
  };

  const handleImageClick = () => {
    if (isOwnProfile) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";

      input.onchange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files[0]) {
          onImageUpload(target.files[0]);
        }
      };

      input.click();
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 mb-8 glassmorphism">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* Profile Image */}
        <div
          className="relative group cursor-pointer"
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
          onClick={handleImageClick}
        >
          <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-background shadow-lg">
            <Image
              src={user.avatar}
              alt={`${user.name}'s profile`}
              className="w-full h-full object-cover"
            />
          </div>
          {isOwnProfile && (
            <div
              className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-opacity duration-200 ${
                isImageHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Icon name="Camera" size={24} className="text-white" />
            </div>
          )}
          {user.isVerified && (
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-background">
              <Icon name="Check" size={16} className="text-white" />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                {user.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-2">
                @{user.username}
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="MapPin" size={16} />
                  {user.location}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={16} />
                  Joined {user.joinedDate}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-4 lg:mt-0">
              {isOwnProfile ? (
                <Button
                  variant="outline"
                  iconName="Edit"
                  iconPosition="left"
                  onClick={onEditProfile}
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant={isFollowing ? "outline" : "default"}
                    iconName={isFollowing ? "UserMinus" : "UserPlus"}
                    iconPosition="left"
                    onClick={onFollow}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="MessageCircle" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="Share2" size={20} />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            {isEditingBio && isOwnProfile ? (
              <div className="space-y-3">
                <textarea
                  value={bioText}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setBioText(e.target.value)
                  }
                  className="w-full p-3 border border-border rounded-lg bg-input text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={3}
                  maxLength={160}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {bioText.length}/160 characters
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEditingBio(false)}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleBioSave}>
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <p className="text-foreground leading-relaxed max-w-2xl">
                  {user.bio}
                </p>
                {isOwnProfile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setIsEditingBio(true)}
                  >
                    <Icon name="Edit2" size={16} />
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center lg:justify-start gap-4">
            {user.socialLinks &&
              user.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon name={link.icon as any} size={16} />
                  <span className="text-sm">{link.platform}</span>
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
