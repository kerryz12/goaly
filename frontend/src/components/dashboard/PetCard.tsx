import React from "react";
import type { Pet as PetType } from "../../types";

import catImg from "../../assets/pets/cat.png";
import capybaraImg from "../../assets/pets/capybara.png";
import monkeyImg from "../../assets/pets/monkey.png";
import defaultImg from "../../assets/pets/default.png";

interface PetCardProps {
  pet: PetType;
}

const petSprites: Record<string, string> = {
  cat: catImg,
  capybara: capybaraImg,
  monkey: monkeyImg,
  default: defaultImg,
};

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const getPetSprite = (petType: PetType["type"]): string => {
    return petSprites[petType] || petSprites.default;
  };

  const getHappinessColor = () => {
    const happiness = pet.happiness;
    if (happiness >= 80) return "from-green-400 to-emerald-400";
    if (happiness >= 60) return "from-yellow-400 to-orange-400";
    if (happiness >= 40) return "from-orange-400 to-red-400";
    return "from-red-400 to-pink-400";
  };

  return (
    <div className="bg-paper-bg p-6 rounded-3xl shadow-paper-lg border-2 border-border-card hover:shadow-paper-xl transition-all duration-300">
      <div className="text-center">
        <div className="mx-auto mb-4 w-48 h-48 flex items-center justify-center overflow-hidden rounded-2xl bg-white shadow-paper-sm border border-border-soft">
          <img
            src={getPetSprite(pet.type)}
            alt={pet.name}
            className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        <h3 className="font-display font-bold text-text-heading text-2xl mb-1">
          {pet.name}
        </h3>
        <p className="text-sm text-text-light mb-4">Level {pet.level}</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-text-light">
            <span className="font-medium">Happiness</span>
            <span className="font-bold">{pet.happiness}%</span>
          </div>

          <div className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-paper-inset border border-gray-300/30">
            <div
              className={`h-full bg-gradient-to-r ${getHappinessColor()} transition-all duration-700 rounded-full relative`}
              style={{ width: `${pet.happiness}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </div>
          </div>

          <div className="text-xs text-text-light mt-2">
            {pet.happiness >= 80 && "🌟 Extremely Happy!"}
            {pet.happiness >= 60 && pet.happiness < 80 && "😊 Pretty Happy"}
            {pet.happiness >= 40 && pet.happiness < 60 && "😐 Okay"}
            {pet.happiness < 40 && "😢 Needs Attention"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
