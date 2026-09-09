# 🚀 Guia Rápido: LegacyOS no StackBlitz

## PASSO 1: Preparar os Arquivos

Todos os arquivos já estão prontos na pasta `/workspace`. Você precisa copiar TODOS estes arquivos para o StackBlitz:

### Lista completa de arquivos (14 arquivos):

**Raiz do projeto:**
1. `package.json` - Dependências do projeto
2. `tsconfig.json` - Configuração TypeScript
3. `next.config.js` - Configuração Next.js
4. `tailwind.config.js` - Configuração Tailwind CSS
5. `postcss.config.js` - Configuração PostCSS
6. `.stackblitzrc` - Configuração StackBlitz

**Pasta `app/`:**
7. `app/globals.css` - Estilos e temas (Classic + Neon)
8. `app/layout.tsx` - Layout principal
9. `app/page.tsx` - Dashboard completo com navegação mobile

**Pasta `lib/`:**
10. `lib/db.ts` - Banco de dados Dexie + 15 citações de Covey

**Pasta `hooks/`:**
11. `hooks/use-theme.ts` - Hook para alternar temas

**Pasta `components/ui/`:**
12. `components/ui/Button.tsx` - Botão com variantes por tema
13. `components/ui/Card.tsx` - Card com estilos por tema

**Pasta `components/features/`:**
14. `components/features/ThemeToggle.tsx` - Alternador de temas
15. `components/features/QuoteCard.tsx` - Card de citações
16. `components/features/TaskCard.tsx` - Card de tarefas
17. `components/features/MobileNavigation.tsx` - Navegação mobile

---

## PASSO 2: Copiar para o StackBlitz

### Método Recomendado (um arquivo por vez):

1. **Abra o StackBlitz**: https://stackblitz.com
2. **Clique em "New Project"** → Escolha **"Next.js"**
3. **Para CADA arquivo da lista acima:**
   - Abra o arquivo aqui no GitHub (ou no seu editor)
   - Selecione TODO o conteúdo (Ctrl+A ou Cmd+A)
   - Copie (Ctrl+C ou Cmd+C)
   - No StackBlitz, clique com botão direito na pasta correta
   - "New File" → Digite o MESMO nome do arquivo (ex: `package.json`)
   - Cole o conteúdo (Ctrl+V ou Cmd+V)
   - Salve (Ctrl+S ou Cmd+S)

### Dica Importante:
- Mantenha a MESMA estrutura de pastas!
- Exemplo: `hooks/use-theme.ts` deve estar na pasta `hooks` no StackBlitz também

---

## PASSO 3: Aguardar Instalação

Após colar o `package.json`, o StackBlitz vai:
1. Instalar automaticamente todas as dependências
2. Iniciar o servidor de desenvolvimento
3. Mostrar o preview à direita

**Tempo estimado:** 30-60 segundos

---

## PASSO 4: Testar o App

Quando aparecer "Ready" no terminal:

1. **Veja o preview** na janela direita
2. **Teste no mobile:** 
   - Clique no ícone de celular no preview
   - Ou use DevTools do Chrome (F12 → ícone de celular)
3. **Altere o tema:**
   - Clique no botão "Clássico/Neon" no header
   - Veja a mudança drástica de cores e estilo!
4. **Navegue pelas tabs:**
   - Início, Pedras, Hábitos, Contas (barra inferior no mobile)

---

## ✅ Checklist Final

Antes de testar, verifique se:

- [ ] Todos os 14 arquivos foram copiados
- [ ] As pastas estão na estrutura correta
- [ ] O `package.json` tem todas as dependências
- [ ] O terminal mostra "Ready in Xs"
- [ ] Não há erros vermelhos no console

---

## 🐛 Problemas Comuns

### Erro: "Module not found: framer-motion"
**Solução:** Verifique se o `package.json` foi copiado corretamente e aguarde a instalação.

### Erro: "Cannot resolve '@/hooks/use-theme'"
**Solução:** Verifique se `tsconfig.json` tem o `"paths": { "@/*": ["./*"] }`

### Erro: SWC não carrega
**Solução:** Isso é normal no StackBlitz às vezes. Recarregue a página (F5).

---

## 📱 Como Usar no Dia a Dia

**Para o Pai (Tema Clássico):**
- Ative o tema "Clássico"
- Foque nas "Pedras Grandes"
- Leia as citações de Covey
- Monitore a Conta Bancária Emocional

**Para o Filho (Tema Neon):**
- Ative o tema "Neon"
- Complete hábitos para ver animações
- Use a navegação rápida por tabs
- Ganhe streak nos hábitos

---

## 🎉 Pronto!

Seu LegacyOS está rodando! Agora é só usar diariamente.

**Próximos passos opcionais:**
1. Salvar no GitHub
2. Fazer deploy na Vercel (veja `DEPLOY_GUIDE.md`)
3. Personalizar citações e hábitos
