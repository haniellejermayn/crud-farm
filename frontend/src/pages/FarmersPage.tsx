import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { farmersApi } from "../api/client";
import { PageHeader } from "../components/common/PageHeader";
import { SearchInput } from "../components/common/SearchInput";
import { FarmersTable } from "../components/farmers/FarmersTable";
import { FarmerFormModal } from "../components/farmers/FarmerFormModal";
import type { Farmer } from "../components/farmers/FarmersTable";

export const FarmersPage: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFarmer, setEditingFarmer] = useState<Farmer | null>(null);

  const fetchFarmers = async () => {
    setIsLoading(true);
    try {
      const response = await farmersApi.getAll();
      setFarmers(response.data);
    } catch (error) {
      console.error("Failed to fetch farmers", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  const handleOpenCreate = () => {
    setEditingFarmer(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (farmer: Farmer) => {
    setEditingFarmer(farmer);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: Omit<Farmer, "id">) => {
    try {
      if (editingFarmer) {
        await farmersApi.update(editingFarmer.id, data);
      } else {
        await farmersApi.create(data);
      }
      setIsModalOpen(false);
      fetchFarmers();
    } catch (error) {
      console.error("Failed to save farmer", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to remove this farmer?")) {
      try {
        await farmersApi.delete(id);
        fetchFarmers();
      } catch (error) {
        console.error("Failed to delete farmer", error);
      }
    }
  };

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-2 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Farmers & Staff"
        subtitle="Manage farm staff, assign roles, and view team details."
        icon={Users}
        actionLabel="Add Farmer"
        onAction={handleOpenCreate}
      />

      <div className="border-t border-gray-200" />

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search by name or role..."
      />

      <FarmersTable
        farmers={filteredFarmers}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />
      {isModalOpen && (
        <FarmerFormModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={editingFarmer}
        />
      )}
    </div>
  );
};
