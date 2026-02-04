import React from "react";
import {
  AlertTriangle,
  CheckCircle,
  Package,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card } from "../common/Card";

interface InsightsData {
  lowStock: { id: number; name: string; quantity: number }[];
  overdueTasks: {
    id: number;
    title: string;
    dueDate?: string;
    farmer?: { name: string };
  }[];
  overdueCount: number;
  mostFedAnimal?: [string, number];
  mostUsedFeed?: [string, number];
  topEmployee?: [string, number];
}

export const InsightsGrid = ({ insights }: { insights: InsightsData }) => {
  const hasLowStock = insights.lowStock.length > 0;
  const hasOverdue = insights.overdueCount > 0;

  return (
    <div>
      <h3 className="text-sm font-semibold text-sage-500 uppercase tracking-wider mb-4">
        Farm Insights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Overdue Tasks */}
        <Card
          className={`p-0 overflow-hidden border-y border-r border-gray-200 shadow-sm h-full flex flex-col ${
            hasOverdue
              ? "border-l-4 border-l-red-500"
              : "border-l-4 border-l-sage-500"
          }`}
        >
          <div className="p-4 border-b border-gray-100 bg-sage-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {hasOverdue ? (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              ) : (
                <CheckCircle className="h-4 w-4 text-sage-600" />
              )}
              <h4
                className={`font-semibold ${hasOverdue ? "text-red-700" : "text-gray-900"}`}
              >
                Overdue Tasks
              </h4>
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full border shadow-sm ${
                hasOverdue
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-white text-sage-600 border-gray-200"
              }`}
            >
              {insights.overdueCount} Overdue
            </span>
          </div>
          <div className="divide-y divide-gray-100 flex-1">
            {insights.overdueTasks.length > 0 ? (
              insights.overdueTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="mt-1 h-2 w-2 rounded-full bg-red-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-red-500 mt-0.5 font-medium">
                      Due:{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "No date"}{" "}
                      • {task.farmer?.name || "Unassigned"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm italic">
                No overdue tasks. Great work!
              </div>
            )}
          </div>
        </Card>

        {/* Card 2: Metrics & Alerts */}
        <div className="space-y-6 flex flex-col h-full">
          {/* Inventory Status */}
          <Card
            className={`p-4 border-l-4 shadow-sm border-y border-r border-gray-200 ${
              hasLowStock ? "border-l-red-500" : "border-l-sage-500"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-2 rounded-full shrink-0 ${
                  hasLowStock
                    ? "bg-red-50 text-red-600"
                    : "bg-sage-50 text-sage-600"
                }`}
              >
                {hasLowStock ? (
                  <AlertTriangle className="h-5 w-5" />
                ) : (
                  <Package className="h-5 w-5" />
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {hasLowStock ? "Low Stock Alerts" : "Inventory Status"}
                </h4>
                {hasLowStock ? (
                  <ul className="mt-2 space-y-1">
                    {insights.lowStock.map((s) => (
                      <li
                        key={s.id}
                        className="text-sm text-red-600 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                        {s.name}: {s.quantity}kg left
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-sage-500" />
                    All feed stocks are sufficient.
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Top Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 flex-1">
            {/* Top Eater */}
            <Card className="p-4 border-gray-200 bg-sage-50/30 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-sage-600" />
                <span className="text-[10px] font-bold text-sage-600 uppercase">
                  Top Eater
                </span>
              </div>
              <p className="text-base font-bold text-gray-900 truncate">
                {insights.mostFedAnimal ? insights.mostFedAnimal[0] : "—"}
              </p>
              <p className="text-xs text-gray-500">
                {insights.mostFedAnimal
                  ? `${insights.mostFedAnimal[1]}kg consumed`
                  : "No data"}
              </p>
            </Card>

            {/* Most Used Feed */}
            <Card className="p-4 border-gray-200 bg-sage-50/30 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-sage-600" />
                <span className="text-[10px] font-bold text-sage-600 uppercase">
                  Most Used
                </span>
              </div>
              <p className="text-base font-bold text-gray-900 truncate">
                {insights.mostUsedFeed ? insights.mostUsedFeed[0] : "—"}
              </p>
              <p className="text-xs text-gray-500">
                {insights.mostUsedFeed
                  ? `${insights.mostUsedFeed[1]}kg used`
                  : "No data"}
              </p>
            </Card>

            {/* Most Productive Employee */}
            <Card className="p-4 border-gray-200 bg-sage-50/30 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-sage-600" />
                <span className="text-[10px] font-bold text-sage-600 uppercase">
                  Top Worker
                </span>
              </div>
              <p className="text-base font-bold text-gray-900 truncate">
                {insights.topEmployee ? insights.topEmployee[0] : "—"}
              </p>
              <p className="text-xs text-gray-500">
                {insights.topEmployee
                  ? `${insights.topEmployee[1]} tasks done`
                  : "No data"}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
