// server.js  (ESM)

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// __filename / __dirname ב-ESM
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const app = express();

const PORT        = process.env.PORT || 3000;
const VERSION     = process.env.APP_VERSION || "1.0.0";
const BUILD       = process.env.APP_BUILD || "dev";
const DEPLOYED_AT = process.env.APP_DEPLOYED_AT || new Date().toISOString();
const START       = Date.now();

// סטטיים מ-public + העמוד הראשי
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// בריאות
app.get("/healthz", (_req, res) => {
  res.status(200).json({
    status: "ok",
    version: VERSION,
    build: BUILD,
    deployedAt: DEPLOYED_AT,
    uptime: Math.round((Date.now() - START) / 1000) + "s",
    timestamp: Date.now()
  });
});

// האזנה
app.listen(PORT, () => {
  console.log(🚀 Server running on port ${PORT});
});
});
