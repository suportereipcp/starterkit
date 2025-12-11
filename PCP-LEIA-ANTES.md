# 📘 Manual da Equipe (Starter Kit)

Este documento contém o passo a passo operacional para iniciar, configurar e fazer deploy de novos projetos usando este Starter Kit.

---

## 🎨 Padrões de Código

### Estilização
- Utilize **Tailwind CSS**.
- Para classes condicionais, use **SEMPRE** a função utilitária `cn()` para evitar conflitos.

```tsx
import { cn } from "@/lib/utils";

// Exemplo: Botão fica azul se for admin, senão fica vermelho
<div className={cn("bg-red-500", isAdmin && "bg-blue-500")} />
🚀 Como Iniciar um Novo Projeto (Passo a Passo)1. Clonar a EstruturaCopie os arquivos deste kit para a pasta do novo projeto, EXCETO as pastas e arquivos abaixo (que devem ser gerados do zero):❌ .git/❌ node_modules/❌ .next/2. Instalar DependênciasAbra o terminal na pasta nova e rode:Bashpnpm install
Nota: As bibliotecas essenciais (clsx, tailwind-merge, supabase-js) já estão no package.json e serão instaladas automaticamente.3. Configurar Variáveis LocaisCrie um arquivo .env.local na raiz (baseado no .env.example) e preencha:Ini, TOMLNEXT_PUBLIC_API_URL="http://localhost:3000"

# Conexão Supabase (PCP Suporte Rei)
NEXT_PUBLIC_SUPABASE_URL="[https://eayspanel.pcpsuporterei.site](https://eayspanel.pcpsuporterei.site)"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua-chave-anonima"

# ⚠️ IMPORTANTE: Defina o Schema deste SaaS específico
# Ex: 'rh', 'estoque'. Use 'public' apenas se for genérico.
NEXT_PUBLIC_DB_SCHEMA="nome_do_schema_aqui"
🚢 Como Configurar o Deploy4. Ajustar GitHub ActionsAbra o arquivo .github/workflows/deploy.yml e altere a linha tags para o nome do novo projeto:YAMLtags: suportereipcp/nome-do-novo-saas:latest
5. Configurar Segredos (GitHub Repo)Vá em Settings > Secrets and variables > Actions e adicione:Nome do SecretO que colocarDOCKER_USERNAMESeu usuário Docker HubDOCKER_PASSWORDSua senha/token Docker HubEASYPANEL_WEBHOOK_URLURL do Webhook do serviço no EasypanelNEXT_PUBLIC_SUPABASE_URLURL do SupabaseNEXT_PUBLIC_SUPABASE_ANON_KEYChave AnônimaNEXT_PUBLIC_DB_SCHEMANome do schema (ex: estoque)6. Configurar EasypanelCrie um serviço do tipo App.Source: Selecione "Docker Image".Image: suportereipcp/nome-do-novo-saas:latest.Copie a URL do Webhook e salve no GitHub.Environment: Adicione a variável NEXT_PUBLIC_DB_SCHEMA com o valor do schema (ex: estoque).📂 Estrutura de Arquivos Importantessrc/lib/utils.ts: Contém a função cn (obrigatória para estilos).src/lib/supabase.ts: Cliente do banco de dados (já configurado para Multi-tenancy).
---

### 2. O `README.md` (Versão Limpa para a IA)
*Mantenha o README focado na tecnologia e nas regras para a IA não se perder.*

```markdown
# 🚀 Starter Kit Next.js 15 (Multi-tenancy)

Template base para projetos da **PCP Suporte Rei**.
Para instruções de uso da equipe, consulte o arquivo [INSTRUCOES.md](./INSTRUCOES.md).

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Banco:** Supabase (Self-Hosted via Easypanel)
- **Arquitetura:** Multi-tenancy via Postgres Schemas
- **Deploy:** Docker Standalone + Easypanel

---

## 🤖 Diretrizes para IA (Architecture Guidelines)

**ATENÇÃO IA:** Siga estas regras ao gerar código:

1.  **Multi-tenancy:**
    - Este projeto conecta em um Supabase compartilhado.
    - O schema do banco é definido dinamicamente pela variável `NEXT_PUBLIC_DB_SCHEMA`.
    - **NUNCA** force o schema `public` a menos que seja para tabelas globais (`profiles`, `users`).

2.  **Conexão com Banco:**
    - Use SEMPRE o cliente singleton: `import { supabase } from "@/lib/supabase";`
    - Não crie novos clientes Supabase manualmente.

3.  **Estilização:**
    - Use Tailwind CSS.
    - Use `cn()` para classes condicionais: `className={cn("base", condition && "active")}`.
✅ Não esqueça o passo final!Você mencionou atualizar o arquivo src/lib/supabase.ts. Isso é obrigatório para que o item 3 das instruções funcione.Garanta que o arquivo src/lib/supabase.ts esteja com este código que lê o schema:TypeScriptimport { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// Pega o schema do .env ou usa 'public' se não tiver nada definido
const dbSchema = process.env.NEXT_PUBLIC_DB_SCHEMA || 'public';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: dbSchema,
  },
});