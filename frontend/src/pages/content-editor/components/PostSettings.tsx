import React, { useState } from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";
import Input from "../../../components/ui/Input.js";
import Select from "../../../components/ui/Select.js";
import { Checkbox } from "../../../components/ui/Checkbox.js";
import Image from "../../../components/AppImage.js";

// Types & Interfaces

export interface PostSettingsData {
  status: string;
  visibility: string;
  password?: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  excerpt?: string;
  scheduledDate?: string;

  // SEO
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;

  // Social
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  autoShareTwitter?: boolean;
  autoShareFacebook?: boolean;
  autoShareLinkedIn?: boolean;

  // Advanced
  slug?: string;
  customCss?: string;
  customJs?: string;
  disableComments?: boolean;
  isSticky?: boolean;
  noIndex?: boolean;

  [key: string]: any; // Index signature for dynamic access
}

interface PostSettingsProps {
  settings: PostSettingsData;
  onSettingsChange: (settings: PostSettingsData) => void;
  isCollapsed?: boolean;
  onToggleCollapse: () => void;
  onPublish: () => void;
  onSaveDraft: () => void;
  isPublishing?: boolean;
  isDraft?: boolean;
}

interface Option {
  value: string;
  label: string;
}

interface TabItem {
  id: string;
  label: string;
  icon: string;
}

// Component

