import React from "react";
import { Link } from "react-router-dom";
import Image from "../../../components/AppImage.js";
import Icon from "../../../components/AppIcon.js";

// Types & Interfaces

interface Tag {
  id: string | number;
  name: string;
}

interface CommentAuthor {
  name: string;
  avatar: string;
}

interface RecentComment {
  id: string | number;
  author: CommentAuthor;
  timeAgo: string;
  content: string;
  articleId: string | number;
  articleTitle: string;
}

interface FeaturedAuthor {
  id: string | number;
  name: string;
  avatar: string;
  bio: string;
  articlesCount: number;
  followersCount: number | string;
}

interface SidebarProps {
  popularTags: Tag[];
  recentComments: RecentComment[];
  featuredAuthors: FeaturedAuthor[];
}

// Component

const Sidebar: React.FC<SidebarProps> = ({
  popularTags,
  recentComments,
  featuredAuthors,
}) => {
  return (
    <aside className="space-y-6">
      {/* Popular Tags */}
      <div className="bg-card border border-border rounded-xl p-6 glassmorphism">
        <h3 className="font-heading font-semibold text-lg mb-4 flex items-center">
          <Icon name="Hash" size={18} className="mr-2" />
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags?.map((tag) => (
            <Link
              key={tag.id}
              to={`/search-results?tag=${tag.name}`}
              className="px-3 py-1 bg-muted hover:bg-primary hover:text-primary-foreground text-sm rounded-full transition-colors micro-interaction"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Comments */}
      <div className="bg-card border border-border rounded-xl p-6 glassmorphism">
        <h3 className="font-heading font-semibold text-lg mb-4 flex items-center">
          <Icon name="MessageCircle" size={18} className="mr-2" />
          Recent Comments
        </h3>
        <div className="space-y-4">
          {recentComments?.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <Image
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {comment.author.name}
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  {comment.timeAgo}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {comment.content}
                </p>
                <Link
                  to={`/article-reading?id=${comment.articleId}`}
                  className="text-xs text-primary hover:underline"
                >
                  on "{comment.articleTitle}"
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Authors */}
      <div className="bg-card border border-border rounded-xl p-6 glassmorphism">
        <h3 className="font-heading font-semibold text-lg mb-4 flex items-center">
          <Icon name="Users" size={18} className="mr-2" />
          Featured Authors
        </h3>
        <div className="space-y-4">
          {featuredAuthors?.map((author) => (
            <Link
              key={author.id}
              to={`/user-profile?id=${author.id}`}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors micro-interaction"
            >
              <Image
                src={author.avatar}
                alt={author.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{author.name}</p>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {author.bio}
                </p>
                <div className="flex items-center space-x-3 mt-1 text-xs text-muted-foreground">
                  <span>{author.articlesCount} articles</span>
                  <span>•</span>
                  <span>{author.followersCount} followers</span>
                </div>
              </div>
              <Icon
                name="ChevronRight"
                size={16}
                className="text-muted-foreground"
              />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
