import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header.js";
import Icon from "../../components/AppIcon.js";
import Button from "../../components/ui/Button.js";
import MetricCard from "./components/MetricCard.js";
import TrafficChart from "./components/TrafficChart.js";
import ContentPerformanceTable from "./components/ContentPerformanceTable.js";
import AudienceChart from "./components/AudienceChart.js";
import RealTimeVisitors from "./components/RealTimeVisitors.js";
import FilterSidebar from "./components/FilterSidebar.js";
import GoalTracking from "./components/GoalTracking.js";

import type { Article } from "./components/ContentPerformanceTable.js";
import type { Goal } from "./components/GoalTracking.js";

const AnalyticsDashboard: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<string>("7d");
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Mock user data
  const currentUser = {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah.wilson@contentplattform.com",
    role: "creator",
    avatar: "https://i.pravatar.cc/150?u=1", // Added in case Header expects an avatar
  };

  // Mock metrics data
  // Should conform to the MetricCardProps interface
  const metricsData = [
    {
      title: "Total Views",
      value: "2.4M",
      change: "+12.5%",
      changeType: "positive" as const, // Marked as a literal type
      icon: "Eye",
      trend: [65, 78, 82, 95, 88, 92, 100, 85, 90, 95, 88, 92],
    },
    {
      title: "Unique Visitors",
      value: "847K",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: "Users",
      trend: [45, 52, 48, 61, 58, 65, 72, 68, 75, 82, 78, 85],
    },
    {
      title: "Engagement Rate",
      value: "68.4%",
      change: "+3.1%",
      changeType: "positive" as const,
      icon: "Heart",
      trend: [55, 58, 62, 59, 65, 68, 71, 69, 72, 75, 73, 68],
    },
    {
      title: "Revenue",
      value: "$12,847",
      change: "-2.3%",
      changeType: "negative" as const,
      icon: "DollarSign",
      trend: [80, 85, 78, 82, 75, 70, 68, 72, 69, 65, 62, 58],
    },
  ];

  // Mock traffic data
  const trafficData = [
    { date: "Jan 1", views: 12400, visitors: 8200 },
    { date: "Jan 2", views: 13200, visitors: 8800 },
    { date: "Jan 3", views: 11800, visitors: 7900 },
    { date: "Jan 4", views: 14500, visitors: 9600 },
    { date: "Jan 5", views: 15200, visitors: 10100 },
    { date: "Jan 6", views: 13800, visitors: 9200 },
    { date: "Jan 7", views: 16400, visitors: 10800 },
    { date: "Jan 8", views: 15800, visitors: 10500 },
    { date: "Jan 9", views: 17200, visitors: 11400 },
    { date: "Jan 10", views: 16800, visitors: 11100 },
    { date: "Jan 11", views: 18500, visitors: 12200 },
  ];

  // Mock audience data
  const audienceData = [
    { name: "Desktop", value: 45680, total: 89420 },
    { name: "Mobile", value: 32140, total: 89420 },
    { name: "Tablet", value: 11600, total: 89420 },
  ];

  // Mock content performance data
  // Should conform to the Article interface
  const contentData: Article[] = [
    {
      id: 1,
      title: "Complete Guide to React Hooks",
      views: 45680,
      shares: 1240,
      comments: 89,
      engagement: 78,
      status: "published",
      publishDate: "Jan 8, 2025",
    },
    {
      id: 2,
      title: "JavaScript ES2024 Features",
      views: 32140,
      shares: 890,
      comments: 67,
      engagement: 65,
      status: "published",
      publishDate: "Jan 6, 2025",
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox: When to Use What",
      views: 28950,
      shares: 756,
      comments: 45,
      engagement: 72,
      status: "published",
      publishDate: "Jan 4, 2025",
    },
    {
      id: 4,
      title: "Building Accessible Web Applications",
      views: 21340,
      shares: 623,
      comments: 38,
      engagement: 68,
      status: "published",
      publishDate: "Jan 2, 2025",
    },
    {
      id: 5,
      title: "Advanced TypeScript Patterns",
      views: 18750,
      shares: 445,
      comments: 29,
      engagement: 58,
      status: "draft",
      publishDate: "Jan 1, 2025",
    },
  ];

  // Mock saved dashboards
  const savedDashboards = [
    {
      id: 1,
      name: "Content Performance",
      description: "Focus on article metrics and engagement",
    },
    {
      id: 2,
      name: "Audience Insights",
      description: "Demographics and behavior analysis",
    },
    {
      id: 3,
      name: "Revenue Tracking",
      description: "Monetization and conversion metrics",
    },
  ];

  // Mock goals data
  // Should conform to the Goal interface
  const goalsData: Goal[] = [
    {
      id: 1,
      title: "Monthly Page Views",
      description: "Reach 3M page views this month",
      current: 2400000,
      target: 3000000,
      unit: "views",
      percentage: 80,
      status: "on-track",
      deadline: "Jan 31, 2025",
      insights:
        "Traffic is growing steadily. Consider promoting top-performing content to reach the goal.",
    },
    {
      id: 2,
      title: "New Subscribers",
      description: "Gain 5,000 new email subscribers",
      current: 4750,
      target: 5000,
      unit: "subscribers",
      percentage: 95,
      status: "completed",
      deadline: "Jan 31, 2025",
      insights:
        "Goal achieved ahead of schedule! Great work on the lead magnets.",
    },
    {
      id: 3,
      title: "Content Engagement",
      description: "Maintain 70%+ engagement rate",
      current: 68.4,
      target: 70,
      unit: "%",
      percentage: 97.7,
      status: "at-risk",
      deadline: "Jan 31, 2025",
      insights:
        "Engagement slightly below target. Focus on interactive content and community building.",
    },
  ];

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsExporting(false);
  };

  const handleFiltersChange = (filters: any) => {
    console.log("Filters changed:", filters);
    // Apply filters to data
  };

  const handleLoadDashboard = (dashboard: any) => {
    console.log("Loading dashboard:", dashboard);
    // Load saved dashboard configuration
  };

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard - Content Plattform</title>
        <meta
          name="description"
          content="Comprehensive analytics and performance insights for your content strategy"
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header user={currentUser} notificationCount={3} />

        <div className="flex">
          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`
            fixed lg:sticky top-16 left-0 z-50 w-80 h-[calc(100vh-4rem)] 
            bg-background border-r border-border overflow-y-auto
            transform transition-transform duration-300 ease-in-out
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
          >
            <div className="p-6">
              <FilterSidebar
                onFiltersChange={handleFiltersChange}
                savedDashboards={savedDashboards}
                onLoadDashboard={handleLoadDashboard}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 lg:ml-0">
            {/* Header Controls */}
            <div className="sticky top-16 z-30 bg-background/95 glassmorphism border-b border-border">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm" // Used 'sm' because there's no 'icon' size; override with className if needed
                    className="lg:hidden px-2"
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Icon name="Menu" size={20} />
                  </Button>
                  <div>
                    <h1 className="text-2xl font-heading font-bold text-foreground">
                      Analytics Dashboard
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Track your content performance and audience insights
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <select
                    value={selectedDateRange}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setSelectedDateRange(e.target.value)
                    }
                    className="px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="1d">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 3 months</option>
                  </select>

                  <Button
                    variant="outline"
                    size="sm"
                    loading={isExporting}
                    onClick={handleExport}
                    iconName="Download"
                  >
                    Export
                  </Button>

                  <Button variant="default" size="sm" iconName="Settings">
                    Customize
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Key Metrics */}
              <section>
                <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Key Performance Indicators
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {metricsData.map((metric, index) => (
                    <MetricCard
                      key={index}
                      title={metric.title}
                      value={metric.value}
                      change={metric.change}
                      changeType={metric.changeType}
                      icon={metric.icon}
                      trend={metric.trend}
                    />
                  ))}
                </div>
              </section>

              {/* Charts Section */}
              <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <TrafficChart data={trafficData} title="Traffic Overview" />
                </div>
                <div>
                  <AudienceChart data={audienceData} title="Device Breakdown" />
                </div>
              </section>

              {/* Content Performance & Real-time */}
              <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <ContentPerformanceTable data={contentData} />
                </div>
                <div>
                  <RealTimeVisitors />
                </div>
              </section>

              {/* Goal Tracking */}
              <section>
                <GoalTracking goals={goalsData} />
              </section>

              {/* Insights & Recommendations */}
              <section>
                <div className="bg-card border border-border rounded-lg p-6 soft-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Icon
                        name="Lightbulb"
                        size={20}
                        className="text-accent"
                      />
                    </div>
                    <h2 className="text-lg font-heading font-semibold text-foreground">
                      Automated Insights
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Icon
                          name="TrendingUp"
                          size={16}
                          className="text-success mt-1"
                        />
                        <div>
                          <h3 className="font-heading font-medium text-sm text-foreground">
                            Traffic Surge Detected
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Your "React Hooks Guide" article is trending with
                            340% increase in views. Consider creating follow-up
                            content.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Icon
                          name="AlertTriangle"
                          size={16}
                          className="text-warning mt-1"
                        />
                        <div>
                          <h3 className="font-heading font-medium text-sm text-foreground">
                            Engagement Opportunity
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Mobile engagement is 15% lower than desktop.
                            Optimize mobile reading experience to boost overall
                            metrics.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Icon
                          name="Target"
                          size={16}
                          className="text-primary mt-1"
                        />
                        <div>
                          <h3 className="font-heading font-medium text-sm text-foreground">
                            Goal Achievement
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            You're on track to exceed your monthly subscriber
                            goal by 15%. Great work on the lead magnets!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AnalyticsDashboard;
