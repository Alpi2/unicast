import React, { useState, useRef, useEffect } from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface EditorContentProps {
  content: string;
  onChange: (value: string) => void;
  isPreviewMode?: boolean;
  onTogglePreview: () => void;
  isDistractionFree?: boolean;
  onToggleDistractionFree: () => void;
  wordCount?: number;
  readingTime?: number;
}

interface MarkdownShortcut {
  syntax: string;
  description: string;
}

// Component

const EditorContent: React.FC<EditorContentProps> = ({
  content,
  onChange,
  isPreviewMode = false,
  onTogglePreview,
  isDistractionFree = false,
  onToggleDistractionFree,
  wordCount = 0,
  readingTime = 0,
}) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showMarkdownHelp, setShowMarkdownHelp] = useState<boolean>(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  const markdownShortcuts: MarkdownShortcut[] = [
    { syntax: "# ", description: "Heading 1" },
    { syntax: "## ", description: "Heading 2" },
    { syntax: "### ", description: "Heading 3" },
    { syntax: "**text**", description: "Bold text" },
    { syntax: "*text*", description: "Italic text" },
    { syntax: "[text](url)", description: "Link" },
    { syntax: "![alt](url)", description: "Image" },
    { syntax: "`code`", description: "Inline code" },
    { syntax: "```", description: "Code block" },
    { syntax: "> ", description: "Quote" },
    { syntax: "- ", description: "Bullet list" },
    { syntax: "1. ", description: "Numbered list" },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "s":
          e.preventDefault();
          // Auto-save functionality would be handled by parent
          break;
        case "b":
          e.preventDefault();
          insertMarkdown("**", "**");
          break;
        case "i":
          e.preventDefault();
          insertMarkdown("*", "*");
          break;
        case "k":
          e.preventDefault();
          insertMarkdown("[", "](url)");
          break;
        case "Enter":
          if (e.shiftKey) {
            e.preventDefault();
            onTogglePreview();
          }
          break;
        default:
          break;
      }
    }

    // Handle Tab for indentation
    if (e.key === "Tab") {
      e.preventDefault();
      insertText("  ");
    }
  };

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText =
      content.substring(0, start) +
      before +
      selectedText +
      after +
      content.substring(end);

    onChange(newText);

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const insertText = (text: string) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = content.substring(0, start) + text + content.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  if (isPreviewMode) {
    return (
      <div
        className={`flex-1 bg-background ${
          isDistractionFree ? "mx-auto max-w-4xl" : ""
        }`}
      >
        {/* Preview Header */}
        <div className="sticky top-0 bg-background/95 glassmorphism border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={onTogglePreview}>
              <Icon name="Edit" size={16} className="mr-2" />
              Edit
            </Button>
            <div className="text-sm text-muted-foreground">Preview Mode</div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleDistractionFree}
              title="Toggle Focus Mode"
            >
              <Icon
                name={isDistractionFree ? "Maximize" : "Minimize"}
                size={16}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              title="Fullscreen"
            >
              <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={16} />
            </Button>
          </div>
        </div>
        {/* Preview Content */}
        <div className="p-8">
          <article className="prose prose-lg max-w-none">
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: content
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/\*(.*?)\*/g, "<em>$1</em>")
                  .replace(
                    /`(.*?)`/g,
                    '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>'
                  )
                  .replace(
                    /^# (.*$)/gm,
                    '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>'
                  )
                  .replace(
                    /^## (.*$)/gm,
                    '<h2 class="text-2xl font-semibold mt-6 mb-3">$1</h2>'
                  )
                  .replace(
                    /^### (.*$)/gm,
                    '<h3 class="text-xl font-medium mt-4 mb-2">$1</h3>'
                  )
                  .replace(/\n/g, "<br>"),
              }}
            />
          </article>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 flex flex-col bg-background ${
        isDistractionFree ? "mx-auto max-w-4xl" : ""
      }`}
    >
      {/* Editor Header */}
      <div className="sticky top-0 bg-background/95 glassmorphism border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            {wordCount} words • {readingTime} min read
          </div>
          <div className="text-sm text-muted-foreground">
            Line {Math.floor(cursorPosition / 50) + 1}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMarkdownHelp(!showMarkdownHelp)}
            title="Markdown Help"
          >
            <Icon name="HelpCircle" size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={onTogglePreview}>
            <Icon name="Eye" size={16} className="mr-2" />
            Preview
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDistractionFree}
            title="Toggle Focus Mode"
          >
            <Icon
              name={isDistractionFree ? "Maximize" : "Minimize"}
              size={16}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            title="Fullscreen"
          >
            <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={16} />
          </Button>
        </div>
      </div>

      {/* Markdown Help Panel */}
      {showMarkdownHelp && (
        <div className="bg-muted/50 border-b border-border p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {markdownShortcuts.map((shortcut, index) => (
              <div key={index} className="flex flex-col">
                <code className="bg-background px-2 py-1 rounded text-xs font-mono">
                  {shortcut.syntax}
                </code>
                <span className="text-muted-foreground text-xs mt-1">
                  {shortcut.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor Textarea */}
      <div className="flex-1 relative">
        <textarea
          ref={editorRef}
          value={content}
          onChange={(e) => {
            onChange(e.target.value);
            setCursorPosition(e.target.selectionStart);
          }}
          onKeyDown={handleKeyDown}
          onSelect={(e) => {
            // Cast e.target to HTMLTextAreaElement
            const target = e.target as HTMLTextAreaElement;
            setCursorPosition(target.selectionStart);
          }}
          placeholder="Start writing your article...\n\nTip: Use Markdown syntax for formatting:\n# Heading\n**Bold text**\n*Italic text*\n[Link](url)\n\nPress Ctrl+Shift+Enter to preview"
          className="w-full h-full p-8 bg-transparent border-none outline-none resize-none font-serif text-lg leading-relaxed placeholder:text-muted-foreground/60"
          style={{
            minHeight: "calc(100vh - 200px)",
            fontFamily: "Source Serif 4, serif",
          }}
          spellCheck="true"
          autoComplete="off"
          autoCorrect="on"
          autoCapitalize="sentences"
        />

        {/* Line Numbers (Optional) */}
        <div className="absolute left-2 top-8 text-xs text-muted-foreground/40 font-mono pointer-events-none select-none">
          {content.split("\n").map((_, index) => (
            <div key={index} className="h-7 leading-relaxed">
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-t border-border px-4 py-2 bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>UTF-8</span>
          <span>Markdown</span>
          <span>Auto-save enabled</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Cursor: {cursorPosition}</span>
          <span>Characters: {content.length}</span>
        </div>
      </div>
    </div>
  );
};

export default EditorContent;
