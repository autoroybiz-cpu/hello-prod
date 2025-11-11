<h1 align="center">🚀 Hello Prod – AutoRoy AI DevOps Project</h1>
# 🚀 AutoRoy Cloud — DevOps Demo

[![CI Status](https://github.com/autoroybiz-cpu/hello-prod/actions/workflows/ci.yml/badge.svg)](https://github.com/autoroybiz-cpu/hello-prod/actions/workflows/ci.yml)
[![Build & Push](https://github.com/autoroybiz-cpu/hello-prod/actions/workflows/cicd.yml/badge.svg)](https://github.com/autoroybiz-cpu/hello-prod/actions/workflows/cicd.yml)

<p align="center">
  <img src="https://img.shields.io/badge/Status-Live-success?style=flat-square" />
  <img src="https://img.shields.io/badge/Build-Automated-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Monitoring-UptimeRobot-brightgreen?style=flat-square" />
  <br/>
  <img src="https://github.com/autoroybiz-cpu/hello-prod/actions/workflows/cicd.yml/badge.svg" alt="CI/CD" />
</p>

---

## 🌐 Live Demo
- App: https://hello-prod.onrender.com  
- Health: https://hello-prod.onrender.com/healthz

---

## 🧠 Overview
Production-style demo showing a *complete CI/CD pipeline* for a Node.js service:
- *GitHub Actions* builds a Docker image and pushes it to *GHCR*
- *Render* deploys the latest image via a *Deploy Hook*
- *UptimeRobot* monitors the /healthz endpoint

---

## ⚙ Tech Stack
| Component | Technology |
| --- | --- |
| Language | Node.js (Express) |
| Containerization | Docker |
| CI/CD | GitHub Actions |
| Hosting | Render |
| Registry | GitHub Container Registry (GHCR) |
| Monitoring | UptimeRobot |
| Secrets | GitHub Actions Secrets |

---

## 🩺 Health Check
*GET* /healthz returns:
```json
{"status":"ok","version":"1.0.0","timestamp":1699621234567}
git clone https://github.com/autoroybiz-cpu/hello-prod.git
cd hello-prod
npm install
npm start
# [open http://localhost:3000](https://hello-prod.onrender.com/health)
