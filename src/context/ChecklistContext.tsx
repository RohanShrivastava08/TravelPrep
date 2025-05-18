import React, { createContext, useContext, useEffect, useState } from "react";
import { Category, ChecklistState, TripInfo, ThemeConfig } from "../types";
import { initialData } from "../data/initialData";
import toast from 'react-hot-toast';

interface ChecklistContextType {
  state: ChecklistState;
  toggleItemCheck: (categoryId: string, itemId: string) => void;
  toggleCategoryExpand: (categoryId: string) => void;
  getProgress: (categoryId?: string) => number;
  updateTripInfo: (info: TripInfo) => void;
  updateTheme: (config: ThemeConfig) => void;
}

const ChecklistContext = createContext<ChecklistContextType | undefined>(undefined);

export const ChecklistProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [state, setState] = useState<ChecklistState>(() => {
    const savedState = localStorage.getItem("travelprep-checklist");
    if (savedState) {
      try {
        return JSON.parse(savedState);
      } catch (e) {
        console.error("Failed to parse saved checklist state:", e);
      }
    }
    return { categories: initialData };
  });

  useEffect(() => {
    localStorage.setItem("travelprep-checklist", JSON.stringify(state));
  }, [state]);

  const toggleItemCheck = (categoryId: string, itemId: string) => {
    setState(prevState => {
      const newState = {
        ...prevState,
        categories: prevState.categories.map(category => 
          category.id === categoryId 
            ? {
                ...category,
                items: category.items.map(item => 
                  item.id === itemId 
                    ? { ...item, isChecked: !item.isChecked } 
                    : item
                )
              }
            : category
        )
      };

      // Check if all items are packed
      const allItems = newState.categories.flatMap(category => category.items);
      const allPacked = allItems.every(item => item.isChecked);
      if (allPacked) {
        toast.success('🎉 Everything is packed! Ready for your trip!');
      }

      return newState;
    });
  };

  const toggleCategoryExpand = (categoryId: string) => {
    setState(prevState => ({
      ...prevState,
      categories: prevState.categories.map(category => 
        category.id === categoryId 
          ? { ...category, isExpanded: !category.isExpanded }
          : category
      )
    }));
  };

  const getProgress = (categoryId?: string): number => {
    if (categoryId) {
      const category = state.categories.find(c => c.id === categoryId);
      if (!category) return 0;
      
      const totalItems = category.items.length;
      if (totalItems === 0) return 0;
      
      const checkedItems = category.items.filter(item => item.isChecked).length;
      return Math.round((checkedItems / totalItems) * 100);
    } else {
      const allItems = state.categories.flatMap(category => category.items);
      const totalItems = allItems.length;
      if (totalItems === 0) return 0;
      
      const checkedItems = allItems.filter(item => item.isChecked).length;
      return Math.round((checkedItems / totalItems) * 100);
    }
  };

  const updateTripInfo = (info: TripInfo) => {
    setState(prevState => ({
      ...prevState,
      tripInfo: info
    }));
    toast.success('Trip information updated!');
  };

  const updateTheme = (config: ThemeConfig) => {
    setState(prevState => ({
      ...prevState,
      theme: config
    }));
    toast.success('Theme updated!');
  };

  return (
    <ChecklistContext.Provider 
      value={{ 
        state, 
        toggleItemCheck, 
        toggleCategoryExpand,
        getProgress,
        updateTripInfo,
        updateTheme
      }}
    >
      {children}
    </ChecklistContext.Provider>
  );
};

export const useChecklist = (): ChecklistContextType => {
  const context = useContext(ChecklistContext);
  
  if (context === undefined) {
    throw new Error("useChecklist must be used within a ChecklistProvider");
  }
  
  return context;
};