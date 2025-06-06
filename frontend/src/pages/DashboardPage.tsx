import React, { useState } from "react";

import type { User, Goal, ShopItem } from "../types";
import { mockGoals, mockShopItems } from "../data";
import {
  Header,
  PetCard,
  TabNavigation,
  GoalList,
  AddGoalForm,
  ShopView,
} from "../components";

interface DashboardPageProps {
  currentUser: User;
  onUpdateUser: React.Dispatch<React.SetStateAction<User>>;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  currentUser,
  onUpdateUser,
}) => {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [shopItems] = useState<ShopItem[]>(mockShopItems);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [activeTab, setActiveTab] = useState<"goals" | "shop">("goals");

  const handleUserProgressUpdate = async (xp: number, gold: number) => {
    onUpdateUser((prevUser: User) => {
      const newXp = prevUser.xp + xp;
      const newLevel = Math.floor(newXp / 100) + 1;
      return {
        ...prevUser,
        xp: newXp,
        gold: prevUser.gold + gold,
        level: newLevel,
      };
    });
  };

  const handleCompleteGoal = async (goalId: string) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal || goal.completed) return;

    setGoals((prevGoals) =>
      prevGoals.map((g) =>
        g.id === goalId ? { ...g, completed: true, streak: g.streak + 1 } : g
      )
    );
    await handleUserProgressUpdate(goal.xpReward, goal.goldReward);
  };

  const handleAddGoal = async (
    goalData: Omit<Goal, "id" | "completed" | "createdAt" | "streak">
  ) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date(),
      streak: 0,
    };
    setGoals((prevGoals) => [...prevGoals, newGoal]);
    setShowAddGoal(false);
  };

  const handleDeleteGoal = async (goalId: string) => {
    setGoals((prevGoals) => prevGoals.filter((g) => g.id !== goalId));
  };

  const handlePurchaseItem = async (itemId: string) => {
    const item = shopItems.find((i) => i.id === itemId);
    if (!item || currentUser.gold < item.price) return;

    onUpdateUser((prevUser: User) => ({
      ...prevUser,
      gold: prevUser.gold - item.price,
    }));
    alert(`${item.name} purchased!`);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Header user={currentUser} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-1">
            <PetCard pet={currentUser.pet} />
          </div>

          <div className="lg:col-span-3">
            <div className="bg-paper-bg p-6 rounded-2xl shadow-paper-sm border border-border-soft">
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
                  userGold={currentUser.gold}
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
