# Build stage
FROM node:16-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:stable-alpine

# Copy production build to Nginx default public directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port Nginx is running on
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
