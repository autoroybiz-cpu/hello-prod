<h1 align="center">🚀 Hello Prod – AutoRoy DevOps Project</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Live-success?style=flat-square" />
  <img src="https://img.shields.io/badge/Build-Automated-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Monitoring-UptimeRobot-brightgreen?style=flat-square" />
</p>

---

## 🌐 Live Demo
🔗 https://hello-prod.onrender.com  
🩺 Health: https://hello-prod.onrender.com/healthz

---

## 🧠 Project Overview
This project demonstrates a *complete CI/CD pipeline* for a Node.js service running in the cloud.

Every commit triggers:
1. *GitHub Actions* – builds a Docker image and pushes to GHCR  
2. *Render Deploy Hook* – auto-deploys the latest image to production  
3. *UptimeRobot* – monitors /healthz every 5 minutes

---

## ⚙ Tech Stack

| Component | Technology |
| --- | --- |
| 💻 Language | Node.js (Express) |
| 📦 Containerization | Docker |
| 🔄 CI/CD | GitHub Actions |
| ☁ Hosting | Render |
| 📦 Registry | GitHub Container Registry (GHCR) |
| 🔍 Monitoring | UptimeRobot |
| 🔐 Secrets | GitHub Actions Secrets |

---

## 🧩 Architecture Diagram

```mermaid
graph TD
  A[Developer Pushes Code] --> B[GitHub Actions Builds Docker Image]
  B --> C[Push Image to GHCR]
  C --> D[Trigger Render Deploy Hook]
  D --> E[Render Deploys New Container]
  E --> F[Service Live at hello-prod.onrender.com]
  F --> G[UptimeRobot Monitors /healthz]'''
git clone https://github.com/autoroybiz-cpu/hello-prod.git
cd hello-prod
npm install
npm start
# open http://localhost:3000

Author

Roy Aharonovich – DevOps & Automations | AutoRoy AI 🚀
📧 autoroybiz@gmail.com

md
# 🚀 Hello Prod – פרויקט DevOps של AutoRoy AI

## 🌐 דמו חי
🔗 https://hello-prod.onrender.com  
🩺 בדיקת בריאות: https://hello-prod.onrender.com/healthz

---

## 🧠 תיאור כללי
פרויקט הדגמה ל-**CI/CD מלא** עבור שירות Node.js בענן:
1. **GitHub Actions** בונה Image ודוחף ל-GHCR  
2. **Render Deploy Hook** מבצע Deploy אוטומטי לפרודקשן  
3. **UptimeRobot** מנטר את `/healthz` כל 5 דקות

---

## ⚙ טכנולוגיות

| רכיב | טכנולוגיה |
| --- | --- |
| 💻 שפה | Node.js (Express) |
| 📦 קונטיינרים | Docker |
| 🔄 CI/CD | GitHub Actions |
| ☁ ענן | Render |
| 📦 רג'יסטרי | GitHub Container Registry (GHCR) |
| 🔍 ניטור | UptimeRobot |
| 🔐 סודות | GitHub Secrets |

---

## 🧩 תרשים ארכיטקטורה

mermaid
graph TD
  A[Commit בקוד] --> B[GitHub Actions בונה Docker Image]
  B --> C[דחיפה ל-GHCR]
  C --> D[הפעלת Render Deploy Hook]
  D --> E[Render מעלה קונטיינר חדש]
  E --> F[השירות חי ב-hello-prod.onrender.com]
  F --> G[UptimeRobot מנטר את /healthz]
