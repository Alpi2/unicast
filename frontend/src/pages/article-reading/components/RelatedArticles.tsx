import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon.js";
import Image from "../../../components/AppImage.js";

// Types & Interfaces

export interface RelatedArticleAuthor {
  name: string;
  avatar?: string;
}

export interface RelatedArticleData {
  id: string | number;
  title: string;
  featuredImage?: string;
  categories?: string[];
  excerpt?: string;
  author?: RelatedArticleAuthor;
  readTime?: number | string;
  views?: number | string;
  [key: string]: any; // Allow extra fields for flexibility
}

interface RelatedArticlesProps {
  articles?: RelatedArticleData[];
}

// Component

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles = [] }) => {
  // Array check: do not render if articles is undefined or empty
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          Related Articles
        </h2>
        <Link
          to="/search-results"
          className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center space-x-1"
        >
          <span>View all</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>

      {/* Desktop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/article-reading?id=${article.id}`}
            className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-soft transition-all duration-300 micro-interaction"
          >
            <div className="aspect-video overflow-hidden">
              <Image
                src={article.featuredImage || ""}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                {article.categories?.slice(0, 2).map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Image
                    src={article.author?.avatar || ""}
                    alt={article.author?.name || "Author"}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>{article.author?.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>{article.readTime} min</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={12} />
                    <span>{article.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden mt-6">
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {articles.map((article) => (
            <Link
              key={`mobile-${article.id}`}
              to={`/article-reading?id=${article.id}`}
              className="flex-shrink-0 w-64 bg-card border border-border rounded-lg overflow-hidden"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={article.featuredImage || ""}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-heading font-medium text-sm text-foreground line-clamp-2 mb-2">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{article.author?.name}</span>
                  <span>{article.readTime} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
