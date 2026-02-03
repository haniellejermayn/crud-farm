import React from "react";
import {
  Trash2,
  Pencil,
  Calendar,
  User,
  Beef,
  ClipboardList,
} from "lucide-react";
import { type Task, TaskStatus } from "../../types";

interface TasksTableProps {
  tasks: Task[];
  isLoading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case TaskStatus.IN_PROGRESS:
      return "bg-blue-50 text-blue-700 border-blue-100";
    default:
      return "bg-amber-50 text-amber-700 border-amber-100";
  }
};

export const TasksTable: React.FC<TasksTableProps> = ({
  tasks,
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
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                Related To
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
            ) : tasks.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <ClipboardList className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-medium">No tasks found.</p>
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-sage-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    #{task.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {task.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}
                    >
                      {task.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {task.farmer ? (
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-gray-400" />
                        {task.farmer.name}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {task.animal ? (
                      <div className="flex items-center gap-2">
                        <Beef className="h-3 w-3 text-gray-400" />
                        {task.animal.name}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(task)}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-2 rounded-lg"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(task.id)}
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
