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

interface Props {
  logs: {
    id: number;
    amount: number;
    fedAt: string;
    feedStock: { name: string };
  }[];
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

export const ConsumptionAnalytics = ({ logs }: Props) => {
  // --- Logic for Line Chart (Last 7 Days) ---
  const dailyData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    });

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

    return last7Days.map((date) => ({
      date,
      amount: grouped[date] || 0,
    }));
  }, [logs]);

  // --- Logic for Pie Chart (Last 7 Days ONLY) ---
  const feedTypeData = useMemo(() => {
    // Define the cutoff (Start of 6 days ago to cover full 7 day window including today)
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7);
    // Note: You can tweak this to -6 or set hours to 00:00:00 depending on exact needs

    const grouped = logs.reduce(
      (acc, log) => {
        const logDate = new Date(log.fedAt);

        // Filter out old logs
        if (logDate < cutoffDate) return acc;

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
        Consumption Analytics
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: Consumption Trend */}
        <Card className="p-6 border-gray-200 flex flex-col">
          <h4 className="font-semibold text-gray-900 mb-4">
            Feed Consumption (kg) in the Last 7 Days
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
            Feed Consumption (kg) by Type in the Last 7 Days
          </h4>
          <div className="h-64 w-full flex items-center justify-center">
            {feedTypeData.length > 0 ? (
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
                    {feedTypeData.map((_, index) => (
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
                      <span className="text-gray-600 text-sm ml-1">
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-gray-400 text-sm italic">
                No feeding data in the last 7 days.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
