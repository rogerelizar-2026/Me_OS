'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { db, Task, Habit, Relationship, initializeDB } from '@/lib/db';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { QuoteCard } from '@/components/features/QuoteCard';
import { TaskCard } from '@/components/features/TaskCard';
import { MobileNavigation } from '@/components/features/MobileNavigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [activeTab, setActiveTab] = useState('home');
  const { theme } = useTheme();

  useEffect(() => {
    async function loadData() {
      await initializeDB();
      
      const [loadedTasks, loadedHabits, loadedRelationships] = await Promise.all([
        db.tasks.toArray(),
        db.habits.toArray(),
        db.relationships.toArray(),
      ]);
      
      setTasks(loadedTasks);
      setHabits(loadedHabits);
      setRelationships(loadedRelationships);
    }
    loadData();
  }, []);

  const bigRocks = tasks.filter(t => t.isBigRock && t.quadrant === 2);

  const getBalanceIcon = (balance: number) => {
    if (balance > 100) return <TrendingUp className="text-green-500" size={20} />;
    if (balance < 100) return <TrendingDown className="text-red-500" size={20} />;
    return <Minus className="text-gray-400" size={20} />;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <QuoteCard />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
              {/* Pedras Grandes */}
              <Card>
                <CardHeader>
                  <CardTitle>Pedras Grandes de Hoje</CardTitle>
                </CardHeader>
                <CardContent>
                  {bigRocks.length > 0 ? (
                    bigRocks.map((task) => (
                      <TaskCard key={task.id} title={task.title} isBigRock={true} />
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">Nenhuma pedra grande definida para hoje.</p>
                  )}
                </CardContent>
              </Card>

              {/* Tracker de Renovação */}
              <Card>
                <CardHeader>
                  <CardTitle>Tracker de Renovação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {habits.map((habit) => (
                      <motion.div
                        key={habit.id}
                        className="flex items-center justify-between p-3 rounded-lg classic:bg-stone-50 neon:bg-white/5"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle 
                            size={20} 
                            className="classic:text-amber-600 neon:text-cyan-400" 
                          />
                          <div>
                            <p className="font-medium classic:text-stone-800 neon:text-white">
                              {habit.name}
                            </p>
                            <p className="text-xs classic:text-stone-500 neon:text-gray-400">
                              {habit.dimension}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-mono classic:text-amber-600 neon:text-cyan-400">
                          {habit.streak} dias
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Conta Bancária Emocional */}
            <Card className="mb-24">
              <CardHeader>
                <CardTitle>Conta Bancária Emocional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {relationships.map((rel) => (
                    <motion.div
                      key={rel.id}
                      className="flex items-center justify-between p-4 rounded-lg classic:border classic:border-stone-200 neon:border neon:border-white/10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center gap-3">
                        {getBalanceIcon(rel.emotionalBankBalance)}
                        <span className="font-medium classic:text-stone-800 neon:text-white">
                          {rel.name}
                        </span>
                      </div>
                      <span className={`font-mono text-sm ${
                        rel.emotionalBankBalance > 100 
                          ? 'text-green-500' 
                          : rel.emotionalBankBalance < 100 
                          ? 'text-red-500' 
                          : 'text-gray-400'
                      }`}>
                        {rel.emotionalBankBalance} pts
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        );

      case 'rocks':
        return (
          <div className="mb-24">
            <h2 className="text-2xl font-bold mb-6 classic:font-serif neon:font-grotesk classic:text-stone-800 neon:text-white">
              Todas as Tarefas
            </h2>
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                title={task.title} 
                isBigRock={task.isBigRock}
                quadrant={task.quadrant}
              />
            ))}
          </div>
        );

      case 'habits':
        return (
          <div className="mb-24">
            <h2 className="text-2xl font-bold mb-6 classic:font-serif neon:font-grotesk classic:text-stone-800 neon:text-white">
              Hábitos de Renovação
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {habits.map((habit) => (
                    <div key={habit.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium classic:text-stone-800 neon:text-white">
                          {habit.name}
                        </p>
                        <p className="text-sm classic:text-stone-500 neon:text-gray-400">
                          {habit.dimension}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Completar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'people':
        return (
          <div className="mb-24">
            <h2 className="text-2xl font-bold mb-6 classic:font-serif neon:font-grotesk classic:text-stone-800 neon:text-white">
              Relacionamentos
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {relationships.map((rel) => (
                    <div key={rel.id} className="flex items-center justify-between p-4 rounded-lg classic:bg-stone-50 neon:bg-white/5">
                      <div>
                        <p className="font-medium classic:text-stone-800 neon:text-white">
                          {rel.name}
                        </p>
                        <p className="text-sm classic:text-stone-500 neon:text-gray-400">
                          Saldo emocional
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getBalanceIcon(rel.emotionalBankBalance)}
                        <span className="font-mono classic:text-stone-800 neon:text-white">
                          {rel.emotionalBankBalance}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen pb-24">
      {/* Header Fixo */}
      <header className="sticky top-0 z-40 backdrop-blur-md classic:bg-[#FDFBF7]/90 neon:bg-[#09090B]/90 border-b classic:border-stone-200 neon:border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold classic:font-serif classic:text-stone-800 neon:font-grotesk neon:text-white">
            LegacyOS
          </h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegação Mobile */}
      <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}
