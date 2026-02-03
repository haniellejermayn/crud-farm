import React from "react";
import { Package, Pencil, Trash2 } from "lucide-react";

export interface FeedStock {
  id: number;
  name: string;
  quantity: number;
}

interface FeedStockTableProps {
  stock: FeedStock[];
  isLoading: boolean;
  onEdit: (stock: FeedStock) => void;
  onDelete: (id: number) => void;
}

export const FeedStockTable: React.FC<FeedStockTableProps> = ({
  stock,
  isLoading,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-100 bg-sage-50/50 flex-shrink-0">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Package className="h-4 w-4 text-sage-600" />
          Current Inventory
        </h3>
      </div>

      <div className="overflow-auto flex-grow">
        <table className="min-w-full divide-y divide-gray-200 relative">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feed Name
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity (kg)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              Array(3)
                .fill(0)
                .map((_, i) => (
                  <tr key={i}>
                    <td colSpan={4} className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
            ) : stock.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-gray-500 text-sm"
                >
                  No stock available.
                </td>
              </tr>
            ) : (
              stock.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-sage-50/30 transition-colors group"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                    #{item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right font-medium">
                    {item.quantity} kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-gray-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
