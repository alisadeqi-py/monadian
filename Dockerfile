# Production image: multi-stage build producing a slim Next.js standalone
# server. Use Dockerfile.dev (not this file) for local development.

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* vars are inlined into the client bundle at build time.
# Prefer passing this as a --build-arg (see docker-compose.prod.yml); on
# platforms that don't support build args, a committed .env.production file
# is read automatically by `next build` instead. Deliberately NOT re-exported
# via ENV here — doing so would set an empty-string env var when the arg is
# omitted, which Next.js treats as already-defined and so would silently
# override (blank out) the .env.production value.
ARG NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
