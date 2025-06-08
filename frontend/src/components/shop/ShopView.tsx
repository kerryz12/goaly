import React, { useState } from "react";
import { Gift, Star, Sparkles, Heart, Coffee, Zap, Crown } from "lucide-react";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: "accessories" | "treats" | "toys" | "special";
  rarity: "common" | "rare" | "legendary";
}

interface ShopProps {
  items?: ShopItem[];
  userGold: number;
  onPurchase: (itemId: string) => void;
}

const defaultShopItems: ShopItem[] = [
  {
    id: "1",
    name: "Tiny Crown",
    description: "A regal golden crown for your pet",
    price: 50,
    icon: "👑",
    category: "accessories",
    rarity: "rare",
  },
  {
    id: "2",
    name: "Cozy Scarf",
    description: "A warm knitted scarf in rainbow colors",
    price: 25,
    icon: "🧣",
    category: "accessories",
    rarity: "common",
  },
  {
    id: "3",
    name: "Bow Tie",
    description: "A dapper bow tie for special occasions",
    price: 30,
    icon: "🎀",
    category: "accessories",
    rarity: "common",
  },
  {
    id: "4",
    name: "Magical Hat",
    description: "A mystical hat that sparkles with magic",
    price: 75,
    icon: "🎩",
    category: "accessories",
    rarity: "legendary",
  },

  {
    id: "5",
    name: "Honey Cake",
    description: "A sweet treat that restores energy",
    price: 15,
    icon: "🍰",
    category: "treats",
    rarity: "common",
  },
  {
    id: "6",
    name: "Rainbow Cupcake",
    description: "A colorful cupcake that boosts happiness",
    price: 20,
    icon: "🧁",
    category: "treats",
    rarity: "common",
  },
  {
    id: "7",
    name: "Golden Apple",
    description: "A rare golden apple with magical properties",
    price: 100,
    icon: "🍎",
    category: "treats",
    rarity: "legendary",
  },
  {
    id: "8",
    name: "Warm Cocoa",
    description: "A cozy cup of cocoa for cold days",
    price: 12,
    icon: "☕",
    category: "treats",
    rarity: "common",
  },

  {
    id: "9",
    name: "Squeaky Ball",
    description: "A bouncy ball that makes happy sounds",
    price: 18,
    icon: "⚽",
    category: "toys",
    rarity: "common",
  },
  {
    id: "10",
    name: "Feather Wand",
    description: "A magical wand with dancing feathers",
    price: 35,
    icon: "🪶",
    category: "toys",
    rarity: "rare",
  },
  {
    id: "11",
    name: "Music Box",
    description: "Plays soothing melodies",
    price: 45,
    icon: "🎵",
    category: "toys",
    rarity: "rare",
  },
  {
    id: "12",
    name: "Crystal Ball",
    description: "A mystical orb that shows the future",
    price: 150,
    icon: "🔮",
    category: "toys",
    rarity: "legendary",
  },

  {
    id: "13",
    name: "XP Boost Potion",
    description: "Doubles XP gain for next 3 goals",
    price: 80,
    icon: "🧪",
    category: "special",
    rarity: "rare",
  },
  {
    id: "14",
    name: "Lucky Charm",
    description: "Increases gold drops by 25%",
    price: 60,
    icon: "🍀",
    category: "special",
    rarity: "rare",
  },
  {
    id: "15",
    name: "Friendship Heart",
    description: "Bonds you closer with your pet",
    price: 40,
    icon: "💝",
    category: "special",
    rarity: "common",
  },
];

