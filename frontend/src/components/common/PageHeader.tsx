import React from "react";
import type { LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  actionLabel: string;
  onAction: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-sage-900 tracking-tight flex items-center gap-2">
          <Icon className="h-6 w-6 text-sage-600" />
          {title}
        </h1>
        <p className="text-sage-500 text-sm mt-1">{subtitle}</p>
      </div>
      <button
        onClick={onAction}
        className="bg-sage-600 hover:bg-sage-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
      >
        <Plus className="h-4 w-4" /> {actionLabel}
      </button>
    </div>
  );
};
