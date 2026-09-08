'use client';

import { useState, useEffect } from 'react';

export type Theme = 'classic' | 'neon';

interface UseThemeReturn {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Custom hook to manage theme switching between Classic Estate and Neon Forge.
 * Persists theme preference in localStorage and applies CSS class to <html> element.
 */
export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>('classic');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from localStorage on mount (client-side only)
  useEffect(() => {
    const storedTheme = localStorage.getItem('legacyos-theme') as Theme | null;
    const initialTheme = storedTheme || 'classic';
    
    setThemeState(initialTheme);
    document.documentElement.classList.remove('classic', 'neon');
    document.documentElement.classList.add(initialTheme);
    setIsLoaded(true);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('legacyos-theme', newTheme);
    
    // Apply theme class to html element
    document.documentElement.classList.remove('classic', 'neon');
    document.documentElement.classList.add(newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'classic' ? 'neon' : 'classic');
  };

  return { theme, setTheme, toggleTheme, isLoaded };
}
