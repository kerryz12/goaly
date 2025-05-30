export type AchievementStatus = "unlocked" | "locked" | "hidden";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  status: AchievementStatus;
  icon: string; // Emoji or a key for an icon component
  criteria: string; // Description of how to unlock
  points?: number; // Optional points/reward
  unlockedAt?: Date; // Date when unlocked
  category?: string; // Optional category for grouping
}