/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Classic Estate Theme
        'classic-bg': 'var(--bg-primary)',
        'classic-text': 'var(--text-primary)',
        'classic-accent': 'var(--accent-primary)',
        'classic-accent-secondary': 'var(--accent-secondary)',
        // Neon Forge Theme
        'neon-bg': 'var(--bg-primary)',
        'neon-text': 'var(--text-primary)',
        'neon-accent': 'var(--accent-primary)',
        'neon-accent-secondary': 'var(--accent-secondary)',
        'neon-success': 'var(--success)',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'jetbrains-mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'typewriter': 'typewriter 2s steps(40) forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(6,182,212,0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(6,182,212,0.6)' },
        },
      },
    },
  },
  plugins: [],
};
