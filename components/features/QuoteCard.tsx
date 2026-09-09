'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { db, Quote } from '@/lib/db';

export function QuoteCard() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    async function loadQuote() {
      try {
        const allQuotes = await db.quotes.toArray();
        if (allQuotes.length > 0) {
          const randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
          setQuote(randomQuote);
        }
      } catch (error) {
        console.error('Erro ao carregar citação:', error);
      }
    }
    loadQuote();
  }, []);

  if (!quote) {
    return (
      <Card className="p-6 mb-6 min-h-[120px] flex items-center justify-center">
        <div className="animate-pulse classic:text-stone-400 neon:text-gray-500">
          Carregando sabedoria...
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 mb-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="classic:text-center neon:text-left"
      >
        <motion.p 
          className="classic:font-serif classic:text-xl classic:text-stone-700 neon:font-mono neon:text-cyan-300 neon:text-lg italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          "{quote.text}"
        </motion.p>
        <motion.p 
          className="mt-4 classic:text-sm classic:text-stone-500 neon:text-xs neon:text-fuchsia-400 neon:uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          — {quote.author}
        </motion.p>
      </motion.div>
    </Card>
  );
}
