import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { ChecklistProvider } from './context/ChecklistContext';
import { useChecklist } from './context/ChecklistContext';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Category from './components/Category';
import OverallProgress from './components/OverallProgress';
import TripInfo from './components/TripInfo';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <ChecklistProvider>
        <div className="min-h-screen bg-background text-foreground font-inter transition-colors duration-300">
          <Header />
          
          <main className="container mx-auto px-4 py-6 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TripInfo />
              
              <OverallProgress />
              
              <div className="space-y-4 pb-16">
                <CategoryList />
              </div>
            </motion.div>
          </main>
          <Toaster position="bottom-right" />
        </div>
      </ChecklistProvider>
       <Footer/>
    </ThemeProvider>
   
  );
}

const CategoryList: React.FC = () => {
  const { state } = useChecklist();
  
  return (
    <AnimatePresence>
      {state.categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </AnimatePresence>
  );
};

export default App;