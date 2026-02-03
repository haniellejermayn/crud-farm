import React, { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import { tasksApi, farmersApi, animalsApi } from "../api/client";
import { PageHeader } from "../components/common/PageHeader";
import { SearchInput } from "../components/common/SearchInput";
import { TasksTable } from "../components/tasks/TasksTable";
import { TaskFormModal } from "../components/tasks/TaskFormModal";
import type { Task, Farmer, Animal } from "../types";

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [animals, setAnimals] = useState<Animal[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [tasksRes, farmersRes, animalsRes] = await Promise.all([
        tasksApi.getAll(),
        farmersApi.getAll(),
        animalsApi.getAll(),
      ]);
      setTasks(tasksRes.data);
      setFarmers(farmersRes.data);
      setAnimals(animalsRes.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data: unknown) => {
    try {
      if (editingTask) {
        await tasksApi.update(editingTask.id, data);
      } else {
        await tasksApi.create(data);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Failed to save task", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await tasksApi.delete(id);
        fetchData();
      } catch (error) {
        console.error("Failed to delete task", error);
      }
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.farmer?.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="p-2 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Task Management"
        subtitle="Track farm activities, assignments, and deadlines."
        icon={ClipboardList}
        actionLabel="Create Task"
        onAction={handleOpenCreate}
      />

      <div className="border-t border-gray-200" />

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search by title or farmer..."
      />

      <TasksTable
        tasks={filteredTasks}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <TaskFormModal
          key={editingTask?.id ?? "create"}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          initialData={editingTask}
          farmers={farmers}
          animals={animals}
        />
      )}
    </div>
  );
};
