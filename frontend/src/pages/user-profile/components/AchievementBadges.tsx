import React from "react";
import Icon from "../../../components/AppIcon.js";

// Types & Interfaces

type AchievementTier = "bronze" | "silver" | "gold" | "platinum";

interface AchievementProgress {
  current: number;
  total: number;
}

interface Achievement {
  id: string | number;
  title: string;
  description: string;
  icon: string; // Icon bileşeninin kabul ettiği string tipi (örn: "Award")
  tier: AchievementTier;
  progress?: AchievementProgress;
  earnedDate?: string; // Date string (ISO) veya formatlı tarih
}

interface AchievementBadgesProps {
  achievements: Achievement[];
}

// Component

const AchievementBadges: React.FC<AchievementBadgesProps> = ({
  achievements,
}) => {
  // Make the color map type-safe
  const badgeColors: Record<AchievementTier, string> = {
    bronze: "bg-amber-100 text-amber-800 border-amber-200",
    silver: "bg-gray-100 text-gray-800 border-gray-200",
    gold: "bg-yellow-100 text-yellow-800 border-yellow-200",
    platinum: "bg-purple-100 text-purple-800 border-purple-200",
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8 glassmorphism">
      <div className="flex items-center gap-3 mb-4">
        <Icon name="Award" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Achievements
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`relative p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
              badgeColors[achievement.tier] || badgeColors.bronze
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex-shrink-0">
                {/* Icon prop is a string so casting to any may be required,
                  but depending on your Icon component it may accept string directly */}
                <Icon name={achievement.icon as any} size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">
                  {achievement.title}
                </h4>
                <p className="text-xs opacity-80">{achievement.description}</p>
              </div>
            </div>

            {achievement.progress && (
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>
                    {achievement.progress.current}/{achievement.progress.total}
                  </span>
                </div>
                <div className="w-full bg-black/10 rounded-full h-2">
                  <div
                    className="bg-current h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (achievement.progress.current /
                          achievement.progress.total) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            )}

            {achievement.earnedDate && (
              <div className="absolute top-2 right-2">
                <Icon name="CheckCircle" size={16} className="text-current" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementBadges;
