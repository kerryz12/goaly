import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Target,
  Trophy,
  Settings,
  User,
  Star,
  Coins,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className="bg-[var(--color-paper-bg)] border-b border-[var(--color-border-soft)] sticky top-0 z-50"
      style={{ boxShadow: "var(--shadow-paper-sm)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div
              className="bg-[var(--color-brand-accent)] p-2 rounded-lg"
              style={{ boxShadow: "var(--shadow-paper-lifted)" }}
            >
              <Target className="h-6 w-6 text-[var(--color-text-on-accent)]" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--color-text-heading)] font-display">
              Goaly
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink icon={Home} text="Dashboard" />
            <NavLink icon={Target} text="Goals" />
            <NavLink icon={Trophy} text="Achievements" />
            <NavLink icon={User} text="Pet" />

            <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-[var(--color-border-medium)]">
              <div
                className="flex items-center space-x-1 bg-[var(--color-tag-daily-bg)] px-3 py-1 rounded-full border border-[var(--color-tag-daily-border)]"
                style={{ boxShadow: "var(--shadow-paper-lifted)" }}
              >
                <Star className="h-4 w-4 text-[var(--color-xp)]" />
                <span className="text-sm font-medium text-[var(--color-xp)]">
                  1,250 XP
                </span>
              </div>
              <div
                className="flex items-center space-x-1 bg-[var(--color-tag-longterm-bg)] px-3 py-1 rounded-full border border-[var(--color-tag-longterm-border)]"
                style={{ boxShadow: "var(--shadow-paper-lifted)" }}
              >
                <Coins className="h-4 w-4 text-[var(--color-gold)]" />
                <span className="text-sm font-medium text-[var(--color-gold)]">
                  342
                </span>
              </div>
            </div>

            <button className="p-2 text-[var(--color-text-light)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-page)] rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-[var(--color-text-main)] hover:bg-[var(--color-bg-page)] rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-[var(--color-border-soft)] py-4">
            <div className="flex flex-col space-y-3">
              <MobileNavLink icon={Home} text="Dashboard" />
              <MobileNavLink icon={Target} text="Goals" />
              <MobileNavLink icon={Trophy} text="Achievements" />
              <MobileNavLink icon={User} text="Pet" />

              <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-soft)]">
                <div
                  className="flex items-center space-x-1 bg-[var(--color-tag-daily-bg)] px-3 py-2 rounded-full border border-[var(--color-tag-daily-border)]"
                  style={{ boxShadow: "var(--shadow-paper-lifted)" }}
                >
                  <Star className="h-4 w-4 text-[var(--color-xp)]" />
                  <span className="text-sm font-medium text-[var(--color-xp)]">
                    1,250 XP
                  </span>
                </div>
                <div
                  className="flex items-center space-x-1 bg-[var(--color-tag-longterm-bg)] px-3 py-2 rounded-full border border-[var(--color-tag-longterm-border)]"
                  style={{ boxShadow: "var(--shadow-paper-lifted)" }}
                >
                  <Coins className="h-4 w-4 text-[var(--color-gold)]" />
                  <span className="text-sm font-medium text-[var(--color-gold)]">
                    342
                  </span>
                </div>
              </div>

              <button className="flex items-center space-x-3 p-3 text-[var(--color-text-light)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-page)] rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// NavLink Component for Desktop
const NavLink: React.FC<{ icon: React.ElementType; text: string }> = ({
  icon: Icon,
  text,
}) => (
  <a
    href="#"
    className="flex items-center space-x-2 px-3 py-2 text-[var(--color-text-main)] hover:text-[var(--color-brand-accent)] hover:bg-[var(--color-bg-page)] rounded-lg transition-colors font-medium"
  >
    <Icon className="h-5 w-5" />
    <span>{text}</span>
  </a>
);

// NavLink Component for Mobile
const MobileNavLink: React.FC<{ icon: React.ElementType; text: string }> = ({
  icon: Icon,
  text,
}) => (
  <a
    href="#"
    className="flex items-center space-x-3 p-3 text-[var(--color-text-main)] hover:text-[var(--color-brand-accent)] hover:bg-[var(--color-bg-page)] rounded-lg transition-colors font-medium"
  >
    <Icon className="h-5 w-5" />
    <span>{text}</span>
  </a>
);

export default Navbar;
