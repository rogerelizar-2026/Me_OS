'use client';

import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles, BookOpen } from 'lucide-react';
import { Button } from './ui/Button';
import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  // Classic Theme Toggle - Elegant switch with leather/metal aesthetic
  if (theme === 'classic') {
    return (
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
          Tema
        </span>
        
        <Button
          theme="classic"
          variant="classicOutline"
          size="sm"
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2"
          aria-label="Alternar para tema Neon Forge"
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">Clássico</span>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="w-4 h-4 border-2 border-amber-700 rounded-full flex items-center justify-center"
          >
            <motion.div
              className="w-2 h-2 bg-amber-700 rounded-full"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </Button>
      </div>
    );
  }

  // Neon Theme Toggle - Futuristic switch with glow effects
  if (theme === 'neon') {
    return (
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
          MODE
        </span>
        
        <motion.button
          onClick={toggleTheme}
          className="relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium font-mono text-sm overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Alternar para tema Classic Estate"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-fuchsia-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
          
          {/* Border glow */}
          <div className="absolute inset-0 border border-cyan-400/50 rounded-lg opacity-50 group-hover:opacity-100 transition-opacity duration-150" />
          
          {/* Content */}
          <div className="relative z-10 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
            <span className="text-cyan-400">NEON</span>
            
            {/* Animated toggle indicator */}
            <motion.div
              className="w-8 h-4 bg-white/10 rounded-full relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="absolute top-0.5 left-0.5 w-3 h-3 bg-fuchsia-400 rounded-full shadow-[0_0_8px_rgba(217,70,239,0.8)]"
                animate={{ x: 16 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </div>
        </motion.button>
      </div>
    );
  }

  return null;
}
