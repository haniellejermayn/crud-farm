import React from "react";
import { Beef, Users, Package, ClipboardList, Calendar } from "lucide-react";
import { Card } from "../common/Card";

interface Props {
  stats: {
    animals: number;
    farmers: number;
    feeds: number;
    tasks: number;
  };
  isLoading: boolean;
}

export const DashboardSidebar = ({ stats, isLoading }: Props) => {
  const statCards = [
    { label: "Total Animals", value: stats.animals, icon: Beef },
    { label: "Active Farmers", value: stats.farmers, icon: Users },
    { label: "Feed Stock (kg)", value: stats.feeds, icon: Package },
    { label: "Incomplete Tasks", value: stats.tasks, icon: ClipboardList },
  ];

  return (
    <div className="lg:col-span-1 space-y-6 lg:border-r lg:border-gray-200 lg:pr-8 flex flex-col h-full">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-sage-900 tracking-tight">
          Farm Demo
        </h1>
        <p className="text-sage-500 text-sm mt-1 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="border-t border-gray-200" />

      {/* Stats Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-sage-500 uppercase tracking-wider mb-2">
          Overview
        </h3>

        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-100 animate-pulse rounded-xl border border-gray-200"
                />
              ))
          : statCards.map((stat) => (
              <Card
                key={stat.label}
                className="group transition-all duration-200 border-gray-200"
              >
                <div className="flex items-center p-1">
                  <div className="p-2 rounded-lg bg-sage-50 text-sage-600 transition-colors">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                    {stat.label}
                  </span>
                  <span className="ml-auto text-lg font-bold text-sage-900">
                    {stat.value}
                  </span>
                </div>
              </Card>
            ))}

        <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs text-sage-600 font-medium">
            Created by Hanielle Chua
          </span>
        </div>
      </div>
    </div>
  );
};
