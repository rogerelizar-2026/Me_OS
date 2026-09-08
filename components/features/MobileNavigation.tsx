'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Target, 
  Heart, 
  Sparkles, 
  Menu,
  X
} from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  theme: 'classic' | 'neon';
}

export function MobileNavigation({ activeTab, onTabChange, theme }: MobileNavigationProps) {
  const tabs = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'rocks', label: 'Pedras', icon: Target },
    { id: 'habits', label: 'Hábitos', icon: Sparkles },
    { id: 'relationships', label: 'Contas', icon: Heart },
  ];

  const isClassic = theme === 'classic';

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile */}
      <nav className={`hidden md:flex items-center gap-2 ${
        isClassic 
          ? 'bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-700 rounded-lg px-2 py-1' 
          : 'bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-2 py-1'
      }`}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isClassic
                  ? isActive
                    ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 font-medium'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-slate-800'
                  : isActive
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-bottom ${
        isClassic
          ? 'bg-white dark:bg-slate-900 border-t border-stone-200 dark:border-slate-700 shadow-lg'
          : 'bg-[#09090B]/95 backdrop-blur-lg border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]'
      }`}>
        <div className="grid grid-cols-4 h-16">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex flex-col items-center justify-center gap-1"
                whileTap={{ scale: 0.9 }}
                initial={false}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className={`absolute inset-0 ${
                      isClassic
                        ? 'bg-amber-50 dark:bg-amber-900/20'
                        : 'bg-cyan-500/10'
                    }`}
                    initial={false}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <div className="relative z-10 flex flex-col items-center">
                  <Icon 
                    className={`w-5 h-5 transition-colors ${
                      isClassic
                        ? isActive
                          ? 'text-amber-700 dark:text-amber-400'
                          : 'text-stone-400 dark:text-stone-500'
                        : isActive
                          ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                          : 'text-gray-500'
                    }`} 
                  />
                  <span className={`text-[10px] font-medium transition-colors ${
                    isClassic
                      ? isActive
                        ? 'text-amber-700 dark:text-amber-400'
                        : 'text-stone-400 dark:text-stone-500'
                      : isActive
                        ? 'text-cyan-400'
                        : 'text-gray-500'
                  }`}>
                    {tab.label}
                  </span>
                </div>

                {/* Active indicator dot for mobile */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={`absolute -top-1 w-1 h-1 rounded-full ${
                      isClassic ? 'bg-amber-600' : 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]'
                    }`}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
