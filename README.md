# 🚀 Hello Prod — AutoRoy AI DevOps Project

[![CI Status](https://github.com/autoroybiz-cpu/hello-prod/actions/workflows/ci.yml/badge.svg)](https://github.com/autoroybiz-cpu/hello-prod/actions/workflows/ci.yml)
[![Build & Push](https://github.com/autoroybiz-cpu/hello-prod/actions/workflows/cicd.yml/badge.svg)](https://github.com/autoroybiz-cpu/hello-prod/actions/workflows/cicd.yml)

> 🧠 **AutoRoy Cloud** — Full-stack DevOps demo with Docker, CI/CD, Render, and live health monitoring.
> Built and maintained by AutoRoy AI](https://github.com/autoroybiz-cpu).

---

## 🌐 Live Demo
- **App:** [https://hello-prod.onrender.com](https://hello-prod.onrender.com)
- **Health:** [[https://hello-prod.onrender.com/healthz]
- (https://hello-prod.onrender.com/health)]

---

## 🧩 Overview
This repository demonstrates a **complete CI/CD pipeline** for a Node.js web service:

- 🧱 **Dockerized** Express backend
- ⚙️ **GitHub Actions** for CI (linting, link checks, health tests)
- 🐳 **Build & Push** workflow to GHCR (GitHub Container Registry)
- 🚀 **Render** auto-deploy via `Dockerfile`
- ❤️ **UptimeRobot** monitors `/healthz` endpoint 24/7

---

## 🧠 Tech Stack

| Component | Technology |
|------------|-------------|
| Language | Node.js (Express) |
| Containerization | Docker |
| CI/CD | GitHub Actions |
| Hosting | Render |
| Registry | GHCR (GitHub Container Registry) |
| Monitoring | UptimeRobot |
| Secrets | GitHub Actions Secrets |

---

## 🧭 Architecture Flow

```text
Developer Push → GitHub Actions CI → Build Docker Image
↓
GHCR Registry → Render Deploy Hook → Live Service
↓
UptimeRobot monitors /healthz
{
"status": "ok",
"version": "1.0.0",
"branch": "main",
"build": "abc1234",
"uptimeSec": 87234
}
# Run locally (development)
npm install
node server.js

# Or via Docker
docker build -t autoroy-devops-demo .
docker run -p 8080:80 autoroy-devops-demo
