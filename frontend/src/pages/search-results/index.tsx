import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../../components/AppIcon.js";
import Button from "../../components/ui/Button.js";
import Input from "../../components/ui/Input.js";
import Select from "../../components/ui/Select.js";
import Header from "../../components/ui/Header.js";
import SearchFilters from "./components/SearchFilters.js";
import type { FilterState } from "./components/SearchFilters.js";
import SearchResultCard from "./components/SearchResultCard.js";
import ActiveFilters from "./components/ActiveFilters.js";
import SearchSuggestions from "./components/SearchSuggestions.js";
import NoResults from "./components/NoResults.js";
import LoadingSkeleton from "./components/LoadingSkeleton.js";

// Types & Interfaces

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Author {
  name: string;
  username: string;
  avatar: string;
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: Author;
  publishedDate: string;
  readTime: number;
  category: string;
  tags: string[];
  thumbnail: string;
  relevanceScore: number;
  viewCount: number;
  commentCount: number;
  isBookmarked: boolean;
}

// Component

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract search query from the URL
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("q") || "";

  // State management
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isVoiceSearchActive, setIsVoiceSearchActive] =
    useState<boolean>(false);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    contentType: [],
    dateRange: "",
    categories: [],
    authors: [],
    tags: [],
  });

  // Mock user data
  const mockUser: User = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "creator",
  };

  // Mock search results data
  const mockSearchResults: Article[] = [
    {
      id: 1,
      title:
        "Complete Guide to React Hooks: useState, useEffect, and Custom Hooks",
      excerpt: `Learn everything about React Hooks in this comprehensive guide. We'll cover useState for state management, useEffect for side effects, and how to create your own custom hooks for reusable logic.`,
      author: {
        name: "Sarah Johnson",
        username: "sarah-johnson",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      publishedDate: "2024-08-10T10:30:00Z",
      readTime: 12,
      category: "Tutorial",
      tags: ["react", "javascript", "web-development"],
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=300&fit=crop",
      relevanceScore: 0.95,
      viewCount: 15420,
      commentCount: 89,
      isBookmarked: true,
    },
    {
      id: 2,
      title: "Modern CSS Grid Layout Techniques for Responsive Design",
      excerpt: `Discover advanced CSS Grid techniques that will revolutionize your web layouts. From basic grid concepts to complex responsive patterns, this guide covers everything you need to know.`,
      author: {
        name: "Mike Chen",
        username: "mike-chen",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      },
      publishedDate: "2024-08-09T14:15:00Z",
      readTime: 8,
      category: "Guide",
      tags: ["css", "web-development", "design"],
      thumbnail:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop",
      relevanceScore: 0.87,
      viewCount: 12350,
      commentCount: 67,
      isBookmarked: false,
    },
    {
      id: 3,
      title:
        "JavaScript Performance Optimization: Best Practices and Techniques",
      excerpt: `Boost your JavaScript application performance with these proven optimization techniques. Learn about code splitting, lazy loading, memory management, and more.`,
      author: {
        name: "Emily Davis",
        username: "emily-davis",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      },
      publishedDate: "2024-08-08T09:45:00Z",
      readTime: 15,
      category: "Article",
      tags: ["javascript", "performance", "optimization"],
      thumbnail:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=300&fit=crop",
      relevanceScore: 0.82,
      viewCount: 9870,
      commentCount: 45,
      isBookmarked: false,
    },
    {
      id: 4,
      title: "Building Scalable Node.js Applications with Express and MongoDB",
      excerpt: `Learn how to build robust, scalable backend applications using Node.js, Express framework, and MongoDB. This tutorial covers architecture patterns, security, and deployment strategies.`,
      author: {
        name: "Alex Rodriguez",
        username: "alex-rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      },
      publishedDate: "2024-08-07T16:20:00Z",
      readTime: 18,
      category: "Tutorial",
      tags: ["nodejs", "express", "mongodb", "backend"],
      thumbnail:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=300&fit=crop",
      relevanceScore: 0.78,
      viewCount: 8650,
      commentCount: 34,
      isBookmarked: true,
    },
    {
      id: 5,
      title: "UI/UX Design Principles for Modern Web Applications",
      excerpt: `Explore essential UI/UX design principles that create engaging user experiences. From color theory to typography, learn how to design interfaces that users love.`,
      author: {
        name: "Lisa Wang",
        username: "lisa-wang",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      },
      publishedDate: "2024-08-06T11:10:00Z",
      readTime: 10,
      category: "Design",
      tags: ["ui-ux", "design", "user-experience"],
      thumbnail:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop",
      relevanceScore: 0.75,
      viewCount: 7230,
      commentCount: 28,
      isBookmarked: false,
    },
    {
      id: 6,
      title:
        "Getting Started with TypeScript: A Comprehensive Beginner's Guide",
      excerpt: `Master TypeScript fundamentals with this beginner-friendly guide. Learn about types, interfaces, generics, and how TypeScript can improve your JavaScript development workflow.`,
      author: {
        name: "David Smith",
        username: "david-smith",
        avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      },
      publishedDate: "2024-08-05T13:30:00Z",
      readTime: 14,
      category: "Tutorial",
      tags: ["typescript", "javascript", "programming"],
      thumbnail:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=300&fit=crop",
      relevanceScore: 0.72,
      viewCount: 6540,
      commentCount: 22,
      isBookmarked: false,
    },
  ];

  const [searchResults, setSearchResults] =
    useState<Article[]>(mockSearchResults);
  const [totalResults, setTotalResults] = useState<number>(
    mockSearchResults.length
  );

  // Sort options
  const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "date", label: "Most Recent" },
    { value: "popularity", label: "Most Popular" },
    { value: "views", label: "Most Viewed" },
    { value: "comments", label: "Most Discussed" },
  ];

  // Perform search
  const performSearch = useCallback(
    async (query: string, currentFilters: FilterState, sort: string) => {
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      let results = [...mockSearchResults];

      // Filter by search query
      if (query) {
        results = results.filter(
          (article) =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            article.tags.some((tag) =>
              tag.toLowerCase().includes(query.toLowerCase())
            )
        );
      }

      // Apply filters
      if (currentFilters.contentType && currentFilters.contentType.length > 0) {
        results = results.filter((article) =>
          currentFilters.contentType.includes(article.category.toLowerCase())
        );
      }

      if (currentFilters.categories && currentFilters.categories.length > 0) {
        results = results.filter((article) =>
          currentFilters.categories.some(
            (cat) =>
              article.tags.includes(cat) ||
              article.category.toLowerCase() === cat
          )
        );
      }

      if (currentFilters.authors && currentFilters.authors.length > 0) {
        results = results.filter((article) =>
          currentFilters.authors.includes(article.author.username)
        );
      }

      if (currentFilters.tags && currentFilters.tags.length > 0) {
        results = results.filter((article) =>
          currentFilters.tags.some((tag) => article.tags.includes(tag))
        );
      }

      // Sort results
      switch (sort) {
        case "date":
          results.sort(
            (a, b) =>
              new Date(b.publishedDate).getTime() -
              new Date(a.publishedDate).getTime()
          );
          break;
        case "popularity":
        case "views":
          results.sort((a, b) => b.viewCount - a.viewCount);
          break;
        case "comments":
          results.sort((a, b) => b.commentCount - a.commentCount);
          break;
        case "relevance":
        default:
          results.sort(
            (a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0)
          );
          break;
      }

      setSearchResults(results);
      setTotalResults(results.length);
      setIsLoading(false);
    },
    []
  );

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
      performSearch(searchQuery, filters, sortBy);
    }
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    performSearch(searchQuery, newFilters, sortBy);
  };

  // Handle filter removal
  const handleRemoveFilter = (
    filterType: keyof FilterState,
    newValue: string | string[]
  ) => {
    const updatedFilters = {
      ...filters,
      [filterType]: newValue,
    };
    setFilters(updatedFilters);
    performSearch(searchQuery, updatedFilters, sortBy);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    const clearedFilters: FilterState = {
      contentType: [],
      dateRange: "",
      categories: [],
      authors: [],
      tags: [],
    };
    setFilters(clearedFilters);
    performSearch(searchQuery, clearedFilters, sortBy);
  };

  // Handle sort change
  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    performSearch(searchQuery, filters, newSort);
  };

  // Handle voice search
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      setIsVoiceSearchActive(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setSearchQuery(transcript);
          setIsVoiceSearchActive(false);
          navigate(`/search-results?q=${encodeURIComponent(transcript)}`);
          performSearch(transcript, filters, sortBy);
        }
      };

      recognition.onerror = () => {
        setIsVoiceSearchActive(false);
      };

      recognition.onend = () => {
        setIsVoiceSearchActive(false);
      };

      recognition.start();
    } else {
      alert("Voice search is not supported in this browser.");
    }
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    navigate(`/search-results?q=${encodeURIComponent(suggestion)}`);
    performSearch(suggestion, filters, sortBy);
  };

  // Handle new search
  const handleNewSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      navigate(`/search-results?q=${encodeURIComponent(query)}`);
      performSearch(query, filters, sortBy);
    } else {
      navigate("/search-results");
      setSearchResults([]);
      setTotalResults(0);
    }
  };

  // Load more results (infinite scroll)
  const loadMoreResults = () => {
    if (hasMore && !isLoading) {
      setCurrentPage((prev) => prev + 1);
      // In a real app, this would load more results from the API
    }
  };

  // Initialize search on component mount
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery, filters, sortBy);
    }
  }, [initialQuery, performSearch, filters, sortBy]);

  // Update search query when URL changes
  useEffect(() => {
    const newQuery = searchParams.get("q") || "";
    if (newQuery !== searchQuery) {
      setSearchQuery(newQuery);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-background">
      <Header user={mockUser} notificationCount={3} />
      <main className="container mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <form
            onSubmit={handleSearch}
            className="relative max-w-2xl mx-auto mb-4"
          >
            <div className="relative">
              <Input
                type="search"
                placeholder="Search articles, tutorials, guides..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                className="pl-12 pr-20 py-3 text-lg"
              />
              <Icon
                name="Search"
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />

              {/* Voice Search Button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleVoiceSearch}
                disabled={isVoiceSearchActive}
                className={`absolute right-12 top-1/2 transform -translate-y-1/2 ${
                  isVoiceSearchActive
                    ? "text-error animate-pulse"
                    : "text-muted-foreground"
                }`}
              >
                <Icon name="Mic" size={18} />
              </Button>

              {/* Clear Search Button */}
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleNewSearch("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  <Icon name="X" size={18} />
                </Button>
              )}
            </div>
          </form>

          {/* Mobile Filter Toggle */}
          <div className="flex justify-center lg:hidden">
            <Button
              variant="outline"
              onClick={() => setIsFiltersOpen(true)}
              iconName="Filter"
              iconPosition="left"
            >
              Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <SearchFilters
              isOpen={true}
              onClose={() => setIsFiltersOpen(false)}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              isMobile={false}
            />
          </aside>

          {/* Mobile Filters Overlay */}
          <SearchFilters
            isOpen={isFiltersOpen}
            onClose={() => setIsFiltersOpen(false)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isMobile={true}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Active Filters */}
            <ActiveFilters
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
              resultCount={totalResults}
            />

            {/* Results Header */}
            {(searchQuery || totalResults > 0) && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div>
                  <h1 className="font-heading font-semibold text-2xl text-foreground">
                    {searchQuery
                      ? `Search Results for "${searchQuery}"`
                      : "All Articles"}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {isLoading
                      ? "Searching..."
                      : `${totalResults.toLocaleString()} results found`}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <Select
                    options={sortOptions}
                    value={sortBy}
                    onChange={(value: string) => setSortBy(value)}
                    placeholder="Sort by"
                    className="w-48"
                  />

                  {/* Export Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Export
                  </Button>
                </div>
              </div>
            )}

            {/* Search Results */}
            {isLoading ? (
              <LoadingSkeleton count={6} />
            ) : totalResults > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {searchResults.map((article) => (
                    <SearchResultCard
                      key={article.id}
                      article={article}
                      searchQuery={searchQuery}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center">
                    <Button
                      variant="outline"
                      onClick={loadMoreResults}
                      loading={isLoading}
                      iconName="ChevronDown"
                      iconPosition="right"
                    >
                      Load More Results
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* No Results */}
                {searchQuery ? (
                  <NoResults
                    searchQuery={searchQuery}
                    onClearFilters={handleClearAllFilters}
                    onNewSearch={handleNewSearch}
                  />
                ) : (
                  /* Search Suggestions */
                  <SearchSuggestions
                    searchQuery={searchQuery}
                    onSuggestionClick={handleSuggestionClick}
                    onRecentSearchClick={handleSuggestionClick}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
