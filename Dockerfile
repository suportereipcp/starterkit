FROM node:18-alpine

WORKDIR /app

# Copia os arquivos de dependência (package.json e package-lock.json)
# O asterisco * garante que copie o lockfile se ele existir
COPY package*.json ./

# Instala as dependências usando NPM
RUN npm install

# Copia o resto do código
COPY . .

# --- VARIÁVEIS DE AMBIENTE (Build Time) ---
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
# ------------------------------------------

# Build do Next.js
RUN npm run build

EXPOSE 5800

# Inicia o servidor com NPM
CMD ["npm", "start"]