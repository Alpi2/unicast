import React, { useState } from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";

// Types & Interfaces

interface Version {
  id: string;
  timestamp: Date;
  author: string;
  changes: string;
  wordCount: number;
  status: "draft" | "published" | "archived" | string;
  isAutoSave: boolean;
  content: string;
}

interface VersionHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  onRestoreVersion: (version: Version) => void;
}

// Component

const VersionHistory: React.FC<VersionHistoryProps> = ({
  isOpen,
  onClose,
  onRestoreVersion,
}) => {
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);
  const [showDiff, setShowDiff] = useState<boolean>(false);

  const versions: Version[] = [
    {
      id: "v1.0",
      timestamp: new Date("2025-01-11T10:30:00"),
      author: "John Doe",
      changes: "Initial draft created",
      wordCount: 1250,
      status: "draft",
      isAutoSave: false,
      content: `# Getting Started with React 18\n\nReact 18 introduces several new features that make building user interfaces more efficient and enjoyable. In this comprehensive guide, we'll explore the key improvements and how to leverage them in your applications.\n\n## Concurrent Features\n\nOne of the most significant additions in React 18 is the introduction of concurrent features...`,
    },
    {
      id: "v1.1",
      timestamp: new Date("2025-01-11T11:15:00"),
      author: "John Doe",
      changes: "Added introduction and concurrent features section",
      wordCount: 1580,
      status: "draft",
      isAutoSave: true,
      content: `# Getting Started with React 18\n\nReact 18 introduces several new features that make building user interfaces more efficient and enjoyable. In this comprehensive guide, we'll explore the key improvements and how to leverage them in your applications.\n\n## Introduction\n\nReact has been the go-to library for building user interfaces for many years. With React 18, the team has focused on improving performance and developer experience.\n\n## Concurrent Features\n\nOne of the most significant additions in React 18 is the introduction of concurrent features. These features allow React to interrupt rendering work to handle high-priority updates...`,
    },
    {
      id: "v1.2",
      timestamp: new Date("2025-01-11T12:00:00"),
      author: "John Doe",
      changes: "Added code examples and improved formatting",
      wordCount: 1820,
      status: "draft",
      isAutoSave: false,
      content: `# Getting Started with React 18\n\nReact 18 introduces several new features that make building user interfaces more efficient and enjoyable. In this comprehensive guide, we'll explore the key improvements and how to leverage them in your applications.\n\n## Introduction\n\nReact has been the go-to library for building user interfaces for many years. With React 18, the team has focused on improving performance and developer experience.\n\n## Concurrent Features\n\nOne of the most significant additions in React 18 is the introduction of concurrent features. These features allow React to interrupt rendering work to handle high-priority updates.\n\n### Automatic Batching\n\n\`\`\`javascript\n// Before React 18\nsetCount(c => c + 1);\nsetFlag(f => !f);\n// React would render twice\n\n// React 18\nsetCount(c => c + 1);\nsetFlag(f => !f);\n// React renders once\n\`\`\`\n\nThis improvement reduces the number of renders and improves performance.`,
    },
    {
      id: "v1.3",
      timestamp: new Date("2025-01-11T14:30:00"),
      author: "John Doe",
      changes: "Added Suspense section and improved examples",
      wordCount: 2150,
      status: "draft",
      isAutoSave: true,
      content: `# Getting Started with React 18\n\nReact 18 introduces several new features that make building user interfaces more efficient and enjoyable. In this comprehensive guide, we'll explore the key improvements and how to leverage them in your applications.\n\n## Introduction\n\nReact has been the go-to library for building user interfaces for many years. With React 18, the team has focused on improving performance and developer experience.\n\n## Concurrent Features\n\nOne of the most significant additions in React 18 is the introduction of concurrent features. These features allow React to interrupt rendering work to handle high-priority updates.\n\n### Automatic Batching\n\n\`\`\`javascript\n// Before React 18\nsetCount(c => c + 1);\nsetFlag(f => !f);\n// React would render twice\n\n// React 18\nsetCount(c => c + 1);\nsetFlag(f => !f);\n// React renders once\n\`\`\`\n\nThis improvement reduces the number of renders and improves performance.\n\n## Suspense Improvements\n\nReact 18 brings significant improvements to Suspense, making it more powerful and easier to use.\n\n### Server-Side Rendering\n\nSuspense now works seamlessly with server-side rendering, allowing for better streaming and progressive hydration.`,
    },
    {
      id: "v2.0",
      timestamp: new Date("2025-01-11T16:45:00"),
      author: "John Doe",
      changes: "Major revision: restructured content and added new sections",
      wordCount: 2480,
      status: "published",
      isAutoSave: false,
      content: `# Getting Started with React 18: A Complete Guide\n\nReact 18 represents a major milestone in the evolution of React, introducing groundbreaking features that revolutionize how we build user interfaces. This comprehensive guide will walk you through everything you need to know to get started with React 18.\n\n## What's New in React 18\n\nReact 18 focuses on three main areas:\n- **Concurrent Features**: Better performance and user experience\n- **Suspense Improvements**: Enhanced data fetching and streaming\n- **Developer Experience**: Better tools and debugging capabilities\n\n## Concurrent Features Deep Dive\n\nConcurrent features are the cornerstone of React 18, enabling applications to remain responsive even during heavy computational work.\n\n### Automatic Batching\n\nReact 18 automatically batches state updates, reducing unnecessary re-renders:\n\n\`\`\`javascript\n// All updates are batched automatically\nfunction handleClick() {\n  setCount(c => c + 1);\n  setFlag(f => !f);\n  setData(newData);\n  // Only one re-render!\n}\n\`\`\`\n\n### Transitions\n\nUse transitions to mark updates as non-urgent:\n\n\`\`\`javascript\nimport { useTransition } from 'react';\nimport UserProfile from '../../user-profile/index';\n\n;\n\nfunction SearchResults() {\n  const [isPending, startTransition] = useTransition();\n  const [query, setQuery] = useState('');\n  \n  const handleChange = (e) => {\n    startTransition(() => {\n      setQuery(e.target.value);\n    });\n  };\n  \n  return (\n    <div>\n      <input onChange={handleChange} />\n      {isPending && <Spinner />}\n      <Results query={query} />\n    </div>\n  );\n}\n\`\`\`\n\n## Suspense for Data Fetching\n\nSuspense now supports data fetching patterns, making async operations more declarative:\n\n\`\`\`javascript\nfunction App() {\n  return (\n    <Suspense fallback={<Loading />}>\n      <UserProfile />\n      <Posts />\n    </Suspense>\n  );\n}\n\`\`\`\n\n## Migration Guide\n\nUpgrading to React 18 is straightforward:\n\n1. **Install React 18**:\n   \`\`\`bash\n   npm install react@18 react-dom@18\n   \`\`\`\n\n2. **Update your root**:\n   \`\`\`javascript\n   // Before\n   ReactDOM.render(<App />, container);\n   \n   // After\n   const root = ReactDOM.createRoot(container);\n   root.render(<App />);\n   \`\`\`\n\n3. **Enable Strict Mode** for better development experience.\n\n## Best Practices\n\n- Use transitions for non-urgent updates\n- Leverage Suspense for better loading states\n- Take advantage of automatic batching\n- Test your app thoroughly after migration\n\n## Conclusion\n\nReact 18 brings powerful new capabilities that improve both performance and developer experience. By understanding and implementing these features, you can build more responsive and efficient applications.\n\nStart experimenting with React 18 today and see the difference it makes in your development workflow!`,
    },
  ];

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "text-success";
      case "draft":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  const handleRestore = (version: Version) => {
    onRestoreVersion(version);
    onClose();
  };

  const calculateDiff = (
    oldContent: string | undefined,
    newContent: string | undefined
  ) => {
    if (!oldContent || !newContent) return 0;
    // Simple diff calculation for demo purposes
    const oldWords = oldContent.split(" ").length;
    const newWords = newContent.split(" ").length;
    const diff = newWords - oldWords;
    return diff;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex">
        {/* Version List */}
        <div className="w-1/3 border-r border-border flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-heading font-semibold">
              Version History
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Version List */}
          <div className="flex-1 overflow-y-auto">
            {versions.map((version, index) => (
              <div
                key={version.id}
                className={`p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedVersion?.id === version.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedVersion(version)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{version.id}</span>
                    {version.isAutoSave && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        Auto-save
                      </span>
                    )}
                    <span
                      className={`text-xs px-2 py-1 rounded capitalize ${getStatusColor(
                        version.status
                      )}`}
                    >
                      {version.status}
                    </span>
                  </div>
                  {index === 0 && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      Current
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-2">
                  {version.changes}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{version.author}</span>
                  <span>{formatTimestamp(version.timestamp)}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                  <span>{version.wordCount} words</span>
                  {index < versions.length - 1 && (
                    <span
                      className={`${
                        calculateDiff(
                          versions[index + 1]?.content,
                          version.content
                        ) > 0
                          ? "text-success"
                          : "text-error"
                      }`}
                    >
                      {calculateDiff(
                        versions[index + 1]?.content,
                        version.content
                      ) > 0
                        ? "+"
                        : ""}
                      {calculateDiff(
                        versions[index + 1]?.content,
                        version.content
                      )}{" "}
                      words
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Version Details */}
        <div className="flex-1 flex flex-col">
          {selectedVersion ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{selectedVersion.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatTimestamp(selectedVersion.timestamp)} by{" "}
                    {selectedVersion.author}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDiff(!showDiff)}
                  >
                    <Icon name="GitCompare" size={16} className="mr-2" />
                    {showDiff ? "Hide Diff" : "Show Diff"}
                  </Button>
                  {selectedVersion.id !== versions[0]?.id && (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleRestore(selectedVersion)}
                    >
                      <Icon name="RotateCcw" size={16} className="mr-2" />
                      Restore
                    </Button>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {showDiff &&
                selectedVersion.id !== versions[versions.length - 1]?.id ? (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground mb-4">
                      Comparing with previous version
                    </div>

                    {/* Simple diff visualization */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2 text-error">
                            Previous Version
                          </h4>
                          <div className="text-sm bg-error/10 p-3 rounded border-l-4 border-error">
                            <pre className="whitespace-pre-wrap text-xs">
                              {versions[
                                versions.findIndex(
                                  (v) => v.id === selectedVersion.id
                                ) + 1
                              ]?.content.substring(0, 200)}
                              ...
                            </pre>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2 text-success">
                            Current Version
                          </h4>
                          <div className="text-sm bg-success/10 p-3 rounded border-l-4 border-success">
                            <pre className="whitespace-pre-wrap text-xs">
                              {selectedVersion.content.substring(0, 200)}...
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                      {selectedVersion.content}
                    </pre>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="border-t border-border p-4 bg-muted/30">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold">
                      {selectedVersion.wordCount}
                    </div>
                    <div className="text-xs text-muted-foreground">Words</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">
                      {selectedVersion.content.length}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Characters
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">
                      {selectedVersion.content.split("\n").length}
                    </div>
                    <div className="text-xs text-muted-foreground">Lines</div>
                  </div>
                  <div>
                    <div
                      className={`text-lg font-semibold capitalize ${getStatusColor(
                        selectedVersion.status
                      )}`}
                    >
                      {selectedVersion.status}
                    </div>
                    <div className="text-xs text-muted-foreground">Status</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Icon
                  name="History"
                  size={48}
                  className="mx-auto text-muted-foreground mb-4"
                />
                <h3 className="text-lg font-medium mb-2">Select a Version</h3>
                <p className="text-muted-foreground">
                  Choose a version from the list to view its content and details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VersionHistory;
