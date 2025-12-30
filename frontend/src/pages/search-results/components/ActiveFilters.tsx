import React from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

export interface FilterState {
  contentType: string[];
  dateRange: string;
  categories: string[];
  authors: string[];
  tags: string[];
  [key: string]: string | string[]; // Dynamic access support
}

interface ActiveFiltersProps {
  filters: FilterState;
  onRemoveFilter: (key: keyof FilterState, value: string | string[]) => void;
  onClearAll: () => void;
  resultCount: number;
}

interface ActiveFilterItem {
  type: keyof FilterState;
  value: string;
  label: string;
  category: string;
}

// Component

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onRemoveFilter,
  onClearAll,
  resultCount,
}) => {
  const getActiveFilters = (): ActiveFilterItem[] => {
    const active: ActiveFilterItem[] = [];

    // Content Type filters
    if (filters.contentType && filters.contentType.length > 0) {
      filters.contentType.forEach((type) => {
        active.push({
          type: "contentType",
          value: type,
          label: type.charAt(0).toUpperCase() + type.slice(1),
          category: "Content Type",
        });
      });
    }

    // Date Range filter
    if (filters.dateRange) {
      const dateLabels: Record<string, string> = {
        today: "Today",
        week: "This Week",
        month: "This Month",
        quarter: "Last 3 Months",
        year: "This Year",
        custom: "Custom Range",
      };

      active.push({
        type: "dateRange",
        value: filters.dateRange,
        label: dateLabels[filters.dateRange] || filters.dateRange,
        category: "Date",
      });
    }

    // Category filters
    if (filters.categories && filters.categories.length > 0) {
      filters.categories.forEach((category) => {
        active.push({
          type: "categories",
          value: category,
          label: category.charAt(0).toUpperCase() + category.slice(1),
          category: "Category",
        });
      });
    }

    // Author filters
    if (filters.authors && filters.authors.length > 0) {
      const authorNames: Record<string, string> = {
        "sarah-johnson": "Sarah Johnson",
        "mike-chen": "Mike Chen",
        "emily-davis": "Emily Davis",
        "alex-rodriguez": "Alex Rodriguez",
        "lisa-wang": "Lisa Wang",
        "david-smith": "David Smith",
      };

      filters.authors.forEach((author) => {
        active.push({
          type: "authors",
          value: author,
          label: authorNames[author] || author,
          category: "Author",
        });
      });
    }

    // Tag filters
    if (filters.tags && filters.tags.length > 0) {
      const tagLabels: Record<string, string> = {
        react: "React",
        javascript: "JavaScript",
        "ui-ux": "UI/UX",
        "web-development": "Web Development",
        mobile: "Mobile",
        ai: "Artificial Intelligence",
        blockchain: "Blockchain",
        startup: "Startup",
      };

      filters.tags.forEach((tag) => {
        active.push({
          type: "tags",
          value: tag,
          label: tagLabels[tag] || tag,
          category: "Tag",
        });
      });
    }

    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return null;
  }

  const handleRemoveFilter = (
    filterType: keyof FilterState,
    filterValue: string
  ) => {
    if (filterType === "dateRange") {
      onRemoveFilter(filterType, "");
    } else {
      // Array tabanlı filtreler için işlem
      const currentValues = (filters[filterType] as string[]) || [];
      const newValues = currentValues.filter((value) => value !== filterValue);
      onRemoveFilter(filterType, newValues);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 glassmorphism">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} className="text-muted-foreground" />
          <span className="font-heading font-medium text-sm text-foreground">
            Active Filters
          </span>
          <span className="text-xs text-muted-foreground">
            ({resultCount.toLocaleString() || 0} results)
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <div
            key={`${filter.type}-${filter.value}-${index}`}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-sm group hover:bg-primary/20 transition-colors"
          >
            <span className="text-xs text-muted-foreground font-medium">
              {filter.category}:
            </span>
            <span className="font-medium">{filter.label}</span>
            <button
              onClick={() => handleRemoveFilter(filter.type, filter.value)}
              className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              aria-label={`Remove ${filter.label} filter`}
            >
              <Icon
                name="X"
                size={12}
                className="text-primary group-hover:text-primary/80"
              />
            </button>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing {resultCount.toLocaleString() || 0} results with{" "}
            {activeFilters.length} active filter
            {activeFilters.length !== 1 ? "s" : ""}
          </span>
          <span>Updated just now</span>
        </div>
      </div>
    </div>
  );
};

export default ActiveFilters;
