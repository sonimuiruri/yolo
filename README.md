# Ansible Configuration Management 

## Overview

This project automates the deployment of a containerized e-commerce web application using **Ansible** and **Docker**, all running inside a **Vagrant-provisioned Ubuntu 20.04 server**.

The application consists of:
- **MongoDB**: NoSQL database for product storage.
- **Node.js Express Backend**: REST API for managing products.
- **React Frontend**: A dashboard UI to view and add products.

---

## How to Run

### Requirements:
To run the project successfully, make sure the following are installed on your machine:
- Vagrant - to provision the VM.
- VirtualBox - used by Vagrant to create and run virtual machines (VMs) on your local system.
- Ansible - Installs and configures software/services inside the VM

---

### Step-by-Step


# 1 Clone the repository
git clone https://github.com/sonimuiruri/yolo.git
cd yolo

# 2 Start the Vagrant virtual machine (provisions Ubuntu 20.04)
vagrant up

# 3 SSH into the virtual machine (optional, for debugging or manual inspection)
vagrant ssh

# 4 From your HOST machine, run the Ansible playbook to deploy everything
ansible-playbook -i inventory playbook.yml

#  The playbook installs Docker and deploys:
# - MongoDB container
# - Backend Node.js API
# - Frontend React dashboard

 Access the Application
  -Frontend: http://localhost:3000

  -Backend API: http://localhost:5000

### Project Structure

├── Vagrantfile
├── docker-compose.yml
├── ansible/
│ ├── playbook.yml
│ ├── explanation.md
│ ├── roles/
│ │ ├── docker
│ │ ├── create-network
│ │ ├── setup-mongodb
│ │ ├── backend-deployment
│ │ ├── frontend-deployment
│ │ └── update_server
│ └── vars/
│ └── main.yml
├── backend/
│ ├── Dockerfile
│ ├── server.js
│ └── ...
├── client/
│ ├── Dockerfile
│ └── ...
├── group_vars/
│ └── all.yml
├── hosts
├── README.md 



Features and Tools Used

- Modular Ansible roles

- Docker-based deployment

- Persistent MongoDB storage

- Use of tags, blocks, and variables in Ansible

- Tested with Vagrant + VirtualBox

      




