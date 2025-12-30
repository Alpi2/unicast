import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/ui/Header.js";
import EditorToolbar from "./components/EditorToolbar.js";
import EditorContent from "./components/EditorContent.js";
import PostSettings from "./components/PostSettings.js";
import type { PostSettingsData } from "./components/PostSettings.js";
import MediaLibrary from "./components/MediaLibrary.js";
import VersionHistory from "./components/VersionHistory.js";
import Icon from "../../components/AppIcon.js";
import Button from "../../components/ui/Button.js";

// Types & Interfaces

interface User {
  id: number | string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  [key: string]: any;
}

interface MediaData {
  url: string;
  alt?: string;
  type: string;
  name?: string;
}

interface VersionData {
  id: string;
  content: string;
  [key: string]: any;
}

// Component

const ContentEditor: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");

  // Editor state
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [isDistractionFree, setIsDistractionFree] = useState<boolean>(false);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);

  // UI state
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState<boolean>(false);
  const [isSettingsCollapsed, setIsSettingsCollapsed] =
    useState<boolean>(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState<boolean>(false);
  const [showVersionHistory, setShowVersionHistory] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Post settings state - Matches PostSettingsData interface
  const [postSettings, setPostSettings] = useState<PostSettingsData>({
    status: "draft",
    visibility: "public",
    category: "",
    tags: [],
    featuredImage: "",
    excerpt: "",
    seoTitle: "",
    metaDescription: "",
    focusKeyword: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    autoShareTwitter: false,
    autoShareFacebook: false,
    autoShareLinkedIn: false,
    slug: "",
    customCss: "",
    customJs: "",
    disableComments: false,
    isSticky: false,
    noIndex: false,
    scheduledDate: "",
    password: "",
  });

  // Mock user data
  const currentUser: User = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "creator",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
  };

  // Calculate word count and reading time
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (content.trim() || title.trim()) {
      setIsSaving(true);
      // Simulate API call
      setTimeout(() => {
        setIsSaving(false);
        setLastSaved(new Date());
      }, 1000);
    }
  }, [content, title]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(autoSave, 30000);
    return () => clearInterval(interval);
  }, [autoSave]);

  // Load existing post if editing
  useEffect(() => {
    if (postId) {
      // Mock loading existing post
      setTitle("Getting Started with React 18");
      setContent(`# Getting Started with React 18

React 18 introduces several new features that make building user interfaces more efficient and enjoyable. In this comprehensive guide, we'll explore the key improvements and how to leverage them in your applications.

## Concurrent Features

One of the most significant additions in React 18 is the introduction of concurrent features. These features allow React to interrupt rendering work to handle high-priority updates.

### Automatic Batching

\`\`\`javascript
// Before React 18
setCount(c => c + 1);
setFlag(f => !f);
// React would render twice

// React 18
setCount(c => c + 1);
setFlag(f => !f);
// React renders once
\`\`\`

This improvement reduces the number of renders and improves performance.

## Suspense Improvements

React 18 brings significant improvements to Suspense, making it more powerful and easier to use for data fetching and code splitting.

Start writing your content here...`);

      setPostSettings((prev) => ({
        ...prev,
        category: "technology",
        tags: ["react", "javascript", "web-development"],
        featuredImage:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
        seoTitle: "Getting Started with React 18 - Complete Guide",
        metaDescription:
          "Learn about React 18 new features including concurrent rendering, automatic batching, and Suspense improvements.",
        focusKeyword: "react 18",
      }));
    }
  }, [postId]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "s":
            e.preventDefault();
            handleSaveDraft();
            break;
          case "Enter":
            if (e.shiftKey) {
              e.preventDefault();
              setIsPreviewMode((prev) => !prev);
            }
            break;
          case "h":
            if (e.shiftKey) {
              e.preventDefault();
              setShowVersionHistory(true);
            }
            break;
          case "m":
            if (e.shiftKey) {
              e.preventDefault();
              setShowMediaLibrary(true);
            }
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []); // Empty dependency array as handlers use functional state updates or refs if needed

  const handleFormat = (format: string, value?: string) => {
    // Handle text formatting logic here (usually handled by EditorContent via Ref)
    if (activeFormats.includes(format)) {
      setActiveFormats(activeFormats.filter((f) => f !== format));
    } else {
      setActiveFormats([...activeFormats, format]);
    }

    // Auto-save after formatting
    setTimeout(autoSave, 500);
  };

  const handleInsertMedia = () => {
    setShowMediaLibrary(true);
  };

  const handleInsertLink = () => {
    const url = prompt("Enter URL:");
    const text = prompt("Enter link text:");
    if (url && text) {
      const linkMarkdown = `[${text}](${url})`;
      setContent((prev) => prev + linkMarkdown);
    }
  };

  const handleInsertCode = () => {
    const codeBlock = "\n```javascript\n// Your code here\n```\n";
    setContent((prev) => prev + codeBlock);
  };

  const handleSelectMedia = (media: MediaData) => {
    let mediaMarkdown = "";
    if (media.type === "image") {
      mediaMarkdown = `\n![${media.alt || "image"}](${media.url})\n`;
    } else if (media.type === "video") {
      mediaMarkdown = `\n<video controls>\n  <source src="${media.url}" type="video/mp4">\n  Your browser does not support the video tag.\n</video>\n`;
    }
    setContent((prev) => prev + mediaMarkdown);
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
      setPostSettings((prev) => ({ ...prev, status: "draft" }));
    }, 1500);
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      alert("Please add a title before publishing");
      return;
    }

    if (!content.trim()) {
      alert("Please add some content before publishing");
      return;
    }

    setIsPublishing(true);
    // Simulate API call
    setTimeout(() => {
      setIsPublishing(false);
      setPostSettings((prev) => ({ ...prev, status: "published" }));
      alert("Post published successfully!");
      navigate("/content-creation-dashboard");
    }, 2000);
  };

  const handleRestoreVersion = (version: VersionData) => {
    setContent(version.content);
    setTitle(
      version.id === "v2.0"
        ? "Getting Started with React 18: A Complete Guide"
        : "Getting Started with React 18"
    );
    alert(`Restored to version ${version.id}`);
  };

  const getSaveStatus = () => {
    if (isSaving) return "Saving...";
    if (lastSaved) {
      const timeDiff = Math.floor(
        (new Date().getTime() - lastSaved.getTime()) / 1000
      );
      if (timeDiff < 60) return "Saved just now";
      if (timeDiff < 3600) return `Saved ${Math.floor(timeDiff / 60)} min ago`;
      return `Saved ${Math.floor(timeDiff / 3600)} hours ago`;
    }
    return "Not saved";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} notificationCount={3} />

      {/* Editor Header */}
      <div className="sticky top-16 z-40 bg-background/95 glassmorphism border-b border-border">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left side - Title and status */}
          <div className="flex items-center space-x-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/content-creation-dashboard")}
              title="Back to Dashboard"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="text-lg font-heading font-semibold bg-transparent border-none outline-none flex-1 max-w-md placeholder:text-muted-foreground"
            />

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon
                name={isSaving ? "Loader2" : "Save"}
                size={16}
                className={isSaving ? "animate-spin" : ""}
              />
              <span>{getSaveStatus()}</span>
            </div>
          </div>

          {/* Center - Stats */}
          <div className="hidden md:flex items-center space-x-6 text-sm text-muted-foreground">
            <span>{wordCount} words</span>
            <span>{readingTime} min read</span>
            <span
              className={`capitalize ${
                postSettings.status === "published"
                  ? "text-success"
                  : postSettings.status === "draft"
                  ? "text-warning"
                  : "text-muted-foreground"
              }`}
            >
              {postSettings.status}
            </span>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVersionHistory(true)}
              title="Version History (Ctrl+Shift+H)"
            >
              <Icon name="History" size={16} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveDraft}
              loading={isSaving}
              title="Save Draft (Ctrl+S)"
            >
              <Icon name="Save" size={16} />
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={handlePublish}
              loading={isPublishing}
              iconName="Send"
              iconPosition="left"
            >
              {postSettings.status === "published" ? "Update" : "Publish"}
            </Button>
          </div>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Toolbar */}
        <EditorToolbar
          onFormat={handleFormat}
          onInsertMedia={handleInsertMedia}
          onInsertLink={handleInsertLink}
          onInsertCode={handleInsertCode}
          activeFormats={activeFormats}
          isCollapsed={isToolbarCollapsed}
          onToggleCollapse={() => setIsToolbarCollapsed(!isToolbarCollapsed)}
        />

        {/* Main Editor */}
        <EditorContent
          content={content}
          onChange={setContent}
          isPreviewMode={isPreviewMode}
          onTogglePreview={() => setIsPreviewMode(!isPreviewMode)}
          isDistractionFree={isDistractionFree}
          onToggleDistractionFree={() =>
            setIsDistractionFree(!isDistractionFree)
          }
          wordCount={wordCount}
          readingTime={readingTime}
        />

        {/* Right Settings Panel */}
        <PostSettings
          settings={postSettings}
          onSettingsChange={setPostSettings}
          isCollapsed={isSettingsCollapsed}
          onToggleCollapse={() => setIsSettingsCollapsed(!isSettingsCollapsed)}
          onPublish={handlePublish}
          onSaveDraft={handleSaveDraft}
          isPublishing={isPublishing}
          isDraft={postSettings.status === "draft"}
        />
      </div>

      {/* Modals */}
      <MediaLibrary
        isOpen={showMediaLibrary}
        onClose={() => setShowMediaLibrary(false)}
        onSelectMedia={handleSelectMedia}
      />
      <VersionHistory
        isOpen={showVersionHistory}
        onClose={() => setShowVersionHistory(false)}
        // VersionHistory component expects generic 'Version' type, we pass compatible VersionData
        onRestoreVersion={(v: any) => handleRestoreVersion(v)}
      />

      {/* Mobile FAB for Media */}
      <div className="fixed bottom-6 right-6 z-30 md:hidden">
        <Button
          size="icon"
          onClick={() => setShowMediaLibrary(true)}
          className="w-14 h-14 rounded-full shadow-lg"
          title="Insert Media (Ctrl+Shift+M)"
        >
          <Icon name="Image" size={24} />
        </Button>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-6 left-6 z-30 hidden lg:block">
        <div className="bg-muted/80 glassmorphism rounded-lg p-3 text-xs text-muted-foreground">
          <div className="space-y-1">
            <div>Ctrl+S: Save</div>
            <div>Ctrl+Shift+Enter: Preview</div>
            <div>Ctrl+Shift+H: History</div>
            <div>Ctrl+Shift+M: Media</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
