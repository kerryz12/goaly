import React from "react";
import { PetSelection } from "../components";
import type { Pet } from "../types";

interface SettingsPageProps {
  onPetChange: (newPetType: Pet["type"]) => void;
  currentPetType: Pet["type"];
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  onPetChange,
  currentPetType,
}) => {
  return (
    <div className="min-h-screen bg-bg-page p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-paper-bg p-6 sm:p-8 rounded-2xl shadow-paper-lg border border-border-card">
          <h1 className="text-3xl font-bold text-text-heading mb-8 text-center font-display">
            User Settings
          </h1>
          <PetSelection
            currentPetType={currentPetType}
            onSelectPet={onPetChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
