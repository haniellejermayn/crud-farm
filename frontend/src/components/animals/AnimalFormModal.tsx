import React, { useState } from "react";
import { X } from "lucide-react";
import type { Animal } from "./AnimalsTable";

interface AnimalFormModalProps {
  onClose: () => void;
  onSubmit: (data: Omit<Animal, "id">) => Promise<void>;
  initialData?: Animal | null;
}

const INITIAL_STATE = {
  name: "",
  type: "Cow",
  age: 0,
  gender: "Female",
  isHealthy: true,
};

export const AnimalFormModal: React.FC<AnimalFormModalProps> = ({
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState(() => initialData ?? INITIAL_STATE);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-sage-50/50">
          <h3 className="text-lg font-semibold text-gray-900">
            {initialData ? "Edit Animal" : "Add New Animal"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-1 rounded-lg border-gray-300 focus:border-sage-500 focus:ring-sage-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full p-1 rounded-lg border-gray-300 focus:border-sage-500 focus:ring-sage-500 shadow-sm"
              >
                <option value="Cow">Cow</option>
                <option value="Chicken">Chicken</option>
                <option value="Goat">Goat</option>
                <option value="Pig">Pig</option>
                <option value="Sheep">Sheep</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age (Years)
              </label>
              <input
                required
                type="number"
                min="0"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: Number(e.target.value) })
                }
                className="w-full p-1 rounded-lg border-gray-300 focus:border-sage-500 focus:ring-sage-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="w-full p-1 rounded-lg border-gray-300 focus:border-sage-500 focus:ring-sage-500 shadow-sm"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Health Status
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={formData.isHealthy === true}
                  onChange={() => setFormData({ ...formData, isHealthy: true })}
                  className="text-sage-600 focus:ring-sage-500"
                />
                <span className="text-sm text-gray-700">Healthy</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={formData.isHealthy === false}
                  onChange={() =>
                    setFormData({ ...formData, isHealthy: false })
                  }
                  className="text-sage-600 focus:ring-sage-500"
                />
                <span className="text-sm text-gray-700">Sick</span>
              </label>
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
              {initialData ? "Save Changes" : "Create Animal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
