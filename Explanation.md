### Winfrey`s explanation.md

## Base Image 

- **Backend:** 
  `node:16-alpine` 
  > Lightweight, secure, and ideal for production Node.js apps.
  > Initially , i tried using node version 20 and 18, but they both brought some  depency incompatibility issues hence used version 16.
  

- **Frontend:**  
  `nginx:stable-alpine`  
  > perfect for serving React builds.
  > Even after multi-stage building the size of my image so i used the nginx base image which helped reduce the size of my image.

---


###  Backend 
**Multi-stage build for clean and smaller images size:**
> Below is my backend Dockerfile divided into stages for more clarification

1. **Build stage** – installs dependencies:
```
   Dockerfile
  # Specifies the base image used
FROM node:16-alpine AS builder

# Set working directory in the container
WORKDIR /app

RUN npm install

# Copy the rest of the app source 
COPY . .
```


2. **Production stage** – copies built code only:
```
dockerfile
   # Specifies the base image used
FROM node:16-alpine

# Set the same working directory
WORKDIR /app

# Copy only the built app and node_modules from the build stage
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app /app

# Use non-root user for better security
USER node

# Document the port the app runs on making it accessible 
EXPOSE 5000

# Command for Starting the Node.js server
CMD ["npm", "start"]
```
   

---

###  Client
1. **Build stage** – compiles React app:
```
   dockerfile
   # Use Node.js to install and build the React app
   # "AS builder" labels the build stage to compile and build the code
FROM node:16-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy only package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the full source code from the host machine to the container
COPY . .

# Builds the react application
RUN npm run build
```

   

2. **Serve with Nginx**: 
```
   dockerfile
  # Use Nginx to serve the static files and reduce the size of my image
FROM nginx:stable-alpine

# Copies the React production build from the previous stage into Nginx’s default directory:
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the port Nginx listens on since im using Nginx
EXPOSE 80

# Runs Nginx in the foreground, which is required so the container doesn’t shut down right after starting.
CMD ["nginx", "-g", "daemon off;"]
```

---

## Docker Compose Networking

- Uses Docker Compose **version 3.8**.
- Defines a custom network: `Muiruri-net` with **bridge** driver.
- Both backend and client use `Muiruri-net` which allows them to communicate with each other.
- **Containers can communicate using service names** as hostnames.
  - Example: frontend → `http://backend:5000` 
- It is secure to use a common network since internal services are not exposed to the host

---

##  Volumes

> Currently, my project does **not define volumes**, because when i used them it brought alot of conflicting issues
> I tried a couple of times but each time new conflicting issues emerged then i figured my project can work without volumes.

### This are some reasons why:
> It’s stateless – There’s no database or file system that needs to persist data between container restarts.

> All required code is copied during build – The Dockerfiles use COPY . . to include the entire app in the image.

> No persistent user data is handled – The app doesn't store user uploads or long-term session data.

> Frontend is a static React build – It’s bundled during the build stage and served via Nginx.

> Backend runs directly from the built image – There’s no need for runtime code injection or syncing with the host machine.

##  Git Workflow

1. **Clone the Repository**: clone the project repo to your machine on your terminal.
2. **Make changes**:-create the dockerfiles and docker-compose.yml and write your code
                    -create an .env file inside the backend where you will add your Mongo string
3. **Ignore unnecessary files**:
   - Added `.gitignore` to exclude:
  - `node_modules/`
  - `.env`
  - `build/` or `dist/`
3. **Test your changes locally using**: `docker-compose up --build `

4. **Push to git**: 
- Regular commits with clear messages.
- Code pushed to GitHub for version control and sharing.
`git add .`
`git commit -m "Added Dockerfiles and configured docker-compose"`
 ` git push origin main `
 


---

## Tag Naming

Consistent tag format used for pushing images:

```bash
docker tag winfrey-backend-ip winfr3y/winfrey-backend-ip:v1
docker push winfr3y/winfrey-backend-ip:v1

docker tag winfrey-client-ip winfr3y/winfrey-client-ip:v1
docker push winfr3y/winfrey-client-ip:v1
```

Also used the `:latest` tag for most recent builds.

---
## Screenshot of the pushed image on docker hub
<img width="1133" height="789" alt="Screenshot from 2025-07-14 22-34-54" src="https://github.com/user-attachments/assets/90e094fd-6907-43ad-aeee-650f6beeed53" />

<img width="1133" height="789" alt="Screenshot from 2025-07-14 22-35-23" src="https://github.com/user-attachments/assets/907e3af0-b19f-4030-935b-a90646dd499e" />

<img width="1133" height="789" alt="Screenshot from 2025-07-14 22-35-37" src="https://github.com/user-attachments/assets/3ab7e0ab-bcd7-4ad5-9a41-c3f69e4a9f02" />













