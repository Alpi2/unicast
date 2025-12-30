import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage.js";
import Icon from "../../../components/AppIcon.js";

// Types & Interfaces

interface Author {
  name: string;
  avatar: string;
}

interface Article {
  id: string | number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  publishDate: string;
  readTime: number | string;
  author: Author;
  views?: number | string;
  likes?: number | string;
}

interface ArticleCardProps {
  article: Article;
  isBookmarked: boolean;
  onBookmark?: (id: string | number) => void;
  onShare?: (article: Article) => void;
}

// Component

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  isBookmarked,
  onBookmark,
  onShare,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !isHovered) return;

      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // 3D Rotation Calculation
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      handleMouseLeave();
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      handleMouseLeave();
    };
  }, [isHovered]);

  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBookmark) {
      onBookmark(article.id);
    }
  };

  const handleShareClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShare) {
      onShare(article);
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative card-3d"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/article-reading?id=${article.id}`}>
        <article className="bg-card glassmorphism rounded-xl overflow-hidden liquid-transition hover:shadow-electric-glow border border-border/20">
          {/* Image Container with Parallax Effect */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 liquid-transition"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 text-xs font-medium gradient-bg-secondary text-white rounded-full pulsing-glow">
                {article.category}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleBookmarkClick}
                className={`morphing-button p-2 rounded-full transition-all duration-300 ${
                  isBookmarked
                    ? "gradient-bg-accent text-black"
                    : "bg-dark-navy/50 text-text-interactive hover:gradient-bg-primary"
                }`}
              >
                <Icon name="Bookmark" size={14} />
              </button>
              <button
                onClick={handleShareClick}
                className="morphing-button p-2 bg-dark-navy/50 text-text-interactive hover:gradient-bg-secondary rounded-full transition-all duration-300"
              >
                <Icon name="Share2" size={14} />
              </button>
            </div>

            {/* Floating Elements */}
            <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-bright-cyan/30 animate-pulse"></div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:gradient-text-primary liquid-transition">
              {article.title}
            </h3>
            <p className="text-text-secondary text-sm mb-4 line-clamp-2">
              {article.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-8 h-8 rounded-full border border-bright-cyan/20 card-3d"
                />
                <div>
                  <p className="text-xs font-medium text-foreground">
                    {article.author.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {article.publishDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs text-text-secondary">
                <span className="text-interactive">{article.readTime} min</span>
                {article.views && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={12} />
                    <span>{article.views}</span>
                  </div>
                )}
                {article.likes && (
                  <div className="flex items-center space-x-1">
                    <Icon
                      name="Heart"
                      size={12}
                      className="text-bright-magenta"
                    />
                    <span>{article.likes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar Animation */}
            <div className="mt-3 h-1 bg-dark-navy/20 rounded-full overflow-hidden">
              <div className="h-full gradient-bg-primary rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
            </div>
          </div>

          {/* Decorative SVG */}
          <svg
            className="absolute bottom-2 left-2 w-6 h-6 text-vibrant-purple/20"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="8"
              fill="currentColor"
              className="animate-ping"
            />
          </svg>
        </article>
      </Link>
    </div>
  );
};

export default ArticleCard;
