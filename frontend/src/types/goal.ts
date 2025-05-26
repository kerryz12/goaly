export interface Goal {
  id: string;
  title: string;
  description: string;
  type: "daily" | "weekly" | "longterm";
  xpReward: number;
  goldReward: number;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  streak: number;
}