const ShopView: React.FC<ShopProps> = ({
  items = defaultShopItems,
  userGold,
  onPurchase,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "accessories" | "treats" | "toys" | "special"
  >("all");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "All Items", icon: Gift },
    { id: "accessories", name: "Accessories", icon: Crown },
    { id: "treats", name: "Treats", icon: Coffee },
    { id: "toys", name: "Toys", icon: Sparkles },
    { id: "special", name: "Special", icon: Zap },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "from-gray-100 to-gray-200 border-gray-300";
      case "rare":
        return "from-blue-100 to-purple-100 border-blue-300";
      case "legendary":
        return "from-yellow-100 to-orange-100 border-yellow-400";
      default:
        return "from-gray-100 to-gray-200 border-gray-300";
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case "rare":
        return (
          <div className="absolute top-2 right-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
            Rare
          </div>
        );
      case "legendary":
        return (
          <div className="absolute top-2 right-2 text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3" />
            Epic
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="p-6 rounded-2xl relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-paper-bg)",
        boxShadow: "var(--shadow-paper-lg)",
        border: "2px solid var(--color-border-card)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-2xl font-bold flex items-center gap-3"
            style={{ color: "var(--color-text-heading)" }}
          >
            <div
              className="p-2 rounded-xl"
              style={{
                backgroundColor: "var(--color-brand-accent)",
                boxShadow: "var(--shadow-paper-sm)",
              }}
            >
              <Gift className="w-6 h-6 text-white" />
            </div>
            Cozy Pet Shop
          </h2>

          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{
              backgroundColor: "var(--color-tag-default-bg)",
              border: "2px solid var(--color-border-soft)",
              boxShadow: "var(--shadow-paper-sm)",
            }}
          >
            <Star className="w-5 h-5" style={{ color: "var(--color-gold)" }} />
            <span
              className="font-bold text-lg"
              style={{ color: "var(--color-gold)" }}
            >
              {userGold}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                  isActive ? "transform scale-105" : "hover:scale-105"
                }`}
                style={{
                  backgroundColor: isActive
                    ? "var(--color-brand-accent)"
                    : "var(--color-tag-default-bg)",
                  color: isActive
                    ? "var(--color-text-on-accent)"
                    : "var(--color-text-main)",
                  border: `2px solid ${
                    isActive
                      ? "var(--color-brand-accent)"
                      : "var(--color-border-soft)"
                  }`,
                  boxShadow: isActive
                    ? "var(--shadow-paper-md)"
                    : "var(--shadow-paper-sm)",
                }}
              >
                <IconComponent className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => {
          const canAfford = userGold >= item.price;
          const isHovered = hoveredItem === item.id;

          return (
            <div
              key={item.id}
              className={`relative p-4 rounded-xl transition-all duration-200 cursor-pointer border-2 border-border-card ${
                isHovered ? "transform scale-102" : ""
              }`}
              style={{
                background: `linear-gradient(135deg, ${getRarityColors(
                  item.rarity
                )
                  .split(" ")[0]
                  .replace("from-", "")} 0%, ${getRarityColors(item.rarity)
                  .split(" ")[1]
                  .replace("to-", "")} 100%)`,
                border: `2px solid ${getRarityColors(item.rarity)
                  .split(" ")[2]
                  .replace("border-", "")}`,
                boxShadow: isHovered
                  ? "var(--shadow-paper-lg)"
                  : "var(--shadow-paper-md)",
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {getRarityBadge(item.rarity)}

              <div className="text-center mb-4">
                <div
                  className={`text-4xl mb-3 transition-transform duration-200 ${
                    isHovered ? "transform scale-110" : ""
                  }`}
                >
                  {item.icon}
                </div>
                <h3
                  className="font-bold text-sm mb-1"
                  style={{ color: "var(--color-text-heading)" }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--color-text-light)" }}
                >
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-lg"
                  style={{
                    backgroundColor: "rgba(255, 179, 0, 0.1)",
                    border: "1px solid var(--color-gold)",
                  }}
                >
                  <Star
                    className="w-4 h-4"
                    style={{ color: "var(--color-gold)" }}
                  />
                  <span
                    className="font-bold text-sm"
                    style={{ color: "var(--color-gold)" }}
                  >
                    {item.price}
                  </span>
                </div>

                <button
                  onClick={() => onPurchase(item.id)}
                  disabled={!canAfford}
                  className={`px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    canAfford
                      ? "hover:scale-105 active:scale-95"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  style={{
                    backgroundColor: canAfford
                      ? "var(--color-button-complete-bg)"
                      : "var(--color-tag-default-bg)",
                    color: canAfford
                      ? "var(--color-text-on-accent)"
                      : "var(--color-text-light)",
                    boxShadow: canAfford ? "var(--shadow-paper-sm)" : "none",
                    border: `1px solid ${
                      canAfford
                        ? "var(--color-button-complete-bg)"
                        : "var(--color-border-soft)"
                    }`,
                  }}
                >
                  {canAfford ? (
                    <>
                      <Heart className="w-4 h-4" />
                      Buy
                    </>
                  ) : (
                    "Not enough gold"
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛍️</div>
          <p
            className="text-lg font-medium"
            style={{ color: "var(--color-text-light)" }}
          >
            No items found in this category
          </p>
        </div>
      )}
    </div>
  );
};

export default ShopView;
