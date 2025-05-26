// src/components/dashboard/TabNavigation.tsx
import React from "react";
import { Plus } from "lucide-react";

interface TabNavigationProps {
  activeTab: "goals" | "shop";
  onTabChange: (tab: "goals" | "shop") => void;
  onShowAddGoal: () => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  onShowAddGoal,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex space-x-4">
        <button
          onClick={() => onTabChange("goals")}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            activeTab === "goals"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          My Goals
        </button>
        <button
          onClick={() => onTabChange("shop")}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            activeTab === "shop"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Shop
        </button>
      </div>

      {activeTab === "goals" && (
        <button
          onClick={onShowAddGoal}
          className="bg-brand-accent hover:bg-brand-accent/80 hover:shadow-lg hover:scale-[1.02] duration-200 hover: cursor-pointer text-white px-4 py-2 rounded-full flex items-center space-x-2 font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Goal</span>
        </button>
      )}
    </div>
  );
};

export default TabNavigation;
