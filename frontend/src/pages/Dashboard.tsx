import React, { useEffect, useState, useMemo } from "react";
import { Card } from "../components/common/Card";
import {
  Beef,
  Users,
  Package,
  ClipboardList,
  AlertTriangle,
  TrendingUp,
  PlusCircle,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { animalsApi, farmersApi, feedsApi, tasksApi } from "../api/client";
import { type Animal, type Farmer, type Task, TaskStatus } from "../types";
import type { Animal as AnimalsTableAnimal } from "../components/animals/AnimalsTable";

// Modals
import { AnimalFormModal } from "../components/animals/AnimalFormModal";
import { FeedAnimalModal } from "../components/feeds/FeedAnimalModal";
import { TaskFormModal } from "../components/tasks/TaskFormModal";

interface FeedStock {
  id: number;
  name: string;
  quantity: number;
}

interface FeedingLog {
  id: number;
  amount: number;
  fedAt: string;
  animal: Animal;
  feedStock: FeedStock;
}

export const Dashboard: React.FC = () => {
  // --- State ---
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [feeds, setFeeds] = useState<FeedStock[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [logs, setLogs] = useState<FeedingLog[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  // Modal Visibility State
  const [showAnimalModal, setShowAnimalModal] = useState(false);
  const [showFeedModal, setShowFeedModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // --- Fetch Data ---
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [animalsRes, farmersRes, feedsRes, tasksRes, logsRes] =
        await Promise.all([
          animalsApi.getAll(),
          farmersApi.getAll(),
          feedsApi.getAllStock(),
          tasksApi.getAll(),
          feedsApi.getHistory(),
        ]);

      setAnimals(animalsRes.data);
      setFarmers(farmersRes.data);
      setFeeds(feedsRes.data);
      setTasks(tasksRes.data);
      setLogs(logsRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Action Handlers ---
  const handleCreateAnimal = async (data: Omit<Animal, "id">) => {
    try {
      await animalsApi.create(data);
      setShowAnimalModal(false);
      fetchData();
    } catch (error) {
      console.error("Failed to create animal", error);
    }
  };

  const handleFeedAnimal = async (data: {
    animalId: number;
    feedStockId: number;
    amount: number;
  }) => {
    try {
      await feedsApi.feedAnimal(data);
      setShowFeedModal(false);
      fetchData();
    } catch (error) {
      console.error("Failed to feed animal", error);
    }
  };

  const handleCreateTask = async (data: unknown) => {
    try {
      await tasksApi.create(data);
      setShowTaskModal(false);
      fetchData();
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  // --- Metrics & Insights Calculation ---
  const stats = useMemo(() => {
    const totalFeedQuantity = feeds.reduce(
      (acc, item) => acc + item.quantity,
      0,
    );
    return {
      animals: animals.length,
      farmers: farmers.length,
      feeds: totalFeedQuantity,
      tasks: tasks.filter((t) => t.status !== TaskStatus.COMPLETED).length,
    };
  }, [animals, farmers, feeds, tasks]);

  const insights = useMemo(() => {
    // 1. Low Stock Alerts (< 50kg)
    const lowStock = feeds.filter((f) => f.quantity < 50);

    // 2. Overdue Tasks (Pending + Due Date is in the past)
    const now = new Date();
    const allOverdue = tasks.filter((t) => {
      // Must be pending and have a due date
      if (t.status === TaskStatus.COMPLETED || !t.dueDate) return false;
      // Check if due date is before now
      return new Date(t.dueDate) < now;
    });

    const overdueCount = allOverdue.length;

    // Sort oldest due date first (most overdue)
    const overdueTasks = allOverdue
      .sort(
        (a, b) =>
          new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
      )
      .slice(0, 3);

    // 3. Trends (from recent logs)
    const animalConsumption: Record<string, number> = {};
    const feedUsage: Record<string, number> = {};

    logs.forEach((log) => {
      if (log.animal) {
        const name = log.animal.name;
        animalConsumption[name] = (animalConsumption[name] || 0) + log.amount;
      }
      if (log.feedStock) {
        const name = log.feedStock.name;
        feedUsage[name] = (feedUsage[name] || 0) + log.amount;
      }
    });

    // 4. Most Productive Employee (Most Completed Tasks)
    const farmerCompletions: Record<string, number> = {};
    tasks
      .filter((t) => t.status === TaskStatus.COMPLETED)
      .forEach((t) => {
        const name = t.farmer?.name || "Unassigned";
        farmerCompletions[name] = (farmerCompletions[name] || 0) + 1;
      });

    const mostFedAnimal = Object.entries(animalConsumption).sort(
      ([, a], [, b]) => b - a,
    )[0];
    const mostUsedFeed = Object.entries(feedUsage).sort(
      ([, a], [, b]) => b - a,
    )[0];
    const topEmployee = Object.entries(farmerCompletions).sort(
      ([, a], [, b]) => b - a,
    )[0];

    return {
      lowStock,
      overdueTasks,
      overdueCount,
      mostFedAnimal,
      mostUsedFeed,
      topEmployee,
    };
  }, [feeds, tasks, logs]);

  const statCards = [
    {
      label: "Total Animals",
      value: stats.animals,
      icon: Beef,
    },
    {
      label: "Active Farmers",
      value: stats.farmers,
      icon: Users,
    },
    {
      label: "Feed Stock (kg)",
      value: stats.feeds,
      icon: Package,
    },
    {
      label: "Pending Tasks",
      value: stats.tasks,
      icon: ClipboardList,
    },
  ];

  const quickActions = [
    {
      label: "Add Animal",
      icon: Beef,
      onClick: () => setShowAnimalModal(true),
    },
    {
      label: "Feed Animal",
      icon: Package,
      onClick: () => setShowFeedModal(true),
    },
    {
      label: "Create Task",
      icon: ClipboardList,
      onClick: () => setShowTaskModal(true),
    },
  ];

  const hasLowStock = insights.lowStock.length > 0;
  const hasOverdue = insights.overdueCount > 0;

  return (
    <div className="p-2 max-w-7xl mx-auto space-y-8">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT COLUMN: Header & Stats Overview */}
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
                System Online
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Actions & Insights */}
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
                  className="bg-white border border-gray-200 hover:border-sage-500 hover:ring-1 hover:ring-sage-500 p-4 rounded-xl transition-all duration-200 flex items-center justify-between group shadow-sm text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-sage-50 text-sage-600 p-2 rounded-lg group-hover:bg-sage-600 group-hover:text-white transition-colors">
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block font-semibold text-gray-700 group-hover:text-sage-900">
                        {action.label}
                      </span>
                    </div>
                  </div>
                  <PlusCircle className="h-5 w-5 text-gray-300 group-hover:text-sage-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Farm Insights Section */}
          <div>
            <h3 className="text-sm font-semibold text-sage-500 uppercase tracking-wider mb-4">
              Farm Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Overdue Tasks (Replaced Pending Tasks) */}
              <Card
                className={`p-0 overflow-hidden border-y border-r border-gray-200 shadow-sm h-full flex flex-col ${
                  hasOverdue
                    ? "border-l-4 border-l-red-500"
                    : "border-l-4 border-l-sage-500"
                }`}
              >
                <div className="p-4 border-b border-gray-100 bg-sage-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Changed Icon and Text based on overdue status */}
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
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
        </div>
      </div>

      {/* Modals */}
      {showAnimalModal && (
        <AnimalFormModal
          onClose={() => setShowAnimalModal(false)}
          onSubmit={handleCreateAnimal}
        />
      )}

      {showTaskModal && (
        <TaskFormModal
          onClose={() => setShowTaskModal(false)}
          onSubmit={handleCreateTask}
          farmers={farmers}
          animals={animals}
        />
      )}

      {showFeedModal && (
        <FeedAnimalModal
          onClose={() => setShowFeedModal(false)}
          onSubmit={handleFeedAnimal}
          animals={animals as AnimalsTableAnimal[]}
          stocks={feeds}
        />
      )}
    </div>
  );
};
