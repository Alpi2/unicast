import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage.js";
import Icon from "../../../components/AppIcon.js";

// Types & Interfaces

interface Author {
  name: string;
  avatar: string;
}

interface TrendingArticle {
  id: string | number;
  title: string;
  image: string;
  category: string;
  excerpt: string;
  readTime: string | number;
  author: Author;
}

interface TrendingSectionProps {
  trendingArticles: TrendingArticle[];
}

// Component

const TrendingSection: React.FC<TrendingSectionProps> = ({
  trendingArticles,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 320;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">
          Trending Now
        </h2>
        <div className="hidden md:flex items-center space-x-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 bg-muted hover:bg-muted/80 rounded-full transition-colors micro-interaction"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 bg-muted hover:bg-muted/80 rounded-full transition-colors micro-interaction"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none" as any, // TypeScript için cast
        }}
      >
        {trendingArticles.map((article) => (
          <div
            key={article.id}
            className="flex-shrink-0 w-80 bg-card border border-border rounded-xl overflow-hidden glassmorphism hover:shadow-lg transition-all duration-300 micro-interaction"
          >
            <div className="aspect-[16/10] relative overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
                  {article.category}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <button className="p-1.5 bg-black/20 hover:bg-black/40 rounded-full transition-colors">
                  <Icon name="Bookmark" size={14} className="text-white" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <Link
                to={`/article-reading?id=${article.id}`}
                className="block group"
              >
                <h3 className="font-heading font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {article.excerpt}
                </p>
              </Link>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-xs text-muted-foreground">
                    {article.author.name}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} />
                  <span>{article.readTime}m</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
