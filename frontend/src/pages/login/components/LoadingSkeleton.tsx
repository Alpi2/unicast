import React from "react";

// Component

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl p-8 glassmorphism animate-pulse">
          {/* Header skeleton */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-muted rounded-xl mx-auto mb-6"></div>
            <div className="h-8 bg-muted rounded-lg mb-2"></div>
            <div className="h-4 bg-muted rounded-lg w-3/4 mx-auto"></div>
          </div>

          {/* Social buttons skeleton */}
          <div className="space-y-3 mb-6">
            <div className="h-12 bg-muted rounded-lg"></div>
            <div className="h-12 bg-muted rounded-lg"></div>
          </div>

          {/* Divider skeleton */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="h-4 w-8 bg-muted rounded"></div>
            </div>
          </div>

          {/* Form skeleton */}
          <div className="space-y-4 mb-6">
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-12 bg-muted rounded-lg"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-12 bg-muted rounded-lg"></div>
            </div>
          </div>

          {/* Remember me and forgot password skeleton */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-20"></div>
            </div>
            <div className="h-4 bg-muted rounded w-24"></div>
          </div>

          {/* Submit button skeleton */}
          <div className="h-12 bg-muted rounded-lg mb-8"></div>

          {/* Sign up prompt skeleton */}
          <div className="text-center">
            <div className="h-4 bg-muted rounded w-32 mx-auto mb-4"></div>
            <div className="h-12 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
