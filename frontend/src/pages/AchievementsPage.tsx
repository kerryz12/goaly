import React from "react";
import { AchievementList } from "../components";
import { mockAchievements } from "../data";
import type { Achievement } from "../types";

const AchievementsPage: React.FC = () => {
  const achievements: Achievement[] = mockAchievements; // Use the imported mock data

  return (
    <div className="min-h-screen bg-bg-page p-4 sm:p-6 lg:p-8 rounded-xl border-2 border-border-card">
      <div className="max-w-5xl mx-auto">
        <div
          className="bg-paper-bg p-6 sm:p-8 rounded-2xl shadow-paper-lg border border-border-card mb-8 
                     transition-all duration-300 transform hover:scale-[1.02] hover:shadow-paper-xl"
        >
          <h1 className="text-4xl font-bold text-text-heading mb-2 text-center font-display">
            Your Achievements
          </h1>
          <p className="text-center text-text-light">
            Track your progress and celebrate your victories!
          </p>
        </div>
        <AchievementList achievements={achievements} />
      </div>
    </div>
  );
};

export default AchievementsPage;
