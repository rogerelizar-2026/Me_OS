'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Heart, TrendingUp, Target, Sparkles, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Habit, Relationship, Task } from '@/lib/db';
import { getAllHabits, incrementHabitStreak, getAllRelationships, getTodaysBigRocks } from '@/lib/db';
import { QuoteCard } from './features/QuoteCard';
import { TaskCard } from './features/TaskCard';
import { ThemeToggle } from './features/ThemeToggle';
import { MobileNavigation } from './features/MobileNavigation';
import { useTheme } from '@/hooks/use-theme';

type TabType = 'home' | 'rocks' | 'habits' | 'relationships';

export default function Home() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('home');
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
    setHabits(prev => prev.map(h => h.id === habitId ? { ...h, streak: h.streak + 1 } : h));
  };

  const handleStartPomodoro = (taskId: number) => {
    alert(`Iniciando sessão de foco para a tarefa #${taskId}\n\nTempo: 25 minutos`);
  };

  const isClassic = theme === 'classic';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-4">
            <QuoteCard theme={theme} />
            
            <section aria-label="Pedras Grandes">
              <Card theme={theme} variant={isClassic ? 'elevated' : 'bordered'}>
                <CardHeader theme={theme} className="py-3">
                  <CardTitle theme={theme} as="h2" className="flex items-center gap-2 text-sm">
                    <span className={`w-2 h-2 rounded-full ${isClassic ? 'bg-amber-600' : 'bg-cyan-400'}`} />
                    {isClassic ? 'Pedras Grandes de Hoje' : 'PEDRAS_GRANDES'}
                  </CardTitle>
                </CardHeader>
                <CardContent theme={theme} className="py-3">
                  {isLoading ? (
                    <p className={`text-xs ${isClassic ? 'text-stone-500' : 'text-gray-400 font-mono'}`}>Carregando...</p>
                  ) : bigRocks.length > 0 ? (
                    <div className="space-y-2">
                      {bigRocks.map(task => (
                        <TaskCard key={task.id} task={task} theme={theme} onStartPomodoro={handleStartPomodoro} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Target className={`w-8 h-8 mx-auto mb-2 ${isClassic ? 'text-stone-300' : 'text-gray-600'}`} />
                      <p className={`text-xs ${isClassic ? 'text-stone-500 italic' : 'text-gray-400 font-mono'}`}>
                        {isClassic ? 'Nenhuma pedra grande definida.' : '[NENHUMA_PEDRA]'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>

            <section aria-label="Tracker de Renovação">
              <Card theme={theme} variant="elevated">
                <CardHeader theme={theme} className="py-3">
                  <CardTitle theme={theme} as="h2" className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className={`w-4 h-4 ${isClassic ? 'text-green-700' : 'text-green-400'}`} />
                    {isClassic ? 'Tracker de Renovação' : 'TRACKER_DE_RENOVAÇÃO'}
                  </CardTitle>
                </CardHeader>
                <CardContent theme={theme} className="py-3">
                  {isLoading ? (
                    <p className={`text-xs ${isClassic ? 'text-stone-500' : 'text-gray-400 font-mono'}`}>Carregando...</p>
                  ) : habits.length > 0 ? (
                    <div className="space-y-2">
                      {habits.map((habit, index) => (
                        <motion.button
                          key={habit.id}
                          onClick={() => handleCompleteHabit(habit.id)}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                            isClassic
                              ? 'border border-stone-200 hover:bg-stone-50'
                              : 'bg-white/5 border border-white/10 hover:border-green-400/70'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Circle className={`w-5 h-5 ${isClassic ? 'text-green-700' : 'text-green-400'}`} />
                            <div className="text-left">
                              <p className={`font-medium text-sm ${isClassic ? 'text-stone-800 dark:text-stone-100' : 'text-white'}`}>{habit.name}</p>
                              <p className={`text-[10px] ${isClassic ? 'text-stone-500' : 'text-fuchsia-400 font-mono'}`}>{habit.dimension}</p>
                            </div>
                          </div>
                          <span className={`text-sm font-mono ${isClassic ? 'text-amber-700' : 'text-cyan-400'}`}>{habit.streak}d</span>
                        </motion.button>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </section>

            <section aria-label="Conta Bancária Emocional">
              <Card theme={theme}>
                <CardHeader theme={theme} className="py-3">
                  <CardTitle theme={theme} as="h2" className="flex items-center gap-2 text-sm">
                    <Heart className={`w-4 h-4 ${isClassic ? 'text-red-700' : 'text-fuchsia-400'}`} />
                    {isClassic ? 'Conta Bancária Emocional' : 'CONTA_EMOCIONAL'}
                  </CardTitle>
                </CardHeader>
                <CardContent theme={theme} className="py-3">
                  {isLoading ? (
                    <p className={`text-xs ${isClassic ? 'text-stone-500' : 'text-gray-400 font-mono'}`}>Carregando...</p>
                  ) : relationships.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {relationships.map(rel => (
                        <motion.div key={rel.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          className={`p-3 rounded-lg ${isClassic ? 'bg-stone-50 border border-stone-200' : 'bg-white/5 border border-white/10'}`}
                        >
                          <p className={`font-medium text-sm truncate ${isClassic ? 'text-stone-800' : 'text-white'}`}>{rel.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <TrendingUp className={`w-4 h-4 ${rel.emotionalBankBalance >= 100 ? 'text-green-700' : rel.emotionalBankBalance >= 50 ? 'text-amber-700' : 'text-red-700'}`} />
                            <span className={`font-mono text-lg font-bold ${rel.emotionalBankBalance >= 100 ? 'text-green-700' : rel.emotionalBankBalance >= 50 ? 'text-amber-700' : 'text-red-700'}`}>{rel.emotionalBankBalance}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </section>
          </div>
        );

      case 'rocks':
        return (
          <div className="space-y-4">
            <Card theme={theme} variant={isClassic ? 'elevated' : 'bordered'}>
              <CardHeader theme={theme} className="py-3">
                <CardTitle theme={theme} as="h2" className="flex items-center gap-2 text-sm">
                  <Target className={`w-4 h-4 ${isClassic ? 'text-amber-700' : 'text-cyan-400'}`} />
                  {isClassic ? 'Todas as Pedras Grandes' : 'TODAS_AS_PEDRAS'}
                </CardTitle>
              </CardHeader>
              <CardContent theme={theme} className="py-3">
                {isLoading ? (
                  <p className={`text-xs ${isClassic ? 'text-stone-500' : 'text-gray-400 font-mono'}`}>Carregando...</p>
                ) : bigRocks.length > 0 ? (
                  <div className="space-y-2">
                    {bigRocks.map(task => (
                      <TaskCard key={task.id} task={task} theme={theme} onStartPomodoro={handleStartPomodoro} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className={`w-12 h-12 mx-auto mb-3 ${isClassic ? 'text-stone-300' : 'text-gray-600'}`} />
                    <p className={`text-sm ${isClassic ? 'text-stone-500' : 'text-gray-400 font-mono'}`}>Nenhuma pedra encontrada.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'habits':
        return (
          <div className="space-y-4">
            <Card theme={theme} variant={isClassic ? 'elevated' : 'bordered'}>
              <CardHeader theme={theme} className="py-3">
                <CardTitle theme={theme} as="h2" className="flex items-center gap-2 text-sm">
                  <Sparkles className={`w-4 h-4 ${isClassic ? 'text-green-700' : 'text-fuchsia-400'}`} />
                  {isClassic ? 'Todos os Hábitos' : 'TODOS_OS_HÁBITOS'}
                </CardTitle>
              </CardHeader>
              <CardContent theme={theme} className="py-3">
                {isLoading ? (
                  <p className={`text-xs ${isClassic ? 'text-stone-500' : 'text-gray-400 font-mono'}`}>Carregando...</p>
                ) : habits.length > 0 ? (
                  <div className="space-y-2">
                    {habits.map((habit, index) => (
                      <motion.button
                        key={habit.id}
                        onClick={() => handleCompleteHabit(habit.id)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
                          isClassic ? 'border border-stone-200 hover:bg-stone-50' : 'bg-white/5 border border-white/10 hover:border-green-400/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Circle className={`w-6 h-6 ${isClassic ? 'text-green-700' : 'text-green-400'}`} />
                          <div className="text-left">
                            <p className={`font-medium ${isClassic ? 'text-stone-800' : 'text-white'}`}>{habit.name}</p>
                            <p className={`text-xs ${isClassic ? 'text-stone-500' : 'text-fuchsia-400 font-mono'}`}>{habit.dimension}</p>
                          </div>
                        </div>
                        <span className={`text-lg font-mono ${isClassic ? 'text-amber-700' : 'text-cyan-400'}`}>{habit.streak}d</span>
                      </motion.button>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        );

      case 'relationships':
        return (
          <div className="space-y-4">
            <Card theme={theme}>
              <CardHeader theme={theme} className="py-3">
                <CardTitle theme={theme} as="h2" className="flex items-center gap-2 text-sm">
                  <Users className={`w-4 h-4 ${isClassic ? 'text-red-700' : 'text-fuchsia-400'}`} />
                  {isClassic ? 'Todos os Relacionamentos' : 'RELACIONAMENTOS'}
                </CardTitle>
              </CardHeader>
              <CardContent theme={theme} className="py-3">
                {isLoading ? (
                  <p className={`text-xs ${isClassic ? 'text-stone-500' : 'text-gray-400 font-mono'}`}>Carregando...</p>
                ) : relationships.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relationships.map(rel => (
                      <motion.div key={rel.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-lg ${isClassic ? 'bg-stone-50 border border-stone-200' : 'bg-white/5 border border-white/10'}`}
                      >
                        <p className={`font-medium text-base mb-2 ${isClassic ? 'text-stone-800' : 'text-white'}`}>{rel.name}</p>
                        <div className="flex items-center justify-between">
                          <TrendingUp className={`w-5 h-5 ${rel.emotionalBankBalance >= 100 ? 'text-green-700' : rel.emotionalBankBalance >= 50 ? 'text-amber-700' : 'text-red-700'}`} />
                          <span className={`font-mono text-2xl font-bold ${rel.emotionalBankBalance >= 100 ? 'text-green-700' : rel.emotionalBankBalance >= 50 ? 'text-amber-700' : 'text-red-700'}`}>{rel.emotionalBankBalance}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isClassic ? 'bg-stone-50 dark:bg-slate-900' : 'bg-[#09090B]'}`}>
      <header className={`sticky top-0 z-40 transition-all ${
        isClassic
          ? 'border-b border-stone-200 bg-white/95 backdrop-blur-sm shadow-sm'
          : 'border-b border-white/10 bg-[#09090B]/95 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className={`text-lg font-bold ${isClassic ? 'font-serif text-stone-800' : 'font-space-grotesk text-gradient-neon'}`}>LegacyOS</h1>
            <p className={`text-[9px] ${isClassic ? 'text-stone-500' : 'font-mono text-cyan-400'}`}>
              {isClassic ? 'Sistema Pessoal de Eficácia' : '// SISTEMA_PESSOAL'}
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-4 pb-24">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <MobileNavigation activeTab={activeTab} onTabChange={setActiveTab} theme={theme} />
    </div>
  );
}
