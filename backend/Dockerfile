# Build Stage
FROM node:13.12.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Production Stage
FROM node:13.12.0-alpine

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder --chown=node:node /app /app

USER node

EXPOSE 5000

CMD ["npm", "start"]

