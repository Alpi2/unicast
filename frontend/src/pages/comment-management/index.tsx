import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header.js";
import CommentCard from "./components/CommentCard.js";
import FilterSidebar from "./components/FilterSidebar.js";
import type { CommentFilters } from "./components/FilterSidebar.js";
import ModerationSidebar from "./components/ModerationSidebar.js";
import BulkActionBar from "./components/BulkActionBar.js";
import CommentTabs from "./components/CommentTabs.js";
import SearchBar from "./components/SearchBar.js";
import Icon from "../../components/AppIcon.js";
import Button from "../../components/ui/Button.js";

// Types & Interfaces

interface User {
  id: number;
  name: string;
  avatar?: string;
  email?: string;
  role?: string;
}

interface Article {
  id: number;
  title: string;
}

interface Reply {
  id: number;
  content: string;
  user: { name: string; avatar?: string };
}

interface ModerationHistoryItem {
  action: string;
  timestamp: Date;
  moderator: string;
  reason: string;
}

// Extend the shape expected by CommentCard (mock data uses Date objects)
interface CommentData {
  id: number;
  content: string;
  user: User;
  article: Article;
  status: "pending" | "approved" | "flagged" | "rejected" | string;
  sentiment: "positive" | "negative" | "neutral" | string;
  createdAt: Date | string; // Accept both Date objects and strings
  replies: Reply[];
  isSpam: boolean;
  spamScore: number;
  moderationHistory: ModerationHistoryItem[];
  parentComment?: {
    id: number;
    content: string;
    user: { name: string };
  };
}

// Component

const CommentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [selectedComments, setSelectedComments] = useState<Set<number>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [filters, setFilters] = useState<CommentFilters>({
    status: "all",
    sentiment: "all",
    dateFrom: "",
    dateTo: "",
    author: "",
    article: "",
    spamScore: 0,
    sortBy: "newest",
    showSpamOnly: false,
    showRepliesOnly: false,
    showFlaggedOnly: false,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Mock user data for header
  const mockUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@contenthub.com",
    role: "admin",
  };

  // Mock comments data
  // Note: Real API returns date strings; mock data uses Date objects here.
  // CommentCard's formatDate calls `new Date(date)`, so both formats work.
  const mockComments: CommentData[] = [
    {
      id: 1,
      content:
        "This article provides excellent insights into modern web development practices. I particularly appreciate the section on performance optimization techniques. However, I think there could be more discussion about accessibility considerations in the implementation examples.",
      user: {
        id: 101,
        name: "Alex Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      article: {
        id: 201,
        title: "Advanced React Performance Optimization Techniques",
      },
      status: "pending",
      sentiment: "positive",
      createdAt: new Date(Date.now() - 1800000),
      replies: [],
      isSpam: false,
      spamScore: 15,
      moderationHistory: [],
    },
    {
      id: 2,
      content:
        "Great tutorial! I've been struggling with state management in large React applications, and this guide really helped clarify some concepts. The examples are clear and well-documented.",
      user: {
        id: 102,
        name: "Maria Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
      article: {
        id: 202,
        title: "State Management Patterns in React Applications",
      },
      status: "approved",
      sentiment: "positive",
      createdAt: new Date(Date.now() - 3600000),
      replies: [
        {
          id: 21,
          content: "Thanks for the feedback! I'm glad it was helpful.",
          user: { name: "Author" },
        },
      ],
      isSpam: false,
      spamScore: 8,
      moderationHistory: [
        {
          action: "Approved",
          timestamp: new Date(Date.now() - 3000000),
          moderator: "John Smith",
          reason: "Quality comment with constructive feedback",
        },
      ],
    },
    {
      id: 3,
      content:
        "This is spam content with multiple links. Check out our amazing deals at example.com and also visit our partner site at another-example.com for more offers!",
      user: {
        id: 103,
        name: "SpamBot2024",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      },
      article: {
        id: 203,
        title: "Building Secure Web Applications",
      },
      status: "flagged",
      sentiment: "neutral",
      createdAt: new Date(Date.now() - 7200000),
      replies: [],
      isSpam: true,
      spamScore: 92,
      moderationHistory: [
        {
          action: "Flagged as Spam",
          timestamp: new Date(Date.now() - 7000000),
          moderator: "Auto-Moderator",
          reason: "High spam score detected (92%)",
        },
      ],
    },
    {
      id: 4,
      content:
        "I disagree with the author's approach. This method is outdated and there are better alternatives available. The performance implications are not properly addressed.",
      user: {
        id: 104,
        name: "David Kim",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      article: {
        id: 204,
        title: "Modern CSS Grid Layouts",
      },
      status: "approved",
      sentiment: "negative",
      createdAt: new Date(Date.now() - 10800000),
      replies: [],
      isSpam: false,
      spamScore: 12,
      moderationHistory: [],
    },
    {
      id: 5,
      content:
        "Could you provide more examples of how to implement this in a production environment? The current examples seem too simplified for real-world applications.",
      user: {
        id: 105,
        name: "Jennifer Wilson",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      article: {
        id: 205,
        title: "Microservices Architecture Best Practices",
      },
      status: "pending",
      sentiment: "neutral",
      createdAt: new Date(Date.now() - 14400000),
      replies: [],
      isSpam: false,
      spamScore: 5,
      moderationHistory: [],
      parentComment: {
        id: 51,
        content:
          "This architecture pattern has worked well for our team in scaling our application.",
        user: { name: "Tech Lead" },
      },
    },
    {
      id: 6,
      content:
        "Inappropriate content that violates community guidelines. This comment contains offensive language and personal attacks against other users.",
      user: {
        id: 106,
        name: "ToxicUser123",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      },
      article: {
        id: 206,
        title: "Community Guidelines and Best Practices",
      },
      status: "rejected",
      sentiment: "negative",
      createdAt: new Date(Date.now() - 18000000),
      replies: [],
      isSpam: false,
      spamScore: 25,
      moderationHistory: [
        {
          action: "Rejected",
          timestamp: new Date(Date.now() - 17000000),
          moderator: "Sarah Johnson",
          reason: "Violates community guidelines - inappropriate language",
        },
      ],
    },
  ];

  // Filter comments based on active tab and filters
  const getFilteredComments = useCallback(() => {
    let filtered = mockComments;

    // Filter by tab
    if (activeTab !== "all") {
      filtered = filtered.filter((comment) => comment.status === activeTab);
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (comment) =>
          comment.content.toLowerCase().includes(query) ||
          comment.user.name.toLowerCase().includes(query) ||
          comment.article.title.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.sentiment && filters.sentiment !== "all") {
      filtered = filtered.filter(
        (comment) => comment.sentiment === filters.sentiment
      );
    }

    if (filters.author) {
      filtered = filtered.filter((comment) =>
        comment.user.name
          .toLowerCase()
          .includes((filters.author as string).toLowerCase())
      );
    }

    if (filters.article) {
      filtered = filtered.filter((comment) =>
        comment.article.title
          .toLowerCase()
          .includes((filters.article as string).toLowerCase())
      );
    }

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filtered = filtered.filter(
        (comment) => new Date(comment.createdAt) >= fromDate
      );
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      filtered = filtered.filter(
        (comment) => new Date(comment.createdAt) <= toDate
      );
    }

    if (filters.spamScore && filters.spamScore > 0) {
      filtered = filtered.filter(
        (comment) => comment.spamScore >= (filters.spamScore as number)
      );
    }

    if (filters.showSpamOnly) {
      filtered = filtered.filter((comment) => comment.isSpam);
    }

    if (filters.showRepliesOnly) {
      filtered = filtered.filter(
        (comment) => comment.replies && comment.replies.length > 0
      );
    }

    if (filters.showFlaggedOnly) {
      filtered = filtered.filter((comment) => comment.status === "flagged");
    }

    // Sort comments
    filtered.sort((a, b) => {
      // Date dönüşümü güvenliği
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      switch (filters.sortBy) {
        case "oldest":
          return dateA - dateB;
        case "spam_score":
          return b.spamScore - a.spamScore;
        case "replies":
          return (b.replies?.length || 0) - (a.replies?.length || 0);
        default: // newest
          return dateB - dateA;
      }
    });

    return filtered;
  }, [activeTab, searchQuery, filters]);

  const filteredComments = getFilteredComments();

  // Calculate counts for tabs
  const commentCounts = {
    pending: mockComments.filter((c) => c.status === "pending").length,
    approved: mockComments.filter((c) => c.status === "approved").length,
    flagged: mockComments.filter((c) => c.status === "flagged").length,
    rejected: mockComments.filter((c) => c.status === "rejected").length,
    total: mockComments.length,
  };

  // Handle comment selection
  const handleCommentSelect = (
    commentId: string | number,
    isSelected: boolean
  ) => {
    // Store IDs as numbers
    const id = Number(commentId);
    const newSelection = new Set(selectedComments);
    if (isSelected) {
      newSelection.add(id);
    } else {
      newSelection.delete(id);
    }
    setSelectedComments(newSelection);
  };

  const handleSelectAll = () => {
    const allCommentIds = new Set(filteredComments.map((c) => c.id));
    setSelectedComments(allCommentIds);
  };

  const handleClearSelection = () => {
    setSelectedComments(new Set());
  };

  // Handle bulk actions
  const handleBulkAction = async (action: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(
        `Performing ${action} on comments:`,
        Array.from(selectedComments)
      );

      // Clear selection after action
      setSelectedComments(new Set());
    } catch (error) {
      console.error("Bulk action failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle individual comment actions
  const handleApprove = async (commentId: string | number) => {
    console.log("Approving comment:", commentId);
  };

  const handleReject = async (commentId: string | number) => {
    console.log("Rejecting comment:", commentId);
  };

  const handleEdit = async (commentId: string | number) => {
    console.log("Editing comment:", commentId);
  };

  const handleBanUser = async (userId: string | number) => {
    console.log("Banning user:", userId);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAdvancedSearch = (searchParams: any) => {
    setSearchQuery(searchParams.query);
    setFilters((prev) => ({
      ...prev,
      author: searchParams.user,
      article: searchParams.article,
      sentiment: searchParams.sentiment || "all",
      showRepliesOnly: searchParams.hasReplies,
      showSpamOnly: searchParams.isSpam,
    }));
  };

  // Handle filters
  const handleFiltersChange = (newFilters: CommentFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: "all",
      sentiment: "all",
      dateFrom: "",
      dateTo: "",
      author: "",
      article: "",
      spamScore: 0,
      sortBy: "newest",
      showSpamOnly: false,
      showRepliesOnly: false,
      showFlaggedOnly: false,
    });
    setSearchQuery("");
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "a":
            e.preventDefault();
            handleSelectAll();
            break;
          case "d":
            e.preventDefault();
            handleClearSelection();
            break;
        }
      }

      if (e.key === "Delete" && selectedComments.size > 0) {
        e.preventDefault();
        handleBulkAction("delete");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedComments, filteredComments]); // added filteredComments to dependencies

  // Ensure compatibility with Header's expected User type (Header expects id: string|number...)
  const headerUser = {
    ...mockUser,
    role: mockUser.role || "user",
  };

  return (
    <>
      <Helmet>
        <title>Comment Management - Content Plattform</title>
        <meta
          name="description"
          content="Moderate and manage community discussions with comprehensive comment management tools."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header user={headerUser} notificationCount={commentCounts.pending} />

        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Comment Management
              </h1>
              <p className="text-muted-foreground">
                Moderate discussions and maintain community standards
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                iconName="SlidersHorizontal"
                iconPosition="left"
              >
                Filters
              </Button>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Left Sidebar - Filters */}
            <div
              className={`lg:block ${
                showMobileFilters ? "block" : "hidden"
              } absolute lg:static inset-0 z-40 lg:z-auto`}
            >
              {showMobileFilters && (
                <div
                  className="fixed inset-0 bg-black/50 lg:hidden"
                  onClick={() => setShowMobileFilters(false)}
                />
              )}
              <div className="lg:relative absolute left-0 top-0 h-full lg:h-auto">
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Search Bar */}
              <SearchBar
                onSearch={handleSearch}
                onAdvancedSearch={handleAdvancedSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              {/* Comment Tabs */}
              <CommentTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                counts={commentCounts}
              />

              {/* Bulk Action Bar */}
              <BulkActionBar
                selectedCount={selectedComments.size}
                onBulkAction={handleBulkAction}
                onSelectAll={handleSelectAll}
                onClearSelection={handleClearSelection}
                totalCount={filteredComments.length}
              />

              {/* Comments List */}
              <div className="space-y-4 mb-8">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="text-muted-foreground">
                        Processing...
                      </span>
                    </div>
                  </div>
                ) : filteredComments.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon
                      name="MessageSquare"
                      size={48}
                      className="mx-auto text-muted-foreground mb-4"
                    />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No comments found
                    </h3>
                    <p className="text-muted-foreground">
                      {searchQuery ||
                      Object.values(filters).some((v) => {
                        // Handle boolean filters explicitly; for other types ensure they are meaningful values
                        if (typeof v === "boolean") return v === true;
                        return (
                          v !== undefined &&
                          v !== null &&
                          v !== "all" &&
                          v !== "" &&
                          v !== 0
                        );
                      })
                        ? "Try adjusting your search or filters"
                        : "No comments match the current tab selection"}
                    </p>
                  </div>
                ) : (
                  filteredComments.map((comment) => (
                    // Casting to the type expected by CommentCard
                    // CommentCard expects a `Comment` type; our `CommentData` is compatible
                    <CommentCard
                      key={comment.id}
                      comment={comment as any}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onEdit={handleEdit}
                      onBanUser={handleBanUser}
                      onSelect={handleCommentSelect}
                      isSelected={selectedComments.has(comment.id)}
                    />
                  ))
                )}
              </div>

              {/* Load More Button */}
              {filteredComments.length > 0 && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    iconName="ChevronDown"
                    iconPosition="left"
                  >
                    Load More Comments
                  </Button>
                </div>
              )}
            </div>

            {/* Right Sidebar - Moderation Info */}
            <div className="hidden xl:block">
              <ModerationSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentManagement;
