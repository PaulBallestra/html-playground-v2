# Multi-stage build for Next.js SSR deployment
FROM node:lts-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate

# Set environment variables for build
ENV NODE_ENV=production
# Pass through environment variables needed for build
ARG AUTH_URL
ARG DATABASE_URL
ARG AUTH_SECRET
ARG LIVEBLOCKS_SECRET_KEY
ARG NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY
ARG AUTH_GOOGLE_ID
ARG AUTH_GOOGLE_SECRET

# Generate Prisma client before building
RUN pnpm run db:generate
# CMD pnpx prisma generate && pnpm start


# Build Next.js application
RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Install gosu for proper user switching
# RUN apk add --no-cache gosu

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the built Next.js application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Copy public directory from builder stage
COPY --from=builder /app/public ./public

# Copy startup script
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# Expose port (configurable for different environments)
EXPOSE 3000

# Set default port for both Heroku and VM
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); const options = { hostname: 'localhost', port: process.env.PORT || 3000, path: '/', timeout: 2000 }; const req = http.request(options, (res) => { if (res.statusCode === 200) process.exit(0); else process.exit(1); }); req.on('error', () => process.exit(1)); req.on('timeout', () => process.exit(1)); req.end();"

# Set proper ownership for the nextjs user
RUN chown -R nextjs:nodejs /app

USER nextjs

# Start Next.js server using startup script
CMD ["./start.sh"]