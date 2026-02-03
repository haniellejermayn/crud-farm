import React from "react";
import { Trash2, Pencil, Users } from "lucide-react";

export interface Farmer {
  id: number;
  name: string;
  role: string;
}

interface FarmersTableProps {
  farmers: Farmer[];
  isLoading: boolean;
  onEdit: (farmer: Farmer) => void;
  onDelete: (id: number) => void;
}

export const FarmersTable: React.FC<FarmersTableProps> = ({
  farmers,
  isLoading,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-sage-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider w-20">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <tr key={i}>
                    <td colSpan={4} className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
            ) : farmers.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <Users className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-medium">No farmers found.</p>
                </td>
              </tr>
            ) : (
              farmers.map((farmer) => (
                <tr
                  key={farmer.id}
                  className="hover:bg-sage-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    #{farmer.id}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {farmer.name}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {farmer.role}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(farmer)}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-lg"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(farmer.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-lg"
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
