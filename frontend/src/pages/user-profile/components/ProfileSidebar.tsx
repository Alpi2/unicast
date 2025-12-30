import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon.js";
import Image from "../../../components/AppImage.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface ProfileUser {
  name: string;
  joinedDate: string;
}

interface RelatedAuthor {
  id: string | number;
  name: string;
  avatar: string;
  articlesCount: number;
}

interface Activity {
  id: string | number;
  description: string;
  timeAgo: string;
}

interface ProfileSidebarProps {
  user: ProfileUser;
  relatedAuthors?: RelatedAuthor[];
  recentActivity?: Activity[];
}

// Component

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  user,
  relatedAuthors = [],
  recentActivity = [],
}) => {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="bg-card border border-border rounded-xl p-6 glassmorphism">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Quick Stats
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Articles this month
            </span>
            <span className="font-medium text-foreground">12</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Avg. reading time
            </span>
            <span className="font-medium text-foreground">5 min</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Response rate</span>
            <span className="font-medium text-foreground">94%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Member since</span>
            <span className="font-medium text-foreground">
              {user.joinedDate}
            </span>
          </div>
        </div>
      </div>

      {/* Related Authors */}
      <div className="bg-card border border-border rounded-xl p-6 glassmorphism">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">
            Similar Authors
          </h3>
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </div>
        <div className="space-y-3">
          {relatedAuthors.map((author) => (
            <Link
              key={author.id}
              to={`/user-profile?id=${author.id}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Image
                src={author.avatar}
                alt={author.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {author.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {author.articlesCount} articles
                </p>
              </div>
              <Button variant="ghost" size="sm">
                Follow
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="bg-card border border-border rounded-xl p-6 glassmorphism">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.timeAgo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6 glassmorphism">
        <div className="text-center">
          <Icon name="Mail" size={32} className="text-primary mx-auto mb-3" />
          <h3 className="font-heading font-semibold text-foreground mb-2">
            Stay Updated
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get notified when {user.name} publishes new articles
          </p>
          <Button className="w-full" iconName="Bell" iconPosition="left">
            Subscribe
          </Button>
        </div>
      </div>

      {/* Share Profile */}
      <div className="bg-card border border-border rounded-xl p-6 glassmorphism">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Share Profile
        </h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Icon name="Twitter" size={16} />
          </Button>
          <Button variant="outline" size="icon">
            <Icon name="Facebook" size={16} />
          </Button>
          <Button variant="outline" size="icon">
            <Icon name="Linkedin" size={16} />
          </Button>
          <Button variant="outline" size="icon">
            <Icon name="Link" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
