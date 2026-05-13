# ===== STAGE 1: Build =====
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ===== STAGE 2: Production =====
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app .

EXPOSE 3000

CMD ["node", "src/server.js"]