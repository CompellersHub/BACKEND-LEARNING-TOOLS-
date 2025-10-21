# syntax=docker.io/docker/dockerfile:1

FROM node:24-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi


# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Ensures we have permission to update /app directory
RUN \
  set -ex; \
  addgroup -g 1001 -S nodejs; \
  adduser -S web -u 1001; \
  chown -R web:nodejs /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Get .env during build 
ARG ENV_FILE_CONTENT
ENV ENV_FILE_CONTENT=$ENV_FILE_CONTENT


# Run build 
RUN \
  set -ex; \
  echo "$ENV_FILE_CONTENT" > .env.local; \
  if [ -d dist ]; then rm -r dist; fi; \
  npm run build


USER web

ARG PORT=80
EXPOSE $PORT
ENV PORT=$PORT

CMD HOSTNAME="0.0.0.0" node dist/main.js
