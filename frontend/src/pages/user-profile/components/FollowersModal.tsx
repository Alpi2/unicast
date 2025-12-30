import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon.js";
import Image from "../../../components/AppImage.js";
import Button from "../../../components/ui/Button.js";
import Input from "../../../components/ui/Input.js";

// Types & Interfaces

export interface Follower {
  id: string | number;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
}

interface FollowersModalProps {
  isOpen: boolean;
  onClose: () => void;
  followers?: Follower[]; // Optional — may be omitted; we'll provide a default value
  type?: "followers" | "following";
}

// Component

const FollowersModal: React.FC<FollowersModalProps> = ({
  isOpen,
  onClose,
  followers = [], // Default value assignment
  type = "followers",
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [followingStates, setFollowingStates] = useState<
    Record<string | number, boolean>
  >({});

  const filteredFollowers = followers.filter(
    (follower) =>
      follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      follower.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFollowToggle = (userId: string | number) => {
    setFollowingStates((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 glassmorphism">
      <div className="w-full max-w-md bg-background border border-border rounded-xl shadow-xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            {type === "followers" ? "Followers" : "Following"} (
            {followers.length})
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <Input
            type="search"
            placeholder={`Search ${type}...`}
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
        </div>

        {/* Followers List */}
        <div className="flex-1 overflow-y-auto">
          {filteredFollowers.length === 0 ? (
            <div className="text-center py-8">
              <Icon
                name="Users"
                size={48}
                className="text-muted-foreground mx-auto mb-4"
              />
              <p className="text-muted-foreground">
                {searchQuery ? "No users found" : `No ${type} yet`}
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {filteredFollowers.map((follower) => (
                <div
                  key={follower.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Link
                    to={`/user-profile?id=${follower.id}`}
                    className="flex-shrink-0"
                  >
                    <Image
                      src={follower.avatar}
                      alt={follower.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link to={`/user-profile?id=${follower.id}`}>
                      <h4 className="font-medium text-foreground hover:text-primary transition-colors">
                        {follower.name}
                      </h4>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      @{follower.username}
                    </p>
                    {follower.bio && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {follower.bio}
                      </p>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    <Button
                      variant={
                        followingStates[follower.id] ? "outline" : "default"
                      }
                      size="sm"
                      onClick={() => handleFollowToggle(follower.id)}
                    >
                      {followingStates[follower.id] ? "Unfollow" : "Follow"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersModal;
