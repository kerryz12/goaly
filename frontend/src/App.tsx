import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navbar, Footer } from "./components";
import { DashboardPage, SettingsPage } from "./pages";
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
      <div className="font-sans bg-bg-page text-text-main min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
