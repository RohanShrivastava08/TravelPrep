import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Item } from "../types";

interface ChecklistItemProps {
  item: Item;
  onToggle: () => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, onToggle }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center py-2 px-1 border-b border-border/40 last:border-0 group"
      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
    >
      <motion.button
        onClick={onToggle}
        className={`flex items-center justify-center h-5 w-5 rounded mr-3 border transition-all ${
          item.isChecked
            ? "bg-primary border-primary"
            : "border-muted-foreground/30 hover:border-primary"
        }`}
        whileTap={{ scale: 0.8 }}
        aria-checked={item.isChecked}
        role="checkbox"
      >
        <motion.div
          initial={false}
          animate={item.isChecked ? { scale: 1 } : { scale: 0 }}
        >
          {item.isChecked && <Check className="h-3.5 w-3.5 text-white" />}
        </motion.div>
      </motion.button>
      <motion.span
        animate={{
          color: item.isChecked ? "var(--muted-foreground)" : "var(--foreground)",
          textDecoration: item.isChecked ? "line-through" : "none",
        }}
      >
        {item.name}
      </motion.span>
    </motion.div>
  );
};

export default ChecklistItem;