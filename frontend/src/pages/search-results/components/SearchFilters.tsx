import React, { useState } from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";
import Input from "../../../components/ui/Input.js";
import { Checkbox } from "../../../components/ui/Checkbox.js";

// Types & Interfaces

export interface FilterState {
  contentType: string[];
  dateRange: string;
  categories: string[];
  authors: string[];
  tags: string[];
  [key: string]: string | string[]; // Dynamic access signature
}

interface FilterItem {
  id: string;
  label: string;
  count?: number;
}

interface SearchFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isMobile?: boolean;
}

interface ExpandedSections {
  contentType: boolean;
  dateRange: boolean;
  categories: boolean;
  authors: boolean;
  tags: boolean;
  [key: string]: boolean;
}

interface SearchTerms {
  categories: string;
  authors: string;
  tags: string;
  [key: string]: string;
}

interface FilterSectionProps {
  title: string;
  items: FilterItem[];
  type: keyof FilterState; // contentType, categories, etc.
  searchable?: boolean;
}

// Component

const SearchFilters: React.FC<SearchFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  isMobile = false,
}) => {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    contentType: true,
    dateRange: true,
    categories: true,
    authors: false,
    tags: false,
  });

  const [searchTerms, setSearchTerms] = useState<SearchTerms>({
    categories: "",
    authors: "",
    tags: "",
  });

  const contentTypes: FilterItem[] = [
    { id: "article", label: "Articles", count: 1247 },
    { id: "tutorial", label: "Tutorials", count: 523 },
    { id: "review", label: "Reviews", count: 189 },
    { id: "news", label: "News", count: 345 },
    { id: "opinion", label: "Opinion", count: 267 },
  ];

  const categories: FilterItem[] = [
    { id: "technology", label: "Technology", count: 892 },
    { id: "design", label: "Design", count: 456 },
    { id: "business", label: "Business", count: 334 },
    { id: "lifestyle", label: "Lifestyle", count: 223 },
    { id: "health", label: "Health", count: 178 },
    { id: "travel", label: "Travel", count: 145 },
    { id: "food", label: "Food", count: 123 },
    { id: "sports", label: "Sports", count: 98 },
  ];

  const authors: FilterItem[] = [
    { id: "sarah-johnson", label: "Sarah Johnson", count: 45 },
    { id: "mike-chen", label: "Mike Chen", count: 38 },
    { id: "emily-davis", label: "Emily Davis", count: 32 },
    { id: "alex-rodriguez", label: "Alex Rodriguez", count: 28 },
    { id: "lisa-wang", label: "Lisa Wang", count: 24 },
    { id: "david-smith", label: "David Smith", count: 21 },
  ];

  const tags: FilterItem[] = [
    { id: "react", label: "React", count: 234 },
    { id: "javascript", label: "JavaScript", count: 189 },
    { id: "ui-ux", label: "UI/UX", count: 156 },
    { id: "web-development", label: "Web Development", count: 145 },
    { id: "mobile", label: "Mobile", count: 123 },
    { id: "ai", label: "Artificial Intelligence", count: 98 },
    { id: "blockchain", label: "Blockchain", count: 76 },
    { id: "startup", label: "Startup", count: 65 },
  ];

  const dateRanges: FilterItem[] = [
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "quarter", label: "Last 3 Months" },
    { id: "year", label: "This Year" },
    { id: "custom", label: "Custom Range" },
  ];

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (
    type: keyof FilterState,
    value: string,
    checked: boolean
  ) => {
    // Checkbox tabanlı filtreler her zaman string[] döndürür
    const currentValues = (filters[type] as string[]) || [];

    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);

    onFiltersChange({
      ...filters,
      [type]: newValues,
    });
  };

  const handleDateRangeChange = (range: string) => {
    onFiltersChange({
      ...filters,
      dateRange: range,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      contentType: [],
      dateRange: "",
      categories: [],
      authors: [],
      tags: [],
    });
  };

  const getFilteredItems = (items: FilterItem[], searchTerm: string) => {
    if (!searchTerm) return items;
    return items.filter((item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const FilterSection: React.FC<FilterSectionProps> = ({
    title,
    items,
    type,
    searchable = false,
  }) => {
    const isExpanded = expandedSections[type];
    const searchTerm = searchTerms[type] || "";
    const filteredItems = searchable
      ? getFilteredItems(items, searchTerm)
      : items;

    return (
      <div className="border-b border-border last:border-b-0">
        <button
          onClick={() => toggleSection(type)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
        >
          <span className="font-heading font-medium text-sm text-foreground">
            {title}
          </span>
          <Icon
            name={isExpanded ? "ChevronUp" : "ChevronDown"}
            size={16}
            className="text-muted-foreground"
          />
        </button>
        {isExpanded && (
          <div className="px-4 pb-4">
            {searchable && (
              <div className="mb-3">
                <Input
                  type="search"
                  placeholder={`Search ${title.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchTerms((prev) => ({
                      ...prev,
                      [type]: e.target.value,
                    }))
                  }
                  className="text-sm"
                />
              </div>
            )}

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <Checkbox
                    label={item.label}
                    // Type casting: these sections are array-based
                    checked={((filters[type] as string[]) || []).includes(
                      item.id
                    )}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleFilterChange(type, item.id, e.target.checked)
                    }
                    size="sm"
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const content = (
    <div className="bg-background border border-border rounded-lg glassmorphism">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Filters
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs"
          >
            Clear All
          </Button>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          )}
        </div>
      </div>

      {/* Filter Sections */}
      <div className="divide-y divide-border">
        {/* Content Type */}
        <FilterSection
          title="Content Type"
          items={contentTypes}
          type="contentType"
        />

        {/* Date Range */}
        <div className="border-b border-border last:border-b-0">
          <button
            onClick={() => toggleSection("dateRange")}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
          >
            <span className="font-heading font-medium text-sm text-foreground">
              Date Range
            </span>
            <Icon
              name={expandedSections.dateRange ? "ChevronUp" : "ChevronDown"}
              size={16}
              className="text-muted-foreground"
            />
          </button>

          {expandedSections.dateRange && (
            <div className="px-4 pb-4 space-y-2">
              {dateRanges.map((range) => (
                <div key={range.id} className="flex items-center">
                  <Checkbox
                    label={range.label}
                    checked={filters.dateRange === range.id}
                    onChange={() => handleDateRangeChange(range.id)}
                    size="sm"
                  />
                </div>
              ))}

              {filters.dateRange === "custom" && (
                <div className="mt-3 space-y-2">
                  <Input type="date" label="From" className="text-sm" />
                  <Input type="date" label="To" className="text-sm" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Categories */}
        <FilterSection
          title="Categories"
          items={categories}
          type="categories"
          searchable={true}
        />

        {/* Authors */}
        <FilterSection
          title="Authors"
          items={authors}
          type="authors"
          searchable={true}
        />

        {/* Tags */}
        <FilterSection
          title="Tags"
          items={tags}
          type="tags"
          searchable={true}
        />
      </div>

      {/* Apply Button (Mobile) */}
      {isMobile && (
        <div className="p-4 border-t border-border">
          <Button variant="default" fullWidth onClick={onClose}>
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-background/95 glassmorphism">
            <div className="h-full overflow-y-auto">
              <div className="p-4">{content}</div>
            </div>
          </div>
        )}
      </>
    );
  }

  return <div className="sticky top-20">{content}</div>;
};

export default SearchFilters;
