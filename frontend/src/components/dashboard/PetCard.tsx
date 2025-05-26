import React from "react";
import type { Pet } from "../../types";

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const getPetEmoji = (type: Pet["type"]) => {
    switch (type) {
      case "cat":
        return "🐱";
      case "dog":
        return "🐶";
      case "rabbit":
        return "🐰";
      case "fox":
        return "🦊";
      default:
        return "🐾";
    }
  };

  return (
    <div className="bg-paper-bg p-5 rounded-2xl shadow-paper-lifted border-2 border-gray-200/70">
      <div className="text-center">
        <div className="text-7xl mb-3 transform hover:scale-110 transition-transform duration-300 cursor-grab active:scale-105">
          {getPetEmoji(pet.type)}
        </div>
        <h3 className="font-bold text-text-main text-2xl">{pet.name}</h3>
        <p className="text-sm text-text-light">Level {pet.level}</p>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1 text-text-light">
            <span>Happiness</span>
            <span>{pet.happiness}%</span>
          </div>
          <div className="bg-gray-200/70 rounded-full h-2.5 overflow-hidden shadow-paper-inset border border-gray-300/30">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-red-400 transition-all duration-500 rounded-full"
              style={{ width: `${pet.happiness}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
