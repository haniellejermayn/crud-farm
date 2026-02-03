import React, { useEffect, useState } from "react";
import { Package, Plus, Utensils } from "lucide-react";
import { feedsApi, animalsApi } from "../api/client";
import { PageHeader } from "../components/common/PageHeader";
import {
  FeedStockTable,
  type FeedStock,
} from "../components/feeds/FeedStockTable";
import {
  FeedingLogTable,
  type FeedingLog,
} from "../components/feeds/FeedingLogTable";
import { AddStockModal } from "../components/feeds/AddStockModal";
import { FeedAnimalModal } from "../components/feeds/FeedAnimalModal";
import { type Animal } from "../components/animals/AnimalsTable";
import axios from "axios";

export const FeedsPage: React.FC = () => {
  const [stock, setStock] = useState<FeedStock[]>([]);
  const [logs, setLogs] = useState<FeedingLog[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isFeedModalOpen, setIsFeedModalOpen] = useState(false);
  const [editingStock, setEditingStock] = useState<FeedStock | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [stockRes, logsRes, animalsRes] = await Promise.all([
        feedsApi.getAllStock(),
        feedsApi.getHistory(),
        animalsApi.getAll(),
      ]);
      setStock(stockRes.data);
      setLogs(logsRes.data);
      setAnimals(animalsRes.data);
    } catch (error) {
      console.error("Failed to fetch feed data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAddStock = () => {
    setEditingStock(null);
    setIsStockModalOpen(true);
  };

  const handleEditStock = (item: FeedStock) => {
    setEditingStock(item);
    setIsStockModalOpen(true);
  };

  const handleDeleteStock = async (id: number) => {
    if (
      window.confirm("Delete this feed stock? This action cannot be undone.")
    ) {
      try {
        await feedsApi.deleteStock(id);
        fetchData();
      } catch (error) {
        console.error("Failed to delete stock", error);

        if (axios.isAxiosError(error) && error.response?.status === 409) {
          alert(
            "Cannot delete this feed because it has been used in feeding logs.\n\nPlease remove the associated feeding history first.",
          );
        } else {
          alert("Failed to delete stock. Please try again.");
        }
      }
    }
  };

  const handleSaveStock = async (data: { name: string; quantity: number }) => {
    try {
      if (editingStock) {
        await feedsApi.updateStock(editingStock.id, data);
      } else {
        await feedsApi.addStock(data);
      }
      setIsStockModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to save stock", error);
    }
  };

  const handleFeedAnimal = async (data: {
    animalId: number;
    feedStockId: number;
    amount: number;
  }) => {
    try {
      await feedsApi.feedAnimal(data);
      setIsFeedModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to feed animal", error);
      alert("Failed to feed animal. Check stock levels.");
    }
  };

  const handleDeleteLog = async (id: number) => {
    if (window.confirm("Remove this feeding record?")) {
      try {
        await feedsApi.deleteLog(id);
        fetchData();
      } catch (error) {
        console.error("Failed to delete log", error);
      }
    }
  };

  return (
    <div className="p-2 max-w-7xl mx-auto space-y-6 h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0">
        <PageHeader
          title="Feed Management"
          subtitle="Track inventory levels and monitor feeding schedules."
          icon={Package}
        >
          <button
            onClick={() => setIsFeedModalOpen(true)}
            className="bg-white border border-sage-300 text-sage-700 hover:bg-sage-50 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
          >
            <Utensils className="h-4 w-4" /> Feed Animal
          </button>
          <button
            onClick={handleOpenAddStock}
            className="bg-sage-600 hover:bg-sage-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add New Feed
          </button>
        </PageHeader>

        <div className="border-t border-gray-200 mt-6" />
      </div>

      {/* Main Content Grid (Takes remaining height) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-grow overflow-hidden pb-6">
        {/* Left: Inventory*/}
        <div className="lg:col-span-2 h-full">
          <FeedStockTable
            stock={stock}
            isLoading={isLoading}
            onEdit={handleEditStock}
            onDelete={handleDeleteStock}
          />
        </div>

        {/* Right: History */}
        <div className="lg:col-span-3 h-full">
          <FeedingLogTable
            logs={logs}
            isLoading={isLoading}
            onDelete={handleDeleteLog}
          />
        </div>
      </div>

      {/* Modals */}
      {isStockModalOpen && (
        <AddStockModal
          onClose={() => setIsStockModalOpen(false)}
          onSubmit={handleSaveStock}
          initialData={editingStock}
        />
      )}

      {isFeedModalOpen && (
        <FeedAnimalModal
          onClose={() => setIsFeedModalOpen(false)}
          onSubmit={handleFeedAnimal}
          animals={animals}
          stocks={stock}
        />
      )}
    </div>
  );
};
