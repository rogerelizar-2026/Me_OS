'use client';

import { motion } from 'framer-motion';
import { Star, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Task } from '@/lib/db';

interface TaskCardProps {
  task: Task;
  theme?: 'classic' | 'neon';
  onStartPomodoro?: (taskId: number) => void;
}

export function TaskCard({ task, theme = 'classic', onStartPomodoro }: TaskCardProps) {
  // Classic Theme - Elegant card with subtle indicators
  if (theme === 'classic') {
    return (
      <Card theme="classic" variant={task.isBigRock ? 'bordered' : 'default'} className="w-full">
        <CardHeader theme="classic" className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle theme="classic" as="h4" className="text-base">
              {task.title}
            </CardTitle>
            {task.isBigRock && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              >
                <Star className="w-5 h-5 text-amber-600 fill-amber-600" />
              </motion.div>
            )}
          </div>
        </CardHeader>
        
        <CardContent theme="classic">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
              <span className="px-2 py-1 bg-stone-100 dark:bg-slate-800 rounded">
                Quadrante {task.quadrant}
              </span>
              {task.pomodorosCompleted > 0 && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-600" />
                  {task.pomodorosCompleted} Pomodoro(s)
                </span>
              )}
            </div>
            
            {onStartPomodoro && (
              <Button
                theme="classic"
                variant="classicSecondary"
                size="sm"
                onClick={() => onStartPomodoro(task.id)}
                className="text-xs px-3 py-1"
              >
                Iniciar Foco
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Neon Theme - Glowing card with dynamic effects
  if (theme === 'neon') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.15 }}
      >
        <Card 
          theme="neon" 
          variant={task.isBigRock ? 'bordered' : 'default'}
          className={`w-full ${task.isBigRock ? 'border-cyan-400/70 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : ''}`}
        >
          <CardHeader theme="neon" className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle theme="neon" as="h4" className="text-base text-white">
                {task.title}
              </CardTitle>
              {task.isBigRock && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className="relative"
                >
                  <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                  <motion.div
                    className="absolute inset-0 bg-cyan-400 blur-md opacity-50"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </div>
          </CardHeader>
          
          <CardContent theme="neon">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-cyan-400">
                  Q{task.quadrant}
                </span>
                {task.pomodorosCompleted > 0 && (
                  <span className="flex items-center gap-1 text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
                    {task.pomodorosCompleted}x
                  </span>
                )}
              </div>
              
              {onStartPomodoro && (
                <Button
                  theme="neon"
                  variant="neonPrimary"
                  size="sm"
                  onClick={() => onStartPomodoro(task.id)}
                  className="text-xs px-3 py-1"
                >
                  ▶ INICIAR
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return null;
}
