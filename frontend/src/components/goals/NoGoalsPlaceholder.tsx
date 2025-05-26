import React from "react";

const NoGoalsPlaceholder: React.FC = () => (
  <div className="text-center py-12">
    <div className="text-6xl mb-4">🌱</div>
    <h3 className="text-xl font-semibold text-gray-600 mb-2">No goals yet!</h3>
    <p className="text-gray-500">
      Start your journey by adding your first goal.
    </p>
  </div>
);

export default NoGoalsPlaceholder;
