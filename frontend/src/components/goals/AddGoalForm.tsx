import React, { useState } from "react";
import type { Goal } from "../../types";

interface AddGoalFormProps {
  onAdd: (
    goal: Omit<Goal, "id" | "completed" | "createdAt" | "streak">
  ) => void;
  onClose: () => void;
}

const AddGoalForm: React.FC<{
  onAdd: (
    goal: Omit<Goal, "id" | "completed" | "createdAt" | "streak">
  ) => void;
  onClose: () => void;
}> = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"daily" | "weekly" | "longterm">("daily");

  const handleSubmit = () => {
    if (!title.trim()) return;

    // Set default rewards based on goal type
    const getRewards = (goalType: "daily" | "weekly" | "longterm") => {
      switch (goalType) {
        case "daily":
          return { xpReward: 25, goldReward: 10 };
        case "weekly":
          return { xpReward: 100, goldReward: 50 };
        case "longterm":
          return { xpReward: 250, goldReward: 150 };
        default:
          return { xpReward: 25, goldReward: 10 };
      }
    };

    const { xpReward, goldReward } = getRewards(type);

    onAdd({
      title,
      description,
      type,
      xpReward,
      goldReward,
      dueDate:
        type === "weekly"
          ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          : undefined,
    });

    setTitle("");
    setDescription("");
    setType("daily");
    onClose();
  };

  const timelineOptions = [
    {
      value: "daily" as const,
      label: "Daily",
      emoji: "☀️",
      description: "Every day",
    },
    {
      value: "weekly" as const,
      label: "Weekly",
      emoji: "📅",
      description: "Once a week",
    },
    {
      value: "longterm" as const,
      label: "Long-term",
      emoji: "🎯",
      description: "Big goals",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-paper-bg rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-paper-lg border-2 border-gray-300/50">
        <h2 className="text-2xl font-bold text-text-main mb-6">Add New Goal</h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-light mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-text-main placeholder-gray-400 focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all duration-200 cursor-text hover:border-gray-300"
              placeholder="A fun new goal..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-text-main placeholder-gray-400 focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all duration-200 cursor-text hover:border-gray-300 resize-none min-h-[80px]"
              rows={3}
              placeholder="Tell me more..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light mb-3">
              Timeline
            </label>
            <div className="grid grid-cols-1 gap-2">
              {timelineOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setType(option.value)}
                  className={`
                    relative flex items-center p-4 rounded-2xl border-2 transition-all duration-200 hover: cursor-pointer
                    ${
                      type === option.value
                        ? "border-brand-accent bg-brand-accent/10 shadow-md"
                        : "border-gray-200 bg-white hover:border-brand-accent/50 hover:bg-brand-accent/5"
                    }
                  `}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-2xl">{option.emoji}</span>
                    <div className="text-left">
                      <div
                        className={`font-medium ${
                          type === option.value
                            ? "text-brand-accent"
                            : "text-text-main"
                        }`}
                      >
                        {option.label}
                      </div>
                      <div className="text-sm text-text-light">
                        {option.description}
                      </div>
                    </div>
                  </div>
                  {type === option.value && (
                    <div className="w-5 h-5 rounded-full bg-brand-accent flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="flex space-x-3 pt-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-crafted flex-1 bg-brand-accent hover:bg-brand-accent/80 hover:shadow-lg hover:scale-[1.02] text-white py-3.5 rounded-xl font-medium transition-all duration-200 hover: cursor-pointer"
            >
              Add Goal
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-crafted flex-1 bg-gray-200 hover:bg-gray-300 text-text-light py-3.5 rounded-xl font-medium transition-all duration-200 hover: cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGoalForm;
