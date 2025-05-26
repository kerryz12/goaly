export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "pet" | "decoration" | "boost";
  icon: string;
}
