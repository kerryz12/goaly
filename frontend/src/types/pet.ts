export interface Pet {
  id: string;
  name: string;
  type: "cat" | "dog" | "capybara" | "monkey";
  color: string;
  happiness: number;
  level: number;
}
