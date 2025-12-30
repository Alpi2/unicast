import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

type CommentStatus = "approved" | "pending" | "flagged" | "spam" | string;

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  postTitle: string;
  postId: number;
  timestamp: string;
  status: CommentStatus;
  likes: number;
  isReply: boolean;
}

interface StatusConfigItem {
  color: string;
  icon: string;
  label: string;
}

// Component

const RecentComments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Alex Thompson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      content: `This is exactly what I was looking for! The explanation of concurrent features is really clear and the examples are practical.`,
      postTitle: "Getting Started with React 18 and Concurrent Features",
      postId: 1,
      timestamp: "2025-01-11T02:15:00Z",
      status: "approved",
      likes: 12,
      isReply: false,
    },
    {
      id: 2,
      author: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      content: `Great article! I have a question about the useTransition hook - when would you recommend using it over useDeferredValue?`,
      postTitle: "Getting Started with React 18 and Concurrent Features",
      postId: 1,
      timestamp: "2025-01-11T01:45:00Z",
      status: "pending",
      likes: 5,
      isReply: false,
    },
    {
      id: 3,
      author: "Mike Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      content: `The TypeScript examples are really helpful. Could you do a follow-up post about advanced TypeScript patterns with React 18?`,
      postTitle: "Mastering TypeScript: Advanced Types and Patterns",
      postId: 5,
      timestamp: "2025-01-10T23:30:00Z",
      status: "approved",
      likes: 8,
      isReply: false,
    },
    {
      id: 4,
      author: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      content: `Thanks for sharing this! The performance comparison between different approaches was very insightful.`,
      postTitle: "Building Scalable APIs with Node.js and Express",
      postId: 3,
      timestamp: "2025-01-10T20:15:00Z",
      status: "approved",
      likes: 3,
      isReply: false,
    },
    {
      id: 5,
      author: "David Park",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      content: `I disagree with some of the points made here. The traditional approach still has its merits in certain scenarios.`,
      postTitle: "Building Scalable APIs with Node.js and Express",
      postId: 3,
      timestamp: "2025-01-10T18:45:00Z",
      status: "flagged",
      likes: 1,
      isReply: false,
    },
  ]);

  const handleCommentAction = (commentId: number, action: CommentStatus) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, status: action } : comment
      )
    );
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInMinutes = Math.floor(
      (now.getTime() - commentTime.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const getStatusBadge = (status: CommentStatus) => {
    const statusConfig: Record<string, StatusConfigItem> = {
      approved: {
        color: "bg-success/10 text-success",
        icon: "CheckCircle",
        label: "Approved",
      },
      pending: {
        color: "bg-warning/10 text-warning",
        icon: "Clock",
        label: "Pending",
      },
      flagged: {
        color: "bg-error/10 text-error",
        icon: "Flag",
        label: "Flagged",
      },
      spam: {
        color: "bg-destructive/10 text-destructive",
        icon: "Shield",
        label: "Spam",
      },
    };

    const config = statusConfig[status];

    if (!config) return null;

    return (
      <span
        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {/* Icon name string olduğu için as any */}
        <Icon name={config.icon as any} size={12} />
        <span>{config.label}</span>
      </span>
    );
  };

  const pendingCount = comments.filter(
    (comment) => comment.status === "pending"
  ).length;
  const flaggedCount = comments.filter(
    (comment) => comment.status === "flagged"
  ).length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-semibold text-xl text-foreground">
            Recent Comments
          </h2>
          <Link to="/comment-management">
            <Button variant="outline" size="sm" iconName="ExternalLink">
              Manage All
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-warning rounded-full flex-shrink-0"></div>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {pendingCount} pending review
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-error rounded-full flex-shrink-0"></div>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {flaggedCount} flagged
            </span>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-6 hover:bg-muted/30 transition-colors"
          >
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/assets/images/no_image.png";
                  }}
                />
              </div>

              {/* Comment Content */}
              <div className="flex-1 min-w-0">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <h4 className="font-medium text-foreground text-sm flex-shrink-0">
                      {comment.author}
                    </h4>
                    {getStatusBadge(comment.status)}
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-4">
                    {formatTimeAgo(comment.timestamp)}
                  </span>
                </div>

                {/* Comment Text and Footer in Horizontal Layout */}
                <div className="flex items-start gap-4">
                  {/* Comment Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground mb-2 leading-relaxed">
                      {comment.content}
                    </p>

                    {/* Post Link and Likes in Horizontal Layout */}
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/article-reading?id=${comment.postId}`}
                        className="text-xs text-primary hover:text-primary/80 transition-colors truncate"
                        title={comment.postTitle}
                      >
                        on "{comment.postTitle}"
                      </Link>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                        <Icon name="Heart" size={12} />
                        <span>{comment.likes}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {comment.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
                          onClick={() =>
                            handleCommentAction(comment.id, "approved")
                          }
                          title="Approve"
                        >
                          <Icon name="Check" size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-error hover:text-error hover:bg-error/10"
                          onClick={() =>
                            handleCommentAction(comment.id, "spam")
                          }
                          title="Mark as Spam"
                        >
                          <Icon name="X" size={14} />
                        </Button>
                      </>
                    )}
                    {comment.status === "flagged" && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
                          onClick={() =>
                            handleCommentAction(comment.id, "approved")
                          }
                          title="Approve"
                        >
                          <Icon name="Check" size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-error hover:text-error hover:bg-error/10"
                          onClick={() =>
                            handleCommentAction(comment.id, "spam")
                          }
                          title="Remove"
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title="Reply"
                    >
                      <Icon name="Reply" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title="More options"
                    >
                      <Icon name="MoreHorizontal" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Showing {comments.length} recent comments
          </span>
          <Link to="/comment-management">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
            >
              View All Comments
              <Icon name="ArrowRight" size={14} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentComments;
