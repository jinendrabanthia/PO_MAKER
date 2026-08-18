# ==========================================
# Stage 1: Builder
# ==========================================
FROM node:20-slim AS builder

WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update && apt-get install -y openssl

# Copy monorepo configurations
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY apps/web/package.json ./apps/web/
COPY packages/calculations/package.json ./packages/calculations/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/validation/package.json ./packages/validation/
COPY packages/pdf-generator/package.json ./packages/pdf-generator/
COPY packages/document-extraction/package.json ./packages/document-extraction/

# Install dependencies (workspaces)
RUN npm install

# Copy source code
COPY . .

# Generate Prisma Client & Build Next.js App
RUN npx prisma generate
# Build the utility packages so dist/ is available
RUN npm run build --workspace=@orderflow/calculations --workspace=@orderflow/shared-types --workspace=@orderflow/validation --workspace=@orderflow/document-extraction --workspace=@orderflow/pdf-generator
RUN npm run build --workspace=web

# ==========================================
# Stage 2: Production Runner (Playwright Base)
# ==========================================
FROM mcr.microsoft.com/playwright:v1.40.0-jammy AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install OpenSSL for Prisma in the runner
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy built application and node_modules from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/package.json ./apps/web/
COPY --from=builder /app/apps/web/public ./apps/web/public

# Copy local packages (with their dist folders)
COPY --from=builder /app/packages ./packages

EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start", "--workspace=web"]
