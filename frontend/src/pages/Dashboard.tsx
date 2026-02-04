import React, { useState } from "react";
import { animalsApi, feedsApi, tasksApi } from "../api/client";
import { type Animal } from "../types";
import type { Animal as AnimalsTableAnimal } from "../components/animals/AnimalsTable";
import { useDashboardData } from "../hooks/useDashboardData";

// Dashboard Components
import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import { QuickActions } from "../components/dashboard/QuickActions";
import { InsightsGrid } from "../components/dashboard/InsightsGrid";

// Modals
import { AnimalFormModal } from "../components/animals/AnimalFormModal";
import { FeedAnimalModal } from "../components/feeds/FeedAnimalModal";
import { TaskFormModal } from "../components/tasks/TaskFormModal";

export const Dashboard: React.FC = () => {
  const { animals, farmers, feeds, isLoading, stats, insights, refresh } =
    useDashboardData();

  // Modal Visibility State
  const [showAnimalModal, setShowAnimalModal] = useState(false);
  const [showFeedModal, setShowFeedModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // --- Action Handlers ---
  const handleCreateAnimal = async (data: Omit<Animal, "id">) => {
    try {
      await animalsApi.create(data);
      setShowAnimalModal(false);
      refresh();
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
      refresh();
    } catch (error) {
      console.error("Failed to feed animal", error);
    }
  };

  const handleCreateTask = async (data: unknown) => {
    try {
      await tasksApi.create(data);
      setShowTaskModal(false);
      refresh();
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  return (
    <div className="p-2 max-w-7xl mx-auto space-y-8">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* LEFT COLUMN: Sidebar */}
        <DashboardSidebar stats={stats} isLoading={isLoading} />

        {/* RIGHT COLUMN: Actions & Insights */}
        <div className="lg:col-span-3 space-y-8">
          <QuickActions
            onOpenAnimal={() => setShowAnimalModal(true)}
            onOpenFeed={() => setShowFeedModal(true)}
            onOpenTask={() => setShowTaskModal(true)}
          />

          <div className="border-t border-gray-200" />

          <InsightsGrid insights={insights} />
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
