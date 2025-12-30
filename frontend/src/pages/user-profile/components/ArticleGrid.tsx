import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage.js";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";
import Select from "../../../components/ui/Select.js";

// Types & Interfaces

type ViewMode = "grid" | "list";
type SortOption = "newest" | "oldest" | "popular" | "views";

interface Article {
  id: string | number;
  title: string;
  excerpt: string;
  thumbnail: string;
  category: string;
  publishedAt: string; // ISO Date string
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  status?: "draft" | "published" | "archived";
}

interface ArticleGridProps {
  articles: Article[];
  isOwnProfile?: boolean;
}

interface SelectOption {
  value: string;
  label: string;
}

// Component

const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  isOwnProfile = false,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const sortOptions: SelectOption[] = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "popular", label: "Most Popular" },
    { value: "views", label: "Most Viewed" },
  ];

  const categoryOptions: SelectOption[] = [
    { value: "all", label: "All Categories" },
    { value: "technology", label: "Technology" },
    { value: "design", label: "Design" },
    { value: "business", label: "Business" },
    { value: "lifestyle", label: "Lifestyle" },
  ];

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  // Filter and Sort Logic
  const filteredAndSortedArticles = articles
    .filter(
      (article) =>
        filterCategory === "all" ||
        article.category.toLowerCase() === filterCategory.toLowerCase()
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime()
          );
        case "popular":
          return b.likes - a.likes;
        case "views":
          return b.views - a.views;
        case "newest":
        default:
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
      }
    });

  return (
    <div className="bg-card border border-border rounded-xl p-6 glassmorphism">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Icon name="FileText" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Published Articles ({articles.length})
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <Icon name="List" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Select
          options={categoryOptions}
          value={filterCategory}
          onChange={(val: string) => setFilterCategory(val)}
          placeholder="Filter by category"
          className="sm:w-48"
        />
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={(val: string) => setSortBy(val as SortOption)}
          placeholder="Sort by"
          className="sm:w-48"
        />
      </div>

      {/* Articles */}
      {filteredAndSortedArticles.length === 0 ? (
        <div className="text-center py-12">
          <Icon
            name="FileText"
            size={48}
            className="text-muted-foreground mx-auto mb-4"
          />
          <h4 className="text-lg font-medium text-foreground mb-2">
            No articles found
          </h4>
          <p className="text-muted-foreground mb-4">
            {filterCategory !== "all"
              ? "Try adjusting your filters to see more articles."
              : "Start writing your first article to share your thoughts with the world."}
          </p>
          {isOwnProfile && (
            <Link to="/content-editor">
              <Button iconName="Plus" iconPosition="left">
                Write Article
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredAndSortedArticles.map((article) => (
            <article
              key={article.id}
              className={`group bg-background border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 micro-interaction ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              {/* Thumbnail */}
              <div
                className={`relative overflow-hidden ${
                  viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-video"
                }`}
              >
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    {article.category}
                  </span>
                </div>
                {article.status === "draft" && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-warning text-warning-foreground text-xs font-medium rounded-full">
                      Draft
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Icon name="Calendar" size={12} />
                  <span>{formatDate(article.publishedAt)}</span>
                  <span>•</span>
                  <span>{article.readTime} min read</span>
                </div>

                <Link to={`/article-reading?id=${article.id}`}>
                  <h4 className="font-heading font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                </Link>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Eye" size={12} />
                      {formatNumber(article.views)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Heart" size={12} />
                      {formatNumber(article.likes)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="MessageCircle" size={12} />
                      {formatNumber(article.comments)}
                    </span>
                  </div>

                  {isOwnProfile && (
                    <div className="flex items-center gap-1">
                      <Link to={`/content-editor?id=${article.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Icon name="Edit2" size={14} />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="MoreHorizontal" size={14} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleGrid;
