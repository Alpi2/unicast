import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon.js";
import Image from "../../../components/AppImage.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface Author {
  name: string;
  username: string;
  avatar?: string;
}

interface Article {
  id: string | number;
  title: string;
  excerpt: string;
  author: Author;
  publishedDate: string | Date;
  readTime: number;
  category: string;
  tags?: string[];
  thumbnail: string;
  relevanceScore?: number;
  viewCount?: number;
  commentCount?: number;
  isBookmarked?: boolean;
}

interface SearchResultCardProps {
  article: Article;
  searchQuery?: string;
}

// Component

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  article,
  searchQuery = "",
}) => {
  const {
    id,
    title,
    excerpt,
    author,
    publishedDate,
    readTime,
    category,
    tags,
    thumbnail,
    relevanceScore,
    viewCount,
    commentCount,
    isBookmarked = false,
  } = article;

  const formatDate = (date: string | Date): string => {
    const now = new Date();
    const publishDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - publishDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;

    return publishDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const highlightSearchTerm = (
    text: string,
    query: string
  ): React.ReactNode => {
    if (!query || !text) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className="bg-accent/30 text-accent-foreground px-1 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle bookmark functionality
    console.log("Bookmark toggled for article:", id);
  };

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle share functionality
    console.log("Share article:", id);
  };

  return (
    <article className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 glassmorphism">
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-48 bg-muted">
        <Link to={`/article-reading?id=${id}`}>
          <Image
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Relevance Score */}
        {relevanceScore && (
          <div className="absolute top-3 left-3">
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
              {Math.round(relevanceScore * 100)}% match
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-background/90 text-foreground px-2 py-1 rounded-full text-xs font-medium glassmorphism">
            {category}
          </span>
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            className="bg-background/90 glassmorphism w-8 h-8"
          >
            <Icon
              name={isBookmarked ? "Bookmark" : "BookmarkPlus"}
              size={16}
              className={isBookmarked ? "text-accent" : "text-muted-foreground"}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="bg-background/90 glassmorphism w-8 h-8"
          >
            <Icon name="Share2" size={16} className="text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <Link to={`/article-reading?id=${id}`}>
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {highlightSearchTerm(title, searchQuery)}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
          {highlightSearchTerm(excerpt, searchQuery)}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-muted-foreground text-xs px-2 py-1">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Author and Meta */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Link
              to={`/user-profile?author=${author.username}`}
              className="flex items-center space-x-2 hover:text-foreground transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                {author.name.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium">{author.name}</span>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <span>{formatDate(publishedDate)}</span>
            <span>•</span>
            <span>{readTime} min read</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span>{viewCount?.toLocaleString() || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={14} />
              <span>{commentCount || 0}</span>
            </div>
          </div>

          <Link
            to={`/article-reading?id=${id}`}
            className="text-primary hover:text-primary/80 text-xs font-medium transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SearchResultCard;
