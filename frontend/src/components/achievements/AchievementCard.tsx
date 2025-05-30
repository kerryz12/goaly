import React from "react";
import { Lock, Unlock, EyeOff, Trophy, HelpCircle } from "lucide-react";
import type { Achievement } from "../../types";

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  const { name, description, status, icon, criteria, points, unlockedAt } =
    achievement;

  const iconSize = "w-6 h-6";
  const cardBaseStyle =
    "p-6 rounded-2xl border transition-all duration-300 font-body shadow-paper-sm transform";
  let cardStyle = "";
  let statusIcon;
  let displayName = name;
  let displayDescription = description;
  let displayIcon = icon;
  let displayCriteria = criteria;

  switch (status) {
    case "unlocked":
      cardStyle = `${cardBaseStyle} bg-paper-bg-completed border-border-card-completed hover:shadow-paper-md hover:scale-105`;
      statusIcon = <Unlock className={`${iconSize} text-green-500`} />;
      break;
    case "locked":
      cardStyle = `${cardBaseStyle} bg-paper-bg opacity-70 hover:opacity-100 border-border-card hover:shadow-paper-md hover:scale-105`;
      statusIcon = <Lock className={`${iconSize} text-gray-500`} />;
      break;
    case "hidden":
      cardStyle = `${cardBaseStyle} bg-gray-100 border-gray-300 opacity-60 cursor-default`;
      statusIcon = <EyeOff className={`${iconSize} text-gray-400`} />;
      displayName = "Hidden Achievement";
      displayDescription = "Unlock other achievements to reveal this one.";
      displayIcon = "❓";
      displayCriteria = "Keep playing to discover!";
      break;
    default:
      cardStyle = `${cardBaseStyle} bg-paper-bg border-border-card hover:shadow-paper-md hover:scale-105`;
      statusIcon = <HelpCircle className={`${iconSize} text-gray-400`} />;
  }

  return (
    <div className={cardStyle}>
      <div className="flex items-start justify-between mb-3">
        <div className="text-4xl">{displayIcon}</div>
        <div className="flex items-center space-x-2 text-text-light">
          {statusIcon}
          <span className="text-sm font-medium capitalize">{status}</span>
        </div>
      </div>

      <h3 className="font-display font-bold text-xl text-text-heading mb-1">
        {displayName}
      </h3>
      <p className="text-text-light text-sm mb-3 min-h-[2lh]">
        {displayDescription}
      </p>

      {status !== "hidden" && (
        <p className="text-xs text-gray-500 italic mb-3">
          How to unlock: {displayCriteria}
        </p>
      )}

      <div className="flex items-center justify-between text-sm">
        {points && status !== "hidden" ? (
          <span className="flex items-center space-x-1.5 text-xp font-medium">
            <Trophy className="w-4 h-4" />
            <span>{points} Points</span>
          </span>
        ) : (
          <div /> // Placeholder for spacing
        )}
        {status === "unlocked" && unlockedAt && (
          <p className="text-xs text-green-600">
            Unlocked: {new Date(unlockedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default AchievementCard;
