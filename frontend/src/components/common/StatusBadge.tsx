import React from "react";
import { TaskStatus } from "../../types";

interface StatusBadgeProps {
  status: TaskStatus | boolean;
  type?: "task" | "health" | "harvest";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = "task",
}) => {
  const getStyles = () => {
    if (type === "health") {
      return status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
    }

    if (type === "harvest") {
      return status
        ? "bg-primary-100 text-primary-800"
        : "bg-gray-100 text-gray-800";
    }

    // Task status
    switch (status as TaskStatus) {
      case TaskStatus.COMPLETED:
        return "bg-green-100 text-green-800";
      case TaskStatus.IN_PROGRESS:
        return "bg-blue-100 text-blue-800";
      case TaskStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getText = () => {
    if (type === "health") {
      return status ? "Healthy" : "Unhealthy";
    }

    if (type === "harvest") {
      return status ? "Ready" : "Growing";
    }

    return status;
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${getStyles()}`}
    >
      {getText()}
    </span>
  );
};
