import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TooltipProps } from "recharts";

// Structure of the chart data
export interface TrafficData {
  date: string;
  views: number;
  visitors: number;
  [key: string]: any; // For flexibility
}

// Component props
interface TrafficChartProps {
  data: TrafficData[];
  title: string;
}

const TrafficChart: React.FC<TrafficChartProps> = ({ data, title }) => {
  // Generic types for CustomTooltip: <ValueType, NameType>
  // Typically values are numbers and labels are strings.
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-soft">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {/* entry.name ve entry.value Recharts tarafından sağlanır */}
              {entry.name}: {entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 soft-shadow">
      <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
        {title}
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="date"
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="views"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={{ fill: "var(--color-primary)", strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                stroke: "var(--color-primary)",
                strokeWidth: 2,
              }}
            />
            <Line
              type="monotone"
              dataKey="visitors"
              stroke="var(--color-accent)"
              strokeWidth={2}
              dot={{ fill: "var(--color-accent)", strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                stroke: "var(--color-accent)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficChart;
