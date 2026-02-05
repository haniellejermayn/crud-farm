import React from "react";
import { History, CalendarDays, Trash2 } from "lucide-react";

export interface FeedingLog {
  id: number;
  amount: number;
  fedAt: string;
  animal: { name: string; type: string };
  feedStock: { name: string };
}

interface FeedingLogTableProps {
  logs: FeedingLog[];
  isLoading: boolean;
  onDelete: (id: number) => void;
}

export const FeedingLogTable: React.FC<FeedingLogTableProps> = ({
  logs,
  isLoading,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-100 bg-sage-50/50 flex-shrink-0">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <History className="h-4 w-4 text-sage-600" />
          Feeding History
        </h3>
      </div>

      <div className="overflow-auto flex-grow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date | Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Animal
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full">
                Feed
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
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
                    <td colSpan={5} className="px-4 py-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
            ) : logs.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-12 text-center text-gray-500 text-sm"
                >
                  No feeding history yet.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-sage-50/30 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-3 w-3 text-gray-400" />
                      {new Date(log.fedAt).toLocaleDateString()}
                      <span className="text-gray-300">|</span>
                      {new Date(log.fedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="font-medium">{log.animal?.name}</span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({log.animal?.type})
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {log.feedStock?.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-bold">
                    -{log.amount} kg
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => onDelete(log.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove Log (Refunds Stock)"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
