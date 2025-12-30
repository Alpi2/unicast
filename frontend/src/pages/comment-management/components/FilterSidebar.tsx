import React, { useState } from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";
import Input from "../../../components/ui/Input.js";
import Select from "../../../components/ui/Select.js";

// Types & Interfaces

export interface CommentFilters {
  search?: string;
  status?: string;
  sentiment?: string;
  dateFrom?: string;
  dateTo?: string;
  author?: string;
  article?: string;
  spamScore?: number;
  sortBy?: string;
  showSpamOnly?: boolean;
  showRepliesOnly?: boolean;
  showFlaggedOnly?: boolean;
  [key: string]: string | number | boolean | undefined; // Index signature
}

interface FilterSidebarProps {
  filters: CommentFilters;
  onFiltersChange: (filters: CommentFilters) => void;
  onClearFilters: () => void;
}

interface Option {
  value: string;
  label: string;
}

// Component

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const statusOptions: Option[] = [
    { value: "all", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "flagged", label: "Flagged" },
    { value: "rejected", label: "Rejected" },
  ];

  const sentimentOptions: Option[] = [
    { value: "all", label: "All Sentiments" },
    { value: "positive", label: "Positive" },
    { value: "neutral", label: "Neutral" },
    { value: "negative", label: "Negative" },
  ];

  const sortOptions: Option[] = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "spam_score", label: "Spam Score" },
    { value: "replies", label: "Most Replies" },
  ];

  const handleFilterChange = (
    key: keyof CommentFilters,
    value: string | number | boolean
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const activeFiltersCount = Object.values(filters || {}).filter((value) => {
    if (value === undefined || value === null) return false;
    if (typeof value === "boolean") return value === true;
    if (typeof value === "number") return value !== 0;
    if (typeof value === "string") return value !== "" && value !== "all";
    return true;
  }).length;

  return (
    <div
      className={`bg-card border border-border rounded-lg transition-all duration-300 ${
        isCollapsed ? "w-12" : "w-80"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} />
            <h3 className="font-heading font-semibold text-foreground">
              Filters
            </h3>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
        </Button>
      </div>

      {!isCollapsed && (
        <div className="p-4 space-y-6">
          {/* Search */}
          <div>
            <Input
              label="Search Comments"
              type="search"
              placeholder="Search by content or user..."
              value={filters.search || ""}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div>
            <Select
              label="Status"
              options={statusOptions}
              value={filters.status || "all"}
              // Assume the Select component returns the selected value
              onChange={(value: string) => handleFilterChange("status", value)}
            />
          </div>

          {/* Sentiment Filter */}
          <div>
            <Select
              label="Sentiment"
              options={sentimentOptions}
              value={filters.sentiment || "all"}
              onChange={(value: string) =>
                handleFilterChange("sentiment", value)
              }
            />
          </div>

          {/* Date Range */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="date"
                placeholder="From"
                value={filters.dateFrom || ""}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
              />
              <Input
                type="date"
                placeholder="To"
                value={filters.dateTo || ""}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
              />
            </div>
          </div>

          {/* Author Filter */}
          <div>
            <Input
              label="Author"
              type="text"
              placeholder="Filter by author name..."
              value={filters.author || ""}
              onChange={(e) => handleFilterChange("author", e.target.value)}
            />
          </div>

          {/* Article Filter */}
          <div>
            <Input
              label="Article"
              type="text"
              placeholder="Filter by article title..."
              value={filters.article || ""}
              onChange={(e) => handleFilterChange("article", e.target.value)}
            />
          </div>

          {/* Spam Score Filter */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Minimum Spam Score: {filters.spamScore || 0}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.spamScore || 0}
              onChange={(e) =>
                handleFilterChange("spamScore", parseInt(e.target.value))
              }
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <Select
              label="Sort By"
              options={sortOptions}
              value={filters.sortBy || "newest"}
              onChange={(value: string) => handleFilterChange("sortBy", value)}
            />
          </div>

          {/* Show Only Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Show Only
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.showSpamOnly || false}
                  onChange={(e) =>
                    handleFilterChange("showSpamOnly", e.target.checked)
                  }
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">Spam Comments</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.showRepliesOnly || false}
                  onChange={(e) =>
                    handleFilterChange("showRepliesOnly", e.target.checked)
                  }
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">Replies Only</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.showFlaggedOnly || false}
                  onChange={(e) =>
                    handleFilterChange("showFlaggedOnly", e.target.checked)
                  }
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-sm text-foreground">
                  Flagged Comments
                </span>
              </label>
            </div>
          </div>

          {/* Clear Filters */}
          {activeFiltersCount > 0 && (
            <div className="pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={onClearFilters}
                className="w-full"
                iconName="X"
                iconPosition="left"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;
