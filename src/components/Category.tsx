import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Category as CategoryType } from "../types";
import ChecklistItem from "./ChecklistItem";
import ProgressBar from "./ProgressBar";
import { useChecklist } from "../context/ChecklistContext";
import { icons } from "../utils/icons";

interface CategoryProps {
  category: CategoryType;
}

const Category: React.FC<CategoryProps> = ({ category }) => {
  const { toggleItemCheck, toggleCategoryExpand, getProgress } = useChecklist();
  const progress = getProgress(category.id);
  const IconComponent = icons[category.icon] || icons.package;

  const getCategoryImage = (categoryId: string) => {
    const images = {
      essentials: "https://imgs.search.brave.com/uYw3k4QGAslQEDoFlRRw8wbgQa6TMXW0e4ci8MCtUbY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGFja2hhY2tlci5j/b20vMjAyMC8wNi8w/ZTRlYTJlYS1yb2Fk/LXRyaXAtcGFja2lu/Zy1saXN0LWhlcm8u/anBnP2F1dG89Y29t/cHJlc3MmYXV0bz1m/b3JtYXQmdz0xMTEw/Jmg9NzQwJmZpdD1j/cm9w",
      tech: "https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg",
      toiletries: "https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg",
      clothing: "https://images.pexels.com/photos/581087/pexels-photo-581087.jpeg",
      extras: "https://imgs.search.brave.com/I5nKEte61rilb2mve3GlPgEDmX9fmbQeg_Mjwps2Moc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jbnRyYXZlbGVy/LmNvbS9waG90b3Mv/NjY0NzhjMWE5Y2Zj/NDI1ZGMxNmY5YzU1/LzQ6My9wYXNzL2Jy/YW5kb24tY29ybWll/ci1uS0FYM2lJUmp3/TS11bnNwbGFzaC5q/cGc"
    };
    return images[categoryId as keyof typeof images] || images.extras;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 overflow-hidden rounded-xl bg-card border border-border/30 shadow-lg"
    >
      <div className="relative h-32 overflow-hidden">
        <img
          src={getCategoryImage(category.id)}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between text-white"
          onClick={() => toggleCategoryExpand(category.id)}
        >
          <div className="flex items-center space-x-3">
            <motion.div 
              className="p-2 rounded-lg bg-white/10 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <IconComponent className="h-5 w-5" aria-hidden="true" />
            </motion.div>
            <h3 className="text-xl font-semibold">{category.name}</h3>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
              {progress}%
            </span>
            <motion.div
              animate={{ rotate: category.isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white/10 p-1 rounded-full backdrop-blur-sm"
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {category.isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4"
          >
            <div className="mb-4">
              <ProgressBar 
                progress={progress} 
                size="sm" 
                showLabel={false} 
              />
            </div>
            <motion.div 
              className="space-y-1 divide-y divide-border/10"
              layout
            >
              {category.items.map((item) => (
                <ChecklistItem
                  key={item.id}
                  item={item}
                  onToggle={() => toggleItemCheck(category.id, item.id)}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Category;