# 🚀 Starter Kit Next.js 15 (Multi-tenancy + Docker + Easypanel)

Este é um template "Plug & Play" configurado para deploy automatizado via Docker Hub e Easypanel, otimizado para **Multi-tenancy** (Vários SaaS consumindo o mesmo Supabase com Schemas diferentes).

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS + `clsx` + `tailwind-merge`
- **Banco de Dados:** Supabase (Self-Hosted no Easypanel)
- **Arquitetura:** Multi-tenancy via Postgres Schemas
- **Deploy:** Docker (Standalone) + GitHub Actions + Easypanel

---

## 🤖 Diretrizes para IA (Architecture Guidelines)

**ATENÇÃO IA:** Ao gerar código para este projeto, siga estritamente estas regras de arquitetura:

### 1. Estratégia de Banco de Dados (Schemas)
Utilizamos uma única instância do Supabase para vários produtos internos.
- **Schema `public`:** Reservado EXCLUSIVAMENTE para dados compartilhados/globais (Tabela `profiles`, `users`, `audit_logs`).
- **Schema do Projeto:** Todo SaaS deve ter seu próprio Schema isolado (ex: `rh`, `estoque`, `financeiro`).
- **Variável de Ambiente:** O nome do schema ativo é definido em `NEXT_PUBLIC_DB_SCHEMA`.

### 2. Conexão e Queries
- Utilize sempre o cliente singleton em `src/lib/supabase.ts`.
- **Dados do SaaS:** Faça queries normais (`supabase.from('tabela')`). O cliente já está configurado para apontar para o schema correto automaticamente.
- **Dados Compartilhados (Cross-Schema):** Para buscar dados de usuários na `public`, force o schema:
  ```typescript
  // Exemplo: Buscando usuário compartilhado estando no schema 'rh'
  await supabase.schema('public').from('profiles').select('*');