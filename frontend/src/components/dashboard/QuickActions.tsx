import React from "react";
import { Beef, Package, ClipboardList, PlusCircle } from "lucide-react";

interface Props {
  onOpenAnimal: () => void;
  onOpenFeed: () => void;
  onOpenTask: () => void;
}

export const QuickActions = ({
  onOpenAnimal,
  onOpenFeed,
  onOpenTask,
}: Props) => {
  const actions = [
    { label: "Add Animal", icon: Beef, onClick: onOpenAnimal },
    { label: "Feed Animal", icon: Package, onClick: onOpenFeed },
    { label: "Create Task", icon: ClipboardList, onClick: onOpenTask },
  ];

  return (
    <div>
      <h3 className="text-sm font-semibold text-sage-500 uppercase tracking-wider mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="bg-white border border-gray-200 hover:border-sage-500 hover:ring-1 hover:ring-sage-500 p-4 rounded-xl transition-all duration-200 flex items-center justify-between group shadow-sm text-left"
          >
            <div className="flex items-center gap-3">
              <div className="bg-sage-50 text-sage-600 p-2 rounded-lg group-hover:bg-sage-600 group-hover:text-white transition-colors">
                <action.icon className="h-5 w-5" />
              </div>
              <div>
                <span className="block font-semibold text-gray-700 group-hover:text-sage-900">
                  {action.label}
                </span>
              </div>
            </div>
            <PlusCircle className="h-5 w-5 text-gray-300 group-hover:text-sage-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};
