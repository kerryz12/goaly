import React from "react";
import { Gift, Star } from "lucide-react";
import type { ShopItem } from "../../types";

interface ShopProps {
  items: ShopItem[];
  userGold: number;
  onPurchase: (itemId: string) => void;
}

const ShopView: React.FC<{
  items: ShopItem[];
  userGold: number;
  onPurchase: (itemId: string) => void;
}> = ({ items, userGold, onPurchase }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
      <Gift className="w-6 h-6 text-pink-500" />
      <span>Cozy Shop</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.id} className="border border-gray-200 p-4 rounded-xl">
          <div className="text-center mb-3">
            <div className="text-3xl mb-2">{item.icon}</div>
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-yellow-600">
              <Star className="w-4 h-4" />
              <span className="font-semibold">{item.price}</span>
            </div>
            <button
              onClick={() => onPurchase(item.id)}
              disabled={userGold < item.price}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                userGold >= item.price
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Buy
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ShopView;
