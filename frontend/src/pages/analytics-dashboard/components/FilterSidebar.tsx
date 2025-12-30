import React, { useState } from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";
import Input from "../../../components/ui/Input.js";
import { Checkbox } from "../../../components/ui/Checkbox.js";

// Dashboard data structure
interface Dashboard {
  id: string | number;
  name: string;
  description?: string;
  [key: string]: any; // Allow extra fields for flexibility
}

// Filter output structure
interface FilterData {
  dateRange: string;
  metrics: string[];
  contentTypes: string[];
  authors: string[];
}

// Component props
interface FilterSidebarProps {
  onFiltersChange: (filters: FilterData) => void;
  savedDashboards?: Dashboard[]; // Optional
  onLoadDashboard: (dashboard: Dashboard) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onFiltersChange,
  savedDashboards = [], // Default empty array
  onLoadDashboard,
}) => {
  const [dateRange, setDateRange] = useState<string>("7d");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    "views",
    "visitors",
    "engagement",
  ]);
  const [contentTypes, setContentTypes] = useState<string[]>([
    "articles",
    "tutorials",
  ]);
  const [authors, setAuthors] = useState<string[]>([]);

  const dateRanges = [
    { value: "1d", label: "Last 24 hours" },
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 3 months" },
    { value: "custom", label: "Custom range" },
  ];

  const availableMetrics = [
    { value: "views", label: "Page Views" },
    { value: "visitors", label: "Unique Visitors" },
    { value: "engagement", label: "Engagement Rate" },
    { value: "bounce", label: "Bounce Rate" },
    { value: "duration", label: "Session Duration" },
    { value: "conversions", label: "Conversions" },
  ];

  const availableContentTypes = [
    { value: "articles", label: "Articles" },
    { value: "tutorials", label: "Tutorials" },
    { value: "reviews", label: "Reviews" },
    { value: "news", label: "News" },
    { value: "guides", label: "Guides" },
  ];

  const availableAuthors = [
    { value: "john-doe", label: "John Doe" },
    { value: "jane-smith", label: "Jane Smith" },
    { value: "mike-johnson", label: "Mike Johnson" },
    { value: "sarah-wilson", label: "Sarah Wilson" },
  ];

  const handleMetricChange = (metric: string, checked: boolean) => {
    if (checked) {
      setSelectedMetrics([...selectedMetrics, metric]);
    } else {
      setSelectedMetrics(selectedMetrics.filter((m) => m !== metric));
    }
  };

  const handleContentTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setContentTypes([...contentTypes, type]);
    } else {
      setContentTypes(contentTypes.filter((t) => t !== type));
    }
  };

  const handleAuthorChange = (author: string, checked: boolean) => {
    if (checked) {
      setAuthors([...authors, author]);
    } else {
      setAuthors(authors.filter((a) => a !== author));
    }
  };

  const applyFilters = () => {
    onFiltersChange({
      dateRange,
      metrics: selectedMetrics,
      contentTypes,
      authors,
    });
  };

  const resetFilters = () => {
    setDateRange("7d");
    setSelectedMetrics(["views", "visitors", "engagement"]);
    setContentTypes(["articles", "tutorials"]);
    setAuthors([]);
  };

  return (
    <div className="w-full space-y-6">
      {/* Saved Dashboards */}
      <div className="bg-card border border-border rounded-lg p-4 soft-shadow">
        <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
          Saved Dashboards
        </h3>
        <div className="space-y-2">
          {savedDashboards?.map((dashboard) => (
            <button
              key={dashboard.id}
              onClick={() => onLoadDashboard(dashboard)}
              className="w-full text-left p-2 rounded-md hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">
                  {dashboard.name}
                </span>

                <Icon
                  name="ChevronRight"
                  size={14}
                  className="text-muted-foreground group-hover:text-foreground"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {dashboard.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="bg-card border border-border rounded-lg p-4 soft-shadow">
        <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
          Date Range
        </h3>
        <div className="space-y-2">
          {dateRanges.map((range) => (
            <label
              key={range.value}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name="dateRange"
                value={range.value}
                checked={dateRange === range.value}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-4 h-4 text-primary border-border focus:ring-primary"
              />
              <span className="text-sm text-foreground">{range.label}</span>
            </label>
          ))}
        </div>

        {dateRange === "custom" && (
          <div className="mt-3 space-y-2">
            <Input type="date" label="Start Date" className="text-sm" />
            <Input type="date" label="End Date" className="text-sm" />
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="bg-card border border-border rounded-lg p-4 soft-shadow">
        <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
          Metrics
        </h3>
        <div className="space-y-2">
          {availableMetrics.map((metric) => (
            <Checkbox
              key={metric.value}
              label={metric.label}
              checked={selectedMetrics.includes(metric.value)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleMetricChange(metric.value, e.target.checked)
              }
              size="sm"
            />
          ))}
        </div>
      </div>

      {/* Content Types */}
      <div className="bg-card border border-border rounded-lg p-4 soft-shadow">
        <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
          Content Types
        </h3>
        <div className="space-y-2">
          {availableContentTypes.map((type) => (
            <Checkbox
              key={type.value}
              label={type.label}
              checked={contentTypes.includes(type.value)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleContentTypeChange(type.value, e.target.checked)
              }
              size="sm"
            />
          ))}
        </div>
      </div>

      {/* Authors */}
      <div className="bg-card border border-border rounded-lg p-4 soft-shadow">
        <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
          Authors
        </h3>
        <div className="space-y-2">
          {availableAuthors.map((author) => (
            <Checkbox
              key={author.value}
              label={author.label}
              checked={authors.includes(author.value)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleAuthorChange(author.value, e.target.checked)
              }
              size="sm"
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Button
          variant="default"
          size="sm"
          fullWidth
          onClick={applyFilters}
          iconName="Filter"
        >
          Apply Filters
        </Button>
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={resetFilters}
          iconName="RotateCcw"
        >
          Reset
        </Button>
      </div>

      {/* Custom Report Builder */}
      <div className="bg-card border border-border rounded-lg p-4 soft-shadow">
        <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
          Custom Report
        </h3>
        <div className="space-y-3">
          <Input placeholder="Report name" size="sm" />
          <Button variant="outline" size="sm" fullWidth iconName="Save">
            Save Dashboard
          </Button>
          <Button variant="ghost" size="sm" fullWidth iconName="Download">
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
