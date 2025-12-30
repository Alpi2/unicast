import React from "react";

// Props interface
interface ArticleContentProps {
  content: string;
  fontSize?: string; // örn: "text-lg"
  lineHeight?: string; // örn: "leading-relaxed"
  theme?: "dark" | "light" | string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({
  content,
  fontSize = "text-lg", // Default value
  lineHeight = "leading-relaxed", // Default value
  theme = "light", // Default value
}) => {
  const themeClasses =
    theme === "dark"
      ? "bg-gray-900 text-gray-100"
      : "bg-background text-foreground";

  // Line-height calculation (for inline style)
  const getInlineLineHeight = (lh: string) => {
    if (lh === "leading-tight") return "1.4";
    if (lh === "leading-normal") return "1.6";
    if (lh === "leading-relaxed") return "1.8";
    return "2.0"; // leading-loose ve diğerleri için
  };

  return (
    <article
      className={`prose prose-lg max-w-none ${fontSize} ${lineHeight} ${themeClasses}`}
    >
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          fontFamily: "Source Serif 4, serif",
          lineHeight: getInlineLineHeight(lineHeight),
        }}
      />
    </article>
  );
};

export default ArticleContent;
