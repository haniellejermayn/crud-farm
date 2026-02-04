import React, { useState } from "react";
import { X } from "lucide-react";
import { type Task, TaskStatus, type Farmer, type Animal } from "../../types";

interface TaskFormModalProps {
  onClose: () => void;
  onSubmit: (data: unknown) => Promise<void>;
  initialData?: Task | null;
  farmers: Farmer[];
  animals: Animal[];
}

const INITIAL_STATE = {
  title: "",
  status: TaskStatus.PENDING,
  dueDate: "",
  farmerId: "",
  animalId: "",
};

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  onClose,
  onSubmit,
  initialData,
  farmers,
  animals,
}) => {
  const [formData, setFormData] = useState(() => {
    if (initialData) {
      return {
        ...initialData,
        dueDate: initialData.dueDate
          ? new Date(initialData.dueDate).toISOString().split("T")[0]
          : "",
        farmerId: initialData.farmerId?.toString() || "",
        animalId: initialData.animalId?.toString() || "",
      };
    }
    return INITIAL_STATE;
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      ...formData,
      farmerId: formData.farmerId ? Number(formData.farmerId) : null,
      animalId: formData.animalId ? Number(formData.animalId) : null,
      dueDate: formData.dueDate
        ? new Date(formData.dueDate).toISOString()
        : null,
    };
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-sage-50/50">
          <h3 className="text-lg font-semibold text-gray-900">
            {initialData ? "Edit Task" : "Add New Task"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 rounded-lg border border-gray-300 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 shadow-sm"
              placeholder="e.g. Feed the cattle"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-full p-2 rounded-lg border border-gray-300 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as TaskStatus,
                  })
                }
                className="w-full p-2 rounded-lg border border-gray-300 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 shadow-sm"
              >
                <option value={TaskStatus.PENDING}>Pending</option>
                <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                <option value={TaskStatus.COMPLETED}>Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign Farmer
              </label>
              <select
                value={formData.farmerId}
                onChange={(e) =>
                  setFormData({ ...formData, farmerId: e.target.value })
                }
                className="w-full p-2 rounded-lg border border-gray-300 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 shadow-sm"
              >
                <option value="">Unassigned</option>
                {farmers.map((farmer) => (
                  <option key={farmer.id} value={farmer.id}>
                    {farmer.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Related Animal
              </label>
              <select
                value={formData.animalId}
                onChange={(e) =>
                  setFormData({ ...formData, animalId: e.target.value })
                }
                className="w-full p-2 rounded-lg border border-gray-300 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 shadow-sm"
              >
                <option value="">None</option>
                {animals.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.name} ({animal.type})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 text-sm font-medium"
            >
              {initialData ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
