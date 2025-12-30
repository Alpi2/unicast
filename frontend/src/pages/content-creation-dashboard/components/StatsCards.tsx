import React from "react";
import Icon from "../../../components/AppIcon.js";

// Types & Interfaces

interface StatItem {
  id: number;
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: string;
  description: string;
}

// Component

const StatsCards: React.FC = () => {
  const stats: StatItem[] = [
    {
      id: 1,
      title: "Total Posts",
      value: "24",
      change: "+12%",
      changeType: "positive",
      icon: "FileText",
      description: "Published articles",
    },
    {
      id: 2,
      title: "Total Views",
      value: "45.2K",
      change: "+8.3%",
      changeType: "positive",
      icon: "Eye",
      description: "This month",
    },
    {
      id: 3,
      title: "Comments",
      value: "1,234",
      change: "+15.2%",
      changeType: "positive",
      icon: "MessageSquare",
      description: "All time",
    },
    {
      id: 4,
      title: "Followers",
      value: "892",
      change: "-2.1%",
      changeType: "negative",
      icon: "Users",
      description: "Active subscribers",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-card border border-border rounded-lg p-6 soft-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`
              w-12 h-12 rounded-lg flex items-center justify-center
              ${
                stat.changeType === "positive"
                  ? "bg-success/10 text-success"
                  : "bg-error/10 text-error"
              }
            `}
            >
              {/* Icon name is a string, so cast to any */}
              <Icon name={stat.icon as any} size={24} />
            </div>
            <div
              className={`
              flex items-center space-x-1 text-sm font-medium
              ${stat.changeType === "positive" ? "text-success" : "text-error"}
            `}
            >
              <Icon
                name={
                  stat.changeType === "positive" ? "TrendingUp" : "TrendingDown"
                }
                size={16}
              />
              <span>{stat.change}</span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-heading font-bold text-foreground">
              {stat.value}
            </h3>
            <p className="text-sm font-medium text-foreground">{stat.title}</p>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
