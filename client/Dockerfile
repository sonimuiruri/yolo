#Use a Node.js base image
FROM node:13.12.0-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other source code
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the built app
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Command to run the built app
CMD ["serve", "-s", "build", "-l", "3000"]


