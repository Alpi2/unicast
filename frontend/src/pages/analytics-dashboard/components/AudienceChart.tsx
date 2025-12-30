import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { TooltipProps, LegendProps } from "recharts";

interface AudienceData {
  name: string;
  value: number;
  total?: number;
  [key: string]: any;
}

interface AudienceChartProps {
  data: AudienceData[];
  title: string;
}

const AudienceChart: React.FC<AudienceChartProps> = ({ data, title }) => {
  const COLORS = [
    "var(--color-primary)",
    "var(--color-accent)",
    "var(--color-success)",
    "var(--color-warning)",
    "var(--color-secondary)",
  ];

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const dataItem = payload[0];

      if (!dataItem) return null;

      const originalData = dataItem.payload as AudienceData;

      const total = originalData.total || 0;
      const value = (dataItem.value as number) || 0;
      const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : "0";

      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-soft">
          <p className="text-sm font-medium text-foreground">{dataItem.name}</p>
          <p className="text-sm text-muted-foreground">
            {value.toLocaleString()} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: LegendProps) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 soft-shadow">
      <h3 className="font-heading font-semibold text-lg text-foreground mb-6">
        {title}
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AudienceChart;
