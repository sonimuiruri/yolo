# Build Stage
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Production Stage
FROM node:16-alpine

WORKDIR /app

# Copy the app and dependencies from builder
COPY --from=builder /app /app

# Set ownership to node user
RUN chown -R node:node /app

# Switch to non-root user
USER node

EXPOSE 5000

# Run using npm (available in this image)
CMD ["npm", "start"]

