# Build Stage
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Production Stage
FROM node:16-alpine

WORKDIR /app

# Copy node_modules and app files separately to ensure permissions
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app /app

# Use non-root user
USER node

EXPOSE 5000

CMD ["npm", "start"]
