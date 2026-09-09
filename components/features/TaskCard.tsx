'use client';

import { CheckCircle, Circle, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface TaskCardProps {
  title: string;
  isBigRock: boolean;
  quadrant?: number;
}

export function TaskCard({ title, isBigRock, quadrant }: TaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`p-4 mb-3 flex items-center justify-between group cursor-pointer
          ${isBigRock ? 'border-l-4 classic:border-l-amber-600 neon:border-l-cyan-400' : ''}
          hover:scale-[1.02] transition-transform`}
      >
        <div className="flex items-center gap-3 flex-1">
          {isBigRock ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, delay: 0.1 }}
              className="classic:text-amber-600 neon:text-cyan-400"
            >
              <CheckCircle size={20} />
            </motion.div>
          ) : (
            <Circle size={20} className="text-gray-400" />
          )}
          <div>
            <span className={`block classic:font-medium neon:font-mono 
              ${isBigRock ? 'classic:text-amber-900 neon:text-white font-semibold' : 'text-gray-500'}`}>
              {title}
            </span>
            {isBigRock && (
              <span className="text-xs classic:text-amber-600 neon:text-cyan-400 uppercase tracking-wider">
                Pedra Grande
              </span>
            )}
          </div>
        </div>
        {isBigRock && (
          <Button variant="outline" size="sm" className="neon:hover:shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            <Play size={14} className="mr-1" />
            Iniciar
          </Button>
        )}
      </Card>
    </motion.div>
  );
}
