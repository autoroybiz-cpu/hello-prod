import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || "1.0.0";
const START_TIME = Date.now();

// דף הבית (HTML מעוצב פשוט)
app.get("/", (_req, res) => {
  const uptimeMin = ((Date.now() - START_TIME) / 60000).toFixed(2);
  res.status(200).send(
    '<!DOCTYPE html>' +
    '<html lang="en"><head><meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<title>AutoRoy Cloud</title>' +
    '<style>body{margin:0;padding:80px 20px;text-align:center;' +
    'font-family:Arial,Helvetica,sans-serif;color:#fff;' +
    'background:linear-gradient(135deg,#1a1f71,#6a11cb,#2575fc)}' +
    'h1{font-size:42px;margin:0 0 10px}h2{color:#a0c4ff;margin:0 0 28px}' +
    '.card{display:inline-block;padding:22px 36px;border-radius:12px;' +
    'background:rgba(255,255,255,.12);backdrop-filter:blur(2px)}' +
    '.kv{margin:6px 0}footer{margin-top:32px;color:#ddd;font-size:13px}' +
    '</style></head><body>' +
    '<h1>🚀 Welcome to AutoRoy Cloud</h1>' +
    '<h2>Continuous Deployment Demo</h2>' +
    '<div class="card">' +
      '<div class="kv"><b>Version:</b> ' + VERSION + '</div>' +
      '<div class="kv"><b>Uptime:</b> ' + uptimeMin + ' minutes</div>' +
      '<div class="kv"><b>Status:</b> ✅ Running Smoothly</div>' +
    '</div>' +
    '<footer>AutoRoy AI © ' + new Date().getFullYear() + ' — Powered by Render & GitHub Actions</footer>' +
    '</body></html>'
  );
});

// נקודת בריאות
app.get("/healthz", (_req, res) => {
  res.status(200).json({
    status: "ok",
    version: VERSION,
    uptime: Math.round((Date.now() - START_TIME) / 1000) + "s",
    timestamp: Date.now()
  });
});

app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});
