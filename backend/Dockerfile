ARG BUILD_DATE
ARG VERSION
ARG NODE_ENV=production

FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production && npm cache clean --force

FROM deps AS test

WORKDIR /app

COPY package.json package-lock.json ./
COPY server.js ./
COPY test ./test
RUN npm install
RUN npm test
RUN mkdir -p /tmp && echo test-passed > /tmp/test-pass-marker

FROM node:20-alpine AS production

ARG BUILD_DATE
ARG VERSION
ARG NODE_ENV=production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=test /tmp/test-pass-marker /tmp/test-pass-marker
COPY server.js ./

RUN rm -f /tmp/test-pass-marker

ENV NODE_ENV=${NODE_ENV}
ENV PORT=3000

LABEL org.opencontainers.image.created=$BUILD_DATE
LABEL org.opencontainers.image.version=$VERSION
LABEL org.opencontainers.image.title="product-dashboard-backend"

RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

CMD ["node", "server.js"]