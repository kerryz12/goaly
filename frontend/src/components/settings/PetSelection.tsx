import React from "react";
import type { Pet } from "../../types";

const petOptions: Array<{ type: Pet["type"]; name: string; sprite: string }> = [
  { type: "cat", name: "Cat", sprite: "../../assets/pets/cat.png" },
  { type: "monkey", name: "Monkey", sprite: "../../assets/pets/monkey.png" },
  {
    type: "capybara",
    name: "Capybara",
    sprite: "../../assets/pets/capybara.png",
  },
  { type: "dog", name: "Dog", sprite: "../../assets/pets/dog.png" },
];

interface PetSelectionProps {
  currentPetType: Pet["type"];
  onSelectPet: (petType: Pet["type"]) => void;
}

export const PetSelection: React.FC<PetSelectionProps> = ({
  currentPetType,
  onSelectPet,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-text-main mb-4">
        Choose Your Pet
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {petOptions.map((pet) => (
          <button
            key={pet.type}
            onClick={() => onSelectPet(pet.type)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 focus:outline-none
                        ${
                          currentPetType === pet.type
                            ? "border-brand-accent bg-brand-accent/10 shadow-paper-md ring-2 ring-brand-accent"
                            : "border-border-soft bg-white hover:border-brand-accent/70 hover:shadow-paper-sm"
                        }`}
          >
            <div className="w-24 h-24 mx-auto mb-2 flex items-center justify-center">
              <img
                src={pet.sprite}
                alt={pet.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <p
              className={`text-center font-medium ${
                currentPetType === pet.type
                  ? "text-brand-accent"
                  : "text-text-main"
              }`}
            >
              {pet.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PetSelection;
