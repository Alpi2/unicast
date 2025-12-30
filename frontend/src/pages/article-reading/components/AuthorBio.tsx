import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon.js";
import Image from "../../../components/AppImage.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Author {
  id: string | number;
  name: string;
  avatar?: string;
  title?: string;
  bio?: string;
  articleCount?: number;
  followerCount?: number;
  joinedDate?: string;
  socialLinks?: SocialLink[];
  [key: string]: any; // Allow extra fields for flexibility
}

interface AuthorBioProps {
  author?: Author | null;
  isFollowing?: boolean;
  onFollow?: () => void;
}

// Component

const AuthorBio: React.FC<AuthorBioProps> = ({
  author,
  isFollowing = false,
  onFollow,
}) => {
  // If author data is missing we could return empty or show a skeleton.
  // Current implementation uses optional chaining (?) to continue rendering.

  return (
    <div className="bg-card border border-border rounded-lg p-6 mt-8">
      <div className="flex items-start space-x-4">
        <Link to={`/user-profile?id=${author?.id}`}>
          <Image
            src={author?.avatar || ""}
            alt={author?.name || "Author"}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <Link
                to={`/user-profile?id=${author?.id}`}
                className="text-lg font-heading font-semibold text-foreground hover:text-primary transition-colors"
              >
                {author?.name}
              </Link>
              {author?.title && (
                <p className="text-sm text-muted-foreground mt-1">
                  {author.title}
                </p>
              )}
            </div>
            <Button
              variant={isFollowing ? "outline" : "default"}
              size="sm"
              onClick={onFollow}
              className="ml-4 flex-shrink-0"
            >
              <Icon
                // Dinamik veya conditional string olduğu için 'as any' kullanıyoruz
                name={(isFollowing ? "UserMinus" : "UserPlus") as any}
                size={16}
                className="mr-2"
              />
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </div>

          {author?.bio && (
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              {author.bio}
            </p>
          )}

          <div className="flex items-center space-x-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="FileText" size={16} />
              <span>{author?.articleCount || 0} articles</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} />
              <span>{author?.followerCount || 0} followers</span>
            </div>
            {author?.joinedDate && (
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={16} />
                <span>
                  Joined{" "}
                  {new Date(author.joinedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
            )}
          </div>

          {author?.socialLinks && author.socialLinks.length > 0 && (
            <div className="flex items-center space-x-3 mt-4">
              {author.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title={`Follow on ${link.platform}`}
                >
                  <Icon name={link.icon as any} size={18} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;
