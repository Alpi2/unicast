import React, { useState } from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface Guideline {
  title: string;
  description: string;
}

interface Rule {
  rule: string;
  description: string;
  status: "active" | "inactive" | string;
  flagged: number;
}

interface Stat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | string;
}

interface TabItem {
  id: string;
  label: string;
  icon: string;
}

// Component

const ModerationSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("guidelines");

  const moderationGuidelines: Guideline[] = [
    {
      title: "Respectful Communication",
      description:
        "Comments should maintain a respectful tone and avoid personal attacks or harassment.",
    },
    {
      title: "Relevant Content",
      description:
        "Comments should be relevant to the article topic and contribute meaningfully to the discussion.",
    },
    {
      title: "No Spam or Self-Promotion",
      description:
        "Avoid repetitive content, excessive links, or promotional material unrelated to the discussion.",
    },
    {
      title: "Factual Accuracy",
      description:
        "Encourage fact-based discussions and flag misinformation when identified.",
    },
    {
      title: "Privacy Respect",
      description:
        "Do not share personal information of others or violate privacy expectations.",
    },
  ];

  const automatedRules: Rule[] = [
    {
      rule: "Spam Detection",
      description: "Comments with spam score >80% are automatically flagged",
      status: "active",
      flagged: 23,
    },
    {
      rule: "Profanity Filter",
      description: "Comments containing profanity are held for review",
      status: "active",
      flagged: 12,
    },
    {
      rule: "Link Limit",
      description: "Comments with >3 links are automatically flagged",
      status: "active",
      flagged: 8,
    },
    {
      rule: "Duplicate Detection",
      description: "Identical comments from same user are flagged",
      status: "active",
      flagged: 5,
    },
  ];

  const communityStats: Stat[] = [
    { label: "Total Comments", value: "12,847", change: "+5.2%", trend: "up" },
    { label: "Pending Review", value: "156", change: "-12%", trend: "down" },
    { label: "Approved Today", value: "89", change: "+18%", trend: "up" },
    { label: "Spam Blocked", value: "34", change: "+8%", trend: "up" },
    { label: "Active Discussions", value: "234", change: "+3%", trend: "up" },
    { label: "User Reports", value: "7", change: "-25%", trend: "down" },
  ];

  const tabs: TabItem[] = [
    { id: "guidelines", label: "Guidelines", icon: "BookOpen" },
    { id: "rules", label: "Auto Rules", icon: "Settings" },
    { id: "stats", label: "Statistics", icon: "BarChart3" },
  ];

  return (
    <div className="w-80 bg-card border border-border rounded-lg h-fit">
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-primary border-b-2 border-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {/* Icon name is a string, so cast to any */}
            <Icon name={tab.icon as any} size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === "guidelines" && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="BookOpen" size={20} className="text-primary" />
              <h3 className="font-heading font-semibold text-foreground">
                Moderation Guidelines
              </h3>
            </div>

            <div className="space-y-4">
              {moderationGuidelines.map((guideline, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">
                    {guideline.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {guideline.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <Button
                variant="outline"
                className="w-full"
                iconName="ExternalLink"
                iconPosition="left"
              >
                View Full Guidelines
              </Button>
            </div>
          </div>
        )}

        {activeTab === "rules" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Settings" size={20} className="text-primary" />
                <h3 className="font-heading font-semibold text-foreground">
                  Automated Rules
                </h3>
              </div>
              <Button variant="ghost" size="sm" iconName="Plus">
                Add Rule
              </Button>
            </div>

            <div className="space-y-3">
              {automatedRules.map((rule, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{rule.rule}</h4>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          rule.status === "active"
                            ? "bg-success"
                            : "bg-muted-foreground"
                        }`}
                      ></span>
                      <span className="text-xs text-muted-foreground">
                        {rule.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {rule.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {rule.flagged} flagged today
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="BarChart3" size={20} className="text-primary" />
              <h3 className="font-heading font-semibold text-foreground">
                Community Statistics
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {communityStats.map((stat, index) => (
                <div key={index} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`flex items-center space-x-1 text-sm ${
                        stat.trend === "up" ? "text-success" : "text-error"
                      }`}
                    >
                      <Icon
                        // Ternary result is a string, so cast to any
                        name={
                          (stat.trend === "up"
                            ? "TrendingUp"
                            : "TrendingDown") as any
                        }
                        size={14}
                      />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <Button
                variant="outline"
                className="w-full"
                iconName="Download"
                iconPosition="left"
              >
                Export Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModerationSidebar;
