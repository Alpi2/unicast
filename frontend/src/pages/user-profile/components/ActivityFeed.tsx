import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon.js";
import Image from "../../../components/AppImage.js";

// Types & Interfaces

type ActivityType =
  | "article_published"
  | "article_liked"
  | "comment_posted"
  | "user_followed"
  | "achievement_earned";

interface ArticleTarget {
  type: "article";
  id: string | number;
  title: string;
  thumbnail: string;
  category: string;
}

interface UserTarget {
  type: "user";
  id: string | number;
  name: string;
  username: string;
  avatar: string;
}

interface AchievementTarget {
  type: "achievement";
  title: string;
  description: string;
}

type ActivityTarget = ArticleTarget | UserTarget | AchievementTarget;

export interface Activity {
  id: string | number;
  type: ActivityType;
  description: string;
  timestamp: string;
  target?: ActivityTarget;
}

interface ActivityFeedProps {
  activities: Activity[];
}

// Component

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getActivityIcon = (type: ActivityType): string => {
    switch (type) {
      case "article_published":
        return "FileText";
      case "article_liked":
        return "Heart";
      case "comment_posted":
        return "MessageCircle";
      case "user_followed":
        return "UserPlus";
      case "achievement_earned":
        return "Award";
      default:
        return "Activity";
    }
  };

  const getActivityColor = (type: ActivityType): string => {
    switch (type) {
      case "article_published":
        return "text-primary";
      case "article_liked":
        return "text-error";
      case "comment_posted":
        return "text-accent";
      case "user_followed":
        return "text-success";
      case "achievement_earned":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const activityDate = new Date(dateString);
    // Use getTime() for arithmetic operations in TypeScript
    const diffInHours = Math.floor(
      (now.getTime() - activityDate.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 glassmorphism">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="Activity" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Recent Activity
        </h3>
      </div>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Icon
              name="Activity"
              size={48}
              className="text-muted-foreground mx-auto mb-4"
            />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {/* Activity Icon */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center ${getActivityColor(
                  activity.type
                )}`}
              >
                {/* Icon name is a string so cast to any or use an IconName type */}
                <Icon name={getActivityIcon(activity.type) as any} size={16} />
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm text-foreground">
                    {activity.description}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>

                {/* Activity Target */}
                {activity.target && (
                  <div className="mt-2">
                    {activity.target.type === "article" && (
                      <Link
                        to={`/article-reading?id=${activity.target.id}`}
                        className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg hover:shadow-sm transition-all"
                      >
                        <Image
                          src={activity.target.thumbnail}
                          alt={activity.target.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground truncate">
                            {activity.target.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {activity.target.category}
                          </p>
                        </div>
                      </Link>
                    )}

                    {activity.target.type === "user" && (
                      <Link
                        to={`/user-profile?id=${activity.target.id}`}
                        className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg hover:shadow-sm transition-all"
                      >
                        <Image
                          src={activity.target.avatar}
                          alt={activity.target.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground">
                            {activity.target.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            @{activity.target.username}
                          </p>
                        </div>
                      </Link>
                    )}

                    {activity.target.type === "achievement" && (
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-warning/10 to-accent/10 border border-warning/20 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                          <Icon
                            name="Award"
                            size={16}
                            className="text-warning"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-foreground">
                            {activity.target.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {activity.target.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {activities.length > 0 && (
        <div className="mt-6 text-center">
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            View all activity
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
