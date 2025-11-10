# --- build metadata ---
ARG APP_VERSION=1.0.0
ARG APP_BUILD=dev
ARG APP_DEPLOYED_AT=""
ENV APP_VERSION=$APP_VERSION \
    APP_BUILD=$APP_BUILD \
    APP_DEPLOYED_AT=$APP_DEPLOYED_AT
# --- end metadata ---
ARG APP_VERSION=1.0.0
ARG APP_BUILD=dev
ARG APP_DEPLOYED_AT=""
ENV APP_VERSION=$APP_VERSION APP_BUILD=$APP_BUILD APP_DEPLOYED_AT=$APP_DEPLOYED_AT
# שלב תלותים
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
# שלב ריצה
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV APP_VERSION=1.0.0
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://localhost:3000/healthz || exit 1
CMD ["npm", "start"]
