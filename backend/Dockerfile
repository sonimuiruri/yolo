#Use a Node.js base image
FROM node:13.12.0-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# A run time stage
FROM node:13.12.0-alpine

# Set working directory inside container
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder --chown=nodejs:nodejs /app /app

USER nodejs

# Expose the port your app runs on
EXPOSE 5000

# Start the app
CMD ["npm", "start"]