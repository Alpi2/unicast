import React, { useState } from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";
import Select from "../../../components/ui/Select.js";

// Types & Interfaces

interface BulkActionBarProps {
  selectedCount: number;
  onBulkAction: (action: string) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  totalCount: number;
}

interface BulkActionOption {
  value: string;
  label: string;
}

// Component

const BulkActionBar: React.FC<BulkActionBarProps> = ({
  selectedCount,
  onBulkAction,
  onSelectAll,
  onClearSelection,
  totalCount,
}) => {
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const bulkActions: BulkActionOption[] = [
    { value: "", label: "Select action..." },
    { value: "approve", label: "Approve Selected" },
    { value: "reject", label: "Reject Selected" },
    { value: "flag", label: "Flag as Inappropriate" },
    { value: "spam", label: "Mark as Spam" },
    { value: "delete", label: "Delete Selected" },
    { value: "ban_users", label: "Ban Users" },
  ];

  const handleActionSubmit = () => {
    if (!selectedAction || selectedCount === 0) return;

    // Request confirmation for critical actions
    if (["delete", "ban_users"].includes(selectedAction)) {
      setShowConfirmation(true);
    } else {
      onBulkAction(selectedAction);
      setSelectedAction("");
    }
  };

  const handleConfirmAction = () => {
    onBulkAction(selectedAction);
    setSelectedAction("");
    setShowConfirmation(false);
  };

  const getActionDescription = (): string => {
    switch (selectedAction) {
      case "delete":
        return `This will permanently delete ${selectedCount} comment${
          selectedCount > 1 ? "s" : ""
        }. This action cannot be undone.`;
      case "ban_users":
        return `This will ban ${selectedCount} user${
          selectedCount > 1 ? "s" : ""
        } from commenting. They will not be able to post new comments.`;
      default:
        return "";
    }
  };

  if (selectedCount === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon
                name="MessageSquare"
                size={20}
                className="text-muted-foreground"
              />
              <span className="text-sm text-muted-foreground">
                {totalCount} total comments
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSelectAll}
              iconName="CheckSquare"
              iconPosition="left"
            >
              Select All
            </Button>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Info" size={16} />
            <span>Select comments to perform bulk actions</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckSquare" size={20} className="text-primary" />
              <span className="font-medium text-foreground">
                {selectedCount} comment{selectedCount > 1 ? "s" : ""} selected
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              iconName="X"
              iconPosition="left"
            >
              Clear Selection
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-48">
              <Select
                options={bulkActions}
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                placeholder="Select action..."
              />
            </div>
            <Button
              variant="default"
              onClick={handleActionSubmit}
              disabled={!selectedAction}
              iconName="Play"
              iconPosition="left"
            >
              Apply
            </Button>
          </div>
        </div>

        {/* Keyboard Shortcuts Info */}
        <div className="mt-3 pt-3 border-t border-primary/20">
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+A</kbd>
              <span>Select All</span>
            </div>
            <div className="flex items-center space-x-2">
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+D</kbd>
              <span>Deselect All</span>
            </div>
            <div className="flex items-center space-x-2">
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Del</kbd>
              <span>Delete Selected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">
                  Confirm Action
                </h3>
                <p className="text-sm text-muted-foreground">
                  This action requires confirmation
                </p>
              </div>
            </div>

            <p className="text-sm text-foreground mb-6">
              {getActionDescription()}
            </p>

            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="ghost"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmAction}
                iconName="Check"
                iconPosition="left"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActionBar;
