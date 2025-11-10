import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// ESM-safe __filename & __dirname
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || "1.0.0";
const START = Date.now();

// static files from /public
app.use(express.static(path.join(__dirname, "public")));

// serve index.html
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// health endpoint
app.get("/healthz", (_req, res) => {
  res.status(200).json({
    status: "ok",
    version: VERSION,
    uptime: ((Date.now() - START) / 1000).toFixed(0) + "s",
    timestamp: Date.now()
  });
});

// start server
app.listen(PORT, () => console.log(🚀 Server running on port ${PORT}));

import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || "1.0.0";
const BUILD = process.env.APP_BUILD || "dev";
const DEPLOYED_AT = process.env.APP_DEPLOYED_AT || new Date().toISOString();
const REPO = "autoroybiz-cpu/hello-prod";
const START = Date.now();

app.get("/", (_req, res) => {
  const uptimeMin = ((Date.now() - START) / 60000).toFixed(2);
  res.status(200).send(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>AutoRoy Cloud • CI/CD Demo</title>
<style>
  :root{--bg1:#1a1f71;--bg2:#6a11cb;--bg3:#2575fc;--text:#fff;--muted:#cfd8ff;--card:rgba(255,255,255,.12)}
  *{box-sizing:border-box}
  body{margin:0;min-height:100svh;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;
       font:16px/1.5 system-ui,-apple-system,Segoe UI,Roboto,Arial;color:var(--text);
       background:linear-gradient(135deg,var(--bg1),var(--bg2),var(--bg3));background-size:300% 300%;animation:bg 12s ease infinite}
  @keyframes bg{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  .wrap{width:min(980px,92vw);text-align:center;padding:72px 0 32px}
  h1{font-size:44px;margin:0 0 8px;text-shadow:0 6px 16px rgba(0,0,0,.25)}
  h1 .brand{background:linear-gradient(90deg,#fff,#a0c4ff);-webkit-background-clip:text;color:transparent}
  h2{margin:0;color:var(--muted);font-weight:500}
  <div class="info">
  <p><b>Version:</b> ${process.env.APP_VERSION || "1.0.0"}</p>
  <p><b>Build:</b> ${process.env.APP_BUILD || "local"}</p>
  <p><b>Deployed at:</b> ${process.env.APP_DEPLOYED_AT || "N/A"}</p>
</div>
<hr style="width:60%;border:1px solid rgba(255,255,255,0.2);margin:20px auto;">
  .card{margin:28px auto 14px;display:inline-block;padding:24px 34px;border-radius:14px;
        background:var(--card);backdrop-filter:blur(3px);box-shadow:0 10px 30px rgba(0,0,0,.18)}
  .kv{margin:6px 0}
  .badges img{margin:8px 5px 0;height:20px;vertical-align:middle}
  .actions{margin-top:14px}
  .btn{display:inline-block;margin:4px 6px;padding:10px 14px;border-radius:10px;border:1px solid rgba(255,255,255,.35);
       color:#fff;text-decoration:none}
  footer{margin-top:24px;color:#eaeaea;font-size:13px}
  .toggle{position:fixed;top:14px;right:14px;background:var(--card);border:1px solid rgba(255,255,255,.35);
          padding:8px 12px;border-radius:10px;cursor:pointer}
  body.light{--bg1:#f7f9ff;--bg2:#dde8ff;--bg3:#cfe0ff;--text:#0b0f19;--muted:#3b4a7a;--card:rgba(0,0,0,.06)}
</style>
</head>
<body>
<button class="toggle" id="modeBtn">🌙 Dark</button>
<div class="wrap">
  <h1>🚀 Welcome to <span class="brand">AutoRoy Cloud</span></h1>
  <h2>Continuous Deployment Demo</h2>
  <div class="card">
    <div class="kv"><b>Status:</b> <span style="color:#9cff9c">Running Smoothly</span></div>
    <div class="kv"><b>Version:</b> ${VERSION}</div>
    <div class="kv"><b>Uptime:</b> <span id="up">${uptimeMin}</span> minutes</div>
    <div class="badges">
      <img alt="Live" src="https://img.shields.io/badge/Status-Live-success?style=flat-square">
      <img alt="Build" src="https://img.shields.io/badge/Build-Automated-blue?style=flat-square">
      <img alt="Monitoring" src="https://img.shields.io/badge/Monitoring-UptimeRobot-brightgreen?style=flat-square">
    </div>
    <div class="actions">
      <a class="btn" href="/healthz" target="_blank">🔍 Open /healthz</a>
      <a class="btn" href="https://github.com/autoroybiz-cpu/hello-prod" target="_blank">📦 View Source</a>
    </div>
  </div>
  <footer>AutoRoy AI © ${new Date().getFullYear()} — Powered by Render & GitHub Actions</footer>
</div>
<script>
  // עדכון uptime כל 5 שניות
  const up = document.getElementById('up');
  let start = Date.now() - ${Date.now() - START};
  setInterval(()=>{ up.textContent = ((Date.now()-start)/60000).toFixed(2); }, 5000);

  // Dark/Light toggle
  const b = document.getElementById('modeBtn');
  b.onclick = () => {
    const light = document.body.classList.toggle('light');
    b.textContent = light ? '☀ Light' : '🌙 Dark';
  };
</script>
</body></html>`);
});

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
