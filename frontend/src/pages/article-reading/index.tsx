import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/ui/Header.js";
import ArticleHeader from "./components/ArticleHeader.js";
import ReadingProgressBar from "./components/ReadingProgressBar.js";
import TypographyControls from "./components/TypographyControls.js";
import ArticleContent from "./components/ArticleContent.js";
import TableOfContents from "./components/TableOfContents.js";
import SocialShareButtons from "./components/SocialShareButtons.js";
import CommentSection from "./components/CommentSection.js";
import AuthorBio from "./components/AuthorBio.js";
import RelatedArticles from "./components/RelatedArticles.js";

// TYPE IMPORTS & DEFINITIONS

import type { Article as HeaderArticle } from "./components/ArticleHeader.js";
import type { Comment } from "./components/CommentSection.js";
import type { Author as FullAuthor } from "./components/AuthorBio.js";
import type { RelatedArticleData } from "./components/RelatedArticles.js";

// User type expected by the Header component
interface CurrentUser {
  id: string | number;
  name: string;
  email: string;
  role: string;
  [key: string]: any;
}

// Common data type that satisfies the needs of child components (Header, Bio, Share)
interface PageArticleData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: FullAuthor;
  categories: string[];
  tags: string[];
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  featuredImage: string;
}

const ArticleReading: React.FC = () => {
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id") || "1";

  const [isHeaderMinimized, setIsHeaderMinimized] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<string>("text-base");
  const [lineHeight, setLineHeight] = useState<string>("leading-normal");
  const [theme, setTheme] = useState<string>("light");

  // Mock article data
  const article: PageArticleData = {
    id: articleId,
    title:
      "The Future of React: Exploring Server Components and Concurrent Features",
    excerpt:
      "Dive deep into React's latest innovations including Server Components, Suspense, and concurrent rendering that are reshaping how we build modern web applications.",
    content: `<h2>Introduction to Modern React</h2>
    <p>React has evolved significantly since its inception, and the latest updates bring revolutionary changes to how we think about building web applications. Server Components represent a paradigm shift that allows us to render components on the server while maintaining the interactive nature of client-side React.</p>
    
    <h3>Understanding Server Components</h3>
    <p>Server Components are a new type of component that runs exclusively on the server. Unlike traditional React components that run in the browser, Server Components execute during the build process or on-demand on the server, allowing for:</p>
    
    <ul>
      <li>Direct access to backend resources like databases and file systems</li>
      <li>Reduced bundle sizes by keeping server-only code on the server</li>
      <li>Improved performance through server-side rendering optimizations</li>
      <li>Better SEO and initial page load times</li>
    </ul>
    
    <h3>Concurrent Features and Suspense</h3>
    <p>React's concurrent features enable applications to remain responsive even during heavy computational tasks. The new concurrent renderer can interrupt rendering work to handle more urgent updates, creating a smoother user experience.</p>
    
    <blockquote>
      <p>"The future of React is about making applications faster, more accessible, and easier to develop while maintaining the developer experience we love."</p>
    </blockquote>
    
    <h4>Key Benefits of Concurrent React</h4>
    <p>Concurrent React introduces several performance improvements:</p>
    
    <ol>
      <li><strong>Time Slicing:</strong> Breaking down rendering work into smaller chunks</li>
      <li><strong>Selective Hydration:</strong> Prioritizing interactive elements</li>
      <li><strong>Automatic Batching:</strong> Grouping state updates for better performance</li>
      <li><strong>Transition API:</strong> Marking updates as non-urgent</li>
    </ol>
    
    <h3>Practical Implementation</h3>
    <p>When implementing these features in your applications, consider the following best practices:</p>
    
    <p>Start by identifying components that would benefit from server-side rendering. Components that fetch data, perform heavy computations, or render large lists are excellent candidates for Server Components.</p>
    
    <h4>Code Example</h4>
    <pre><code>// ServerComponent.server.js
    import { db } from './database';
    
    export default async function ServerComponent() {
      const data = await db.query('SELECT * FROM articles');
      
      return (
        &lt;div&gt;
          {data.map(article =&gt; (
            &lt;ArticleCard key={article.id} article={article} /&gt;
          ))}
        &lt;/div&gt;
      );
    }</code></pre>
    
    <h3>Performance Considerations</h3>
    <p>While these new features offer significant benefits, it's important to understand their implications:</p>
    
    <p>Server Components require a different mental model for data fetching and state management. Traditional client-side patterns may need to be reconsidered when adopting these technologies.</p>
    
    <h3>Migration Strategy</h3>
    <p>Migrating existing applications to use these new features should be done incrementally. Start with leaf components that don't have complex state management, then gradually move up the component tree.</p>
    
    <h4>Step-by-Step Approach</h4>
    <p>Follow these steps for a smooth migration:</p>
    
    <ul>
      <li>Audit your current component architecture</li>
      <li>Identify components suitable for server rendering</li>
      <li>Set up the necessary build tools and configurations</li>
      <li>Test thoroughly in a staging environment</li>
      <li>Monitor performance metrics after deployment</li>
    </ul>
    
    <h3>Future Outlook</h3>
    <p>The React team continues to innovate, with upcoming features focusing on developer experience improvements and performance optimizations. Stay tuned for updates on:</p>
    
    <ul>
      <li>Enhanced debugging tools for Server Components</li>
      <li>Improved TypeScript support</li>
      <li>Better integration with popular frameworks</li>
      <li>Advanced caching strategies</li>
    </ul>
    
    <h3>Conclusion</h3>
    <p>React's evolution toward Server Components and concurrent features represents a significant step forward in web development. These technologies enable us to build faster, more efficient applications while maintaining the developer experience that makes React so popular.</p>
    
    <p>As you explore these new capabilities, remember that the core principles of React remain the same: building reusable, composable components that create great user experiences. The tools are evolving, but the fundamental approach to thinking about UI development continues to be React's greatest strength.</p>`,
    author: {
      id: "author-1",
      name: "Sarah Chen",
      title: "Senior React Developer & Technical Writer",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      bio: `Sarah is a senior React developer with over 8 years of experience building scalable web applications. She's passionate about modern web technologies, performance optimization, and sharing knowledge through technical writing. Sarah has contributed to several open-source projects and regularly speaks at tech conferences.`,
      articleCount: 47,
      followerCount: 12500,
      joinedDate: "2019-03-15",
      socialLinks: [
        {
          platform: "Twitter",
          icon: "Twitter",
          url: "https://twitter.com/sarahchen",
        },
        {
          platform: "GitHub",
          icon: "Github",
          url: "https://github.com/sarahchen",
        },
        {
          platform: "LinkedIn",
          icon: "Linkedin",
          url: "https://linkedin.com/in/sarahchen",
        },
      ],
    },
    categories: ["React", "Web Development", "JavaScript"],
    tags: [
      "server-components",
      "concurrent-react",
      "performance",
      "modern-web",
    ],
    publishedAt: "2025-01-10T10:30:00Z",
    readTime: 12,
    views: 8420,
    likes: 342,
    featuredImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
  };

  // Mock comments data
  const comments: Comment[] = [
    {
      id: 1,
      content:
        "Excellent article! The explanation of Server Components really helped me understand the concept better. I'm excited to try implementing this in my next project.",
      author: {
        id: "user-1",
        name: "Michael Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      },
      createdAt: "2025-01-11T08:15:00Z",
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: 11,
          content:
            "I agree! Sarah's writing style makes complex topics very accessible. Looking forward to more articles on this topic.",
          author: {
            id: "user-2",
            name: "Emily Johnson",
            avatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
          },
          createdAt: "2025-01-11T09:22:00Z",
          likes: 5,
          isLiked: true,
          replies: [], // empty array for type safety
        },
      ],
    },
    {
      id: 2,
      content:
        "The migration strategy section is particularly valuable. We're planning to adopt Server Components in our enterprise application, and this gives us a clear roadmap.",
      author: {
        id: "user-3",
        name: "David Kim",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      },
      createdAt: "2025-01-11T07:45:00Z",
      likes: 8,
      isLiked: false,
      replies: [], // empty array for type safety
    },
    {
      id: 3,
      content:
        "Great timing on this article! React's concurrent features have been a game-changer for our app's performance. The automatic batching alone improved our render times significantly.",
      author: {
        id: "user-4",
        name: "Lisa Thompson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      },
      createdAt: "2025-01-11T06:30:00Z",
      likes: 15,
      isLiked: true,
      replies: [], // empty array for type safety
    },
  ];

  // Mock related articles
  const relatedArticles: RelatedArticleData[] = [
    {
      id: "related-1",
      title: "Building Scalable React Applications with TypeScript",
      excerpt:
        "Learn how to leverage TypeScript to build more maintainable and scalable React applications with better developer experience.",
      featuredImage:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
      author: {
        name: "Alex Morgan",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      },
      categories: ["TypeScript", "React"],
      readTime: 8,
      views: 5240,
    },
    {
      id: "related-2",
      title: "Optimizing React Performance: Best Practices and Tools",
      excerpt:
        "Discover proven techniques and tools to optimize your React applications for better performance and user experience.",
      featuredImage:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop",
      author: {
        name: "Jennifer Lee",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      },
      categories: ["Performance", "React"],
      readTime: 10,
      views: 7830,
    },
    {
      id: "related-3",
      title: "State Management in Modern React: Context vs Redux vs Zustand",
      excerpt:
        "Compare different state management solutions for React applications and learn when to use each approach.",
      featuredImage:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      author: {
        name: "Robert Wilson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      },
      categories: ["State Management", "React"],
      readTime: 15,
      views: 9120,
    },
  ];

  // Mock user data for header
  const currentUser: CurrentUser = {
    id: "current-user",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "reader",
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsHeaderMinimized(scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // SSR safe check
    if (typeof window !== "undefined") {
      const savedFontSize =
        localStorage.getItem("article-font-size") || "text-base";
      const savedLineHeight =
        localStorage.getItem("article-line-height") || "leading-normal";
      const savedTheme = localStorage.getItem("article-theme") || "light";

      setFontSize(savedFontSize);
      setLineHeight(savedLineHeight);
      setTheme(savedTheme);
    }
  }, []);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    const nav = navigator as any; // Cast to any to satisfy TypeScript
    if (nav.share) {
      nav
        .share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        })
        .catch((err: any) => console.error("Error sharing:", err));
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleFontSizeChange = (newSize: string) => {
    setFontSize(newSize);
    localStorage.setItem("article-font-size", newSize);
  };

  const handleLineHeightChange = (newHeight: string) => {
    setLineHeight(newHeight);
    localStorage.setItem("article-line-height", newHeight);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("article-theme", newTheme);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-background"
      }`}
    >
      <Header user={currentUser} notificationCount={3} />
      <ReadingProgressBar isVisible={!isHeaderMinimized} />
      {isHeaderMinimized && (
        <ArticleHeader
          // Use `as HeaderArticle` instead of `as any` for safer type casting
          article={article as HeaderArticle}
          isBookmarked={isBookmarked}
          onBookmark={handleBookmark}
          onShare={handleShare}
          isMinimized={true}
        />
      )}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isHeaderMinimized && (
          <ArticleHeader
            article={article as HeaderArticle}
            isBookmarked={isBookmarked}
            onBookmark={handleBookmark}
            onShare={handleShare}
          />
        )}

        <div className="relative">
          <ArticleContent
            content={article.content}
            fontSize={fontSize}
            lineHeight={lineHeight}
            theme={theme}
          />

          <SocialShareButtons article={article} />

          {/* Author may be optional, so add a null check */}
          <AuthorBio
            author={article.author || null}
            isFollowing={isFollowing}
            onFollow={handleFollow}
          />

          <CommentSection articleId={article.id} comments={comments} />

          <RelatedArticles articles={relatedArticles} />
        </div>
      </main>
      <TableOfContents isVisible={true} />
      <TypographyControls
        fontSize={fontSize}
        onFontSizeChange={handleFontSizeChange}
        lineHeight={lineHeight}
        onLineHeightChange={handleLineHeightChange}
        theme={theme}
        onThemeChange={handleThemeChange}
      />
      {/* Standard style tag */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }

          .print-only {
            display: block !important;
          }

          body {
            font-size: 12pt;
            line-height: 1.5;
            color: black;
            background: white;
          }

          .article-content {
            max-width: none;
            margin: 0;
            padding: 0;
          }

          .article-content h1,
          .article-content h2,
          .article-content h3,
          .article-content h4,
          .article-content h5,
          .article-content h6 {
            page-break-after: avoid;
            margin-top: 1em;
            margin-bottom: 0.5em;
          }

          .article-content p {
            margin-bottom: 1em;
            orphans: 3;
            widows: 3;
          }

          .article-content blockquote {
            border-left: 3px solid #ccc;
            padding-left: 1em;
            margin: 1em 0;
            font-style: italic;
          }

          .article-content pre,
          .article-content code {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 0.5em;
            font-family: "Courier New", monospace;
            font-size: 10pt;
          }
        }
      `}</style>
    </div>
  );
};

export default ArticleReading;
