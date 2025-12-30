import React, { useState } from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface TypographyControlsProps {
  fontSize: string;
  onFontSizeChange: (size: string) => void;
  lineHeight: string;
  onLineHeightChange: (height: string) => void;
  theme: "light" | "dark" | string;
  onThemeChange: (theme: string) => void;
}

interface FontSizeOption {
  label: string;
  value: string;
  size: number;
}

interface LineHeightOption {
  label: string;
  value: string;
}

// Component

const TypographyControls: React.FC<TypographyControlsProps> = ({
  fontSize,
  onFontSizeChange,
  lineHeight,
  onLineHeightChange,
  theme,
  onThemeChange,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const fontSizes: FontSizeOption[] = [
    { label: "Small", value: "text-sm", size: 14 },
    { label: "Medium", value: "text-base", size: 16 },
    { label: "Large", value: "text-lg", size: 18 },
    { label: "Extra Large", value: "text-xl", size: 20 },
  ];

  const lineHeights: LineHeightOption[] = [
    { label: "Tight", value: "leading-tight" },
    { label: "Normal", value: "leading-normal" },
    { label: "Relaxed", value: "leading-relaxed" },
    { label: "Loose", value: "leading-loose" },
  ];

  // Helper to handle range change safely
  const handleFontSizeRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const index = parseInt(e.target.value, 10);
    const selected = fontSizes[index];
    if (selected) {
      onFontSizeChange(selected.value);
    }
  };

  const handleLineHeightRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const index = parseInt(e.target.value, 10);
    const selected = lineHeights[index];
    if (selected) {
      onLineHeightChange(selected.value);
    }
  };

  // Find indexes safely
  const currentFontSizeIndex = fontSizes.findIndex((f) => f.value === fontSize);
  const currentLineHeightIndex = lineHeights.findIndex(
    (l) => l.value === lineHeight
  );

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div
        className={`bg-background border border-border rounded-lg shadow-soft glassmorphism transition-all duration-300 ${
          isExpanded ? "p-4 w-64" : "p-3 w-auto"
        }`}
      >
        {isExpanded ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-medium text-sm">
                Reading Settings
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            {/* Font Size Control */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Font Size
              </label>
              <div className="flex items-center space-x-2">
                <Icon name="Type" size={14} className="text-muted-foreground" />
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max={fontSizes.length - 1}
                    // If not found it returns -1; range input doesn't accept -1, so fallback to index 1 (medium)
                    value={
                      currentFontSizeIndex !== -1 ? currentFontSizeIndex : 1
                    }
                    onChange={handleFontSizeRangeChange}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <span className="text-xs text-muted-foreground min-w-[2rem]">
                  {fontSizes.find((f) => f.value === fontSize)?.size || 16}px
                </span>
              </div>
            </div>

            {/* Line Height Control */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Line Height
              </label>
              <div className="flex items-center space-x-2">
                {/* Icon name is a string, so cast to any */}
                <Icon
                  name={"AlignJustify" as any}
                  size={14}
                  className="text-muted-foreground"
                />
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max={lineHeights.length - 1}
                    value={
                      currentLineHeightIndex !== -1 ? currentLineHeightIndex : 1
                    }
                    onChange={handleLineHeightRangeChange}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <span className="text-xs text-muted-foreground min-w-[3rem]">
                  {lineHeights.find((l) => l.value === lineHeight)?.label ||
                    "Normal"}
                </span>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Theme
              </label>
              <div className="flex items-center space-x-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onThemeChange("light")}
                  className="flex-1"
                >
                  <Icon name="Sun" size={14} className="mr-1" />
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onThemeChange("dark")}
                  className="flex-1"
                >
                  <Icon name="Moon" size={14} className="mr-1" />
                  Dark
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(true)}
            className="w-10 h-10"
          >
            <Icon name="Settings" size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default TypographyControls;
