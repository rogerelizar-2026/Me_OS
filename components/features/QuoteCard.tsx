'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from './ui/Card';
import { Quote } from '@/lib/db';
import { getRandomQuote } from '@/lib/db';

interface QuoteCardProps {
  theme?: 'classic' | 'neon';
}

export function QuoteCard({ theme = 'classic' }: QuoteCardProps) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadQuote() {
      try {
        const randomQuote = await getRandomQuote();
        setQuote(randomQuote);
      } catch (error) {
        console.error('Error loading quote:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadQuote();
  }, []);

  if (isLoading) {
    return (
      <Card theme={theme} className="w-full">
        <CardContent theme={theme}>
          <div className="h-24 flex items-center justify-center">
            <span className="text-sm opacity-50">Carregando inspiração...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!quote) {
    return null;
  }

  // Classic Theme - Elegant blockquote style
  if (theme === 'classic') {
    return (
      <Card theme="classic" variant="elevated" className="w-full">
        <CardContent theme="classic" className="relative">
          {/* Decorative quote mark */}
          <div className="absolute top-0 left-4 text-6xl text-amber-700/20 font-serif leading-none">
            "
          </div>
          
          <blockquote className="relative z-10 pl-8 pr-4 py-4">
            <p className="text-lg md:text-xl italic text-stone-700 dark:text-stone-300 font-medium leading-relaxed">
              {quote.text}
            </p>
            <footer className="mt-4 text-right">
              <cite className="not-italic text-sm text-amber-700 dark:text-amber-500 font-medium">
                — {quote.author}
              </cite>
            </footer>
          </blockquote>
        </CardContent>
      </Card>
    );
  }

  // Neon Theme - Typewriter effect with glow
  if (theme === 'neon') {
    return (
      <Card theme="neon" variant="bordered" className="w-full overflow-hidden">
        <CardContent theme="neon" className="relative">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-fuchsia-400/5 pointer-events-none" />
          
          <blockquote className="relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-3"
            >
              <motion.span
                className="inline-block w-2 h-6 bg-cyan-400"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              />
            </motion.div>
            
            <motion.p
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="text-lg md:text-xl font-medium text-white mb-4 overflow-hidden whitespace-nowrap"
            >
              {quote.text}
            </motion.p>
            
            <motion.footer
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.2, duration: 0.5 }}
              className="text-right"
            >
              <cite className="not-italic text-sm text-gradient-neon font-mono">
                — {quote.author}
              </cite>
            </motion.footer>
          </blockquote>
        </CardContent>
      </Card>
    );
  }

  return null;
}
