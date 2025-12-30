import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../../../components/AppIcon.js";

// Types & Interfaces

interface NavigationItem {
  label: string;
  path: string;
  icon: string;
  count: number | null;
}

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Component

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  const location = useLocation();

  const navigationItems: NavigationItem[] = [
    {
      label: "Overview",
      path: "/content-creation-dashboard",
      icon: "LayoutDashboard",
      count: null,
    },
    {
      label: "All Posts",
      path: "/content-creation-dashboard?tab=all",
      icon: "FileText",
      count: 24,
    },
    {
      label: "Drafts",
      path: "/content-creation-dashboard?tab=drafts",
      icon: "Edit3",
      count: 8,
    },
    {
      label: "Published",
      path: "/content-creation-dashboard?tab=published",
      icon: "CheckCircle",
      count: 16,
    },
    {
      label: "Scheduled",
      path: "/content-creation-dashboard?tab=scheduled",
      icon: "Clock",
      count: 3,
    },
    {
      label: "Analytics",
      path: "/analytics-dashboard",
      icon: "BarChart3",
      count: null,
    },
    {
      label: "Media Library",
      path: "/content-creation-dashboard?tab=media",
      icon: "Image",
      count: 156,
    },
    {
      label: "Comments",
      path: "/comment-management",
      icon: "MessageSquare",
      count: 42,
    },
    {
      label: "Settings",
      path: "/user-profile",
      icon: "Settings",
      count: null,
    },
  ];

  const isActiveRoute = (path: string): boolean => {
    // location may be null (rarely), guard defensively
    if (!location) return false;

    if (path === "/content-creation-dashboard") {
      return location.pathname === path && !location.search;
    }
    return location.pathname + location.search === path;
  };

  return (
    <>
      {/* Mobile Overlay - Higher z-index to cover content */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-45 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Fixed positioning with proper z-index */}
      <aside
        className={`
        fixed top-16 lg:top-16 bottom-0 left-0 z-40 w-64 bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
            <h2 className="font-heading font-semibold text-lg">Dashboard</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Navigation - Scrollable content */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="mb-6">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Content Management
              </h3>
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => onClose()}
                  className={`
                    flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium
                    transition-colors micro-interaction group
                    ${
                      isActiveRoute(item.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    {/* Icon name is a string, so cast to any */}
                    <Icon
                      name={item.icon as any}
                      size={16}
                      className={
                        isActiveRoute(item.path)
                          ? "text-primary-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== null && (
                    <span
                      className={`
                      px-2 py-1 text-xs rounded-full font-medium
                      ${
                        isActiveRoute(item.path)
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }
                    `}
                    >
                      {item.count}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Link
                  to="/content-editor"
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors micro-interaction"
                >
                  <Icon name="Plus" size={16} />
                  <span>New Post</span>
                </Link>
                <button className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors micro-interaction">
                  <Icon name="Upload" size={16} />
                  <span>Upload Media</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Storage Info - Fixed at bottom */}
          <div className="p-4 border-t border-border bg-card">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Storage Used
                </span>
                <span className="text-xs font-medium text-foreground">
                  2.4 GB / 5 GB
                </span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: "48%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
