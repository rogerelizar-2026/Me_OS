'use client';

import { Home, Flag, Heart, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function MobileNavigation({ activeTab, setActiveTab }: NavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'rocks', icon: Flag, label: 'Pedras' },
    { id: 'habits', icon: Heart, label: 'Hábitos' },
    { id: 'people', icon: Users, label: 'Contas' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 pb-safe z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex flex-col items-center justify-center w-full h-full"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute -top-1 w-1 h-1 rounded-full classic:bg-amber-600 neon:bg-cyan-400"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <tab.icon 
                size={24} 
                className={`transition-colors ${
                  isActive 
                    ? 'classic:text-amber-600 neon:text-cyan-400' 
                    : 'text-gray-400'
                }`} 
              />
              <span className="text-[10px] mt-1 text-gray-500">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
