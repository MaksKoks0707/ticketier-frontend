# Multi-stage Dockerfile for building and running the Next.js app
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production

# Install dependencies (including dev deps for build)
COPY package*.json ./
RUN npm ci --silent

# Copy source and build
COPY . .
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built assets and package metadata
COPY --from=builder /app/.next .next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3001
CMD ["npm", "start"]
