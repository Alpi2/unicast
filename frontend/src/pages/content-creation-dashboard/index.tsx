import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "../../components/ui/Header.js";
import DashboardSidebar from "./components/DashboardSidebar.js";
import StatsCards from "./components/StatsCards.js";
import ContentTable from "./components/ContentTable.js";
import ContentCalendar from "./components/ContentCalendar.js";
import QuickActions from "./components/QuickActions.js";
import RecentComments from "./components/RecentComments.js";
import Icon from "../../components/AppIcon.js";
import Button from "../../components/ui/Button.js";

// Types & Interfaces

interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  [key: string]: any;
}

interface TabItem {
  id: string;
  label: string;
  icon: string;
}

// Component

const ContentCreationDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const location = useLocation();

  // Mock user data for header
  const user: User = {
    id: "creator-1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "creator",
  };

  // Parse URL parameters for tab switching
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab("overview");
    }
  }, [location.search]);

  const tabs: TabItem[] = [
    { id: "overview", label: "Overview", icon: "LayoutDashboard" },
    { id: "all", label: "All Posts", icon: "FileText" },
    { id: "drafts", label: "Drafts", icon: "Edit3" },
    { id: "published", label: "Published", icon: "CheckCircle" },
    { id: "scheduled", label: "Scheduled", icon: "Clock" },
    { id: "calendar", label: "Calendar", icon: "Calendar" },
    { id: "media", label: "Media Library", icon: "Image" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            <StatsCards />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <ContentTable activeTab="all" />
              </div>
              <div className="space-y-8">
                <QuickActions />
                <RecentComments />
              </div>
            </div>
          </div>
        );
      case "calendar":
        return <ContentCalendar />;
      case "media":
        return (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <Icon
              name="Image"
              size={64}
              className="text-muted-foreground mx-auto mb-6"
            />
            <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">
              Media Library
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Manage your images, videos, and other media files. Upload new
              content or organize existing assets.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button variant="default" iconName="Upload">
                Upload Media
              </Button>
              <Button variant="outline" iconName="FolderOpen">
                Browse Files
              </Button>
            </div>
          </div>
        );
      default:
        return <ContentTable activeTab={activeTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} notificationCount={5} />
      <div className="flex relative">
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content with proper sidebar spacing */}
        <main className="flex-1 lg:ml-64 transition-all duration-300 ease-in-out">
          <div className="p-6 lg:p-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden z-30"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Icon name="Menu" size={20} />
                </Button>
                <div>
                  <h1 className="font-heading font-bold text-3xl text-foreground">
                    Content Dashboard
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Manage your content, track performance, and engage with your
                    audience
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Download">
                  Export Data
                </Button>
                <Button asChild variant="default" iconName="Plus">
                  <Link to="/content-editor">New Post</Link>
                </Button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-border mb-8">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                      transition-colors micro-interaction
                      ${
                        activeTab === tab.id
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
                      }
                    `}
                  >
                    {/* Icon name is a string, so cast to any */}
                    <Icon name={tab.icon as any} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="pb-8">{renderTabContent()}</div>
          </div>
        </main>
      </div>

      {/* Mobile FAB for New Post */}
      <div className="fixed bottom-6 right-6 lg:hidden z-40">
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <Icon name="Plus" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default ContentCreationDashboard;
