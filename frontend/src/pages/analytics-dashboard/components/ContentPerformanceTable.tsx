import React, { useState } from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";

// Interface definition for the data structure
export interface Article {
  id: string | number;
  title: string;
  publishDate: string;
  views: number;
  shares: number;
  comments: number;
  engagement: number;
  status: "published" | "draft" | "archived" | string;
}

// Type for sort direction
type SortDirection = "asc" | "desc";

// Component Props
interface ContentPerformanceTableProps {
  data: Article[];
}

const ContentPerformanceTable: React.FC<ContentPerformanceTableProps> = ({
  data,
}) => {
  const [sortField, setSortField] = useState<keyof Article>("views");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: keyof Article) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedData = [...(data || [])].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue === undefined || bValue === undefined) return 0;

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  // Keep return type as 'any' to avoid possible string errors with icon naming
  // (This allows returning dynamic icons without strict icon set type checks)
  const getSortIcon = (field: keyof Article): any => {
    if (sortField !== field) return "ArrowUpDown";
    return sortDirection === "asc" ? "ArrowUp" : "ArrowDown";
  };

  const formatNumber = (num: number): string => {
    if (!num) return "0";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="bg-card border border-border rounded-lg soft-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            Content Performance
          </h3>
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-heading font-medium text-sm text-foreground">
                <button
                  onClick={() => handleSort("title")}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Article</span>
                  <Icon name={getSortIcon("title")} size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-heading font-medium text-sm text-foreground">
                <button
                  onClick={() => handleSort("views")}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Views</span>
                  <Icon name={getSortIcon("views")} size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-heading font-medium text-sm text-foreground">
                <button
                  onClick={() => handleSort("shares")}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Shares</span>
                  <Icon name={getSortIcon("shares")} size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-heading font-medium text-sm text-foreground">
                <button
                  onClick={() => handleSort("comments")}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Comments</span>
                  <Icon name={getSortIcon("comments")} size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-heading font-medium text-sm text-foreground">
                <button
                  onClick={() => handleSort("engagement")}
                  className="flex items-center space-x-2 hover:text-primary transition-colors"
                >
                  <span>Engagement</span>
                  <Icon name={getSortIcon("engagement")} size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-heading font-medium text-sm text-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((article) => (
              <tr
                key={article.id}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Icon
                        name="FileText"
                        size={16}
                        className="text-muted-foreground"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground line-clamp-1">
                        {article.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {article.publishDate}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-medium text-foreground">
                    {formatNumber(article.views)}
                  </span>
                </td>
                <td className="p-4">
                  <span className="font-medium text-foreground">
                    {formatNumber(article.shares)}
                  </span>
                </td>
                <td className="p-4">
                  <span className="font-medium text-foreground">
                    {article.comments}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">
                      {article.engagement}%
                    </span>
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${article.engagement}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      article.status === "published"
                        ? "bg-success/10 text-success"
                        : article.status === "draft"
                        ? "bg-warning/10 text-warning"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {article.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentPerformanceTable;
