import type { Goal } from "../types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiAddGoal = async (
  goalData: Omit<Goal, "id" | "completed" | "createdAt" | "streak">
): Promise<Goal> => {
  await delay(500);
  console.log("API: Add goal", goalData);
  // Backend generates id, createdAt, completed, streak
  const newGoal: Goal = {
    ...goalData,
    id: Date.now().toString(), // Server should generate ID
    completed: false,
    createdAt: new Date(),
    streak: 0,
  };
  return newGoal;
};

// Returns only the fields that changed, or the full updated goal
export const apiCompleteGoal = async (
  goalId: string,
  currentStreak: number
): Promise<{ completed: boolean; streak: number; completedAt?: Date }> => {
  await delay(300);
  console.log("API: Complete goal", goalId);
  // Backend updates goal and returns new status/streak
  return {
    completed: true,
    streak: currentStreak + 1,
    completedAt: new Date(),
  };
};

export const apiDeleteGoal = async (
  goalId: string
): Promise<{ success: boolean }> => {
  await delay(300);
  console.log("API: Delete goal", goalId);
  // Backend deletes goal
  return { success: true }; // Or just resolve void if no specific return needed
};

export const apiFetchGoals = async (userId: string): Promise<Goal[]> => {
  await delay(700);
  console.log("API: Fetching goals for user", userId);
  return []; // Placeholder if initial data is already in DashboardPage state
};
