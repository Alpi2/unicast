import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon.js";

// Types & Interfaces

interface HeadingData {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  isVisible?: boolean;
}

// Component

const TableOfContents: React.FC<TableOfContentsProps> = ({
  isVisible = true,
}) => {
  const [headings, setHeadings] = useState<HeadingData[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    // If the content hasn't loaded yet, abort
    const articleContent = document.querySelector(".article-content");
    if (!articleContent) return;

    // Convert the NodeList to an Array and type as HTMLElement
    const headingElements = Array.from(
      articleContent.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6")
    );

    const headingData: HeadingData[] = headingElements.map((heading, index) => {
      const id = `heading-${index}`;
      // Assign an ID to the DOM element so scrolling and the observer work
      heading.id = id;

      return {
        id,
        text: heading.textContent || "", // if null, use empty string
        level: parseInt(heading.tagName.charAt(1), 10), // h1 -> 1, h2 -> 2
      };
    });

    setHeadings(headingData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -80% 0%" }
    );

    headingElements.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isVisible || headings.length === 0) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-6 top-1/2 transform -translate-y-1/2 z-30">
        <div className="bg-background/95 border border-border rounded-lg p-4 w-64 max-h-96 overflow-y-auto glassmorphism">
          <h3 className="font-heading font-medium text-sm mb-3 text-foreground">
            Table of Contents
          </h3>
          <nav className="space-y-1">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={`block w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                  activeHeading === heading.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                style={{ paddingLeft: `${(heading.level - 1) * 12 + 8}px` }}
              >
                {heading.text}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Floating Button */}
      <div className="lg:hidden fixed bottom-20 left-6 z-40">
        <div
          className={`bg-background border border-border rounded-lg shadow-soft glassmorphism transition-all duration-300 ${
            isExpanded ? "p-4 w-72 max-h-80" : "p-3 w-auto"
          }`}
        >
          {isExpanded ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-medium text-sm text-foreground">
                  Contents
                </h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              <nav className="space-y-1 overflow-y-auto max-h-60">
                {headings.map((heading) => (
                  <button
                    key={heading.id}
                    onClick={() => {
                      scrollToHeading(heading.id);
                      setIsExpanded(false);
                    }}
                    className={`block w-full text-left text-sm py-1 px-2 rounded transition-colors ${
                      activeHeading === heading.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                    style={{ paddingLeft: `${(heading.level - 1) * 8 + 8}px` }}
                  >
                    {heading.text}
                  </button>
                ))}
              </nav>
            </div>
          ) : (
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center justify-center w-10 h-10 hover:bg-muted rounded transition-colors"
            >
              <Icon name="List" size={20} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TableOfContents;
