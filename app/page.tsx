'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Heart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Habit, Relationship, Task } from '@/lib/db';
import { getAllHabits, incrementHabitStreak, getAllRelationships, getTodaysBigRocks } from '@/lib/db';
import { QuoteCard } from './features/QuoteCard';
import { TaskCard } from './features/TaskCard';
import { ThemeToggle } from './features/ThemeToggle';
import { useTheme } from '@/hooks/use-theme';

export default function Home() {
  const { theme } = useTheme();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [bigRocks, setBigRocks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [habitsData, relationshipsData, bigRocksData] = await Promise.all([
          getAllHabits(),
          getAllRelationships(),
          getTodaysBigRocks()
        ]);
        
        setHabits(habitsData);
        setRelationships(relationshipsData);
        setBigRocks(bigRocksData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const handleCompleteHabit = async (habitId: number) => {
    await incrementHabitStreak(habitId);
    setHabits(prev => 
      prev.map(h => 
        h.id === habitId ? { ...h, streak: h.streak + 1 } : h
      )
    );
  };

  const handleStartPomodoro = (taskId: number) => {
    // Placeholder for Pomodoro functionality
    alert(`Iniciando sessão de foco para a tarefa #${taskId}\n\nTempo: 25 minutos`);
  };

  // Classic Estate Theme Layout
  if (theme === 'classic') {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-slate-900 transition-colors duration-300">
        {/* Header */}
        <header className="border-b border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100">
                LegacyOS
              </h1>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Sistema Pessoal de Eficácia
              </p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Hero - Quote Card */}
          <section aria-label="Citação do Dia">
            <QuoteCard theme="classic" />
          </section>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Big Rocks */}
            <section aria-label="Pedras Grandes de Hoje">
              <Card theme="classic" variant="elevated">
                <CardHeader theme="classic">
                  <CardTitle theme="classic" as="h2" className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-600" />
                    Pedras Grandes de Hoje
                  </CardTitle>
                </CardHeader>
                <CardContent theme="classic" className="space-y-4">
                  {isLoading ? (
                    <p className="text-sm text-stone-500">Carregando tarefas...</p>
                  ) : bigRocks.length > 0 ? (
                    bigRocks.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        theme="classic"
                        onStartPomodoro={handleStartPomodoro}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-stone-500 italic">
                        Nenhuma pedra grande definida para hoje.
                      </p>
                      <p className="text-xs text-stone-400 mt-2">
                        "O que é importante raramente é urgente." — Covey
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Right Column - Renewal Tracker */}
            <section aria-label="Tracker de Renovação">
              <Card theme="classic" variant="elevated">
                <CardHeader theme="classic">
                  <CardTitle theme="classic" as="h2" className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-700" />
                    Tracker de Renovação
                  </CardTitle>
                </CardHeader>
                <CardContent theme="classic" className="space-y-3">
                  {isLoading ? (
                    <p className="text-sm text-stone-500">Carregando hábitos...</p>
                  ) : habits.length > 0 ? (
                    habits.map(habit => (
                      <motion.button
                        key={habit.id}
                        onClick={() => handleCompleteHabit(habit.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-between p-3 rounded-lg border border-stone-200 dark:border-slate-700 hover:bg-stone-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Circle className="w-5 h-5 text-green-700" />
                          <div className="text-left">
                            <p className="font-medium text-stone-800 dark:text-stone-100">
                              {habit.name}
                            </p>
                            <p className="text-xs text-stone-500">{habit.dimension}</p>
                          </div>
                        </div>
                        <span className="text-sm font-mono text-amber-700 dark:text-amber-500">
                          {habit.streak} dias
                        </span>
                      </motion.button>
                    ))
                  ) : (
                    <p className="text-sm text-stone-500">Nenhum hábito cadastrado.</p>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Bottom Section - Emotional Bank Account */}
          <section aria-label="Conta Bancária Emocional">
            <Card theme="classic">
              <CardHeader theme="classic">
                <CardTitle theme="classic" as="h2" className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-700" />
                  Conta Bancária Emocional
                </CardTitle>
              </CardHeader>
              <CardContent theme="classic">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {isLoading ? (
                    <p className="text-sm text-stone-500">Carregando relacionamentos...</p>
                  ) : relationships.length > 0 ? (
                    relationships.map(rel => (
                      <div
                        key={rel.id}
                        className="p-4 rounded-lg bg-stone-50 dark:bg-slate-800 border border-stone-200 dark:border-slate-700"
                      >
                        <p className="font-medium text-stone-800 dark:text-stone-100 mb-2">
                          {rel.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <TrendingUp 
                            className={`w-4 h-4 ${
                              rel.emotionalBankBalance >= 100 
                                ? 'text-green-700' 
                                : rel.emotionalBankBalance >= 50 
                                  ? 'text-amber-700' 
                                  : 'text-red-700'
                            }`} 
                          />
                          <span 
                            className={`font-mono text-lg font-bold ${
                              rel.emotionalBankBalance >= 100 
                                ? 'text-green-700' 
                                : rel.emotionalBankBalance >= 50 
                                  ? 'text-amber-700' 
                                  : 'text-red-700'
                            }`}
                          >
                            {rel.emotionalBankBalance}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-stone-500">Nenhum relacionamento cadastrado.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    );
  }

  // Neon Forge Theme Layout
  if (theme === 'neon') {
    return (
      <div className="min-h-screen bg-[#09090B] transition-colors duration-150">
        {/* Header */}
        <header className="border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-space-grotesk font-bold text-gradient-neon">
                LegacyOS
              </h1>
              <p className="text-xs font-mono text-cyan-400 mt-1">
                // SISTEMA_PESSOAL_DE_EFICÁCIA
              </p>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Hero - Quote Card */}
          <section aria-label="Citação_do_Dia">
            <QuoteCard theme="neon" />
          </section>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Big Rocks */}
            <section aria-label="Pedras_Grandes_de_Hoje">
              <Card theme="neon" variant="bordered">
                <CardHeader theme="neon">
                  <CardTitle theme="neon" as="h2" className="flex items-center gap-2 text-white">
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    >
                      ⬡
                    </motion.span>
                    PEDRAS_GRANDES_DE_HOJE
                  </CardTitle>
                </CardHeader>
                <CardContent theme="neon" className="space-y-3">
                  {isLoading ? (
                    <p className="text-sm font-mono text-gray-400">[CARREGANDO_TAREFAS...]</p>
                  ) : bigRocks.length > 0 ? (
                    bigRocks.map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        theme="neon"
                        onStartPomodoro={handleStartPomodoro}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400 font-mono text-sm">
                        [NENHUMA_PEDRA_GRANDE_DEFINIDA]
                      </p>
                      <p className="text-xs text-cyan-400/70 font-mono mt-2">
                        // "O_que_é_importante_raramente_é_urgente."
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* Right Column - Renewal Tracker */}
            <section aria-label="Tracker_de_Renovação">
              <Card theme="neon" variant="elevated">
                <CardHeader theme="neon">
                  <CardTitle theme="neon" as="h2" className="flex items-center gap-2 text-white">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </motion.div>
                    TRACKER_DE_RENOVAÇÃO
                  </CardTitle>
                </CardHeader>
                <CardContent theme="neon" className="space-y-3">
                  {isLoading ? (
                    <p className="text-sm font-mono text-gray-400">[CARREGANDO_HÁBITOS...]</p>
                  ) : habits.length > 0 ? (
                    habits.map((habit, index) => (
                      <motion.button
                        key={habit.id}
                        onClick={() => handleCompleteHabit(habit.id)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: '0 0 15px rgba(16,185,129,0.5)'
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-green-400/70 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileTap={{ scale: 1.3 }}
                          >
                            <Circle className="w-5 h-5 text-green-400 group-hover:fill-green-400/30 transition-colors" />
                          </motion.div>
                          <div className="text-left">
                            <p className="font-medium text-white">{habit.name}</p>
                            <p className="text-xs font-mono text-fuchsia-400">{habit.dimension.toUpperCase()}</p>
                          </div>
                        </div>
                        <motion.span 
                          className="font-mono text-lg text-cyan-400"
                          whileTap={{ scale: 1.2, color: '#10B981' }}
                        >
                          STREAK: {habit.streak}
                        </motion.span>
                      </motion.button>
                    ))
                  ) : (
                    <p className="text-sm font-mono text-gray-400">[NENHUM_HÁBITO_CADASTRADO]</p>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Bottom Section - Emotional Bank Account */}
          <section aria-label="Conta_Bancária_Emocional">
            <Card theme="neon">
              <CardHeader theme="neon">
                <CardTitle theme="neon" as="h2" className="flex items-center gap-2 text-white">
                  <Heart className="w-5 h-5 text-fuchsia-400" />
                  CONTA_BANCÁRIA_EMOCIONAL
                </CardTitle>
              </CardHeader>
              <CardContent theme="neon">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {isLoading ? (
                    <p className="text-sm font-mono text-gray-400">[CARREGANDO_RELACIONAMENTOS...]</p>
                  ) : relationships.length > 0 ? (
                    relationships.map((rel, index) => (
                      <motion.div
                        key={rel.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-fuchsia-400/50 transition-all group"
                      >
                        <p className="font-medium text-white mb-2">{rel.name}</p>
                        <div className="flex items-center gap-2">
                          <TrendingUp 
                            className={`w-4 h-4 ${
                              rel.emotionalBankBalance >= 100 
                                ? 'text-green-400' 
                                : rel.emotionalBankBalance >= 50 
                                  ? 'text-cyan-400' 
                                  : 'text-fuchsia-400'
                            }`} 
                          />
                          <motion.span 
                            className={`font-mono text-2xl font-bold ${
                              rel.emotionalBankBalance >= 100 
                                ? 'text-green-400' 
                                : rel.emotionalBankBalance >= 50 
                                  ? 'text-cyan-400' 
                                  : 'text-fuchsia-400'
                            }`}
                            animate={{ 
                              textShadow: [
                                '0 0 5px currentColor',
                                '0 0 15px currentColor',
                                '0 0 5px currentColor'
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {rel.emotionalBankBalance}
                          </motion.span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-sm font-mono text-gray-400">[NENHUM_RELACIONAMENTO_CADASTRADO]</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    );
  }

  return null;
}
