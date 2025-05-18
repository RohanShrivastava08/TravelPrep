import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle, Plane } from "lucide-react";
import ProgressBar from "./ProgressBar";
import { useChecklist } from "../context/ChecklistContext";
import { Player } from '@lottiefiles/react-lottie-player';

const OverallProgress: React.FC = () => {
  const { getProgress, state } = useChecklist();
  const progress = getProgress();

  const totalItems = state.categories.reduce(
    (acc, category) => acc + category.items.length, 
    0
  );
  const checkedItems = state.categories.reduce(
    (acc, category) => acc + category.items.filter(item => item.isChecked).length, 
    0
  );

  const getStatusMessage = () => {
    if (progress === 0) return "Time to start packing!";
    if (progress < 25) return "Just getting started!";
    if (progress < 50) return "Good progress!";
    if (progress < 75) return "Almost there!";
    if (progress < 100) return "Nearly ready to go!";
    return "All packed and ready!";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div className="bg-card border border-border/30 rounded-xl p-6 backdrop-blur-xl bg-opacity-30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Packing Progress</h2>
          {progress === 100 ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5 text-primary" />
          )}
        </div>
        
        <div className="mb-4">
          <ProgressBar progress={progress} size="lg" />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{getStatusMessage()}</span>
          <span className="font-medium">{checkedItems} of {totalItems} items</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-border/30 rounded-xl p-6 backdrop-blur-xl">
        <div className="flex items-center space-x-3 mb-4">
          <Plane className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Trip Status</h2>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Categories</span>
            <span className="font-medium">{state.categories.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Items</span>
            <span className="font-medium">{totalItems}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Packed Items</span>
            <span className="font-medium">{checkedItems}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OverallProgress;