# LegacyOS - Sistema Pessoal de Eficácia

Um **Sistema Operacional Pessoal** baseado nos princípios de *"Os 7 Hábitos das Pessoas Altamente Eficazes"* de Stephen R. Covey, projetado para ser usado por um pai e seu filho com perfis visuais distintos.

## 🎨 Dual-Theming System

LegacyOS apresenta dois temas que alteram drasticamente a estética e as micro-interações, mantendo a mesma lógica de negócio:

### Tema A: "The Classic Estate" (Para o Pai)
- **Filosofia:** Estoico, elegante, atemporal, focado em leitura profunda e reflexão
- **Estética:** Como um jornal encadernado em couro em uma biblioteca de mogno
- **Cores:** Creme, mogno, ouro envelhecido, verde floresta
- **Tipografia:** Playfair Display (serifada) para títulos, Inter para corpo
- **Animações:** Suaves e lentas (300ms ease-in-out)

### Tema B: "The Neon Forge" (Para o Filho)
- **Filosofia:** Alta energia, futurista, gamificado, focado em progresso e recompensas visuais
- **Estética:** Cyberpunk clean, glassmorphism, neon glow
- **Cores:** Preto profundo, ciano neon, magenta neon, verde elétrico
- **Tipografia:** Space Grotesk (geométrica) para títulos, JetBrains Mono para dados
- **Animações:** Rápidas e responsivas (150ms ease-out)

## 📁 Estrutura do Projeto

```
legacyos/
├── app/
│   ├── globals.css          # CSS com variáveis para AMBOS os temas
│   ├── layout.tsx           # Layout raiz
│   └── page.tsx             # Dashboard principal
├── components/
│   ├── ui/
│   │   ├── Button.tsx       # Botão com variantes por tema (CVA)
│   │   └── Card.tsx         # Card com estilos por tema
│   └── features/
│       ├── QuoteCard.tsx    # Citação aleatória de Covey
│       ├── TaskCard.tsx     # Card de tarefa (Big Rocks)
│       └── ThemeToggle.tsx  # Alternador de temas
├── hooks/
│   └── use-theme.ts         # Hook personalizado para gerenciar tema
├── lib/
│   └── db.ts                # Banco de dados Dexie (IndexedDB)
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🚀 Funcionalidades

### 1. Pedras Grandes de Hoje (Big Rocks)
- Lista de tarefas do Quadrante 2 de Eisenhower (importante, não urgente)
- Indicador visual especial para Big Rocks
- Botão "Iniciar Pomodoro" para sessões de foco

### 2. Tracker de Renovação
- 4 dimensões da natureza humana (Covey):
  - **Física:** Exercício, saúde, energia
  - **Mental:** Leitura, aprendizado, escrita
  - **Espiritual:** Meditação, oração, valores
  - **Social:** Família, amigos, comunidade
- Contador de streak (sequência de dias)
- Animações de recompensa no tema Neon

### 3. Conta Bancária Emocional
- Acompanhamento do saldo emocional dos relacionamentos
- Depósitos (ações positivas) e saques (ações negativas)
- Visualização por cores (verde = saudável, âmbar = atenção, vermelho = crítico)

### 4. Citações Diárias
- 15 citações reais de Stephen R. Covey em português brasileiro
- Exibição elegante no tema Classic (blockquote)
- Efeito typewriter animado no tema Neon

## 💾 Local-First & Privacidade

- **Dexie.js:** Wrapper do IndexedDB para armazenamento local
- **Zero Backend:** Todos os dados ficam no navegador do usuário
- **Privacidade Total:** Nenhum dado é enviado para servidores externos
- **Persistência:** Os dados sobrevivem a refreshes e fechamento do navegador

## 🛠️ Tecnologias

| Tecnologia | Uso |
|------------|-----|
| Next.js 14 | Framework React |
| TypeScript | Tipagem estática |
| Tailwind CSS | Estilização utilitária |
| Framer Motion | Animações e micro-interações |
| Dexie.js | Banco de dados IndexedDB |
| Lucide React | Ícones |
| CVA (Class Variance Authority) | Variantes de componentes |

## 📦 Instalação & Execução

### No StackBlitz (Recomendado para não-programadores)

1. Acesse https://stackblitz.com
2. Crie um novo projeto Next.js
3. Copie todos os arquivos deste repositório
4. O StackBlitz instalará as dependências automaticamente
5. O app estará rodando em segundos!

### Localmente (para desenvolvedores)

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 🌐 Deploy na Vercel

1. Envie este repositório para o GitHub
2. Acesse https://vercel.com
3. Importe o repositório
4. Clique em "Deploy"
5. Seu app estará online em `https://seu-app.vercel.app`

📖 **Guia completo de deploy:** Veja o arquivo `DEPLOY_GUIDE.md` para instruções passo a passo em português.

## 🎯 Princípios de Design

### Classic Estate
- Generoso whitespace (`p-6`, `gap-8`)
- Sombras sutis (`shadow-sm`, `shadow-md`)
- Bordas finas e discretas
- Transições suaves e elegantes
- Zero brilhos neon ou animações saltitantes

### Neon Forge
- Glassmorphism (`bg-white/5 backdrop-blur-md`)
- Bordas neon brilhantes ao hover
- Micro-interações rápidas e responsivas
- Efeitos de glow e partículas
- Tipografia monoespaçada para dados

## 📝 Licença

Este projeto é open-source e disponível sob a licença MIT.

---

**Desenvolvido com base nos ensinamentos de Stephen R. Covey.**

*"Entre o estímulo e a resposta há um espaço. Nesse espaço está nosso poder de escolher nossa resposta."*
