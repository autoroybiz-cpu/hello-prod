import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || "1.0.0";
const START_TIME = Date.now();

app.get("/", (req, res) => {
  const uptime = ((Date.now() - START_TIME) / 1000 / 60).toFixed(2);
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>AutoRoy Cloud</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #1a1f71, #6a11cb, #2575fc);
          color: white;
          text-align: center;
          margin: 0;
          padding: 80px 20px;
        }
        h1 {
          font-size: 2.8em;
          margin-bottom: 10px;
        }
        h2 {
          color: #a0c4ff;
          margin-bottom: 30px;
        }
        .info {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          display: inline-block;
          padding: 20px 40px;
        }
        hr {
          border: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          margin: 20px 0;
        }
        footer {
          margin-top: 40px;
          font-size: 13px;
          color: #ccc;
        }
      </style>
    </head>
    <body>
      <h1>🚀 Welcome to AutoRoy Cloud</h1>
      <h2>Continuous Deployment Demo</h2>
      <div class="info">
        <p><strong>Version:</strong> ${VERSION}</p>
        <p><strong>Uptime:</strong> ${uptime} minutes</p>
        <p><strong>Status:</strong> ✅ Running Smoothly</p>
      </div>
      <hr />
      <footer>AutoRoy AI © ${new Date().getFullYear()} — Powered by Render & GitHub Actions</footer>
    </body>
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
