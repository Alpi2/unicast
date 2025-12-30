import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface AdvancedFilters {
  user: string;
  article: string;
  dateRange: string;
  sentiment: string;
  hasReplies: boolean;
  isSpam: boolean;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  // Advanced search includes both the query and the filters
  onAdvancedSearch: (data: AdvancedFilters & { query: string }) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Component

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onAdvancedSearch,
  searchQuery,
  setSearchQuery,
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState<boolean>(false);

  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    user: "",
    article: "",
    dateRange: "",
    sentiment: "",
    hasReplies: false,
    isSpam: false,
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleAdvancedSearch = () => {
    onAdvancedSearch({
      query: searchQuery,
      ...advancedFilters,
    });
    setIsAdvancedOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setAdvancedFilters({
      user: "",
      article: "",
      dateRange: "",
      sentiment: "",
      hasReplies: false,
      isSpam: false,
    });
    onSearch("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsAdvancedOpen(false);
      searchInputRef.current?.blur();
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const hasActiveFilters = Object.values(advancedFilters).some((value) =>
    typeof value === "boolean" ? value : value !== ""
  );

  return (
    <div className="relative mb-6">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center space-x-2">
          {/* Main Search Input */}
          <div className="relative flex-1">
            <input
              ref={searchInputRef}
              type="search"
              placeholder="Search comments, users, or articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 pl-12 pr-20 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            <Icon
              name="Search"
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />

            {/* Keyboard Shortcut Hint */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={clearSearch}
                  className="h-6 w-6"
                >
                  <Icon name="X" size={14} />
                </Button>
              )}
              <kbd className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded border">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Advanced Search Toggle */}
          <Button
            type="button"
            variant={isAdvancedOpen || hasActiveFilters ? "default" : "outline"}
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            iconName="SlidersHorizontal"
            iconPosition="left"
          >
            Advanced
            {hasActiveFilters && (
              <span className="ml-2 px-2 py-1 bg-primary-foreground text-primary text-xs rounded-full">
                {
                  Object.values(advancedFilters).filter((value) =>
                    typeof value === "boolean" ? value : value !== ""
                  ).length
                }
              </span>
            )}
          </Button>

          {/* Search Button */}
          <Button
            type="submit"
            variant="default"
            iconName="Search"
            iconPosition="left"
          >
            Search
          </Button>
        </div>
      </form>

      {/* Advanced Search Panel */}
      {isAdvancedOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-soft glassmorphism z-10">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground">
                Advanced Search
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAdvancedOpen(false)}
                className="h-8 w-8"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* User Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  User
                </label>
                <input
                  type="text"
                  placeholder="Filter by username..."
                  value={advancedFilters.user}
                  onChange={(e) =>
                    setAdvancedFilters((prev) => ({
                      ...prev,
                      user: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Article Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Article
                </label>
                <input
                  type="text"
                  placeholder="Filter by article title..."
                  value={advancedFilters.article}
                  onChange={(e) =>
                    setAdvancedFilters((prev) => ({
                      ...prev,
                      article: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date Range
                </label>
                <select
                  value={advancedFilters.dateRange}
                  onChange={(e) =>
                    setAdvancedFilters((prev) => ({
                      ...prev,
                      dateRange: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Any time</option>
                  <option value="today">Today</option>
                  <option value="week">This week</option>
                  <option value="month">This month</option>
                  <option value="quarter">This quarter</option>
                  <option value="year">This year</option>
                </select>
              </div>

              {/* Sentiment */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Sentiment
                </label>
                <select
                  value={advancedFilters.sentiment}
                  onChange={(e) =>
                    setAdvancedFilters((prev) => ({
                      ...prev,
                      sentiment: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 text-sm bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Any sentiment</option>
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="negative">Negative</option>
                </select>
              </div>
            </div>

            {/* Checkbox Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={advancedFilters.hasReplies}
                  onChange={(e) =>
                    setAdvancedFilters((prev) => ({
                      ...prev,
                      hasReplies: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">Has replies</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={advancedFilters.isSpam}
                  onChange={(e) =>
                    setAdvancedFilters((prev) => ({
                      ...prev,
                      isSpam: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">Flagged as spam</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() =>
                  setAdvancedFilters({
                    user: "",
                    article: "",
                    dateRange: "",
                    sentiment: "",
                    hasReplies: false,
                    isSpam: false,
                  })
                }
                iconName="RotateCcw"
                iconPosition="left"
              >
                Reset Filters
              </Button>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsAdvancedOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleAdvancedSearch}
                  iconName="Search"
                  iconPosition="left"
                >
                  Apply Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
