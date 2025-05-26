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
  const [xpReward, setXpReward] = useState(25);
  const [goldReward, setGoldReward] = useState(10);

  const handleSubmit = () => {
    if (!title.trim()) return;

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
    setXpReward(25);
    setGoldReward(10);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-paper-bg rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-paper-lg border-2 border-gray-300/50">
        <h2 className="text-2xl font-bold text-text-main mb-6">
          Add New Cozy Goal
        </h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-light mb-1.5">
              Title
            </label>
            <input
              type="text"
              // ... value, onChange ...
              className="input-crafted w-full" // Apply crafted input style
              placeholder="A fun new goal..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light mb-1.5">
              Description
            </label>
            <textarea
              // ... value, onChange ...
              className="input-crafted w-full resize-none" // Apply crafted input style
              rows={3}
              placeholder="Tell me more..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-light mb-1.5">
              Type
            </label>
            <select
              // ... value, onChange ...
              className="select-crafted w-full" // Apply crafted select style
            >
              {/* ... options ... */}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-light mb-1.5">
                XP Reward
              </label>
              <input type="number" /* ... */ className="input-crafted w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-light mb-1.5">
                Gold Reward
              </label>
              <input type="number" /* ... */ className="input-crafted w-full" />
            </div>
          </div>
          <div className="flex space-x-3 pt-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-crafted flex-1 bg-brand-accent hover:bg-opacity-90 text-white py-3.5 rounded-xl font-medium"
            >
              Add Goal
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn-crafted flex-1 bg-gray-200 hover:bg-gray-300 text-text-light py-3.5 rounded-xl font-medium"
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
