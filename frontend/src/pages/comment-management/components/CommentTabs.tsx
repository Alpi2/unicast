import React from "react";
import Icon from "../../../components/AppIcon.js";

// Types & Interfaces

interface CommentCounts {
  pending?: number;
  approved?: number;
  flagged?: number;
  rejected?: number;
  total?: number;
  [key: string]: number | undefined;
}

interface CommentTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  counts?: CommentCounts;
}

interface TabItem {
  id: string;
  label: string;
  icon: string;
  count: number;
  color: string;
}

// Component

const CommentTabs: React.FC<CommentTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs: TabItem[] = [
    {
      id: "pending",
      label: "Pending Review",
      icon: "Clock",
      count: counts?.pending || 0,
      color: "text-warning",
    },
    {
      id: "approved",
      label: "Approved",
      icon: "CheckCircle",
      count: counts?.approved || 0,
      color: "text-success",
    },
    {
      id: "flagged",
      label: "Flagged",
      icon: "Flag",
      count: counts?.flagged || 0,
      color: "text-error",
    },
    {
      id: "rejected",
      label: "Rejected",
      icon: "XCircle",
      count: counts?.rejected || 0,
      color: "text-muted-foreground",
    },
    {
      id: "all",
      label: "All Comments",
      icon: "MessageSquare",
      count: counts?.total || 0,
      color: "text-primary",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg mb-6">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-3 px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {/* Icon name is a string, so cast to any */}
            <Icon
              name={tab.icon as any}
              size={16}
              className={activeTab === tab.id ? "text-primary" : tab.color}
            />
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {tab.count > 999 ? "999+" : tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommentTabs;
