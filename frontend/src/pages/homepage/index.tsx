import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header.js";
import HeroSection from "./components/HeroSection.js";
import TrendingSection from "./components/TrendingSection.js";
import CategoryFilter from "./components/CategoryFilter.js";
import ArticleCard from "./components/ArticleCard.js";
import Sidebar from "./components/Sidebar.js";
import LoadingSkeleton from "./components/LoadingSkeleton.js";
import Icon from "../../components/AppIcon.js";

// Types & Interfaces

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

// General Author type (for article cards)
interface Author {
  id: number;
  name: string;
  avatar: string;
  bio?: string;
  articlesCount?: number;
  followersCount?: string;
}

// Sidebar-specific Author type (contains required fields)
interface SidebarAuthor {
  id: number;
  name: string;
  avatar: string;
  bio: string; // Sidebar için zorunlu
  articlesCount: number; // Sidebar için zorunlu
  followersCount: string; // Sidebar için zorunlu
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: Author;
  publishDate: string; // Made required for HeroSection (removed optional)
  readTime: number;
  views?: string;
  comments?: number;
  likes?: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface Tag {
  id: number;
  name: string;
}

interface CommentAuthor {
  name: string;
  avatar: string;
}

interface RecentComment {
  id: number;
  author: CommentAuthor;
  content: string;
  timeAgo: string;
  articleId: number;
  articleTitle: string;
}

// Component

const Homepage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<number>>(
    new Set()
  );
  const [page, setPage] = useState<number>(1);

