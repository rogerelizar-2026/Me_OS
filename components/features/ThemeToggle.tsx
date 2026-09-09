'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 border classic:border-stone-300 classic:bg-stone-100 classic:text-stone-800 neon:border-white/20 neon:bg-white/5 neon:text-cyan-400 hover:scale-105"
    >
      {theme === 'classic' ? (
        <>
          <Sun size={18} className="text-amber-600" />
          <span className="text-sm font-serif hidden sm:inline">Clássico</span>
        </>
      ) : (
        <>
          <Moon size={18} className="text-cyan-400" />
          <span className="text-sm font-mono hidden sm:inline">Neon</span>
        </>
      )}
    </button>
  );
}
