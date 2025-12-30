import React, { useState } from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface ScheduledPost {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD format
  time: string;
  status: "scheduled" | "published" | "draft" | string;
  category: string;
}

type ViewMode = "month" | "week";

// Component

const ContentCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 0, 11)); // January 11, 2025
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  const scheduledPosts: ScheduledPost[] = [
    {
      id: 1,
      title: "CSS Grid vs Flexbox: When to Use Each",
      date: "2025-01-15",
      time: "10:00",
      status: "scheduled",
      category: "Design",
    },
    {
      id: 2,
      title: "Advanced React Patterns for 2025",
      date: "2025-01-18",
      time: "14:30",
      status: "scheduled",
      category: "Technology",
    },
    {
      id: 3,
      title: "Building Microservices with Docker",
      date: "2025-01-22",
      time: "09:15",
      status: "scheduled",
      category: "Backend",
    },
    {
      id: 4,
      title: "UX Design Principles for Developers",
      date: "2025-01-25",
      time: "16:00",
      status: "scheduled",
      category: "Design",
    },
  ];

  // Calculate the days of the month (including leading blanks)
  const getDaysInMonth = (date: Date): (number | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 (Sun) - 6 (Sat)

    const days: (number | null)[] = [];

    // Leading blanks before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const getPostsForDate = (day: number | null): ScheduledPost[] => {
    if (!day) return [];

    // Build YYYY-MM-DD formatted string
    const dateString = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return scheduledPosts.filter((post) => post.date === dateString);
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (day: number | null): boolean => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Calendar Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-xl text-foreground">
            Content Calendar
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("month")}
            >
              Month
            </Button>
            <Button
              variant={viewMode === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("week")}
            >
              Week
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth(-1)}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <h3 className="font-heading font-medium text-lg text-foreground min-w-[200px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth(1)}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center">
              <span className="text-sm font-medium text-muted-foreground">
                {day}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const postsForDay = getPostsForDate(day);
            const hasToday = isToday(day);

            return (
              <div
                key={index}
                className={`
                  min-h-[120px] p-2 border border-border rounded-lg
                  ${
                    day
                      ? "bg-background hover:bg-muted/30 cursor-pointer"
                      : "bg-muted/20"
                  }
                  ${hasToday ? "ring-2 ring-primary" : ""}
                  transition-colors
                `}
              >
                {day && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`
                        text-sm font-medium
                        ${hasToday ? "text-primary" : "text-foreground"}
                      `}
                      >
                        {day}
                      </span>
                      {postsForDay.length > 0 && (
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                      )}
                    </div>

                    <div className="space-y-1">
                      {postsForDay.slice(0, 2).map((post) => (
                        <div
                          key={post.id}
                          className="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium truncate"
                          title={post.title}
                        >
                          {post.time} - {post.title}
                        </div>
                      ))}
                      {postsForDay.length > 2 && (
                        <div className="text-xs text-muted-foreground px-2">
                          +{postsForDay.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Posts */}
      <div className="border-t border-border p-6">
        <h3 className="font-heading font-medium text-lg text-foreground mb-4">
          Upcoming Posts
        </h3>
        <div className="space-y-3">
          {scheduledPosts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
            >
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">
                  {post.title}
                </h4>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    at {post.time}
                  </span>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="Edit" size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="MoreHorizontal" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {scheduledPosts.length === 0 && (
          <div className="text-center py-8">
            <Icon
              name="Calendar"
              size={48}
              className="text-muted-foreground mx-auto mb-4"
            />
            <h4 className="font-heading font-medium text-foreground mb-2">
              No scheduled posts
            </h4>
            <p className="text-muted-foreground mb-4">
              Schedule your posts to maintain a consistent publishing schedule.
            </p>
            <Button variant="default" iconName="Plus">
              Schedule Post
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCalendar;
