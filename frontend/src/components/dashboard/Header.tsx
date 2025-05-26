// src/components/dashboard/Header.tsx
import React from "react";
import { Star } from "lucide-react";
import type { User } from "../../types";

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => (
  <div className="bg-gradient-to-br from-soft-pink via-muted-purple to-gentle-blue p-6 rounded-2xl mb-6 shadow-paper-md border-2 border-white/50">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-paper-bg rounded-full flex items-center justify-center text-3xl shadow-paper-sm border-2 border-gray-200">
          {user.avatar}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-text-main">
            Welcome back, {user.name}!
          </h1>
          <p className="text-text-light text-lg">
            Level {user.level} • {user.xp} XP
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-warm-yellow/80 px-5 py-3 rounded-xl flex items-center space-x-2 shadow-paper-sm border-2 border-yellow-600/30">
          <Star className="w-6 h-6 text-yellow-700" />
          <span className="font-semibold text-yellow-800 text-lg">
            {user.gold}
          </span>
        </div>
      </div>
    </div>
    <div className="mt-5 bg-white/70 rounded-full h-4 overflow-hidden shadow-paper-inset border border-gray-300/50">
      <div
        className="h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-500 rounded-full"
        style={{ width: `${user.xp % 100}%` }}
      />
    </div>
  </div>
);

export default Header;
