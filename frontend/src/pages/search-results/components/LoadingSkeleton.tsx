import React from "react";

// Types & Interfaces

interface LoadingSkeletonProps {
  count?: number;
}

// Component

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Removed optional chaining because Array.from always returns an array */}
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg overflow-hidden glassmorphism animate-pulse"
        >
          {/* Thumbnail Skeleton */}
          <div className="h-48 bg-muted shimmer"></div>

          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            {/* Title Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded shimmer"></div>
              <div className="h-4 bg-muted rounded w-3/4 shimmer"></div>
            </div>

            {/* Excerpt Skeleton */}
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded shimmer"></div>
              <div className="h-3 bg-muted rounded shimmer"></div>
              <div className="h-3 bg-muted rounded w-2/3 shimmer"></div>
            </div>

            {/* Tags Skeleton */}
            <div className="flex space-x-2">
              <div className="h-6 w-16 bg-muted rounded-full shimmer"></div>
              <div className="h-6 w-20 bg-muted rounded-full shimmer"></div>
              <div className="h-6 w-14 bg-muted rounded-full shimmer"></div>
            </div>

            {/* Author and Meta Skeleton */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-muted rounded-full shimmer"></div>
                <div className="h-3 w-20 bg-muted rounded shimmer"></div>
              </div>
              <div className="h-3 w-24 bg-muted rounded shimmer"></div>
            </div>

            {/* Stats Skeleton */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex space-x-4">
                <div className="h-3 w-12 bg-muted rounded shimmer"></div>
                <div className="h-3 w-8 bg-muted rounded shimmer"></div>
              </div>
              <div className="h-3 w-16 bg-muted rounded shimmer"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