const PostSettings: React.FC<PostSettingsProps> = ({
  settings,
  onSettingsChange,
  isCollapsed = false,
  onToggleCollapse,
  onPublish,
  onSaveDraft,
  isPublishing = false,
  isDraft = true,
}) => {
  const [activeTab, setActiveTab] = useState<string>("general");
  const [showScheduler, setShowScheduler] = useState<boolean>(false);

  const categoryOptions: Option[] = [
    { value: "technology", label: "Technology" },
    { value: "design", label: "Design" },
    { value: "business", label: "Business" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "travel", label: "Travel" },
    { value: "food", label: "Food & Cooking" },
    { value: "health", label: "Health & Wellness" },
    { value: "education", label: "Education" },
  ];

  const statusOptions: Option[] = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "scheduled", label: "Scheduled" },
    { value: "private", label: "Private" },
  ];

  const visibilityOptions: Option[] = [
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
    { value: "password", label: "Password Protected" },
  ];

  const tabs: TabItem[] = [
    { id: "general", label: "General", icon: "Settings" },
    { id: "seo", label: "SEO", icon: "Search" },
    { id: "social", label: "Social", icon: "Share2" },
    { id: "advanced", label: "Advanced", icon: "Code" },
  ];

  const handleSettingChange = (key: keyof PostSettingsData, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const handleTagAdd = (tag: string) => {
    if (tag && !settings.tags?.includes(tag)) {
      handleSettingChange("tags", [...(settings.tags || []), tag]);
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    handleSettingChange(
      "tags",
      settings.tags?.filter((tag) => tag !== tagToRemove) || []
    );
  };

  if (isCollapsed) {
    return (
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleCollapse}
          className="bg-background/95 glassmorphism shadow-lg"
        >
          <Icon name="ChevronLeft" size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-l border-border h-full flex flex-col">
      {/* Settings Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-heading font-medium text-sm">Post Settings</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="h-8 w-8"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-b border-border space-y-2">
        <Button
          variant="default"
          fullWidth
          onClick={onPublish}
          loading={isPublishing}
          iconName="Send"
          iconPosition="left"
        >
          {isDraft ? "Publish" : "Update"}
        </Button>
        <Button
          variant="outline"
          fullWidth
          onClick={onSaveDraft}
          iconName="Save"
          iconPosition="left"
        >
          Save Draft
        </Button>
        <Button
          variant="ghost"
          fullWidth
          onClick={() => setShowScheduler(!showScheduler)}
          iconName="Calendar"
          iconPosition="left"
        >
          Schedule
        </Button>
      </div>

      {/* Schedule Panel */}
      {showScheduler && (
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="space-y-3">
            <Input
              label="Publish Date"
              type="datetime-local"
              value={settings.scheduledDate || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSettingChange("scheduledDate", e.target.value)
              }
            />
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleSettingChange(
                    "scheduledDate",
                    new Date().toISOString().slice(0, 16)
                  );
                }}
              >
                Now
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowScheduler(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {/* Icon name is a string so cast to any */}
              <Icon name={tab.icon as any} size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === "general" && (
          <>
            {/* Status */}
            <Select
              label="Status"
              options={statusOptions}
              value={settings.status || "draft"}
              onChange={(value: string) => handleSettingChange("status", value)}
            />

            {/* Visibility */}
            <Select
              label="Visibility"
              options={visibilityOptions}
              value={settings.visibility || "public"}
              onChange={(value: string) =>
                handleSettingChange("visibility", value)
              }
            />

            {/* Password (if password protected) */}
            {settings.visibility === "password" && (
              <Input
                label="Password"
                type="password"
                value={settings.password || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSettingChange("password", e.target.value)
                }
                placeholder="Enter password"
              />
            )}

            {/* Category */}
            <Select
              label="Category"
              options={categoryOptions}
              value={settings.category || ""}
              onChange={(value: string) =>
                handleSettingChange("category", value)
              }
              placeholder="Select category"
            />

            {/* Tags */}
            <div>
              <label className="text-sm font-medium mb-2 block">Tags</label>
              <div className="space-y-2">
                <Input
                  placeholder="Add a tag and press Enter"
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const target = e.target as HTMLInputElement;
                      handleTagAdd(target.value.trim());
                      target.value = "";
                    }
                  }}
                />
                <div className="flex flex-wrap gap-1">
                  {settings.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
                    >
                      {tag}
                      <button
                        onClick={() => handleTagRemove(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Featured Image
              </label>
              {settings.featuredImage ? (
                <div className="relative">
                  <Image
                    src={settings.featuredImage}
                    alt="Featured"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => handleSettingChange("featuredImage", "")}
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                  <Icon
                    name="Image"
                    size={24}
                    className="mx-auto text-muted-foreground mb-2"
                  />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload featured image
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleSettingChange(
                        "featuredImage",
                        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800"
                      )
                    }
                  >
                    Choose Image
                  </Button>
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label className="text-sm font-medium mb-2 block">Excerpt</label>
              <textarea
                value={settings.excerpt || ""}
                onChange={(e) => handleSettingChange("excerpt", e.target.value)}
                placeholder="Write a brief description..."
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={3}
              />
            </div>
          </>
        )}

        {activeTab === "seo" && (
          <>
            {/* SEO Title */}
            <Input
              label="SEO Title"
              value={settings.seoTitle || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSettingChange("seoTitle", e.target.value)
              }
              placeholder="Optimized title for search engines"
              description={`${(settings.seoTitle || "").length}/60 characters`}
            />

            {/* Meta Description */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Meta Description
              </label>
              <textarea
                value={settings.metaDescription || ""}
                onChange={(e) =>
                  handleSettingChange("metaDescription", e.target.value)
                }
                placeholder="Brief description for search results"
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {(settings.metaDescription || "").length}/160 characters
              </p>
            </div>

            {/* Focus Keyword */}
            <Input
              label="Focus Keyword"
              value={settings.focusKeyword || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSettingChange("focusKeyword", e.target.value)
              }
              placeholder="Primary keyword for this post"
            />

            {/* Canonical URL */}
            <Input
              label="Canonical URL"
              value={settings.canonicalUrl || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSettingChange("canonicalUrl", e.target.value)
              }
              placeholder="https://example.com/canonical-url"
            />

            {/* SEO Analysis */}
            <div className="bg-muted/30 rounded-lg p-3">
              <h4 className="font-medium text-sm mb-2 flex items-center">
                <Icon name="BarChart3" size={16} className="mr-2" />
                SEO Analysis
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Title Length</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      (settings.seoTitle || "").length > 60
                        ? "bg-warning/20 text-warning"
                        : "bg-success/20 text-success"
                    }`}
                  >
                    {(settings.seoTitle || "").length > 60
                      ? "Too Long"
                      : "Good"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Meta Description</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      (settings.metaDescription || "").length > 160
                        ? "bg-warning/20 text-warning"
                        : "bg-success/20 text-success"
                    }`}
                  >
                    {(settings.metaDescription || "").length > 160
                      ? "Too Long"
                      : "Good"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Focus Keyword</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      settings.focusKeyword
                        ? "bg-success/20 text-success"
                        : "bg-warning/20 text-warning"
                    }`}
                  >
                    {settings.focusKeyword ? "Set" : "Missing"}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "social" && (
          <>
            {/* Open Graph Title */}
            <Input
              label="Social Title"
              value={settings.ogTitle || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSettingChange("ogTitle", e.target.value)
              }
              placeholder="Title for social media sharing"
            />

            {/* Open Graph Description */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Social Description
              </label>
              <textarea
                value={settings.ogDescription || ""}
                onChange={(e) =>
                  handleSettingChange("ogDescription", e.target.value)
                }
                placeholder="Description for social media sharing"
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={3}
              />
            </div>

            {/* Social Image */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Social Image
              </label>
              {settings.ogImage ? (
                <div className="relative">
                  <Image
                    src={settings.ogImage}
                    alt="Social"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => handleSettingChange("ogImage", "")}
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                  <Icon
                    name="Share2"
                    size={24}
                    className="mx-auto text-muted-foreground mb-2"
                  />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload social image
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleSettingChange(
                        "ogImage",
                        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800"
                      )
                    }
                  >
                    Choose Image
                  </Button>
                </div>
              )}
            </div>

            {/* Auto-share Options */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Auto-share to:</h4>
              <Checkbox
                label="Twitter"
                checked={settings.autoShareTwitter || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSettingChange("autoShareTwitter", e.target.checked)
                }
              />
              <Checkbox
                label="Facebook"
                checked={settings.autoShareFacebook || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSettingChange("autoShareFacebook", e.target.checked)
                }
              />
              <Checkbox
                label="LinkedIn"
                checked={settings.autoShareLinkedIn || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSettingChange("autoShareLinkedIn", e.target.checked)
                }
              />
            </div>
          </>
        )}

        {activeTab === "advanced" && (
          <>
            {/* Custom Slug */}
            <Input
              label="URL Slug"
              value={settings.slug || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSettingChange("slug", e.target.value)
              }
              placeholder="custom-url-slug"
              description="The URL-friendly version of the title"
            />

            {/* Custom CSS */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Custom CSS
              </label>
              <textarea
                value={settings.customCss || ""}
                onChange={(e) =>
                  handleSettingChange("customCss", e.target.value)
                }
                placeholder="/* Custom styles for this post */"
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono"
                rows={4}
              />
            </div>

            {/* Custom JavaScript */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Custom JavaScript
              </label>
              <textarea
                value={settings.customJs || ""}
                onChange={(e) =>
                  handleSettingChange("customJs", e.target.value)
                }
                placeholder="// Custom scripts for this post"
                className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono"
                rows={4}
              />
            </div>

            {/* Advanced Options */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Advanced Options</h4>
              <Checkbox
                label="Disable comments"
                checked={settings.disableComments || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSettingChange("disableComments", e.target.checked)
                }
              />
              <Checkbox
                label="Sticky post"
                checked={settings.isSticky || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSettingChange("isSticky", e.target.checked)
                }
              />
              <Checkbox
                label="Hide from search engines"
                checked={settings.noIndex || false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSettingChange("noIndex", e.target.checked)
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostSettings;
