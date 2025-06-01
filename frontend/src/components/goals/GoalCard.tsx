import React from "react";
import { Calendar, Clock, Target, Trophy, Star } from "lucide-react";
import type { Goal } from "../../types";

interface GoalCardProps {
  goal: Goal;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onComplete, onDelete }) => {
  const iconSize = "w-5 h-5";

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "daily":
        return {
          icon: <Calendar className={iconSize} />,
          classes:
            "bg-tag-daily-bg text-tag-daily-text border-tag-daily-border",
        };
      case "weekly":
        return {
          icon: <Clock className={iconSize} />,
          classes:
            "bg-tag-weekly-bg text-tag-weekly-text border-tag-weekly-border",
        };
      case "longterm":
        return {
          icon: <Target className={iconSize} />,
          classes:
            "bg-tag-longterm-bg text-tag-longterm-text border-tag-longterm-border",
        };
      default:
        return {
          icon: <Calendar className={iconSize} />,
          classes:
            "bg-tag-default-bg text-tag-default-text border-tag-default-border",
        };
    }
  };

  const typeStyle = getTypeStyles(goal.type);

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-300 font-body
                  shadow-paper-sm hover:shadow-paper-md ${
                    goal.completed
                      ? "bg-paper-bg-completed border-border-card-completed opacity-80"
                      : "bg-white hover:bg-paper-bg/80 border-border-card"
                  }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div
            className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center space-x-1.5 ${typeStyle.classes}`}
          >
            {typeStyle.icon}
            <span className="capitalize">{goal.type}</span>
          </div>
          {goal.streak > 0 && (
            <div className="bg-streak-bg text-streak-text px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1">
              <span>🔥</span>
              <span>{goal.streak}</span>
            </div>
          )}
        </div>
      </div>
      <h3 className="font-display font-bold text-xl text-text-heading mb-2">
        {goal.title}
      </h3>
      <p className="text-text-light text-sm mb-5 min-h-[2lh]">
        {goal.description}
      </p>{" "}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center space-x-1.5 text-xp font-medium">
            <Trophy className={iconSize} />
            <span>{goal.xpReward} XP</span>
          </span>
          <span className="flex items-center space-x-1.5 text-gold font-medium">
            <Star className={iconSize} />
            <span>{goal.goldReward} Gold</span>
          </span>
        </div>

        <div className="flex space-x-2">
          {!goal.completed && (
            <button
              onClick={() => onComplete(goal.id)}
              className="bg-button-complete-bg hover:bg-button-complete-hover-bg text-button-complete-text 
                         px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 
                         shadow-paper-lifted hover:shadow-paper-xs focus:outline-none focus:ring-2 focus:ring-button-complete-bg/50 hover:cursor-pointer"
            >
              Complete
            </button>
          )}
          <button
            onClick={() => onDelete(goal.id)}
            title="Delete Goal"
            className="bg-button-delete-icon-hover-bg text-button-delete-icon-text 
                       hover:bg-button-delete-bg hover:text-button-delete-text
                       w-10 h-10 flex items-center justify-center
                       rounded-full text-lg font-semibold transition-all duration-200 
                       shadow-paper-lifted hover:shadow-paper-xs focus:outline-none focus:ring-2 focus:ring-button-delete-bg/50 hover:cursor-pointer"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
