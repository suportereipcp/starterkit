# CORREÇÃO 1: Usar Node 20 (Obrigatório para Next.js 15)
FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências usando NPM
RUN npm install

# Copia o resto do código
COPY . .

# --- VARIÁVEIS DE AMBIENTE (Build Time) ---
# Apenas as essenciais do Supabase
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
# ------------------------------------------

# Build do Next.js
RUN npm run build

# CORREÇÃO 2: Voltar para a porta padrão 3000
# O Easypanel mapeia isso automaticamente para a web (80/443)
EXPOSE 3000

# Inicia o servidor
CMD ["npm", "start"]