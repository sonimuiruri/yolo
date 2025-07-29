# Ansible Role Explanation — Yolo E-Commerce Deployment

This file explains what each Ansible role does in the deployment of the Yolo e-commerce application. The app runs on a Vagrant-provisioned Ubuntu server using Docker containers.

---

## Role: `docker`

**What it does:**  
Installs Docker Engine, Docker Compose, and required dependencies to allow Ansible to manage containers.

**Ansible modules used:**
- `apt`: Installs Docker packages from apt repositories
- `service`: Starts and enables the Docker service
- `pip`: Installs the Python Docker SDK so Ansible can interact with Docker

---

## Role: `create-network`

**What it does:**  
Creates a Docker bridge network (`yolo-net`) to allow containers (MongoDB, backend, frontend) to communicate.

**Ansible modules used:**
- `community.docker.docker_network`: Creates the Docker network if it doesn't already exist

---

## Role: `setup-mongodb`

**What it does:**  
Pulls and runs a MongoDB container with environment variables and persistent storage.

**Ansible modules used:**
- `community.docker.docker_container`: Runs the MongoDB container

**Important variables:**
- `mongo_image`: Specifies which MongoDB image to use (e.g., `mongo:4.4`)
- `mongo_port`: Port on which MongoDB will be available

---

## Role: `backend-deployment`

**What it does:**  
Builds or pulls the backend Docker image and runs the backend container.

**Ansible modules used:**
- `community.docker.docker_image`: Builds or pulls the backend image
- `community.docker.docker_container`: Runs the backend container and connects it to MongoDB

**Important variables:**
- `backend_image`: Name or tag of the backend image
- `backend_port`: Port used to expose the backend service

---

## Role: `frontend-deployment`

**What it does:**  
Builds or pulls the frontend Docker image and runs the frontend container.

**Ansible modules used:**
- `community.docker.docker_image`: Builds or pulls the frontend image
- `community.docker.docker_container`: Runs the frontend container

**Important variables:**
- `frontend_image`: Name or tag of the frontend image
- `frontend_port`: Port exposed for the frontend app

---

## Role: `update_server`

**What it does:**  
Updates the server’s package index and upgrades installed packages before any deployments.

**Ansible modules used:**
- `apt`: Runs system update and upgrade
- `reboot`: Optionally reboots the system (if configured)

---

## Shared Variables

These variables are defined globally in `group_vars/all.yml` or inside each role's `defaults/main.yml`.

```yaml
# MongoDB
mongo_image: "mongo:4.4"
mongo_port: 27017

# Backend
backend_image: "yolo-backend"
backend_port: 5000

# Frontend
frontend_image: "yolo-frontend"
frontend_port: 3000

# Docker dependencies
docker_packages:
  - docker.io
  - docker-compose
