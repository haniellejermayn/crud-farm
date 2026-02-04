import { useState, useEffect, useMemo, useCallback } from "react";
import { animalsApi, farmersApi, feedsApi, tasksApi } from "../api/client";
import { type Animal, type Farmer, type Task, TaskStatus } from "../types";

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

export const useDashboardData = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [feeds, setFeeds] = useState<FeedStock[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [logs, setLogs] = useState<FeedingLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- Metrics Calculation ---
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

  // --- Insights Calculation ---
  const insights = useMemo(() => {
    const lowStock = feeds.filter((f) => f.quantity < 50);

    const now = new Date();
    const allOverdue = tasks.filter((t) => {
      if (t.status === TaskStatus.COMPLETED || !t.dueDate) return false;
      return new Date(t.dueDate) < now;
    });

    const overdueTasks = [...allOverdue]
      .sort(
        (a, b) =>
          new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
      )
      .slice(0, 3);

    // Consumption Analytics
    const animalConsumption: Record<string, number> = {};
    const feedUsage: Record<string, number> = {};

    logs.forEach((log) => {
      if (log.animal) {
        animalConsumption[log.animal.name] =
          (animalConsumption[log.animal.name] || 0) + log.amount;
      }
      if (log.feedStock) {
        feedUsage[log.feedStock.name] =
          (feedUsage[log.feedStock.name] || 0) + log.amount;
      }
    });

    // Productivity Analytics
    const farmerCompletions: Record<string, number> = {};
    tasks
      .filter((t) => t.status === TaskStatus.COMPLETED)
      .forEach((t) => {
        const name = t.farmer?.name || "Unassigned";
        farmerCompletions[name] = (farmerCompletions[name] || 0) + 1;
      });

    const getTopEntry = (record: Record<string, number>) =>
      Object.entries(record).sort(([, a], [, b]) => b - a)[0];

    return {
      lowStock,
      overdueTasks,
      overdueCount: allOverdue.length,
      mostFedAnimal: getTopEntry(animalConsumption),
      mostUsedFeed: getTopEntry(feedUsage),
      topEmployee: getTopEntry(farmerCompletions),
    };
  }, [feeds, tasks, logs]);

  return {
    animals,
    farmers,
    feeds,
    isLoading,
    stats,
    insights,
    refresh: fetchData,
  };
};
