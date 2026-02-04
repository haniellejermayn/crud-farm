import React, { useState } from "react";
import { X } from "lucide-react";
import type { FeedStock } from "./FeedStockTable";
import type { Animal } from "../animals/AnimalsTable";

interface FeedAnimalModalProps {
  onClose: () => void;
  onSubmit: (data: {
    animalId: number;
    feedStockId: number;
    amount: number;
  }) => Promise<void>;
  animals: Animal[];
  stocks: FeedStock[];
}

export const FeedAnimalModal: React.FC<FeedAnimalModalProps> = ({
  onClose,
  onSubmit,
  animals,
  stocks,
}) => {
  const [animalId, setAnimalId] = useState("");
  const [feedStockId, setFeedStockId] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!animalId || !feedStockId || !amount) return;

    onSubmit({
      animalId: Number(animalId),
      feedStockId: Number(feedStockId),
      amount: Number(amount),
    });
  };

  const selectedStock = stocks.find((s) => s.id === Number(feedStockId));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-sage-50/50">
          <h3 className="text-lg font-semibold text-gray-900">Feed Animal</h3>
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
              Select Animal
            </label>
            <select
              required
              value={animalId}
              onChange={(e) => setAnimalId(e.target.value)}
              className="w-full p-1 rounded-lg border-gray-300 focus:ring-sage-500 focus:border-sage-500 shadow-sm"
            >
              <option value="">-- Choose Animal --</option>
              {animals.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.type})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Feed
            </label>
            <select
              required
              value={feedStockId}
              onChange={(e) => setFeedStockId(e.target.value)}
              className="w-full p-1 rounded-lg border-gray-300 focus:ring-sage-500 focus:border-sage-500 shadow-sm"
            >
              <option value="">-- Choose Feed --</option>
              {stocks.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (Available: {s.quantity}kg)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (kg)
              {selectedStock && (
                <span className="text-xs text-sage-600 ml-2">
                  (Max: {selectedStock.quantity})
                </span>
              )}
            </label>
            <input
              required
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => {
                if (!e.target.value || /^\d*\.?\d*$/.test(e.target.value)) {
                  setAmount(e.target.value);
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
              Confirm Feed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
