import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon.js";

// Types & Interfaces

interface User {
  name: string;
  email: string;
  role: "creator" | "admin" | "user" | string;
  avatar?: string;
  [key: string]: any;
}

interface HeaderProps {
  user?: User | null;
  notificationCount?: number;
}

interface NavItem {
  label: string;
  path: string;
  icon: string;
  roles: string[];
}

interface Notification {
  id: number;
  type: string;
  message: string;
  time: string;
}

// Component

const Header: React.FC<HeaderProps> = ({
  user = null,
  notificationCount = 0,
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const location = useLocation();

  const isAuthenticated = !!user;
  const isCreator = user?.role === "creator" || user?.role === "admin";
  const isAdmin = user?.role === "admin";

  const navigationItems: NavItem[] = [
    { label: "Home", path: "/homepage", icon: "Home", roles: ["all"] },
    {
      label: "Search",
      path: "/search-results",
      icon: "Search",
      roles: ["all"],
    },
    {
      label: "Create",
      path: "/content-creation-dashboard",
      icon: "PenTool",
      roles: ["creator", "admin"],
    },
    {
      label: "Analytics",
      path: "/analytics-dashboard",
      icon: "BarChart3",
      roles: ["creator", "admin"],
    },
  ];

  const userMenuItems = [
    { label: "Profile", path: "/user-profile", icon: "User" },
    { label: "Settings", path: "/settings", icon: "Settings" },
    ...(isAdmin
      ? [{ label: "Moderate", path: "/comment-management", icon: "Shield" }]
      : []),
    { label: "Logout", path: "/logout", icon: "LogOut" },
  ];

  const notifications: Notification[] = [
    {
      id: 1,
      type: "comment",
      message: 'New comment on "React Best Practices"',
      time: "2 min ago",
    },
    {
      id: 2,
      type: "analytics",
      message: "Your article reached 1K views",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "moderation",
      message: "3 comments pending review",
      time: "2 hours ago",
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search-results?q=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  const isActiveRoute = (path: string): boolean => {
    return location.pathname === path;
  };

  const shouldShowNavItem = (roles: string[]): boolean => {
    if (roles.includes("all")) return true;
    if (!user) return false;
    return roles.includes(user.role);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".user-menu")) {
        setIsUserMenuOpen(false);
      }
      if (!target.closest(".notification-menu")) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border glassmorphism slide-down">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Logo */}
        <Link to="/homepage" className="flex items-center space-x-2 mr-6 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg gradient-bg-primary text-white pulsing-glow group-hover:animate-morph">
            <Icon name="BookOpen" size={20} />
          </div>
          <span className="font-heading font-semibold text-lg gradient-text-primary group-hover:gradient-text-secondary liquid-transition">
            UniCast
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 flex-1">
          {navigationItems.map(
            (item, index) =>
              shouldShowNavItem(item.roles) && (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`morphing-button flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium liquid-transition stagger-animation ${
                    isActiveRoute(item.path)
                      ? "gradient-bg-primary text-white shadow-electric-glow"
                      : "text-text-secondary hover:text-text-interactive hover:gradient-bg-secondary/20 contextual-glow"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Icon ismi string array'den geldiği için 'as any' ile tip kontrolünü aşıyoruz */}
                  <Icon name={item.icon as any} size={16} />
                  <span>{item.label}</span>
                </Link>
              )
          )}
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center mx-4">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <div
              className={`flex items-center liquid-transition ${
                isSearchExpanded ? "w-80" : "w-64"
              }`}
            >
              <input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => setIsSearchExpanded(false)}
                className="w-full px-4 py-2 pl-10 pr-4 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-bright-cyan focus:border-transparent text-foreground placeholder-text-secondary contextual-glow liquid-transition"
              />

              <Icon
                name="Search"
                size={16}
                className="absolute left-3 text-text-interactive pointer-events-none animate-pulse"
              />
            </div>
          </form>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search */}
          <button
            className="morphing-button md:hidden p-2 text-text-interactive hover:text-foreground hover:gradient-bg-primary/20 rounded-lg contextual-glow"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          >
            <Icon name="Search" size={20} />
          </button>

          {/* Notifications */}
          {isAuthenticated && (
            <div className="notification-menu relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="morphing-button relative p-2 text-text-interactive hover:text-foreground hover:gradient-bg-primary/20 rounded-lg contextual-glow"
              >
                <Icon name="Bell" size={20} />
                {notificationCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-6 w-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 glassmorphism border border-border/20 rounded-xl shadow-cyan-glow stagger-animation">
                  <div className="p-4 border-b border-border/20">
                    <h3 className="font-heading font-medium text-sm gradient-text-primary">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification, index) => (
                      <div
                        key={notification.id}
                        className="p-4 border-b border-border/10 last:border-b-0 hover:gradient-bg-primary/5 liquid-transition stagger-animation"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-2 h-2 rounded-full gradient-bg-secondary mt-2 animate-pulse"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground">
                              {notification.message}
                            </p>
                            <p className="text-xs text-text-secondary mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-border/20">
                    <button className="morphing-button w-full py-2 text-sm text-text-interactive hover:gradient-bg-primary hover:text-white rounded-lg contextual-glow">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Menu or Auth Buttons */}
          {isAuthenticated && user ? (
            <div className="user-menu relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="morphing-button rounded-full p-1 contextual-glow"
              >
                <div className="w-8 h-8 rounded-full gradient-bg-primary text-white flex items-center justify-center card-3d pulsing-glow">
                  <span className="text-sm font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 glassmorphism border border-border/20 rounded-xl shadow-purple-glow stagger-animation">
                  <div className="p-4 border-b border-border/20">
                    <p className="font-heading font-medium text-sm text-foreground">
                      {user.name}
                    </p>
                    <p className="text-xs text-text-secondary">{user.email}</p>
                  </div>
                  <div className="py-2">
                    {userMenuItems.map((item, index) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-interactive hover:gradient-bg-primary/10 liquid-transition stagger-animation"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <Icon name={item.icon as any} size={16} />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <button className="morphing-button px-4 py-2 text-sm text-text-interactive hover:text-foreground hover:gradient-bg-primary/20 rounded-lg contextual-glow">
                  Sign In
                </button>
              </Link>
              <Link to="/register">
                <button className="morphing-button px-4 py-2 text-sm gradient-bg-primary text-white rounded-lg hover:gradient-bg-secondary shadow-electric-glow">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="morphing-button md:hidden p-2 text-text-interactive hover:text-foreground hover:gradient-bg-primary/20 rounded-lg contextual-glow"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Search Expanded */}
      {isSearchExpanded && (
        <div className="md:hidden border-t border-border/20 glassmorphism p-4 slide-down">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-4 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-bright-cyan focus:border-transparent text-foreground placeholder-text-secondary contextual-glow"
              autoFocus
            />

            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-interactive pointer-events-none"
            />
          </form>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/20 glassmorphism slide-down">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems.map(
              (item, index) =>
                shouldShowNavItem(item.roles) && (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`morphing-button flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium liquid-transition stagger-animation ${
                      isActiveRoute(item.path)
                        ? "gradient-bg-primary text-white shadow-electric-glow"
                        : "text-text-secondary hover:text-text-interactive hover:gradient-bg-primary/20"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon name={item.icon as any} size={16} />
                    <span>{item.label}</span>
                  </Link>
                )
            )}
          </nav>
        </div>
      )}

      {/* Content Creation FAB - Mobile */}
      {isCreator && (
        <Link
          to="/content-editor"
          className="fixed bottom-6 right-6 z-40 md:hidden"
        >
          <button className="morphing-button w-14 h-14 gradient-bg-accent text-black rounded-full shadow-yellow-glow hover:shadow-2xl pulsing-glow">
            <Icon name="Plus" size={24} />
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;