  // Mock user data
  const currentUser: User = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "creator",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  };

  // Mock data
  const featuredArticle: Article = {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2025",
    excerpt:
      "Explore the cutting-edge technologies and methodologies that will shape web development in the coming year, from AI integration to sustainable coding practices.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    category: "Technology",
    author: {
      id: 1,
      name: "Alex Chen",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    publishDate: "Jan 8, 2025",
    readTime: 12,
  };

  const trendingArticles: Article[] = [
    {
      id: 11,
      title: "The Rise of AI-Powered Development Tools in 2025",
      excerpt:
        "Explore how artificial intelligence is revolutionizing software development with smart code completion, automated testing, and intelligent debugging tools.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      category: "AI",
      author: {
        id: 11,
        name: "Dr. Sarah Chen",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      },
      readTime: 14,
      publishDate: "Jan 8, 2025",
    },
    {
      id: 12,
      title: "Blockchain Beyond Cryptocurrency: Real-World Applications",
      excerpt:
        "Discover innovative blockchain implementations in supply chain management, healthcare records, and digital identity verification systems.",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
      category: "Blockchain",
      author: {
        id: 12,
        name: "Marcus Thompson",
        avatar:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      },
      readTime: 9,
      publishDate: "Jan 7, 2025",
    },
    {
      id: 13,
      title:
        "Sustainable Tech: Green Computing Practices for Modern Developers",
      excerpt:
        "Learn how to reduce your carbon footprint through energy-efficient coding practices, sustainable hosting solutions, and eco-friendly development workflows.",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
      category: "Sustainability",
      author: {
        id: 13,
        name: "Elena Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1594736797933-d0403ba691b6?w=150&h=150&fit=crop&crop=face",
      },
      readTime: 7,
      publishDate: "Jan 6, 2025",
    },
    {
      id: 14,
      title: "WebAssembly: The Future of High-Performance Web Applications",
      excerpt:
        "Dive into WebAssembly's capabilities for running near-native performance applications in web browsers and its impact on modern web development.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      category: "WebAssembly",
      author: {
        id: 14,
        name: "Kevin Park",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      readTime: 11,
      publishDate: "Jan 5, 2025",
    },
    {
      id: 15,
      title: "Cybersecurity Essentials for Full-Stack Developers",
      excerpt:
        "Master essential security practices including secure authentication, data encryption, API protection, and vulnerability assessment for modern web applications.",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
      category: "Security",
      author: {
        id: 15,
        name: "Rachel Liu",
        avatar:
          "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
      },
      readTime: 13,
      publishDate: "Jan 4, 2025",
    },
  ];

  const categories: Category[] = [
    { id: "technology", name: "Technology", icon: "Laptop", count: 45 },
    { id: "design", name: "Design", icon: "Palette", count: 32 },
    { id: "business", name: "Business", icon: "Briefcase", count: 28 },
    { id: "lifestyle", name: "Lifestyle", icon: "Coffee", count: 19 },
    { id: "health", name: "Health", icon: "Heart", count: 15 },
    { id: "travel", name: "Travel", icon: "MapPin", count: 12 },
  ];

  const mockArticles: Article[] = [
    {
      id: 5,
      title: "Mastering TypeScript: Advanced Types and Patterns",
      excerpt:
        "Deep dive into TypeScript's advanced type system and learn how to leverage complex types for better code safety and developer experience.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      category: "TypeScript",
      author: {
        id: 5,
        name: "Michael Brown",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      },
      publishDate: "Jan 7, 2025",
      readTime: 15,
      views: "2.1k",
      comments: 24,
      likes: 156,
    },
    {
      id: 6,
      title: "The Art of Minimalist Web Design",
      excerpt:
        "Explore the principles of minimalist design and how to create clean, effective user interfaces that prioritize user experience.",
      image:
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop",
      category: "Design",
      author: {
        id: 6,
        name: "Sophie Turner",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      },
      publishDate: "Jan 6, 2025",
      readTime: 7,
      views: "1.8k",
      comments: 18,
      likes: 142,
    },
    {
      id: 7,
      title: "Building a Successful Remote Team Culture",
      excerpt:
        "Learn strategies for creating and maintaining a strong team culture in distributed work environments.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      category: "Business",
      author: {
        id: 7,
        name: "James Wilson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      publishDate: "Jan 5, 2025",
      readTime: 9,
      views: "3.2k",
      comments: 31,
      likes: 203,
    },
    {
      id: 8,
      title: "Sustainable Living: Small Changes, Big Impact",
      excerpt:
        "Discover practical ways to reduce your environmental footprint through simple lifestyle adjustments that make a real difference.",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop",
      category: "Lifestyle",
      author: {
        id: 8,
        name: "Lisa Anderson",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      publishDate: "Jan 4, 2025",
      readTime: 6,
      views: "1.5k",
      comments: 12,
      likes: 89,
    },
    {
      id: 9,
      title: "Mental Health in the Digital Age",
      excerpt:
        "Understanding the impact of technology on mental well-being and strategies for maintaining healthy digital habits.",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      category: "Health",
      author: {
        id: 9,
        name: "Dr. Robert Lee",
        avatar:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      },
      publishDate: "Jan 3, 2025",
      readTime: 11,
      views: "2.7k",
      comments: 45,
      likes: 234,
    },
    {
      id: 10,
      title: "Hidden Gems: Off-the-Beaten-Path European Destinations",
      excerpt:
        "Discover lesser-known European destinations that offer authentic experiences away from the tourist crowds.",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop",
      category: "Travel",
      author: {
        id: 10,
        name: "Anna Schmidt",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
      publishDate: "Jan 2, 2025",
      readTime: 8,
      views: "1.9k",
      comments: 22,
      likes: 167,
    },
  ];

  const popularTags: Tag[] = [
    { id: 1, name: "javascript" },
    { id: 2, name: "react" },
    { id: 3, name: "webdev" },
    { id: 4, name: "css" },
    { id: 5, name: "typescript" },
    { id: 6, name: "nodejs" },
    { id: 7, name: "design" },
    { id: 8, name: "productivity" },
  ];

  const recentComments: RecentComment[] = [
    {
      id: 1,
      author: {
        name: "John Doe",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      content:
        "Great article! The examples really helped me understand the concepts better.",
      timeAgo: "2 hours ago",
      articleId: 5,
      articleTitle: "Mastering TypeScript",
    },
    {
      id: 2,
      author: {
        name: "Jane Smith",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      },
      content:
        "I've been looking for this kind of comprehensive guide. Thank you for sharing!",
      timeAgo: "4 hours ago",
      articleId: 6,
      articleTitle: "Minimalist Web Design",
    },
    {
      id: 3,
      author: {
        name: "Mike Johnson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      content:
        "The remote work tips are spot on. We've implemented several of these strategies.",
      timeAgo: "6 hours ago",
      articleId: 7,
      articleTitle: "Remote Team Culture",
    },
  ];

  // We use the Sidebar-specific Author type here
  const featuredAuthors: SidebarAuthor[] = [
    {
      id: 1,
      name: "Alex Chen",
      bio: "Full-stack developer and tech writer with 10+ years of experience",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      articlesCount: 42,
      followersCount: "12.5k",
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      bio: "UX designer passionate about creating inclusive digital experiences",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      articlesCount: 28,
      followersCount: "8.3k",
    },
    {
      id: 3,
      name: "Dr. Robert Lee",
      bio: "Mental health advocate and digital wellness researcher",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      articlesCount: 15,
      followersCount: "15.2k",
    },
  ];

  // Load initial articles
  useEffect(() => {
    const loadInitialArticles = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setArticles(mockArticles);
      setFilteredArticles(mockArticles);
      setLoading(false);
    };

    loadInitialArticles();
  }, []);

  // Filter articles by category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        (article) =>
          article.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredArticles(filtered);
    }
  }, [selectedCategory, articles]);

  // Load more articles
  const loadMoreArticles = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, this would fetch more articles from API
    const moreArticles = mockArticles.map((article) => ({
      ...article,
      id: article.id + page * 10,
    }));

    setArticles((prev) => [...prev, ...moreArticles]);
    setPage((prev) => prev + 1);

    // Simulate end of content after 3 pages
    if (page >= 3) {
      setHasMore(false);
    }

    setLoadingMore(false);
  }, [loadingMore, hasMore, page]);

  // Enhanced parallax effect for entire page
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements =
        document.querySelectorAll<HTMLElement>(".parallax-bg");

      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + index * 0.1;
        const yPos = -(scrolled * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });
    };

    const handleScrollForInfinite = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreArticles();
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollForInfinite);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollForInfinite);
    };
  }, [loadMoreArticles]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBookmark = (articleId: number) => {
    setBookmarkedArticles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const handleShare = (article: Article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: `${window.location.origin}/article-reading?id=${article.id}`,
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard?.writeText(
        `${window.location.origin}/article-reading?id=${article.id}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        {/*<div className="parallax-bg absolute top-20 right-20 w-64 h-64 rounded-full gradient-bg-primary opacity-5"></div>*/}
        {/*<div className="parallax-bg absolute bottom-40 left-10 w-48 h-48 rounded-full gradient-bg-secondary opacity-5 animate-pulse"></div>*/}
        {/*<div
          className="parallax-bg absolute top-1/2 left-1/3 w-32 h-32 rounded-full gradient-bg-accent opacity-5 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>*/}
      </div>

      {/* Floating Particles Background */}
      <div className="fixed inset-0 z-0 bg-particles opacity-30"></div>

      <Header user={currentUser} notificationCount={3} />

      <main className="container mx-auto px-4 py-6 lg:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Section */}
            <div
              className="stagger-animation"
              style={{ animationDelay: "0.2s" }}
            >
              <HeroSection featuredArticle={featuredArticle} />
            </div>

            {/* Trending Section */}
            <div
              className="stagger-animation"
              style={{ animationDelay: "0.4s" }}
            >
              {/* TrendingSection, FeaturedArticle ile aynı yapıda Article bekliyorsa uyumludur,
                  Eğer TrendingArticle tipinde Author içinde 'bio' gerekmiyorsa cast'e gerek kalmaz.
                  Ancak burada types.ts olmadığı için Article'ı kullanıyoruz. */}
              <TrendingSection trendingArticles={trendingArticles as any} />
            </div>

            {/* Category Filter */}
            <div
              className="stagger-animation"
              style={{ animationDelay: "0.6s" }}
            >
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            {/* Articles Grid */}
            {loading ? (
              <div
                className="stagger-animation"
                style={{ animationDelay: "0.8s" }}
              >
                <LoadingSkeleton />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {filteredArticles.map((article, index) => (
                    <div
                      key={article.id}
                      className="stagger-animation"
                      style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                    >
                      <ArticleCard
                        article={article}
                        isBookmarked={bookmarkedArticles.has(article.id)}
                        onBookmark={() => handleBookmark(article.id)}
                        onShare={() => handleShare(article)}
                      />
                    </div>
                  ))}
                </div>

                {/* Enhanced Load More Button */}
                {hasMore && (
                  <div
                    className="text-center stagger-animation"
                    style={{ animationDelay: "1.2s" }}
                  >
                    <button
                      onClick={loadMoreArticles}
                      disabled={loadingMore}
                      className="morphing-button px-8 py-3 gradient-bg-primary text-white rounded-xl shadow-electric-glow hover:gradient-bg-secondary disabled:opacity-50 disabled:cursor-not-allowed liquid-transition pulsing-glow"
                    >
                      <div className="flex items-center space-x-2">
                        {loadingMore && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        )}
                        <span>
                          {loadingMore ? "Loading..." : "Load More Articles"}
                        </span>
                      </div>
                    </button>
                  </div>
                )}

                {!hasMore && filteredArticles.length > 0 && (
                  <div
                    className="text-center py-8 stagger-animation"
                    style={{ animationDelay: "1.4s" }}
                  >
                    <div className="inline-block p-4 rounded-xl glassmorphism border border-border/20">
                      <p className="text-text-secondary">
                        You've reached the end of the articles
                      </p>
                      <div className="mt-2 w-16 h-1 gradient-bg-primary rounded-full mx-auto animate-pulse"></div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Enhanced Sidebar - Desktop Only */}
          <div
            className="hidden lg:block stagger-animation"
            style={{ animationDelay: "1.0s" }}
          >
            <div className="sticky top-24">
              {/* featuredAuthors artık SidebarAuthor[] tipinde olduğu için Sidebar ile uyumlu */}
              <Sidebar
                popularTags={popularTags}
                recentComments={recentComments}
                featuredAuthors={featuredAuthors as any}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Floating Action Button - Mobile Only */}
      {currentUser.role === "creator" && (
        <Link
          to="/content-editor"
          className="fixed bottom-6 right-6 z-40 lg:hidden"
        >
          <button className="morphing-button w-16 h-16 gradient-bg-accent text-black rounded-full shadow-yellow-glow hover:shadow-2xl liquid-transition pulsing-glow">
            <Icon name="Plus" size={28} />
          </button>
        </Link>
      )}

      {/* Enhanced Pull to Refresh Indicator - Mobile */}
      <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-30 lg:hidden">
        <div className="gradient-bg-primary text-white px-6 py-3 rounded-full text-sm font-medium opacity-0 liquid-transition pulsing-glow">
          Pull to refresh
        </div>
      </div>

      {/* Decorative SVG Elements */}
      {/*<svg
        className="fixed bottom-10 left-10 w-24 h-24 text-bright-cyan/5 pointer-events-none"
        viewBox="0 0 100 100"
      >
        <polygon
          points="50,10 90,30 90,70 50,90 10,70 10,30"
          fill="currentColor"
          className="animate-pulse"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 50 50;360 50 50"
            dur="30s"
            repeatCount="indefinite"
          />
        </polygon>
      </svg>

      <svg
        className="fixed top-1/3 right-10 w-16 h-16 text-vibrant-purple/5 pointer-events-none"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="currentColor"
          className="animate-ping"
        />
      </svg>*/}
    </div>
  );
};

export default Homepage;
