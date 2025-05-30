import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar, Footer } from "./components";
import { DashboardPage, SettingsPage, AchievementsPage } from "./pages";
import type { User, Pet } from "./types";
import { mockUser as initialMockUser } from "./data";

function App() {
  const [user, setUser] = useState<User>(initialMockUser);

  const handlePetChange = (newPetType: Pet["type"]) => {
    setUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        pet: {
          ...prevUser.pet,
          type: newPetType,
        },
      };
      console.log("User pet updated in App.tsx:", updatedUser.pet);
      return updatedUser;
    });
  };

  const updateUser = (updatedUserData: Partial<User>) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUserData }));
  };

  return (
    <Router>
      <div className="font-sans text-text-main min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-6">
            <Routes>
              <Route
                path="/"
                element={
                  <DashboardPage currentUser={user} onUpdateUser={setUser} />
                }
              />
              <Route
                path="/settings"
                element={
                  <SettingsPage
                    onPetChange={handlePetChange}
                    currentPetType={user.pet.type}
                  />
                }
              />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
