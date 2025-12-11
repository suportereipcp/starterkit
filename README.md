# Starter Kit Next.js 15 (Docker + Easypanel)

Este é um template "Plug & Play" configurado para deploy automatizado via Docker Hub e Easypanel.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Banco de Dados/Auth:** Supabase
- **Deploy:** Docker (Standalone) + GitHub Actions + Easypanel

## 🚀 Como usar este Starter Kit

Siga este checklist para iniciar um novo projeto:

### 1. Clonar/Copiar
Copie todos os arquivos deste repositório para a pasta do seu novo projeto, **EXCETO**:
- `.git/` (pasta oculta)
- `node_modules/`
- `.next/`

### 2. Instalar Dependências
Execute o comando abaixo para instalar as bibliotecas do Next.js e os utilitários do sistema:
```bash
pnpm install
```
Se ainda não instalou os pacotes adicionais (`clsx`, `tailwind-merge`, `supabase-js`), rode:
```bash
pnpm add clsx tailwind-merge @supabase/supabase-js
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz baseado nas chaves do seu projeto Supabase:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://sua-url-supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

### 4. Ajustar Deploy (GitHub Actions)
Abra o arquivo `.github/workflows/deploy.yml` e altere a linha `tags` para o nome do seu repositório no Docker Hub:
```yaml
tags: seu-usuario-docker/seu-projeto:latest
```

### 5. Configurar Segredos no GitHub
No repositório do GitHub, vá em **Settings > Secrets and variables > Actions** e adicione:
- `DOCKER_USERNAME`: Seu usuário do Docker Hub.
- `DOCKER_PASSWORD`: Seu token de acesso ou senha do Docker Hub.
- `EASYPANEL_WEBHOOK_URL`: URL do Webhook de deploy do Easypanel.
- `NEXT_PUBLIC_API_URL`: URL da API (ex: domínio de produção).
- `NEXT_PUBLIC_SUPABASE_URL`: URL do Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave anônima do Supabase.

### 6. Configurar Easypanel
1. Crie um novo serviço do tipo **App** no Easypanel.
2. Em **Source**, selecione **Docker Image**.
3. Use a imagem: `seu-usuario-docker/seu-projeto:latest`.
4. Configure o **Webhook** e adicione a URL nos Secrets do GitHub.
5. Adicione as variáveis de ambiente necessárias na aba **Environment**.

## 📂 Estrutura de Pastas Útil
- `src/lib/utils.ts`: Utilitário `cn` para classes Tailwind.
- `src/lib/supabase.ts`: Cliente Supabase Singleton.
- `.github/workflows/`: Pipelines de CI/CD.
