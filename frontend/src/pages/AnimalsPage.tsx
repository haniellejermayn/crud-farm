import React, { useEffect, useState } from "react";
import { Beef } from "lucide-react";
import { animalsApi } from "../api/client";
import { PageHeader } from "../components/common/PageHeader";
import { SearchInput } from "../components/common/SearchInput";
import { AnimalsTable } from "../components/animals/AnimalsTable";
import type { Animal } from "../components/animals/AnimalsTable";
import { AnimalFormModal } from "../components/animals/AnimalFormModal";

export const AnimalsPage: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);

  const fetchAnimals = async () => {
    setIsLoading(true);
    try {
      const response = await animalsApi.getAll();
      setAnimals(response.data);
    } catch (error) {
      console.error("Failed to fetch animals", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const handleOpenCreate = () => {
    setEditingAnimal(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (animal: Animal) => {
    setEditingAnimal(animal);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: Omit<Animal, "id">) => {
    try {
      if (editingAnimal) {
        await animalsApi.update(editingAnimal.id, data);
      } else {
        await animalsApi.create(data);
      }
      setIsModalOpen(false);
      fetchAnimals();
    } catch (error) {
      console.error("Failed to save animal", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to remove this animal?")) {
      try {
        await animalsApi.delete(id);
        fetchAnimals();
      } catch (error) {
        console.error("Failed to delete animal", error);
      }
    }
  };

  const filteredAnimals = animals.filter(
    (animal) =>
      animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.type.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Livestock Management"
        subtitle="Manage your herd, track health, and view details."
        icon={Beef}
        actionLabel="Add Animal"
        onAction={handleOpenCreate}
      />

      <div className="border-t border-gray-200" />

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search by name or type..."
      />

      <AnimalsTable
        animals={filteredAnimals}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <AnimalFormModal
          key={editingAnimal?.id ?? "create"}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={editingAnimal}
        />
      )}
    </div>
  );
};
