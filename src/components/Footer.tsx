
import { useTheme } from "../context/ThemeContext";
import { Github, Twitter, Sun, Moon } from "lucide-react";

const Footer = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="w-full mt-12 px-6 py-8 backdrop-blur-md bg-white/20 dark:bg-black/20 border-t border-white/20 dark:border-white/10 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-gray-800 dark:text-gray-300">
        <div className="flex items-center gap-3">
          <span>© {new Date().getFullYear()} TravelPrep</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">Smart Packing for Smart Travelers</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/yourusername/travelprep"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href="https://twitter.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition-transform"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-yellow-300" />
            ) : (
              <Moon className="w-4 h-4 text-gray-800" />
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
