import type { User } from "../types";

// Simulating an API call delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// This function would ideally take a userId to update a specific user
export const apiUpdateUserProgress = async (
  userId: string, // Added userId for clarity, though mock doesn't use it yet
  xpToAdd: number,
  goldToAdd: number,
  currentUserState: User // Pass current user state for mock update
): Promise<User> => {
  await delay(500); // Simulate network latency
  console.log("API: Update user progress for user:", userId, {
    xp: xpToAdd,
    gold: goldToAdd,
  });

  // The backend would update the user record and return the full updated user object.
  const newXp = currentUserState.xp + xpToAdd;
  const newLevel = Math.floor(newXp / 100) + 1; // Recalculate level based on new total XP

  const updatedUser: User = {
    ...currentUserState,
    xp: newXp,
    gold: currentUserState.gold + goldToAdd,
    level: newLevel,
  };
  return updatedUser; // Return the "updated" user
};
