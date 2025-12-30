import React, { useState, useEffect } from "react";

// Props interface
interface ReadingProgressBarProps {
  isVisible?: boolean;
}

const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  isVisible = true,
}) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;

      // Add null checks and fallbacks to avoid math errors
      const scrollHeight = document.documentElement?.scrollHeight || 0;
      const docHeight = scrollHeight - window.innerHeight;

      // Guard against division by zero
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }

      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-30 h-1 bg-muted">
      <div
        className="h-full bg-primary transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgressBar;
