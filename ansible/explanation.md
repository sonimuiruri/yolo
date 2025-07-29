# Ansible Role: Docker Setup — Detailed Explanation

This file explains the purpose and functionality of the `docker` role used in deploying the Yolo E-commerce application. The role ensures Docker is installed and ready for managing containers via Ansible.

---

## 🎯 Purpose

The `docker` role automates the installation of:

- Docker Engine (Community Edition)
- Docker CLI
- Python Docker SDK (required by Ansible to interact with Docker)

This setup allows Ansible to control container creation, network management, and volume mounting for the e-commerce application's services.

---

## 🧩 Task Breakdown

### 1. **Install Required Packages**
```yaml
- name: Install apt packages
