// src/services/shopService.ts
import type { ShopItem, User } from "../types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiFetchShopItems = async (): Promise<ShopItem[]> => {
  await delay(600);
  console.log("API: Fetch shop items");
  return []; // Placeholder if initial data is already in DashboardPage state
};

export const apiPurchaseItem = async (
  userId: string,
  itemId: string,
  itemPrice: number,
  currentUserState: User // Pass current user state for mock update
): Promise<User> => {
  await delay(500);
  console.log("API: Purchase item for user:", userId, "item:", itemId);

  if (currentUserState.gold < itemPrice) {
    throw new Error("Not enough gold"); // Simulate backend validation
  }

  // Backend handles deducting gold and adding item to user's inventory (if applicable)
  const updatedUser: User = {
    ...currentUserState,
    gold: currentUserState.gold - itemPrice,
    // Potentially update an inventory array on the user object
  };
  return updatedUser;
};
