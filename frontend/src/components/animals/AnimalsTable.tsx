import React from "react";
import { Trash2, Pencil, HeartPulse, AlertCircle, Beef } from "lucide-react";

// Define the Interface here or in a types file
export interface Animal {
  id: number;
  name: string;
  type: string;
  age: number;
  gender: string;
  isHealthy: boolean;
}

interface AnimalsTableProps {
  animals: Animal[];
  isLoading: boolean;
  onEdit: (animal: Animal) => void;
  onDelete: (id: number) => void;
}

export const AnimalsTable: React.FC<AnimalsTableProps> = ({
  animals,
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
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                Status
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
                    <td colSpan={7} className="px-6 py-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
            ) : animals.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <Beef className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-medium">No animals found.</p>
                </td>
              </tr>
            ) : (
              animals.map((animal) => (
                <tr
                  key={animal.id}
                  className="hover:bg-sage-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    #{animal.id}
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">
                        {animal.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {animal.type}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {animal.age} yrs
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {animal.gender}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {animal.isHealthy ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                        <HeartPulse className="h-3 w-3" /> Healthy
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                        <AlertCircle className="h-3 w-3" /> Sick
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(animal)}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-lg"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(animal.id)}
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
