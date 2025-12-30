import React from "react";
import Icon from "../../../components/AppIcon.js";

// Type definition for GoalStatus (string literal union + string fallback)
export type GoalStatus =
  | "completed"
  | "on-track"
  | "at-risk"
  | "behind"
  | string;

// Structure for a single Goal item
export interface Goal {
  id: string | number;
  title: string;
  description: string;
  status: GoalStatus;
  current: number;
  target: number;
  unit: string;
  percentage: number;
  deadline: string;
  insights?: string; // Optional field
}

// Component Props
interface GoalTrackingProps {
  goals?: Goal[]; // If no data is received, it may be undefined.
}

const GoalTracking: React.FC<GoalTrackingProps> = ({ goals = [] }) => {
  const getProgressColor = (percentage: number): string => {
    if (percentage >= 90) return "bg-success";
    if (percentage >= 70) return "bg-primary";
    if (percentage >= 50) return "bg-warning";
    return "bg-error";
  };

  // Use 'any' as the return type to avoid literal type errors in icon naming.
  const getStatusIcon = (status: GoalStatus): any => {
    switch (status) {
      case "completed":
        return "CheckCircle";
      case "on-track":
        return "TrendingUp";
      case "at-risk":
        return "AlertTriangle";
      case "behind":
        return "AlertCircle";
      default:
        return "Target";
    }
  };

  const getStatusColor = (status: GoalStatus): string => {
    switch (status) {
      case "completed":
        return "text-success";
      case "on-track":
        return "text-primary";
      case "at-risk":
        return "text-warning";
      case "behind":
        return "text-error";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 soft-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Goal Tracking
        </h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          Manage Goals
        </button>
      </div>
      <div className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${getStatusColor(
                    goal.status
                  )} bg-opacity-10`}
                >
                  <Icon
                    name={getStatusIcon(goal.status)}
                    size={16}
                    className={getStatusColor(goal.status)}
                  />
                </div>
                <div>
                  <h4 className="font-heading font-medium text-sm text-foreground">
                    {goal.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {goal.description}
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  goal.status === "completed"
                    ? "bg-success/10 text-success"
                    : goal.status === "on-track"
                    ? "bg-primary/10 text-primary"
                    : goal.status === "at-risk"
                    ? "bg-warning/10 text-warning"
                    : "bg-error/10 text-error"
                }`}
              >
                {goal.status?.replace("-", " ")}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">
                  {goal.current?.toLocaleString()} /{" "}
                  {goal.target?.toLocaleString()} {goal.unit}
                </span>
              </div>

              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getProgressColor(
                    goal.percentage
                  )}`}
                  style={{ width: `${Math.min(goal.percentage, 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {goal.percentage}% complete
                </span>
                <span className="text-muted-foreground">
                  Due: {goal.deadline}
                </span>
              </div>
            </div>

            {goal.insights && (
              <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon
                    name="Lightbulb"
                    size={14}
                    className="text-accent mt-0.5"
                  />
                  <p className="text-xs text-foreground">{goal.insights}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-heading font-bold text-success">
              {goals.filter((g) => g.status === "completed").length}
            </p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div>
            <p className="text-lg font-heading font-bold text-primary">
              {goals.filter((g) => g.status === "on-track").length}
            </p>
            <p className="text-xs text-muted-foreground">On Track</p>
          </div>
          <div>
            <p className="text-lg font-heading font-bold text-warning">
              {
                goals.filter(
                  (g) => g.status === "at-risk" || g.status === "behind"
                ).length
              }
            </p>
            <p className="text-xs text-muted-foreground">At Risk</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalTracking;
