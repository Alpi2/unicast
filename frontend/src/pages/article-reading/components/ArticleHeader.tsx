import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon.js";
import Image from "../../../components/AppImage.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface Author {
  id: string | number;
  name: string;
  avatar?: string;
}

export interface Article {
  title?: string;
  categories?: string[];
  author?: Author;
  publishedAt?: string;
  readTime?: number | string;
  featuredImage?: string;
  [key: string]: any; // Allow extra fields for flexibility
}

interface ArticleHeaderProps {
  article?: Article | null; // Data may not have arrived yet
  isBookmarked: boolean;
  onBookmark: () => void;
  onShare: () => void;
  isMinimized?: boolean;
}

// Component

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  article,
  isBookmarked,
  onBookmark,
  onShare,
  isMinimized = false,
}) => {
  if (isMinimized) {
    return (
      <div className="sticky top-0 z-40 bg-background/95 glassmorphism border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Link to="/homepage">
              <Button variant="ghost" size="icon">
                <Icon name="ArrowLeft" size={20} />
              </Button>
            </Link>
            <h1 className="text-sm font-medium text-foreground truncate max-w-48">
              {article?.title}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBookmark}
              className={isBookmarked ? "text-warning" : ""}
            >
              {/* Using 'as any' because icon name is determined via ternary operator */}
              <Icon
                name={(isBookmarked ? "Bookmark" : "BookmarkPlus") as any}
                size={18}
              />
            </Button>
            <Button variant="ghost" size="icon" onClick={onShare}>
              <Icon name="Share" size={18} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <Link to="/homepage">
          <Button variant="ghost" size="icon">
            <Icon name="ArrowLeft" size={24} />
          </Button>
        </Link>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBookmark}
            className={isBookmarked ? "text-warning" : ""}
          >
            <Icon
              name={(isBookmarked ? "Bookmark" : "BookmarkPlus") as any}
              size={20}
            />
          </Button>
          <Button variant="ghost" size="icon" onClick={onShare}>
            <Icon name="Share" size={20} />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {article?.categories?.map((category) => (
            <span
              key={category}
              className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
            >
              {category}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight">
          {article?.title}
        </h1>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Image
              src={article?.author?.avatar || ""}
              alt={article?.author?.name || "Author"}
              className="w-8 h-8 rounded-full object-cover"
            />
            <Link
              to={`/user-profile?id=${article?.author?.id}`}
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              {article?.author?.name}
            </Link>
          </div>
          <span>•</span>
          <time dateTime={article?.publishedAt}>
            {article?.publishedAt
              ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </time>
          <span>•</span>
          <span>{article?.readTime} min read</span>
        </div>

        {article?.featuredImage && (
          <div className="mt-8 rounded-lg overflow-hidden">
            <Image
              src={article.featuredImage}
              alt={article.title || "Article Image"}
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default ArticleHeader;
