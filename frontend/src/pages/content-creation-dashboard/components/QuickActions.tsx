import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface QuickActionItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  link?: string;
  action?: string;
}

// Component

const QuickActions: React.FC = () => {
  const actions: QuickActionItem[] = [
    {
      id: 1,
      title: "New Article",
      description: "Start writing a new blog post",
      icon: "PenTool",
      color: "bg-primary text-primary-foreground",
      link: "/content-editor",
    },
    {
      id: 2,
      title: "Upload Media",
      description: "Add images and videos to your library",
      icon: "Upload",
      color: "bg-success text-success-foreground",
      action: "upload",
    },
    {
      id: 3,
      title: "Import Content",
      description: "Import posts from other platforms",
      icon: "Download",
      color: "bg-warning text-warning-foreground",
      action: "import",
    },
    {
      id: 4,
      title: "Schedule Post",
      description: "Plan your content publishing schedule",
      icon: "Calendar",
      color: "bg-accent text-accent-foreground",
      action: "schedule",
    },
  ];

  const handleAction = (action?: string) => {
    if (!action) return;

    switch (action) {
      case "upload":
        // Trigger file upload
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = true;
        input.accept = "image/*,video/*";
        input.onchange = (e: Event) => {
          const target = e.target as HTMLInputElement;
          if (target.files) {
            const files = Array.from(target.files);
            console.log("Files selected:", files);
            // Handle file upload logic here
          }
        };
        input.click();
        break;
      case "import":
        // Open import modal
        console.log("Opening import modal");
        break;
      case "schedule":
        // Open scheduling interface
        console.log("Opening schedule interface");
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-xl text-foreground">
          Quick Actions
        </h2>
        <Button variant="ghost" size="sm" iconName="Settings">
          Customize
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => (
          <React.Fragment key={action.id}>
            {action.link ? (
              <Link
                to={action.link}
                className="block p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 micro-interaction group"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    {/* Icon name is a string, so cast to any */}
                    <Icon name={action.icon as any} size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {action.description}
                    </p>
                  </div>
                  <Icon
                    name="ArrowRight"
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                  />
                </div>
              </Link>
            ) : (
              <button
                onClick={() => handleAction(action.action)}
                className="w-full text-left p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 micro-interaction group"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <Icon name={action.icon as any} size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {action.description}
                    </p>
                  </div>
                  <Icon
                    name="ArrowRight"
                    size={16}
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                  />
                </div>
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Recent Activity - Hidden by default as per original */}
      <div className="mt-8 pt-6 border-t border-border hidden">
        <h3 className="font-heading font-medium text-lg text-foreground mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-success/10 text-success rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                Published "Getting Started with React 18"
              </p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <Icon name="Edit3" size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                Saved draft "The Future of Web Development"
              </p>
              <p className="text-xs text-muted-foreground">5 hours ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-8 h-8 bg-warning/10 text-warning rounded-full flex items-center justify-center">
              <Icon name="Upload" size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                Uploaded 5 new images to media library
              </p>
              <p className="text-xs text-muted-foreground">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
