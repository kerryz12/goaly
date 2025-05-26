import { Target, Heart, Trophy } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-paper-bg)] border-t border-[var(--color-border-soft)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div
                className="bg-[var(--color-brand-accent)] p-2 rounded-lg"
                style={{ boxShadow: "var(--shadow-paper-lifted)" }}
              >
                <Target className="h-6 w-6 text-[var(--color-text-on-accent)]" />
              </div>
              <h2 className="text-xl font-bold text-[var(--color-text-heading)] font-display">
                Goaly
              </h2>
            </div>
            <p className="text-[var(--color-text-light)] mb-4 max-w-md">
              Your cozy companion for achieving goals and nurturing your virtual
              pet. Turn your dreams into daily adventures! 🌟
            </p>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-[var(--color-brand-accent)]" />
              <span className="text-sm text-[var(--color-text-light)]">
                Made with love for goal achievers
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--color-text-heading)] mb-4 font-display">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <FooterLink text="Dashboard" />
              <FooterLink text="My Goals" />
              <FooterLink text="Achievements" />
              <FooterLink text="Pet Care" />
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[var(--color-text-heading)] mb-4 font-display">
              Support
            </h3>
            <ul className="space-y-2">
              <FooterLink text="Help Center" />
              <FooterLink text="Contact Us" />
              <FooterLink text="Privacy Policy" />
              <FooterLink text="Terms of Service" />
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-border-soft)] mt-8 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-[var(--color-text-light)] mb-4 sm:mb-0">
              © 2025 Goaly. All rights reserved.
            </p>

            {/* Fun Stats */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4 text-[var(--color-gold)]" />
                <span className="text-[var(--color-text-light)]">
                  10k+ Goals Achieved
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4 text-[var(--color-brand-accent)]" />
                <span className="text-[var(--color-text-light)]">
                  5k+ Happy Pets
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ text: string }> = ({ text }) => (
  <li>
    <a
      href="#"
      className="text-[var(--color-text-light)] hover:text-[var(--color-brand-accent)] transition-colors"
    >
      {text}
    </a>
  </li>
);

export default Footer;
