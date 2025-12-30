import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon.js";
import Image from "../../../components/AppImage.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface Author {
  id: string | number;
  name: string;
  avatar: string;
}

export interface Comment {
  id: number;
  content: string;
  author: Author;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
}

interface CommentSectionProps {
  articleId?: string | number;
  comments?: Comment[];
}

type SortOption = "newest" | "oldest" | "popular";

// Component

const CommentSection: React.FC<CommentSectionProps> = ({
  articleId,
  comments: initialComments = [],
}) => {
  // Sanitize incoming data by assigning an empty array to replies if missing
  const sanitizedInitialComments = initialComments.map((c) => ({
    ...c,
    replies: c.replies || [],
  }));

  const [comments, setComments] = useState<Comment[]>(sanitizedInitialComments);
  const [newComment, setNewComment] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Mock User
  const currentUser: Author = {
    id: "current-user",
    name: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      content: newComment,
      author: currentUser,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [], // Required field — provide empty array
      isLiked: false,
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleSubmitReply = (e: React.FormEvent, parentId: number) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const reply: Comment = {
      id: Date.now(),
      content: replyText,
      author: currentUser,
      createdAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      replies: [], // Required empty array
    };

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === parentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      )
    );
    setReplyText("");
    setReplyingTo(null);
  };

  const handleLikeComment = (
    commentId: number,
    isReply: boolean = false,
    parentId: number | null = null
  ) => {
    if (isReply && parentId) {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                // replies is now required so optional chaining is not needed
                replies: comment.replies.map((reply) =>
                  reply.id === commentId
                    ? {
                        ...reply,
                        isLiked: !reply.isLiked,
                        likes: reply.isLiked
                          ? reply.likes - 1
                          : reply.likes + 1,
                      }
                    : reply
                ),
              }
            : comment
        )
      );
    } else {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                isLiked: !comment.isLiked,
                likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              }
            : comment
        )
      );
    }
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === "popular") {
      return b.likes - a.likes;
    }
    return 0;
  });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Sub-component prop types
  interface CommentItemProps {
    comment: Comment;
    isReply?: boolean;
    parentId?: number | null;
  }

  const CommentItem: React.FC<CommentItemProps> = ({
    comment,
    isReply = false,
    parentId = null,
  }) => (
    <div className={`${isReply ? "ml-12" : ""} space-y-3`}>
      <div className="flex space-x-3">
        <Image
          src={comment.author.avatar}
          alt={comment.author.name}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-sm text-foreground">
                {comment.author.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatTimeAgo(comment.createdAt)}
              </span>
            </div>
            <p className="text-sm text-foreground">{comment.content}</p>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLikeComment(comment.id, isReply, parentId)}
              className={`text-xs ${
                comment.isLiked ? "text-error" : "text-muted-foreground"
              }`}
            >
              <Icon
                name="Heart"
                size={14}
                className="mr-1"
                fill={comment.isLiked ? "currentColor" : "none"}
              />
              {comment.likes > 0 && comment.likes}
            </Button>
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setReplyingTo(replyingTo === comment.id ? null : comment.id)
                }
                className="text-xs text-muted-foreground"
              >
                <Icon name="MessageCircle" size={14} className="mr-1" />
                Reply
              </Button>
            )}
          </div>
        </div>
      </div>

      {replyingTo === comment.id && (
        <form
          onSubmit={(e) => handleSubmitReply(e, comment.id)}
          className="ml-11"
        >
          <div className="flex space-x-3">
            <Image
              src={currentUser.avatar}
              alt="Your avatar"
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="w-full p-3 text-sm bg-input border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                rows={2}
              />
              <div className="flex items-center justify-end space-x-2 mt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText("");
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={!replyText.trim()}>
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* replies is required now so '?' check is not necessary,
          but a length check may remain for safety */}
      {comment.replies.length > 0 && (
        <div className="space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              isReply={true}
              parentId={comment.id}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          Comments ({comments.length})
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-sm bg-input border border-border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Most Liked</option>
          </select>
        </div>
      </div>
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex space-x-3">
          <Image
            src={currentUser.avatar}
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-4 text-sm bg-input border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              rows={3}
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>Be respectful and constructive</span>
              </div>
              <Button type="submit" disabled={!newComment.trim()}>
                <Icon name="Send" size={16} className="mr-2" />
                Comment
              </Button>
            </div>
          </div>
        </div>
      </form>
      {/* Comments List */}
      <div className="space-y-6">
        {sortedComments.length > 0 ? (
          sortedComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="text-center py-8">
            <Icon
              name="MessageCircle"
              size={48}
              className="mx-auto text-muted-foreground mb-3"
            />
            <p className="text-muted-foreground">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentSection;
