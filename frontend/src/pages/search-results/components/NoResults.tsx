import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";
import Image from "../../../components/AppImage.js";

// Types & Interfaces

interface PopularContentItem {
  id: number | string;
  title: string;
  author: string;
  category: string;
  thumbnail: string;
}

interface NoResultsProps {
  searchQuery?: string;
  onClearFilters: () => void;
  onNewSearch: (query: string) => void;
  suggestedSearches?: string[];
  popularContent?: PopularContentItem[];
}

// Component

const NoResults: React.FC<NoResultsProps> = ({
  searchQuery,
  onClearFilters,
  onNewSearch,
  suggestedSearches = [],
  popularContent = [],
}) => {
  const defaultSuggestedSearches: string[] = [
    "react tutorial",
    "javascript basics",
    "web development",
    "ui design",
    "node.js guide",
    "css tricks",
  ];

  const defaultPopularContent: PopularContentItem[] = [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      author: "Sarah Johnson",
      category: "Tutorial",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
    },
    {
      id: 2,
      title: "Modern CSS Grid Techniques",
      author: "Mike Chen",
      category: "Guide",
      thumbnail:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
    },
    {
      id: 3,
      title: "JavaScript Performance Tips",
      author: "Emily Davis",
      category: "Article",
      thumbnail:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=200&fit=crop",
    },
    {
      id: 4,
      title: "Building Responsive Layouts",
      author: "Alex Rodriguez",
      category: "Tutorial",
      thumbnail:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    },
  ];

  const activeSuggestedSearches =
    suggestedSearches.length > 0 ? suggestedSearches : defaultSuggestedSearches;
  const activePopularContent =
    popularContent.length > 0 ? popularContent : defaultPopularContent;

  const handleSuggestedSearch = (query: string) => {
    if (onNewSearch) {
      onNewSearch(query);
    }
  };

  return (
    <div className="text-center py-12">
      {/* No Results Icon */}
      <div className="mb-8">
        <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="SearchX" size={48} className="text-muted-foreground" />
        </div>

        <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">
          No results found
        </h2>

        {searchQuery && (
          <p className="text-muted-foreground mb-4">
            We couldn't find any content matching{" "}
            <span className="font-medium text-foreground">"{searchQuery}"</span>
          </p>
        )}

        <p className="text-muted-foreground max-w-md mx-auto">
          Try adjusting your search terms, removing filters, or explore our
          suggested content below.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
        <Button
          variant="default"
          onClick={onClearFilters}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Clear All Filters
        </Button>

        <Button
          variant="outline"
          onClick={() => onNewSearch("")}
          iconName="Search"
          iconPosition="left"
        >
          New Search
        </Button>

        <Link to="/homepage">
          <Button variant="ghost">Browse All Content</Button>
        </Link>
      </div>

      {/* Suggested Searches */}
      <div className="mb-12">
        <h3 className="font-heading font-medium text-lg text-foreground mb-4">
          Try these popular searches
        </h3>

        <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
          {activeSuggestedSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedSearch(search)}
              className="bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground px-4 py-2 rounded-full text-sm transition-colors micro-interaction"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Content */}
      <div className="max-w-4xl mx-auto">
        <h3 className="font-heading font-medium text-lg text-foreground mb-6">
          Popular content you might like
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activePopularContent.map((content) => (
            <Link
              key={content.id}
              to={`/article-reading?id=${content.id}`}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 glassmorphism"
            >
              <div className="relative overflow-hidden h-32 bg-muted">
                <Image
                  src={content.thumbnail}
                  alt={content.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-background/90 text-foreground px-2 py-1 rounded-full text-xs font-medium glassmorphism">
                    {content.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-heading font-medium text-sm text-foreground group-hover:text-primary line-clamp-2 mb-2">
                  {content.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  by {content.author}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/homepage">
            <Button variant="outline">View All Popular Content</Button>
          </Link>
        </div>
      </div>

      {/* Search Tips */}
      <div className="mt-12 max-w-2xl mx-auto bg-card border border-border rounded-lg p-6 glassmorphism">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Icon name="Lightbulb" size={20} className="text-accent" />
          <h3 className="font-heading font-medium text-lg text-foreground">
            Search Tips
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-start space-x-2">
            <Icon
              name="Check"
              size={16}
              className="text-success mt-0.5 flex-shrink-0"
            />
            <span>Use specific keywords related to your topic</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon
              name="Check"
              size={16}
              className="text-success mt-0.5 flex-shrink-0"
            />
            <span>Try different word combinations</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon
              name="Check"
              size={16}
              className="text-success mt-0.5 flex-shrink-0"
            />
            <span>Remove filters to broaden your search</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon
              name="Check"
              size={16}
              className="text-success mt-0.5 flex-shrink-0"
            />
            <span>Check spelling and try synonyms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoResults;
