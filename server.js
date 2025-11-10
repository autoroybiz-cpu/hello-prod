import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || "1.0.0";
const START_TIME = Date.now();

app.get("/", (req, res) => {
  const uptime = ((Date.now() - START_TIME) / 1000 / 60).toFixed(2);
  res.send(`
    <html style="font-family: Arial; background: linear-gradient(135deg,#2b1055,#7597de); color: white; text-align:center; padding-top:100px;">
      <h1>🚀 Welcome to AutoRoy Cloud</h1>
      <h2>Environment: Production ✅</h2>
      <p>Version: <b>${VERSION}</b></p>
      <p>Uptime: ${uptime} minutes</p>
      <p>Status: <span style="color:lime;">Running Smoothly</span></p>
      <hr style="width:50%; border:1px solid white;">
      <p>Powered by <b>Render + GitHub Actions + Docker</b></p>
      <p style="font-size:13px; color:#ccc;">AutoRoy AI © ${new Date().getFullYear()}</p>
    </html>
  `);
});

app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "ok",
    version: VERSION,
    uptime: ((Date.now() - START_TIME) / 1000).toFixed(0) + "s",
    timestamp: Date.now(),
  });
});

app.listen(PORT, () => console.log(✅ Server running on port ${PORT}));
