import React, { useState } from "react";
import Icon from "../../../components/AppIcon.js";
import Image from "../../../components/AppImage.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface User {
  id: string | number;
  name: string;
  avatar: string;
}

interface ModerationHistoryItem {
  action: string;
  timestamp: string;
  reason?: string;
  moderator?: string;
}

interface Comment {
  id: string | number;
  content: string;
  status: "pending" | "approved" | "flagged" | "rejected" | string;
  sentiment?: "positive" | "negative" | "neutral" | string;
  createdAt: string;
  isSpam?: boolean;
  spamScore?: number;
  user: User;
  article?: { title: string };
  replies?: Comment[];
  parentComment?: {
    user: User;
    content: string;
  };
  moderationHistory?: ModerationHistoryItem[];
}

interface CommentCardProps {
  comment: Comment;
  onApprove: (id: string | number) => void;
  onReject: (id: string | number) => void;
  onEdit: (id: string | number) => void;
  onBanUser: (userId: string | number) => void;
  onSelect: (id: string | number, isChecked: boolean) => void;
  isSelected: boolean;
  showContext?: boolean;
}

// Component

const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  onApprove,
  onReject,
  onEdit,
  onBanUser,
  onSelect,
  isSelected,
  showContext = true,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showActions, setShowActions] = useState<boolean>(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-warning bg-warning/10";
      case "approved":
        return "text-success bg-success/10";
      case "flagged":
        return "text-error bg-error/10";
      case "rejected":
        return "text-muted-foreground bg-muted";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-error";
      case "neutral":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`bg-card border border-border rounded-lg p-4 transition-all duration-200 ${
        isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-soft"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          {/* Selection Checkbox */}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(comment.id, e.target.checked)}
            className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
          />

          {/* User Avatar */}
          <div className="flex-shrink-0">
            <Image
              src={comment.user.avatar}
              alt={comment.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-medium text-foreground truncate">
                {comment.user.name}
              </h4>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  comment.status
                )}`}
              >
                {comment.status}
              </span>
              {comment.isSpam && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-error/10 text-error">
                  Spam ({comment.spamScore}%)
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{formatDate(comment.createdAt)}</span>
              <span className="flex items-center space-x-1">
                <Icon name="MessageCircle" size={14} />
                <span>{comment.replies?.length || 0} replies</span>
              </span>
              <span
                className={`flex items-center space-x-1 ${getSentimentColor(
                  comment.sentiment
                )}`}
              >
                <Icon name="TrendingUp" size={14} />
                <span>{comment.sentiment}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowActions(!showActions)}
            className="h-8 w-8"
          >
            <Icon name="MoreVertical" size={16} />
          </Button>
        </div>
      </div>

      {/* Article Context */}
      {showContext && comment.article && (
        <div className="mb-3 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
            <Icon name="FileText" size={14} />
            <span>Comment on:</span>
          </div>
          <h5 className="font-medium text-foreground text-sm truncate">
            {comment.article.title}
          </h5>
        </div>
      )}

      {/* Comment Content */}
      <div className="mb-3">
        <div
          className={`text-foreground ${
            !isExpanded && comment.content.length > 200 ? "line-clamp-3" : ""
          }`}
        >
          {comment.content}
        </div>
        {comment.content.length > 200 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
          >
            {isExpanded ? "Show less" : "Show more"}
          </Button>
        )}
      </div>

      {/* Parent Comment Context */}
      {comment.parentComment && (
        <div className="mb-3 p-3 bg-muted/30 rounded-lg border-l-2 border-primary/30">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
            <Icon name="CornerDownRight" size={14} />
            <span>Replying to {comment.parentComment.user.name}:</span>
          </div>
          <p className="text-sm text-foreground line-clamp-2">
            {comment.parentComment.content}
          </p>
        </div>
      )}

      {/* Moderation History */}
      {comment.moderationHistory && comment.moderationHistory.length > 0 && (
        <div className="mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground p-0 h-auto"
          >
            <Icon name="History" size={14} className="mr-1" />
            View moderation history ({comment.moderationHistory.length})
          </Button>
          {isExpanded && (
            <div className="mt-2 space-y-2">
              {comment.moderationHistory.map((history, index) => (
                <div key={index} className="text-sm p-2 bg-muted/30 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{history.action}</span>
                    <span className="text-muted-foreground">
                      {formatDate(history.timestamp)}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{history.reason}</p>
                  <p className="text-xs text-muted-foreground">
                    by {history.moderator}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      {showActions && (
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            {comment.status === "pending" && (
              <>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => onApprove(comment.id)}
                  iconName="Check"
                  iconPosition="left"
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onReject(comment.id)}
                  iconName="X"
                  iconPosition="left"
                >
                  Reject
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(comment.id)}
              iconName="Edit"
              iconPosition="left"
            >
              Edit
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="Flag" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBanUser(comment.user.id)}
              className="text-error hover:text-error/80"
            >
              <Icon name="UserX" size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
