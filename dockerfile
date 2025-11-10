FROM node:20-alpine AS deps
WORKDIR /app

# --- build metadata (stage: deps) ---
ARG APP_VERSION=1.0.0
ARG APP_BUILD=dev
ARG APP_DEPLOYED_AT=""
ENV APP_VERSION=${APP_VERSION} \
    APP_BUILD=${APP_BUILD} \
    APP_DEPLOYED_AT=${APP_DEPLOYED_AT}
# --- end metadata ---

COPY package*.json ./
RUN npm ci --omit=dev

# ==============================

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# --- build metadata (stage: runtime) ---
ARG APP_VERSION=1.0.0
ARG APP_BUILD=dev
ARG APP_DEPLOYED_AT=""
ENV APP_VERSION=${APP_VERSION} \
    APP_BUILD=${APP_BUILD} \
    APP_DEPLOYED_AT=${APP_DEPLOYED_AT}
# --- end metadata ---

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://localhost:3000/healthz || exit 1
CMD ["npm","start"]

