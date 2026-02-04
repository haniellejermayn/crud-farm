import React, { useState } from "react";
import { X } from "lucide-react";
import { type FeedStock } from "./FeedStockTable";

interface AddStockModalProps {
  onClose: () => void;
  onSubmit: (data: { name: string; quantity: number }) => Promise<void>;
  initialData?: FeedStock | null;
  isOpen?: boolean;
}

export const AddStockModal: React.FC<AddStockModalProps> = ({
  onClose,
  onSubmit,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.name ?? "");
  const [quantity, setQuantity] = useState(
    initialData?.quantity.toString() ?? "",
  );

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      name,
      quantity: Number(quantity),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-sage-50/50">
          <h3 className="text-lg font-semibold text-gray-900">
            {initialData ? "Edit Stock" : "Restock Feed"}
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
              Feed Name
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Corn, Hay"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-1 rounded-lg border-gray-300 focus:ring-sage-500 focus:border-sage-500 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity (kg)
            </label>
            <input
              required
              type="text"
              pattern="[0-9]*\.?[0-9]*"
              inputMode="decimal"
              value={quantity}
              onChange={(e) => {
                if (!e.target.value || /^\d*\.?\d*$/.test(e.target.value)) {
                  setQuantity(e.target.value);
                }
              }}
              className="w-full p-1 rounded-lg border-gray-300 focus:ring-sage-500 focus:border-sage-500 shadow-sm"
            />
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
              {initialData ? "Save Changes" : "Add Stock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
