import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface SuggestionItem {
  query: string;
  type: string;
  count: number;
}

interface RecentSearchItem {
  query: string;
  timestamp: string;
}

interface PopularContentItem {
  id: number | string;
  title: string;
  author: string;
  viewCount: number;
  category: string;
}

interface SearchSuggestionsProps {
  searchQuery?: string;
  suggestions?: SuggestionItem[];
  recentSearches?: RecentSearchItem[];
  popularContent?: PopularContentItem[];
  onSuggestionClick?: (suggestion: string) => void;
  onRecentSearchClick?: (search: string) => void;
}

// Component

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  searchQuery,
  suggestions = [],
  recentSearches = [],
  popularContent = [],
  onSuggestionClick,
  onRecentSearchClick,
}) => {
  const handleSuggestionClick = (suggestion: string) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
  };

  const handleRecentSearchClick = (search: string) => {
    if (onRecentSearchClick) {
      onRecentSearchClick(search);
    }
  };

  const defaultSuggestions: SuggestionItem[] = [
    { query: "react hooks tutorial", type: "tutorial", count: 45 },
    { query: "javascript best practices", type: "guide", count: 67 },
    { query: "ui design trends 2024", type: "article", count: 23 },
    { query: "web development career", type: "career", count: 34 },
    { query: "mobile app development", type: "tutorial", count: 56 },
  ];

  const defaultRecentSearches: RecentSearchItem[] = [
    { query: "react performance optimization", timestamp: "2 hours ago" },
    { query: "css grid layout", timestamp: "1 day ago" },
    { query: "node.js authentication", timestamp: "3 days ago" },
    { query: "typescript basics", timestamp: "1 week ago" },
  ];

  const defaultPopularContent: PopularContentItem[] = [
    {
      id: 1,
      title: "Complete Guide to React Hooks in 2024",
      author: "Sarah Johnson",
      viewCount: 15420,
      category: "Tutorial",
    },
    {
      id: 2,
      title: "Modern CSS Techniques Every Developer Should Know",
      author: "Mike Chen",
      viewCount: 12350,
      category: "Guide",
    },
    {
      id: 3,
      title: "Building Scalable Node.js Applications",
      author: "Emily Davis",
      viewCount: 9870,
      category: "Tutorial",
    },
    {
      id: 4,
      title: "UI/UX Design Trends That Will Dominate 2024",
      author: "Alex Rodriguez",
      viewCount: 8650,
      category: "Design",
    },
  ];

  const activeSuggestions =
    suggestions.length > 0 ? suggestions : defaultSuggestions;
  const activeRecentSearches =
    recentSearches.length > 0 ? recentSearches : defaultRecentSearches;
  const activePopularContent =
    popularContent.length > 0 ? popularContent : defaultPopularContent;

  return (
    <div className="space-y-6">
      {/* Search Suggestions */}
      {searchQuery && activeSuggestions.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4 glassmorphism">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Search" size={16} className="text-muted-foreground" />
            <h3 className="font-heading font-medium text-sm text-foreground">
              Search Suggestions
            </h3>
          </div>

          <div className="space-y-2">
            {activeSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.query)}
                className="w-full flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors text-left group"
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    name="TrendingUp"
                    size={14}
                    className="text-muted-foreground"
                  />
                  <span className="text-sm text-foreground group-hover:text-primary">
                    {suggestion.query}
                  </span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {suggestion.type}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {suggestion.count} results
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recent Searches */}
      {activeRecentSearches.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4 glassmorphism">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <h3 className="font-heading font-medium text-sm text-foreground">
                Recent Searches
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear History
            </Button>
          </div>

          <div className="space-y-2">
            {activeRecentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleRecentSearchClick(search.query)}
                className="w-full flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors text-left group"
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    name="RotateCcw"
                    size={14}
                    className="text-muted-foreground"
                  />
                  <span className="text-sm text-foreground group-hover:text-primary">
                    {search.query}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {search.timestamp}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Content */}
      <div className="bg-card border border-border rounded-lg p-4 glassmorphism">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
          <h3 className="font-heading font-medium text-sm text-foreground">
            Popular Content
          </h3>
        </div>

        <div className="space-y-3">
          {activePopularContent.map((content) => (
            <Link
              key={content.id}
              to={`/article-reading?id=${content.id}`}
              className="block p-3 rounded-md hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-medium text-sm text-foreground group-hover:text-primary line-clamp-2 mb-1">
                    {content.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>by {content.author}</span>
                    <span>•</span>
                    <span>{content.viewCount.toLocaleString()} views</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full ml-2">
                  {content.category}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-border">
          <Link
            to="/homepage"
            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
          >
            View all trending content →
          </Link>
        </div>
      </div>

      {/* Search Tips */}
      <div className="bg-card border border-border rounded-lg p-4 glassmorphism">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Lightbulb" size={16} className="text-muted-foreground" />
          <h3 className="font-heading font-medium text-sm text-foreground">
            Search Tips
          </h3>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-start space-x-2">
            <span className="text-primary">•</span>
            <span>Use quotes for exact phrases: "react hooks"</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-primary">•</span>
            <span>Add category filters to narrow results</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-primary">•</span>
            <span>Try different keywords if no results found</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-primary">•</span>
            <span>Use voice search for hands-free searching</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;
