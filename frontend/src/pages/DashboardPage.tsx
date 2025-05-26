// src/pages/DashboardPage.tsx
import React, { useState, useEffect } from "react";

// Using relative paths:
import type { User, Goal, ShopItem } from "../types";
import { mockUser, mockGoals, mockShopItems } from "../data";
import {
  Header,
  PetCard,
  TabNavigation,
  GoalList,
  AddGoalForm,
  ShopView,
} from "../components";

import { goalService, userService, shopService } from "../services";

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User>(mockUser);
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [shopItems] = useState<ShopItem[]>(mockShopItems);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [activeTab, setActiveTab] = useState<"goals" | "shop">("goals");

  // useEffect for any initial data fetching if not using mocks later

  const handleUserProgressUpdate = async (xp: number, gold: number) => {
    // Real implementation:
    // try {
    //   const updatedUser = await userService.apiUpdateUserProgress(user.id, xp, gold);
    //   setUser(updatedUser);
    // } catch (error) {
    //   console.error("Failed to update user progress:", error);
    //   // Handle error appropriately (e.g., show a notification)
    // }

    // For mock:
    console.log("Calling mock updateUserProgress with:", { xp, gold });
    setUser((prev) => {
      const newXp = prev.xp + xp;
      // Assuming 100 XP per level, starting at level 1 for 0-99 XP
      // Level = floor(totalXp / 100) + 1.
      // Example: 0-99 xp = level 1. 100-199 xp = level 2.
      // If level calculation is based on thresholds, it might be more complex.
      // This one means level 1 = 0-99, level 2 = 100-199, etc.
      // If current level is 5, xp is 450. Add 25 xp -> 475. Still level 5.
      // If current level 5, xp 450. Add 60 xp -> 510. New level = floor(510/100) + 1 = 5+1 = 6.
      // The original logic `Math.floor((prev.xp + xp) / 100) + 1` might be off if prev.xp isn't total from 0.
      // Let's assume `level` should be derived from the new total XP.
      const newLevel = Math.floor(newXp / 100) + 1; // Simple level calc
      return {
        ...prev,
        xp: newXp,
        gold: prev.gold + gold,
        level: newLevel,
      };
    });
  };

  const handleCompleteGoal = async (goalId: string) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal || goal.completed) return;

    // Real implementation:
    // try {
    //   const updatedGoalData = await goalService.apiCompleteGoal(goalId, goal.streak);
    //   setGoals(prev => prev.map(g =>
    //     g.id === goalId
    //       ? { ...g, ...updatedGoalData }
    //       : g
    //   ));
    //   await handleUserProgressUpdate(goal.xpReward, goal.goldReward);
    // } catch (error) {
    //   console.error("Failed to complete goal:", error);
    // }

    // For mock:
    console.log("Calling mock completeGoal for ID:", goalId);
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId ? { ...g, completed: true, streak: g.streak + 1 } : g
      )
    );
    await handleUserProgressUpdate(goal.xpReward, goal.goldReward);
  };

  const handleAddGoal = async (
    goalData: Omit<Goal, "id" | "completed" | "createdAt" | "streak">
  ) => {
    // Real implementation:
    // try {
    //   const newGoal = await goalService.apiAddGoal(goalData);
    //   setGoals(prev => [...prev, newGoal]);
    //   setShowAddGoal(false);
    // } catch (error) {
    //   console.error("Failed to add goal:", error);
    // }

    // For mock:
    console.log("Calling mock addGoal with data:", goalData);
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date(),
      streak: 0,
    };
    setGoals((prev) => [...prev, newGoal]);
    setShowAddGoal(false);
  };

  const handleDeleteGoal = async (goalId: string) => {
    // Real implementation:
    // try {
    //   await goalService.apiDeleteGoal(goalId);
    //   setGoals(prev => prev.filter(g => g.id !== goalId));
    // } catch (error) {
    //   console.error("Failed to delete goal:", error);
    // }

    // For mock:
    console.log("Calling mock deleteGoal for ID:", goalId);
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
  };

  const handlePurchaseItem = async (itemId: string) => {
    const item = shopItems.find((i) => i.id === itemId);
    if (!item || user.gold < item.price) return;

    // Real implementation:
    // try {
    //   const updatedUser = await shopService.apiPurchaseItem(user.id, itemId);
    //   setUser(updatedUser); // Assuming backend returns updated user with less gold and item
    // } catch (error) {
    //   console.error("Failed to purchase item:", error);
    // }

    // For mock:
    console.log("Calling mock purchaseItem for ID:", itemId);
    setUser((prev) => ({
      ...prev,
      gold: prev.gold - item.price,
    }));
    alert(`${item.name} purchased!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Header user={user} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-1">
            <PetCard pet={user.pet} />
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <TabNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onShowAddGoal={() => setShowAddGoal(true)}
              />

              {activeTab === "goals" ? (
                <GoalList
                  goals={goals}
                  onCompleteGoal={handleCompleteGoal}
                  onDeleteGoal={handleDeleteGoal}
                />
              ) : (
                <ShopView
                  items={shopItems}
                  userGold={user.gold}
                  onPurchase={handlePurchaseItem}
                />
              )}
            </div>
          </div>
        </div>

        {showAddGoal && (
          <AddGoalForm
            onAdd={handleAddGoal}
            onClose={() => setShowAddGoal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
