import React, { useState } from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface EditorToolbarProps {
  onFormat: (format: string, value?: string) => void;
  onInsertMedia: () => void;
  onInsertLink: () => void;
  onInsertCode: () => void;
  activeFormats?: string[];
  isCollapsed?: boolean;
  onToggleCollapse: () => void;
}

interface ToolbarConfig {
  name: string;
  icon: string;
  tooltip: string;
  action?: () => void;
}

interface HeadingOption {
  value: string;
  label: string;
}

// Component

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onFormat,
  onInsertMedia,
  onInsertLink,
  onInsertCode,
  activeFormats = [],
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);

  const formatButtons: ToolbarConfig[] = [
    { name: "bold", icon: "Bold", tooltip: "Bold (Ctrl+B)" },
    { name: "italic", icon: "Italic", tooltip: "Italic (Ctrl+I)" },
    { name: "underline", icon: "Underline", tooltip: "Underline (Ctrl+U)" },
    { name: "strikethrough", icon: "Strikethrough", tooltip: "Strikethrough" },
  ];

  const alignmentButtons: ToolbarConfig[] = [
    { name: "alignLeft", icon: "AlignLeft", tooltip: "Align Left" },
    { name: "alignCenter", icon: "AlignCenter", tooltip: "Align Center" },
    { name: "alignRight", icon: "AlignRight", tooltip: "Align Right" },
    { name: "alignJustify", icon: "AlignJustify", tooltip: "Justify" },
  ];

  const listButtons: ToolbarConfig[] = [
    { name: "bulletList", icon: "List", tooltip: "Bullet List" },
    { name: "numberedList", icon: "ListOrdered", tooltip: "Numbered List" },
  ];

  const insertButtons: ToolbarConfig[] = [
    {
      name: "image",
      icon: "Image",
      tooltip: "Insert Image",
      action: onInsertMedia,
    },
    {
      name: "link",
      icon: "Link",
      tooltip: "Insert Link",
      action: onInsertLink,
    },
    { name: "code", icon: "Code", tooltip: "Code Block", action: onInsertCode },
    { name: "quote", icon: "Quote", tooltip: "Quote Block" },
    { name: "table", icon: "Table", tooltip: "Insert Table" },
  ];

  const headingOptions: HeadingOption[] = [
    { value: "p", label: "Paragraph" },
    { value: "h1", label: "Heading 1" },
    { value: "h2", label: "Heading 2" },
    { value: "h3", label: "Heading 3" },
    { value: "h4", label: "Heading 4" },
  ];

  const isActive = (format: string) => activeFormats?.includes(format);

  if (isCollapsed) {
    return (
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-30">
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleCollapse}
          className="bg-background/95 glassmorphism shadow-lg"
        >
          <Icon name="ChevronRight" size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      {/* Toolbar Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-heading font-medium text-sm">Formatting</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="h-8 w-8"
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Heading Selector */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Text Style
          </label>
          <select
            className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              onFormat("heading", e.target.value)
            }
          >
            {headingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Text Formatting */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Format
          </label>
          <div className="grid grid-cols-4 gap-1">
            {formatButtons.map((button) => (
              <Button
                key={button.name}
                variant={isActive(button.name) ? "default" : "outline"}
                size="icon"
                onClick={() => onFormat(button.name)}
                className="h-8 w-8"
                title={button.tooltip}
              >
                {/* Icon name is a string, so cast to any */}
                <Icon name={button.icon as any} size={14} />
              </Button>
            ))}
          </div>
        </div>

        {/* Alignment */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Alignment
          </label>
          <div className="grid grid-cols-4 gap-1">
            {alignmentButtons.map((button) => (
              <Button
                key={button.name}
                variant={isActive(button.name) ? "default" : "outline"}
                size="icon"
                onClick={() => onFormat(button.name)}
                className="h-8 w-8"
                title={button.tooltip}
              >
                <Icon name={button.icon as any} size={14} />
              </Button>
            ))}
          </div>
        </div>

        {/* Lists */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Lists
          </label>
          <div className="grid grid-cols-2 gap-1">
            {listButtons.map((button) => (
              <Button
                key={button.name}
                variant={isActive(button.name) ? "default" : "outline"}
                size="icon"
                onClick={() => onFormat(button.name)}
                className="h-8 w-8"
                title={button.tooltip}
              >
                <Icon name={button.icon as any} size={14} />
              </Button>
            ))}
          </div>
        </div>

        {/* Insert Elements */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Insert
          </label>
          <div className="space-y-1">
            {insertButtons
              .slice(0, showMoreOptions ? insertButtons.length : 3)
              .map((button) => (
                <Button
                  key={button.name}
                  variant="outline"
                  size="sm"
                  onClick={button.action || (() => onFormat(button.name))}
                  className="w-full justify-start"
                >
                  <Icon name={button.icon as any} size={16} className="mr-2" />
                  {button.tooltip}
                </Button>
              ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              className="w-full justify-start text-muted-foreground"
            >
              <Icon
                name={showMoreOptions ? "ChevronUp" : "ChevronDown"}
                size={16}
                className="mr-2"
              />
              {showMoreOptions ? "Show Less" : "More Options"}
            </Button>
          </div>
        </div>

        {/* Text Color */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Text Color
          </label>
          <div className="grid grid-cols-6 gap-1">
            {[
              "#000000",
              "#374151",
              "#DC2626",
              "#EA580C",
              "#CA8A04",
              "#16A34A",
              "#2563EB",
              "#7C3AED",
            ].map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => onFormat("color", color)}
                title={`Set color to ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Shortcuts
          </label>
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Bold</span>
              <span className="font-mono">Ctrl+B</span>
            </div>
            <div className="flex justify-between">
              <span>Italic</span>
              <span className="font-mono">Ctrl+I</span>
            </div>
            <div className="flex justify-between">
              <span>Link</span>
              <span className="font-mono">Ctrl+K</span>
            </div>
            <div className="flex justify-between">
              <span>Save</span>
              <span className="font-mono">Ctrl+S</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorToolbar;
