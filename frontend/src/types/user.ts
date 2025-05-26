import type { Pet } from "./pet";

export interface User {
  id: string;
  name: string;
  level: number;
  xp: number;
  gold: number;
  avatar: string;
  pet: Pet;
}
