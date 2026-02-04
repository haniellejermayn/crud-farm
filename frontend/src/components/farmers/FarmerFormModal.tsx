import React, { useState } from "react";
import { X } from "lucide-react";
import type { Farmer } from "./FarmersTable";

interface FarmerFormModalProps {
  onClose: () => void;
  onSubmit: (data: Omit<Farmer, "id">) => Promise<void>;
  initialData?: Farmer | null;
}

const INITIAL_STATE = {
  name: "",
  role: "Field Hand",
};

export const FarmerFormModal: React.FC<FarmerFormModalProps> = ({
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState(initialData ?? INITIAL_STATE);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-sage-50/50">
          <h3 className="text-lg font-semibold text-gray-900">
            {initialData ? "Edit Farmer" : "Add New Farmer"}
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
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full p-1 rounded-lg border-gray-300 focus:border-sage-500 focus:ring-sage-500 shadow-sm"
            >
              <option value="Field Hand">Field Hand</option>
              <option value="Manager">Manager</option>
              <option value="Veterinarian">Veterinarian</option>
              <option value="Machine Operator">Machine Operator</option>
            </select>
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
              {initialData ? "Save Changes" : "Create Farmer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
