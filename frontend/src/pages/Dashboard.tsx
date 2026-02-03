import React, { useEffect, useState } from "react";
import { Card } from "../components/common/Card";
import {
  Beef,
  Users,
  Package,
  ClipboardList,
  Activity,
  Calendar,
  PlusCircle,
} from "lucide-react";
import { animalsApi, farmersApi, feedsApi, tasksApi } from "../api/client";

interface FeedStock {
  id: number;
  name: string;
  quantity: number;
}

export const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    animals: 0,
    farmers: 0,
    feeds: 0,
    tasks: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const [animals, farmers, feeds, tasks] = await Promise.all([
          animalsApi.getAll(),
          farmersApi.getAll(),
          feedsApi.getAllStock(),
          tasksApi.getAll(),
        ]);

        setStats({
          animals: animals.data.length,
          farmers: farmers.data.length,
          feeds: feeds.data.reduce(
            (acc: number, item: FeedStock) => acc + item.quantity,
            0,
          ),
          tasks: tasks.data.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Animals", value: stats.animals, icon: Beef },
    { label: "Active Farmers", value: stats.farmers, icon: Users },
    { label: "Feed Stock (kg)", value: stats.feeds, icon: Package },
    { label: "Pending Tasks", value: stats.tasks, icon: ClipboardList },
  ];

  const quickActions = [
    { label: "Add Animal", icon: Beef, onClick: () => {} },
    { label: "Feed Animal", icon: Package, onClick: () => {} },
    { label: "Create Task", icon: ClipboardList, onClick: () => {} },
  ];

  return (
    <div className="p-2 max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
        <div>
          <button className="bg-sage-600 hover:bg-sage-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all flex items-center gap-2">
            <Activity className="h-4 w-4" /> Generate Report
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT COLUMN: Stats */}
        <div className="lg:col-span-1 space-y-4 lg:border-r lg:border-gray-200 lg:pr-8">
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
            : statCards.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={stat.label}
                    className="group transition-all duration-200 border-gray-200"
                  >
                    <div className="flex items-center p-1">
                      <div className="bg-sage-50 text-sage-600 p-2 rounded-lg group-hover:bg-sage-100 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                        {stat.label}
                      </span>
                      <span className="ml-auto text-lg font-bold text-sage-900">
                        {stat.value}
                      </span>
                    </div>
                  </Card>
                );
              })}

          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-sage-600 font-medium">
              System Online
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Actions & Activity */}
        <div className="lg:col-span-3 space-y-8">
          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-semibold text-sage-500 uppercase tracking-wider mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  className="bg-white border border-gray-200 hover:border-sage-500 hover:ring-1 hover:ring-sage-500 p-4 rounded-xl transition-all duration-200 flex items-center justify-between group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-sage-50 text-sage-600 p-2 rounded-lg group-hover:bg-sage-600 group-hover:text-white transition-colors">
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="font-semibold text-gray-700 group-hover:text-sage-900">
                      {action.label}
                    </span>
                  </div>
                  <PlusCircle className="h-5 w-5 text-gray-300 group-hover:text-sage-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-sage-500 uppercase tracking-wider">
                Recent Activity
              </h3>
              <button className="text-sm text-sage-600 hover:text-sage-800 hover:underline">
                View History
              </button>
            </div>

            <Card className="min-h-[300px] flex flex-col">
              <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-lg m-4">
                <div className="bg-gray-50 p-4 rounded-full mb-3">
                  <Activity className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-900 font-medium">No recent activity</p>
                <p className="text-gray-500 text-sm mt-1">
                  Actions taken on the farm will be logged here.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
