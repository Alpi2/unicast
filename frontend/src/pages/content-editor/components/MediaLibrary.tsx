import React, { useState } from "react";
import Icon from "../../../components/AppIcon.js";
import Button from "../../../components/ui/Button.js";
import Input from "../../../components/ui/Input.js";
import Image from "../../../components/AppImage.js";

// Types & Interfaces

type MediaType = "image" | "video" | "document" | string;

interface MediaFile {
  id: number;
  name: string;
  type: MediaType;
  url: string;
  size: string;
  dimensions: string;
  uploadDate: string;
  alt: string;
}

interface StockImage {
  id: string;
  name: string;
  url: string;
  source: string;
  photographer: string;
}

// Format for the selected media that will be sent to the parent component
interface SelectedMediaData {
  url: string;
  alt?: string;
  type: MediaType;
  name: string;
  source?: string;
  photographer?: string;
}

interface MediaLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia: (media: SelectedMediaData) => void;
}

interface TabItem {
  id: string;
  label: string;
  icon: string;
}

// Component

const MediaLibrary: React.FC<MediaLibraryProps> = ({
  isOpen,
  onClose,
  onSelectMedia,
}) => {
  const [activeTab, setActiveTab] = useState<string>("library");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const mediaFiles: MediaFile[] = [
    {
      id: 1,
      name: "hero-image.jpg",
      type: "image",
      url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
      size: "2.4 MB",
      dimensions: "1920x1080",
      uploadDate: "2025-01-10",
      alt: "Modern workspace with laptop and coffee",
    },
    {
      id: 2,
      name: "team-photo.jpg",
      type: "image",
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      size: "1.8 MB",
      dimensions: "1600x900",
      uploadDate: "2025-01-09",
      alt: "Team collaboration meeting",
    },
    {
      id: 3,
      name: "product-demo.mp4",
      type: "video",
      url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      size: "15.2 MB",
      dimensions: "1280x720",
      uploadDate: "2025-01-08",
      alt: "Product demonstration video",
    },
    {
      id: 4,
      name: "chart-data.png",
      type: "image",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      size: "890 KB",
      dimensions: "1200x800",
      uploadDate: "2025-01-07",
      alt: "Data visualization chart",
    },
    {
      id: 5,
      name: "document.pdf",
      type: "document",
      url: "/assets/sample.pdf",
      size: "3.1 MB",
      dimensions: "A4",
      uploadDate: "2025-01-06",
      alt: "Important document",
    },
    {
      id: 6,
      name: "background-pattern.svg",
      type: "image",
      url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz4KPC9zdmc+",
      size: "2 KB",
      dimensions: "40x40",
      uploadDate: "2025-01-05",
      alt: "Grid pattern background",
    },
  ];

  const stockImages: StockImage[] = [
    {
      id: "stock-1",
      name: "Technology Workspace",
      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      source: "Unsplash",
      photographer: "Christopher Gower",
    },
    {
      id: "stock-2",
      name: "Creative Design",
      url: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=800",
      source: "Pexels",
      photographer: "Pixabay",
    },
    {
      id: "stock-3",
      name: "Business Meeting",
      url: "https://images.pixabay.com/photo/2015/07/17/22/43/student-849825_960_720.jpg",
      source: "Pixabay",
      photographer: "StartupStockPhotos",
    },
    {
      id: "stock-4",
      name: "Data Analytics",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      source: "Unsplash",
      photographer: "Carlos Muza",
    },
    {
      id: "stock-5",
      name: "Mobile Development",
      url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?w=800",
      source: "Pexels",
      photographer: "Negative Space",
    },
    {
      id: "stock-6",
      name: "Digital Marketing",
      url: "https://images.pixabay.com/photo/2017/01/14/12/59/iceland-1979445_960_720.jpg",
      source: "Pixabay",
      photographer: "Simon",
    },
  ];

  const tabs: TabItem[] = [
    { id: "library", label: "Media Library", icon: "FolderOpen" },
    { id: "upload", label: "Upload", icon: "Upload" },
    { id: "stock", label: "Stock Photos", icon: "Camera" },
    { id: "url", label: "From URL", icon: "Link" },
  ];

  const filteredMedia = mediaFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.alt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileSelect = (file: MediaFile) => {
    if (selectedFiles.includes(file.id)) {
      setSelectedFiles(selectedFiles.filter((id) => id !== file.id));
    } else {
      setSelectedFiles([...selectedFiles, file.id]);
    }
  };

  const handleInsertSelected = () => {
    const selected = mediaFiles.filter((file) =>
      selectedFiles.includes(file.id)
    );
    selected.forEach((file) => {
      onSelectMedia({
        url: file.url,
        alt: file.alt,
        type: file.type,
        name: file.name,
      });
    });
    setSelectedFiles([]);
    onClose();
  };

  const handleStockImageSelect = (image: StockImage) => {
    onSelectMedia({
      url: image.url,
      alt: image.name,
      type: "image",
      name: image.name,
      source: image.source,
      photographer: image.photographer,
    });
    onClose();
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = window.setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getFileIcon = (type: MediaType) => {
    switch (type) {
      case "image":
        return "Image";
      case "video":
        return "Video";
      case "document":
        return "FileText";
      default:
        return "File";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-6xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold">Media Library</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {/* Icon name is a string so cast to any */}
                <Icon name={tab.icon as any} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === "library" && (
            <div className="h-full flex flex-col">
              {/* Search and Actions */}
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Icon
                      name="Search"
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      placeholder="Search media files..."
                      value={searchQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchQuery(e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {selectedFiles.length > 0 && (
                    <>
                      <span className="text-sm text-muted-foreground">
                        {selectedFiles.length} selected
                      </span>
                      <Button variant="default" onClick={handleInsertSelected}>
                        Insert Selected
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Media Grid */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredMedia.map((file) => (
                    <div
                      key={file.id}
                      className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedFiles.includes(file.id)
                          ? "border-primary shadow-lg"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => handleFileSelect(file)}
                    >
                      <div className="aspect-square bg-muted flex items-center justify-center">
                        {file.type === "image" ? (
                          <Image
                            src={file.url}
                            alt={file.alt}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          // getFileIcon returns a string, cast to any
                          <Icon
                            name={getFileIcon(file.type) as any}
                            size={32}
                            className="text-muted-foreground"
                          />
                        )}
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        {selectedFiles.includes(file.id) && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <Icon
                              name="Check"
                              size={14}
                              className="text-primary-foreground"
                            />
                          </div>
                        )}
                      </div>

                      {/* File Info */}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="text-xs font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-xs opacity-80">{file.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "upload" && (
            <div className="h-full flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                {!isUploading ? (
                  <>
                    <div className="border-2 border-dashed border-border rounded-lg p-12 mb-6">
                      <Icon
                        name="Upload"
                        size={48}
                        className="mx-auto text-muted-foreground mb-4"
                      />
                      <h3 className="text-lg font-medium mb-2">
                        Upload Media Files
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Drag and drop files here, or click to select files
                      </p>
                      <Button variant="outline" onClick={simulateUpload}>
                        Choose Files
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Supported formats: JPG, PNG, GIF, MP4, PDF, SVG
                      <br />
                      Maximum file size: 10MB
                    </p>
                  </>
                ) : (
                  <div className="space-y-4">
                    <Icon
                      name="Upload"
                      size={48}
                      className="mx-auto text-primary"
                    />
                    <h3 className="text-lg font-medium">Uploading Files...</h3>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {uploadProgress}% complete
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "stock" && (
            <div className="h-full overflow-y-auto p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Free Stock Photos</h3>
                <p className="text-muted-foreground">
                  High-quality images from Unsplash, Pexels, and Pixabay
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {stockImages.map((image) => (
                  <div
                    key={image.id}
                    className="group cursor-pointer rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all"
                    onClick={() => handleStockImageSelect(image)}
                  >
                    <div className="aspect-video bg-muted">
                      <Image
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm mb-1">{image.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        by {image.photographer} on {image.source}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "url" && (
            <div className="h-full flex items-center justify-center p-6">
              <div className="w-full max-w-md space-y-4">
                <div className="text-center mb-6">
                  <Icon
                    name="Link"
                    size={48}
                    className="mx-auto text-muted-foreground mb-4"
                  />
                  <h3 className="text-lg font-medium mb-2">Insert from URL</h3>
                  <p className="text-muted-foreground">
                    Add media files from external URLs
                  </p>
                </div>

                <Input
                  label="Media URL"
                  placeholder="https://example.com/image.jpg"
                  description="Enter the direct URL to the media file"
                />

                <Input
                  label="Alt Text"
                  placeholder="Describe the image for accessibility"
                  description="This helps screen readers and improves SEO"
                />

                <Button
                  variant="default"
                  fullWidth
                  onClick={() => {
                    onSelectMedia({
                      url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
                      alt: "Sample image from URL",
                      type: "image",
                      name: "url-image.jpg",
                    });
                    onClose();
                  }}
                >
                  Insert Media
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;
