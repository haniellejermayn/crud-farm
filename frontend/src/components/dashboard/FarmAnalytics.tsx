import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card } from "../common/Card";

// Define the shape of the data we expect
interface Props {
  logs: {
    id: number;
    amount: number;
    fedAt: string;
    feedStock: { name: string };
  }[];
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

export const FarmAnalytics = ({ logs }: Props) => {
  // 1. Calculate Daily Consumption (for Area Chart)
  const dailyData = useMemo(() => {
    // Group by Date
    const grouped = logs.reduce(
      (acc, log) => {
        const date = new Date(log.fedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        acc[date] = (acc[date] || 0) + log.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Convert to Array and sort by date (simplified for demo)
    return Object.entries(grouped).map(([date, amount]) => ({
      date,
      amount,
    }));
  }, [logs]);

  // 2. Calculate Feed Distribution (for Pie Chart)
  const feedTypeData = useMemo(() => {
    const grouped = logs.reduce(
      (acc, log) => {
        const name = log.feedStock.name;
        acc[name] = (acc[name] || 0) + log.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
    }));
  }, [logs]);

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold text-sage-500 uppercase tracking-wider">
        Analytics & Trends
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: Consumption Trend */}
        <Card className="p-6 border-gray-200 flex flex-col">
          <h4 className="font-semibold text-gray-900 mb-4">
            Daily Feed Consumption (kg)
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* CHART 2: Feed Distribution */}
        <Card className="p-6 border-gray-200 flex flex-col">
          <h4 className="font-semibold text-gray-900 mb-4">
            Feed Type Distribution (kg)
          </h4>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feedTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {feedTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-gray-600 text-sm ml-1">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
