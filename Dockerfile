FROM node:18-alpine

WORKDIR /app

# Ativa PNPM
RUN corepack enable && corepack prepare pnpm@latest --activate

# Instala dependências
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

# Copia código fonte
COPY . .

# --- VARIÁVEIS DE AMBIENTE (Build Time) ---
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
# ------------------------------------------

# Build
RUN pnpm run build

EXPOSE 3000
CMD ["pnpm", "start"]
