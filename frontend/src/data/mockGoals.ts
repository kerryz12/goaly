import type { Goal } from "../types";

export const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Morning Walk",
    description: "Take a 20-minute walk in the fresh air",
    type: "daily",
    xpReward: 25,
    goldReward: 10,
    completed: false,
    createdAt: new Date(),
    streak: 3,
  },
  {
    id: "2",
    title: "Read for 1 Hour",
    description: "Read a book or articles for personal growth",
    type: "daily",
    xpReward: 30,
    goldReward: 15,
    completed: true,
    createdAt: new Date(),
    streak: 7,
  },
  {
    id: "3",
    title: "Complete Project Milestone",
    description: "Finish the first phase of my coding project",
    type: "weekly",
    xpReward: 100,
    goldReward: 50,
    completed: false,
    createdAt: new Date(),
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    streak: 0,
  },
];
