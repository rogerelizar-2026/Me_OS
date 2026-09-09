import { useState, useEffect } from 'react';

type Theme = 'classic' | 'neon';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('classic');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('legacyos-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.remove('classic', 'neon');
      document.documentElement.classList.add(savedTheme);
    } else {
      document.documentElement.classList.add('classic');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'classic' ? 'neon' : 'classic';
    setTheme(newTheme);
    localStorage.setItem('legacyos-theme', newTheme);
    
    document.documentElement.classList.remove('classic', 'neon');
    document.documentElement.classList.add(newTheme);
  };

  return { theme, toggleTheme, mounted };
}
