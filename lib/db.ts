import Dexie, { Table } from 'dexie';

export interface Role {
  id?: number;
  name: string;
  description: string;
}

export interface Task {
  id?: number;
  title: string;
  quadrant: number;
  roleId?: number;
  isBigRock: boolean;
  pomodorosCompleted: number;
}

export interface Habit {
  id?: number;
  name: string;
  dimension: 'Física' | 'Mental' | 'Espiritual' | 'Social';
  streak: number;
}

export interface Relationship {
  id?: number;
  name: string;
  emotionalBankBalance: number;
}

export interface Quote {
  id?: number;
  text: string;
  author: string;
  moduleTag: string;
}

class LegacyDatabase extends Dexie {
  roles!: Table<Role>;
  tasks!: Table<Task>;
  habits!: Table<Habit>;
  relationships!: Table<Relationship>;
  quotes!: Table<Quote>;

  constructor() {
    super('LegacyOS');
    
    this.version(1).stores({
      roles: '++id, name',
      tasks: '++id, title, quadrant, roleId, isBigRock',
      habits: '++id, name, dimension',
      relationships: '++id, name',
      quotes: '++id, moduleTag',
    });
  }
}

export const db = new LegacyDatabase();

// Seed data com 15 citações de Covey em pt-BR
const coveyQuotes: Omit<Quote, 'id'>[] = [
  { text: "A coisa mais importante que você faz com sua vida é a vida que vive dentro de você.", author: "Stephen R. Covey", moduleTag: "autoconhecimento" },
  { text: "Comece com o fim em mente.", author: "Stephen R. Covey", moduleTag: "visao" },
  { text: "A confiança é a cola da vida.", author: "Stephen R. Covey", moduleTag: "relacionamentos" },
  { text: "Seja proativo.", author: "Stephen R. Covey", moduleTag: "proatividade" },
  { text: "Primeiro o mais importante.", author: "Stephen R. Covey", moduleTag: "prioridades" },
  { text: "Pense ganha-ganha.", author: "Stephen R. Covey", moduleTag: "colaboracao" },
  { text: "Procure primeiro compreender, depois ser compreendido.", author: "Stephen R. Covey", moduleTag: "comunicacao" },
  { text: "Crie sinergia.", author: "Stephen R. Covey", moduleTag: "colaboracao" },
  { text: "Afie a serra.", author: "Stephen R. Covey", moduleTag: "renovacao" },
  { text: "Nossa conduta determina nossa contribuição.", author: "Stephen R. Covey", moduleTag: "carater" },
  { text: "O problema não é o problema. A atitude em relação ao problema é que é o problema.", author: "Stephen R. Covey", moduleTag: "perspectiva" },
  { text: "Trate uma pessoa como ela é e ela permanecerá assim. Trate-a como ela pode e deve ser, e ela se tornará assim.", author: "Stephen R. Covey", moduleTag: "potencial" },
  { text: "A verdadeira felicidade vem da satisfação em fazer bem um trabalho que vale a pena.", author: "Stephen R. Covey", moduleTag: "propósito" },
  { text: "Não podemos ver sem lentes, e não há tal coisa como lentes sem marcas.", author: "Stephen R. Covey", moduleTag: "percepcao" },
  { text: "A força do caráter é a capacidade de cumprir um compromisso consigo mesmo.", author: "Stephen R. Covey", moduleTag: "integridade" },
];

// Inicializa o banco com dados seed
export async function initializeDB() {
  try {
    const quotesCount = await db.quotes.count();
    if (quotesCount === 0) {
      await db.quotes.bulkAdd(coveyQuotes);
      
      // Adiciona hábitos padrão
      await db.habits.bulkAdd([
        { name: 'Exercício Físico', dimension: 'Física', streak: 0 },
        { name: 'Leitura/Escrita', dimension: 'Mental', streak: 0 },
        { name: 'Meditação/Reflexão', dimension: 'Espiritual', streak: 0 },
        { name: 'Tempo em Família', dimension: 'Social', streak: 0 },
      ]);
      
      // Adiciona relacionamentos padrão
      await db.relationships.bulkAdd([
        { name: 'Filho(a)', emotionalBankBalance: 100 },
        { name: 'Cônjuge', emotionalBankBalance: 100 },
        { name: 'Pai/Mãe', emotionalBankBalance: 100 },
      ]);
      
      // Adiciona tarefas exemplo
      await db.tasks.bulkAdd([
        { title: 'Planejar semana em família', quadrant: 2, isBigRock: true, pomodorosCompleted: 0 },
        { title: 'Ler capítulo de livro', quadrant: 2, isBigRock: true, pomodorosCompleted: 0 },
        { title: 'Exercício matinal', quadrant: 2, isBigRock: false, pomodorosCompleted: 0 },
      ]);
    }
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
  }
}
