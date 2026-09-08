# LegacyOS - Guia de Implantação

## 📋 Passo a Passo para Executar no StackBlitz e Deploy na Vercel

Este guia foi criado para usuários **SEM experiência técnica**. Siga cada passo cuidadosamente.

---

## 🔹 PASSO 1: Abrir no StackBlitz (Execução Imediata)

### O que é StackBlitz?
StackBlitz é um ambiente de desenvolvimento que roda diretamente no seu navegador. Você não precisa instalar nada no seu computador.

### Instruções:

1. **Acesse o site do StackBlitz:**
   - Abra seu navegador e vá para: `https://stackblitz.com`

2. **Crie um novo projeto Next.js:**
   - Clique em "New Project" ou "Novo Projeto"
   - Selecione o template "Next.js" (não selecione templates com TypeScript complexo)

3. **Copie os arquivos do LegacyOS:**
   - No painel esquerdo do StackBlitz, você verá a estrutura de pastas
   - Crie as seguintes pastas clicando no ícone "+" ou "New Folder":
     ```
     /app
     /components/ui
     /components/features
     /hooks
     /lib
     /types
     ```

4. **Cole o código em cada arquivo:**
   - Para cada arquivo listado abaixo, clique em "New File" e cole o conteúdo correspondente:
   
   | Arquivo | Conteúdo |
   |---------|----------|
   | `package.json` | Copie todo o conteúdo do package.json |
   | `tailwind.config.js` | Copie todo o conteúdo do tailwind.config.js |
   | `postcss.config.js` | Copie todo o conteúdo do postcss.config.js |
   | `tsconfig.json` | Copie todo o conteúdo do tsconfig.json |
   | `next.config.js` | Copie todo o conteúdo do next.config.js |
   | `app/globals.css` | Copie todo o CSS (inclui temas Classic e Neon) |
   | `app/layout.tsx` | Copie o layout principal |
   | `app/page.tsx` | Copie o Dashboard completo |
   | `lib/db.ts` | Copie o banco de dados Dexie com as 15 citações |
   | `hooks/use-theme.ts` | Copie o hook de tema |
   | `components/ui/Button.tsx` | Copie o componente Button |
   | `components/ui/Card.tsx` | Copie o componente Card |
   | `components/features/QuoteCard.tsx` | Copie o QuoteCard |
   | `components/features/TaskCard.tsx` | Copie o TaskCard |
   | `components/features/ThemeToggle.tsx` | Copie o ThemeToggle |

5. **Aguarde a instalação automática:**
   - O StackBlitz vai instalar automaticamente todas as dependências listadas no `package.json`
   - Isso pode levar 1-2 minutos. Você verá um terminal na parte inferior mostrando o progresso.

6. **Visualize o aplicativo:**
   - Quando a instalação terminar, o preview do aplicativo aparecerá automaticamente no lado direito da tela
   - Você já pode usar o LegacyOS!

7. **Teste os temas:**
   - Clique no botão de alternar tema no canto superior direito
   - Experimente o tema "Classic Estate" (elegante, estilo jornal) e "Neon Forge" (futurista, gamificado)

---

## 🔹 PASSO 2: Preparar para Deploy na Vercel

### O que é Vercel?
Vercel é uma plataforma gratuita que hospeda seu aplicativo na internet, permitindo que você acesse de qualquer dispositivo.

### Pré-requisitos:
- Ter uma conta GitHub (crie em `https://github.com` se não tiver)
- Ter uma conta Vercel (crie em `https://vercel.com`)

### Instruções:

1. **Salve seu projeto no GitHub:**
   - No StackBlitz, procure o ícone do GitHub no canto superior esquerdo
   - Clique em "Connect Repository" ou "Sync to GitHub"
   - Dê um nome ao seu repositório (ex: `legacyos`)
   - Clique em "Create Repository"

2. **Verifique se tudo foi enviado:**
   - Acesse `https://github.com/SEU_USUARIO/legacyos`
   - Confirme que todos os arquivos estão lá

---

## 🔹 PASSO 3: Fazer Deploy na Vercel

### Instruções:

1. **Acesse a Vercel:**
   - Vá para `https://vercel.com`
   - Faça login com sua conta GitHub

2. **Importe seu projeto:**
   - Clique em "Add New..." → "Project"
   - Na lista de repositórios GitHub, encontre `legacyos`
   - Clique em "Import"

3. **Configure o deploy:**
   - **Framework Preset:** Next.js (já deve estar selecionado automaticamente)
   - **Root Directory:** Deixe como `./`
   - **Build Command:** Deixe em branco (usará o padrão)
   - **Output Directory:** Deixe em branco (usará o padrão `.next`)

4. **Clique em "Deploy":**
   - O processo de build levará 2-3 minutos
   - Você verá um terminal mostrando o progresso

5. **Seu app está online!**
   - Quando o deploy terminar, você verá uma mensagem "Congratulations!"
   - Clique no link gerado (algo como `legacyos.vercel.app`)
   - Seu LegacyOS agora está acessível de qualquer dispositivo!

6. **Compartilhe com seu filho:**
   - Envie o link `https://legacyos.vercel.app` para ele
   - Ele pode acessar pelo celular, tablet ou computador
   - Todos os dados ficam salvos no navegador de cada um (Local-First)

---

## 🎯 Dicas de Uso

### Para o Pai (Tema Classic Estate):
- Use o tema clássico para momentos de reflexão profunda
- A estética de "jornal antigo" facilita a leitura prolongada
- Ideal para planejar Pedras Grandes (Big Rocks) da semana

### Para o Filho (Tema Neon Forge):
- Use o tema neon para sessões de foco gamificadas
- Cada hábito completado mostra animações visuais recompensadoras
- O contador de streak (sequência) motiva a consistência

### Funcionalidades Principais:
1. **Pedras Grandes de Hoje:** Tarefas importantes do Quadrante 2 de Eisenhower
2. **Tracker de Renovação:** 4 dimensões (Física, Mental, Espiritual, Social)
3. **Conta Bancária Emocional:** Acompanhe o saldo emocional dos relacionamentos
4. **Citações Diárias:** 15 citações de Stephen Covey em português

---

## ❓ Solução de Problemas

### "O app não carrega no StackBlitz"
- Recarregue a página (F5)
- Verifique se todos os arquivos foram criados nas pastas corretas
- Aguarde 2-3 minutos para instalação das dependências

### "Erro de build na Vercel"
- Verifique se o `package.json` está correto
- Confirme que todos os arquivos de configuração estão presentes
- Tente fazer deploy novamente

### "Os dados não persistem"
- Os dados são salvos no IndexedDB do navegador (Local-First)
- Se limpar o cache do navegador, os dados serão perdidos
- Cada dispositivo tem seus próprios dados (privacidade total)

---

## 📞 Suporte

Para dúvidas ou melhorias, consulte a documentação do Next.js em `https://nextjs.org/docs`

**Desenvolvido com base nos princípios de "Os 7 Hábitos das Pessoas Altamente Eficazes" de Stephen R. Covey.**
