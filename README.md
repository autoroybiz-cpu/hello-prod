# 🚀 AutoRoy Cloud — DevOps Demo

[![CI/CD](https://github.com/autoroybiz-cpu/hello-prod/actions/workflows/ci.yml/badge.svg)](https://github.com/autoroybiz-cpu/hello-prod/actions/workflows/ci.yml)
[![Build & Push](https://github.com/autoroybiz-cpu/hello-prod/actions/workflows/cicd.yml/badge.svg)](https://github.com/autoroybiz-cpu/hello-prod/actions/workflows/cicd.yml)
[![Status](https://img.shields.io/uptimerobot/status/m794346188-cd6b1d5e2f46e22b7adxxxxxx.svg?label=Uptime&color=2ecc71)](https://stats.uptimerobot.com/PACu1aRql)
[![Uptime](https://img.shields.io/uptimerobot/ratio/m794346188-cd6b1d5e2f46e22b7adxxxxxx.svg?label=Uptime%20Ratio)](https://stats.uptimerobot.com/PACu1aRql)

> Production-grade **CI/CD pipeline** demo for a Dockerized web service, built and deployed automatically via **GitHub Actions** + **Render**.

---

## 🌍 Live Demo
- **App:** [https://hello-prod.onrender.com](https://hello-prod.onrender.com)
- **Health Check:** [https://hello-prod.onrender.com/healthz](https://hello-prod.onrender.com/healthz)
- **Status Page:** [AutoRoy Cloud Status](https://stats.uptimerobot.com/PACu1aRql)

---

## 🧠 Overview
AutoRoy Cloud demonstrates a **real DevOps workflow** combining build automation, container deployment, and uptime monitoring.

**Key workflow steps:**
1. On push → GitHub Actions builds a Docker image and pushes it to GHCR.
2. Render automatically redeploys the container from the latest image.
3. UptimeRobot continuously monitors production and `/healthz`.
4. CI workflows (Prettier + link check) validate code quality on every push.

---

## 🧱 Tech Stack

| Component | Technology |
|------------|-------------|
| **Language** | Node.js (Express) |
| **Containerization** | Docker |
| **CI/CD** | GitHub Actions |
| **Hosting** | Render |
| **Registry** | GitHub Container Registry (GHCR) |
| **Monitoring** | UptimeRobot |
| **Secrets & Tokens** | GitHub Actions Secrets |

---

## 🧩 Workflows Included

### **ci.yml**
Runs static checks on every push:
- Prettier formatting
- Broken link verification
- Health endpoint validation

### **cicd.yml**
Builds and pushes Docker images:
- Multi-arch support with QEMU
- Automatic login to GHCR
- Deploy hook triggers Render update

---

## 🩺 Health Check Endpoint
```bash
GET /healthz
{
"status": "ok",
"version": "1.0.0",
"timestamp": 169921234567
}
---








📊 Monitoring & Status
Live service uptime:
➡️ https://stats.uptimerobot.com/PACu1aRqlAttachment.png



🧠 About AutoRoy Cloud
AutoRoy Cloud is a learning-grade DevOps environment created to simulate real-world CI/CD pipelines, showcasing automation, scalability, and reliability.
Built to prove professional-level deployment and monitoring practices.



👨‍💻 Author
Built by AutoRoy (Roy Aharonovich)
🔗 https://hello-prod.onrender.comAttachment.png
📡 Status: Uptime DashboardAttachment.png



🏁 License
This project is released for educational and professional demonstration purposes.

© 2025 AutoRoy. All rights reserved.
