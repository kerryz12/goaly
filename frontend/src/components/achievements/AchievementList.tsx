import React from "react";
import type { Achievement } from "../../types";
import AchievementCard from "./AchievementCard";

interface AchievementListProps {
  achievements: Achievement[];
}

const AchievementList: React.FC<AchievementListProps> = ({ achievements }) => {
  if (!achievements || achievements.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No Achievements Yet!
        </h3>
        <p className="text-gray-500">Keep playing to unlock achievements.</p>
      </div>
    );
  }

  const categorizedAchievements: Record<string, Achievement[]> = {};
  achievements.forEach((ach) => {
    const category = ach.category || "General";
    if (!categorizedAchievements[category]) {
      categorizedAchievements[category] = [];
    }
    // Sort within category: Unlocked first, then Locked, then Hidden
    if (ach.status === "unlocked") {
      categorizedAchievements[category].unshift(ach);
    } else if (ach.status === "locked") {
      // Find first hidden or end of array
      const hiddenIndex = categorizedAchievements[category].findIndex(
        (a) => a.status === "hidden"
      );
      if (hiddenIndex !== -1) {
        categorizedAchievements[category].splice(hiddenIndex, 0, ach);
      } else {
        categorizedAchievements[category].push(ach);
      }
    } else {
      // Hidden
      categorizedAchievements[category].push(ach);
    }
  });

  return (
    <div className="space-y-8">
      {Object.entries(categorizedAchievements).map(([category, achs]) => (
        <div key={category}>
          <h2 className="font-display text-2xl font-bold text-text-heading mb-5 capitalize border-b-2 border-border-medium pb-2">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achs.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AchievementList;
