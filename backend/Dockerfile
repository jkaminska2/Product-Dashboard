FROM node:20-alpine AS base

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --only=production

COPY server.js ./

ENV PORT=3000
ENV INSTANCE_ID=backend-v1

CMD ["npm", "start"]