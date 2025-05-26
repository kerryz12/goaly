export interface Pet {
  id: string;
  name: string;
  type: "cat" | "dog" | "rabbit" | "fox";
  color: string;
  happiness: number;
  level: number;
}
