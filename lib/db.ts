import Dexie, { Table } from 'dexie';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface Role {
  id: number;
  name: string;
  description: string;
}

export interface Task {
  id: number;
  title: string;
  quadrant: 1 | 2 | 3 | 4; // Eisenhower Matrix quadrants
  roleId: number;
  isBigRock: boolean;
  pomodorosCompleted: number;
  createdAt?: Date;
}

export interface Habit {
  id: number;
  name: string;
  dimension: 'Física' | 'Mental' | 'Espiritual' | 'Social';
  streak: number;
  lastCompleted?: Date;
}

export interface Relationship {
  id: number;
  name: string;
  emotionalBankBalance: number; // Positive = deposits, negative = withdrawals
}

export interface Quote {
  id: number;
  text: string;
  author: string;
  moduleTag: string;
}

// ============================================
// DEXIE DATABASE
// ============================================

class LegacyDatabase extends Dexie {
  roles!: Table<Role>;
  tasks!: Table<Task>;
  habits!: Table<Habit>;
  relationships!: Table<Relationship>;
  quotes!: Table<Quote>;

  constructor() {
    super('LegacyOS_DB');
    
    this.version(1).stores({
      roles: '++id, name',
      tasks: '++id, title, quadrant, roleId, isBigRock',
      habits: '++id, name, dimension',
      relationships: '++id, name',
      quotes: '++id, moduleTag',
    });
  }
}

// ============================================
// DATABASE INSTANCE
// ============================================

export const db = new LegacyDatabase();

// ============================================
// SEED DATA - 15 COVEY QUOTES IN PT-BR
// ============================================

const coveyQuotes: Omit<Quote, 'id'>[] = [
  {
    text: "Comece com o fim em mente.",
    author: "Stephen R. Covey",
    moduleTag: "Habit2"
  },
  {
    text: "Seja proativo. Assuma a responsabilidade pela sua vida.",
    author: "Stephen R. Covey",
    moduleTag: "Habit1"
  },
  {
    text: "Primeiro o mais importante. Coloque as coisas mais importantes em primeiro lugar.",
    author: "Stephen R. Covey",
    moduleTag: "Habit3"
  },
  {
    text: "Pense ganha-ganha. Busque benefícios mútuos em todas as interações humanas.",
    author: "Stephen R. Covey",
    moduleTag: "Habit4"
  },
  {
    text: "Procure primeiro compreender, depois ser compreendido.",
    author: "Stephen R. Covey",
    moduleTag: "Habit5"
  },
  {
    text: "Crie sinergia. O todo é maior que a soma das partes.",
    author: "Stephen R. Covey",
    moduleTag: "Habit6"
  },
  {
    text: "Afie a serra. Renove-se regularmente nas quatro dimensões da natureza humana.",
    author: "Stephen R. Covey",
    moduleTag: "Habit7"
  },
  {
    text: "A maioria de nós gasta muito tempo no que é urgente e não o suficiente no que é importante.",
    author: "Stephen R. Covey",
    moduleTag: "TimeManagement"
  },
  {
    text: "Confiança é a cola da vida. É o ingrediente essencial para comunicação eficaz.",
    author: "Stephen R. Covey",
    moduleTag: "Relationships"
  },
  {
    text: "Entre o estímulo e a resposta há um espaço. Nesse espaço está nosso poder de escolher nossa resposta.",
    author: "Stephen R. Covey",
    moduleTag: "Habit1"
  },
  {
    text: "Não basta sobreviver; é preciso crescer. Não basta existir; é preciso contribuir.",
    author: "Stephen R. Covey",
    moduleTag: "Habit7"
  },
  {
    text: "As pessoas não podem viver com mudanças se não houver uma visão inalterável do futuro.",
    author: "Stephen R. Covey",
    moduleTag: "Habit2"
  },
  {
    text: "O caráter é o que você é na escuridão.",
    author: "Stephen R. Covey",
    moduleTag: "Character"
  },
  {
    text: "Trate as pessoas como elas são e elas permanecerão assim. Trate-as como poderiam ser e elas se tornarão o que deveriam ser.",
    author: "Stephen R. Covey",
    moduleTag: "Relationships"
  },
  {
    text: "A chave para a felicidade não é ter o que você quer, mas querer o que você tem.",
    author: "Stephen R. Covey",
    moduleTag: "Contentment"
  }
];

// ============================================
// INITIALIZATION FUNCTION
// ============================================

export async function initializeDatabase(): Promise<void> {
  try {
    // Check if quotes already exist
    const quoteCount = await db.quotes.count();
    
    if (quoteCount === 0) {
      // Seed quotes
      await db.quotes.bulkAdd(coveyQuotes);
      console.log('Database seeded with Covey quotes successfully.');
    }
    
    // Seed default roles if empty
    const roleCount = await db.roles.count();
    if (roleCount === 0) {
      await db.roles.bulkAdd([
        { name: 'Pai', description: 'Papel de pai e mentor familiar' },
        { name: 'Filho', description: 'Papel de filho e aprendiz' },
        { name: 'Profissional', description: 'Carreira e desenvolvimento profissional' },
        { name: 'Indivíduo', description: 'Crescimento pessoal e autoconhecimento' }
      ]);
    }
    
    // Seed default habits if empty
    const habitCount = await db.habits.count();
    if (habitCount === 0) {
      await db.habits.bulkAdd([
        { name: 'Exercício Físico', dimension: 'Física', streak: 0 },
        { name: 'Leitura Diária', dimension: 'Mental', streak: 0 },
        { name: 'Meditação/Oração', dimension: 'Espiritual', streak: 0 },
        { name: 'Tempo em Família', dimension: 'Social', streak: 0 }
      ]);
    }
    
    // Seed default relationships if empty
    const relationshipCount = await db.relationships.count();
    if (relationshipCount === 0) {
      await db.relationships.bulkAdd([
        { name: 'Cônjuge', emotionalBankBalance: 100 },
        { name: 'Filho(a)', emotionalBankBalance: 150 },
        { name: 'Pai/Mãe', emotionalBankBalance: 200 },
        { name: 'Amigo Próximo', emotionalBankBalance: 80 }
      ]);
    }
    
    console.log('LegacyOS database initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export async function getRandomQuote(moduleTag?: string): Promise<Quote | null> {
  let collection = db.quotes;
  
  if (moduleTag) {
    collection = db.quotes.where('moduleTag').equals(moduleTag);
  }
  
  const quotes = await collection.toArray();
  
  if (quotes.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

export async function getTodaysBigRocks(): Promise<Task[]> {
  return await db.tasks
    .where('quadrant')
    .equals(2)
    .and(task => task.isBigRock === true)
    .toArray();
}

export async function getAllHabits(): Promise<Habit[]> {
  return await db.habits.toArray();
}

export async function incrementHabitStreak(habitId: number): Promise<void> {
  const habit = await db.habits.get(habitId);
  if (habit) {
    await db.habits.update(habitId, {
      streak: habit.streak + 1,
      lastCompleted: new Date()
    });
  }
}

export async function getAllRelationships(): Promise<Relationship[]> {
  return await db.relationships.toArray();
}

export async function updateEmotionalBankBalance(
  relationshipId: number, 
  amount: number
): Promise<void> {
  const relationship = await db.relationships.get(relationshipId);
  if (relationship) {
    await db.relationships.update(relationshipId, {
      emotionalBankBalance: relationship.emotionalBankBalance + amount
    });
  }
}
