import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon.js";

// Data types
interface Location {
  country: string;
  visitors: number;
  flag: string;
}

interface Activity {
  id: number;
  action: string;
  time: string;
  type: "visitor" | "share" | "comment" | "view" | string;
}

const RealTimeVisitors: React.FC = () => {
  const [currentVisitors, setCurrentVisitors] = useState<number>(247);
  // Because the initial value is an empty array, we must specify the generic type
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  const locations: Location[] = [
    { country: "United States", visitors: 89, flag: "🇺🇸" },
    { country: "United Kingdom", visitors: 45, flag: "🇬🇧" },
    { country: "Canada", visitors: 32, flag: "🇨🇦" },
    { country: "Germany", visitors: 28, flag: "🇩🇪" },
    { country: "Australia", visitors: 21, flag: "🇦🇺" },
    { country: "France", visitors: 18, flag: "🇫🇷" },
    { country: "Japan", visitors: 14, flag: "🇯🇵" },
  ];

  useEffect(() => {
    const activities: Activity[] = [
      {
        id: 1,
        action: "New visitor from New York",
        time: "2 seconds ago",
        type: "visitor",
      },
      {
        id: 2,
        action: "Article shared: 'React Best Practices'",
        time: "15 seconds ago",
        type: "share",
      },
      {
        id: 3,
        action: "Comment posted on 'JavaScript Tips'",
        time: "32 seconds ago",
        type: "comment",
      },
      {
        id: 4,
        action: "New visitor from London",
        time: "45 seconds ago",
        type: "visitor",
      },
      {
        id: 5,
        action: "Article viewed: 'CSS Grid Guide'",
        time: "1 minute ago",
        type: "view",
      },
    ];
    setRecentActivity(activities);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setCurrentVisitors((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // The icon component expects string literals so we set the return type to 'any' to suppress the error.
  const getActivityIcon = (type: string): any => {
    switch (type) {
      case "visitor":
        return "Users";
      case "share":
        return "Share2";
      case "comment":
        return "MessageCircle";
      case "view":
        return "Eye";
      default:
        return "Activity";
    }
  };

  const getActivityColor = (type: string): string => {
    switch (type) {
      case "visitor":
        return "text-primary";
      case "share":
        return "text-success";
      case "comment":
        return "text-accent";
      case "view":
        return "text-secondary";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Visitors */}
      <div className="bg-card border border-border rounded-lg p-6 soft-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Real-Time Visitors
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-success font-medium">Live</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-4xl font-heading font-bold text-primary mb-2">
            {currentVisitors}
          </p>
          <p className="text-sm text-muted-foreground">
            Active users right now
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <h4 className="font-heading font-medium text-sm text-foreground">
            Top Locations
          </h4>
          {locations?.slice(0, 5).map((location, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{location.flag}</span>
                <span className="text-sm text-foreground">
                  {location.country}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(location.visitors / 89) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-8 text-right">
                  {location.visitors}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6 soft-shadow">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {recentActivity?.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div
                className={`p-1 rounded-full ${getActivityColor(
                  activity.type
                )}`}
              >
                <Icon name={getActivityIcon(activity.type)} size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealTimeVisitors;
