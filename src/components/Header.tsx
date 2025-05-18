import React, { useEffect, useState } from "react";
import { Luggage } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useChecklist } from "../context/ChecklistContext";

const Header: React.FC = () => {
  const { getProgress } = useChecklist();
  const [scrolled, setScrolled] = useState(false);
  const totalProgress = getProgress();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 px-4 md:px-6 py-3 transition-all duration-200 ${
        scrolled 
          ? "glassmorphism shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Luggage 
            className="h-6 w-6 text-primary" 
            aria-hidden="true" 
          />
          <h1 className="text-xl font-semibold tracking-tight">
            TravelPrep
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-sm font-medium">
              {totalProgress}% Packed
            </span>
            <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary progress-bar-animation"
                style={{ width: `${totalProgress}%` }}
                aria-valuenow={totalProgress}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;