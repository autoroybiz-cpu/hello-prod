<h1 align="center">🚀 Hello Prod – AutoRoy DevOps Project</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Live-success?style=flat-square" />
  <img src="https://img.shields.io/badge/Build-Automated-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Monitoring-UptimeRobot-brightgreen?style=flat-square" />
</p>

---

** 🌐 Live Demo
🔗 [https://hello-prod.onrender.com](https://hello-prod.onrender.com)  
🩺 Health Check: [https://hello-prod.onrender.com/healthz](https://hello-prod.onrender.com/healthz)

---

**  Project Overview
This project demonstrates a *complete CI/CD pipeline* for a Node.js app, automated from GitHub to cloud deployment.

Every change in the code triggers:
1. *GitHub Actions* – builds & pushes a Docker image  
2. *Render Deploy Hook* – auto-deploys the latest version to production  
3. *UptimeRobot* – monitors uptime every 5 minutes  

---

** ⚙ Tech Stack

| Component | Technology |
|------------|-------------|
|  Language | Node.js (Express) |
|  Containerization | Docker |
|  CI/CD | GitHub Actions |
|  Hosting | Render |
|  Monitoring | UptimeRobot |
|  Secrets Management | GitHub Secrets |

---

** Architecture Diagram
```mermaid
graph TD
  A[Developer Pushes Code] --> B[GitHub Actions Builds Docker Image]
  B --> C[Push to GHCR]
  C --> D[Trigger Render Deploy Hook]
  D --> E[Render Deploys New Container]
  E --> F[Service Live at hello-prod.onrender.com]
  F --> G[UptimeRobot Monitors /healthz Endpoint]
