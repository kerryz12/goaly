import React from "react";
import type { Goal } from "../../types";
import GoalCard from "./GoalCard";
import NoGoalsPlaceholder from "./NoGoalsPlaceholder";

interface GoalListProps {
  goals: Goal[];
  onCompleteGoal: (id: string) => void;
  onDeleteGoal: (id: string) => void;
}

const GoalList: React.FC<GoalListProps> = ({
  goals,
  onCompleteGoal,
  onDeleteGoal,
}) => {
  const filterGoalsByType = (type: Goal["type"]) =>
    goals.filter((g) => g.type === type);

  if (goals.length === 0) {
    return <NoGoalsPlaceholder />;
  }

  return (
    <div className="space-y-8 font-body">
      {" "}
      {(["daily", "weekly", "longterm"] as const).map((type) => {
        const typeGoals = filterGoalsByType(type);
        if (typeGoals.length === 0) return null;

        return (
          <div key={type}>
            <h2 className="font-display text-2xl font-bold text-text-heading mb-4 capitalize border-b-2 border-border-medium pb-2">
              {type === "longterm" ? "Long-Term" : type} Goals
            </h2>
            <div className="space-y-4">
              {" "}
              {typeGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onComplete={onCompleteGoal}
                  onDelete={onDeleteGoal}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default GoalList;
