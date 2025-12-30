import React, { useState } from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";
import { Checkbox } from "../../../components/ui/Checkbox.js";

// Types & Interfaces

interface Post {
  id: number;
  title: string;
  status: "published" | "draft" | "scheduled" | string;
  views: number;
  comments: number;
  lastModified: string;
  author: string;
  category: string;
  featured: boolean;
  scheduledDate?: string;
}

interface ContentTableProps {
  activeTab: string;
}

type SortColumn = "title" | "views" | "comments" | "modified";
type SortOrder = "asc" | "desc";

interface StatusConfig {
  color: string;
  icon: string;
  label: string;
}

// Component

const ContentTable: React.FC<ContentTableProps> = ({ activeTab }) => {
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<SortColumn>("modified");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const allPosts: Post[] = [
    {
      id: 1,
      title: "Getting Started with React 18 and Concurrent Features",
      status: "published",
      views: 2847,
      comments: 23,
      lastModified: "2025-01-10T14:30:00Z",
      author: "Sarah Johnson",
      category: "Technology",
      featured: true,
    },
    {
      id: 2,
      title: "The Future of Web Development: Trends to Watch in 2025",
      status: "draft",
      views: 0,
      comments: 0,
      lastModified: "2025-01-11T09:15:00Z",
      author: "Sarah Johnson",
      category: "Technology",
      featured: false,
    },
    {
      id: 3,
      title: "Building Scalable APIs with Node.js and Express",
      status: "published",
      views: 1923,
      comments: 18,
      lastModified: "2025-01-09T16:45:00Z",
      author: "Sarah Johnson",
      category: "Backend",
      featured: false,
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox: When to Use Each",
      status: "scheduled",
      views: 0,
      comments: 0,
      lastModified: "2025-01-08T11:20:00Z",
      author: "Sarah Johnson",
      category: "Design",
      featured: false,
      scheduledDate: "2025-01-15T10:00:00Z",
    },
    {
      id: 5,
      title: "Mastering TypeScript: Advanced Types and Patterns",
      status: "published",
      views: 3456,
      comments: 31,
      lastModified: "2025-01-07T13:30:00Z",
      author: "Sarah Johnson",
      category: "Technology",
      featured: true,
    },
    {
      id: 6,
      title: "Database Design Best Practices for Modern Applications",
      status: "draft",
      views: 0,
      comments: 0,
      lastModified: "2025-01-11T08:45:00Z",
      author: "Sarah Johnson",
      category: "Backend",
      featured: false,
    },
  ];

  const filterPosts = (): Post[] => {
    let filtered = [...allPosts];

    switch (activeTab) {
      case "drafts":
        filtered = filtered.filter((post) => post.status === "draft");
        break;
      case "published":
        filtered = filtered.filter((post) => post.status === "published");
        break;
      case "scheduled":
        filtered = filtered.filter((post) => post.status === "scheduled");
        break;
      default:
        break;
    }

    // Sort posts
    filtered.sort((a, b) => {
      let aValue: string | number | Date = 0;
      let bValue: string | number | Date = 0;

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "views":
          aValue = a.views;
          bValue = b.views;
          break;
        case "comments":
          aValue = a.comments;
          bValue = b.comments;
          break;
        case "modified":
        default:
          aValue = new Date(a.lastModified).getTime();
          bValue = new Date(b.lastModified).getTime();
          break;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const posts = filterPosts();

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPosts(posts.map((post) => post.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleSelectPost = (postId: number, checked: boolean) => {
    if (checked) {
      setSelectedPosts([...selectedPosts, postId]);
    } else {
      setSelectedPosts(selectedPosts.filter((id) => id !== postId));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string, scheduledDate?: string) => {
    const statusConfig: Record<string, StatusConfig> = {
      published: {
        color: "bg-success/10 text-success",
        icon: "CheckCircle",
        label: "Published",
      },
      draft: {
        color: "bg-warning/10 text-warning",
        icon: "Edit3",
        label: "Draft",
      },
      scheduled: {
        color: "bg-primary/10 text-primary",
        icon: "Clock",
        label: "Scheduled",
      },
    };

    const config = statusConfig[status];

    if (!config) return null;

    return (
      <div className="flex flex-col space-y-1">
        <span
          className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
        >
          {/* Icon name is a string, so use 'as any' */}
          <Icon name={config.icon as any} size={12} />
          <span>{config.label}</span>
        </span>
        {status === "scheduled" && scheduledDate && (
          <span className="text-xs text-muted-foreground">
            {formatDate(scheduledDate)}
          </span>
        )}
      </div>
    );
  };

  const handleSort = (column: SortColumn) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  // Checkbox'ın onChange eventi için helper (eğer custom UI component event'i farklıysa burası düzenlenebilir)
  // Genelde native input mantığıyla e.target.checked döner
  const onCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id?: number
  ) => {
    const checked = e.target.checked;
    if (id !== undefined) {
      handleSelectPost(id, checked);
    } else {
      handleSelectAll(checked);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Bulk Actions */}
      {selectedPosts.length > 0 && (
        <div className="bg-muted border-b border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedPosts.length} post
              {selectedPosts.length !== 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Eye">
                Publish
              </Button>
              <Button variant="outline" size="sm" iconName="Archive">
                Archive
              </Button>
              <Button variant="destructive" size="sm" iconName="Trash2">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={
                    selectedPosts.length === posts.length && posts.length > 0
                  }
                  onChange={(e) => onCheckboxChange(e)}
                />
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort("title")}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Title</span>
                  <Icon
                    name={
                      sortBy === "title" && sortOrder === "asc"
                        ? "ChevronUp"
                        : "ChevronDown"
                    }
                    size={16}
                    className={
                      sortBy === "title"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">
                  Status
                </span>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort("views")}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Views</span>
                  <Icon
                    name={
                      sortBy === "views" && sortOrder === "asc"
                        ? "ChevronUp"
                        : "ChevronDown"
                    }
                    size={16}
                    className={
                      sortBy === "views"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort("comments")}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Comments</span>
                  <Icon
                    name={
                      sortBy === "comments" && sortOrder === "asc"
                        ? "ChevronUp"
                        : "ChevronDown"
                    }
                    size={16}
                    className={
                      sortBy === "comments"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort("modified")}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  <span>Last Modified</span>
                  <Icon
                    name={
                      sortBy === "modified" && sortOrder === "asc"
                        ? "ChevronUp"
                        : "ChevronDown"
                    }
                    size={16}
                    className={
                      sortBy === "modified"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  />
                </button>
              </th>
              <th className="w-24 p-4">
                <span className="text-sm font-medium text-foreground">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="p-4">
                  <Checkbox
                    checked={selectedPosts.includes(post.id)}
                    onChange={(e) => onCheckboxChange(e, post.id)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-foreground truncate">
                          {post.title}
                        </h3>
                        {post.featured && (
                          <Icon
                            name="Star"
                            size={16}
                            className="text-warning flex-shrink-0"
                          />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {post.category}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(post.status, post.scheduledDate)}
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1 text-sm text-foreground">
                    <Icon
                      name="Eye"
                      size={16}
                      className="text-muted-foreground"
                    />
                    <span>{post.views.toLocaleString()}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1 text-sm text-foreground">
                    <Icon
                      name="MessageSquare"
                      size={16}
                      className="text-muted-foreground"
                    />
                    <span>{post.comments}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(post.lastModified)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border">
        {posts.map((post) => (
          <div key={post.id} className="p-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={selectedPosts.includes(post.id)}
                onChange={(e) => onCheckboxChange(e, post.id)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-foreground text-sm">
                      {post.title}
                    </h3>
                    {post.featured && (
                      <Icon
                        name="Star"
                        size={14}
                        className="text-warning flex-shrink-0"
                      />
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Icon name="MoreHorizontal" size={14} />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  {getStatusBadge(post.status, post.scheduledDate)}
                  <span className="text-xs text-muted-foreground">
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name="Eye" size={14} />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name="MessageSquare" size={14} />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(post.lastModified)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="p-12 text-center">
          <Icon
            name="FileText"
            size={48}
            className="text-muted-foreground mx-auto mb-4"
          />
          <h3 className="font-heading font-medium text-lg text-foreground mb-2">
            No posts found
          </h3>
          <p className="text-muted-foreground mb-4">
            {activeTab === "all"
              ? "You haven't created any posts yet."
              : `No ${activeTab} posts found.`}
          </p>
          <Button variant="default" iconName="Plus">
            Create Your First Post
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContentTable;
