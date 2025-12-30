import React from "react";

// Component

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Article Card Skeleton */}
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-xl overflow-hidden glassmorphism"
        >
          <div className="aspect-[16/10] bg-muted shimmer"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-muted rounded shimmer w-3/4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded shimmer"></div>
              <div className="h-3 bg-muted rounded shimmer w-5/6"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-muted rounded-full shimmer"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-muted rounded shimmer w-20"></div>
                  <div className="h-2 bg-muted rounded shimmer w-16"></div>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="h-3 bg-muted rounded shimmer w-8"></div>
                <div className="h-3 bg-muted rounded shimmer w-8"></div>
                <div className="h-3 bg-muted rounded shimmer w-8"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
