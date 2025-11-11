// server.js (ESM) — Pro tier, no extra deps
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// __filename / __dirname ב-ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ========= Config ========= */
const HOST = "0.0.0.0";
const PORT = parseInt(process.env.PORT || "3000", 10);
const VERSION = process.env.APP_VERSION || "1.0.0";
const BUILD_RAW = process.env.APP_BUILD || process.env.RENDER_GIT_COMMIT || "dev";
const BUILD = String(BUILD_RAW).slice(0, 7);
const DEPLOYED_AT = process.env.APP_DEPLOYED_AT || new Date().toISOString();
const BRANCH = process.env.APP_BRANCH || process.env.RENDER_GIT_BRANCH || "main";
const STARTED_AT = Date.now();

/* ========= Tiny logger ========= */
app.use((req, res, next) => {
const t0 = Date.now();
res.on("finish", () => {
const ms = Date.now() - t0;
console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${ms}ms)`);
});
next();
});

/* ========= Trust proxy + gentle HTTPS redirect ========= */
app.set("trust proxy", true);
app.use((req, res, next) => {
// דלג על health/metrics כדי למנוע רעשים
if (req.path === "/healthz" || req.path === "/metrics") return next();

const proto = req.get("x-forwarded-proto");
if (proto && proto !== "https") {
return res.redirect(301, `https://${req.get("host")}${req.originalUrl}`);
}
next();
});

/* ========= No-cache for HTML only (פתרון "נפתח באמצע"/קאש ישן) ========= */
app.use((req, res, next) => {
// לכל הבקשות שמחזירות HTML (לא קבצי סטטיק)
if (
req.method === "GET" &&
!/\.(?:css|js|png|jpe?g|svg|ico|webp|txt|json|map)$/.test(req.path)
) {
res.setHeader("Cache-Control", "no-store");
}
next();
});

/* ========= Static assets with caching ========= */
const staticDir = path.join(__dirname, "public");
app.use(
express.static(staticDir, {
etag: true,
lastModified: true,
maxAge: "5m",
setHeaders: (res, filePath) => {
// קבצי build עם hash יקבלו קאש ארוך
if (/\.[0-9a-f]{8,}\.(css|js|png|jpg|svg)$/.test(filePath)) {
res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
} else {
res.setHeader("Cache-Control", "public, max-age=300");
}
res.setHeader("X-Content-Type-Options", "nosniff");
},
})
);

/* ========= Health ========= */
app.get("/healthz", (_req, res) => {
const uptimeSec = Math.round((Date.now() - STARTED_AT) / 1000);
return res.status(200).json({
status: "ok",
version: VERSION,
branch: BRANCH,
build: BUILD,
deployedAt: DEPLOYED_AT,
uptimeSec,
startedAt: new Date(STARTED_AT).toISOString(),
now: new Date().toISOString(),
});
});

/* ========= Prometheus metrics ========= */
app.get("/metrics", (_req, res) => {
const uptimeSec = Math.round((Date.now() - STARTED_AT) / 1000);
res.set("Content-Type", "text/plain; version=0.0.4; charset=utf-8");
res.send(
`# HELP app_info Static labels about this app
# TYPE app_info gauge
app_info{version="${VERSION}",branch="${BRANCH}",build="${BUILD}"} 1

# HELP app_uptime_seconds Uptime of the app in seconds
# TYPE app_uptime_seconds counter
app_uptime_seconds ${uptimeSec}

# HELP http_healthz_last_status Last known /healthz status code
# TYPE http_healthz_last_status gauge
http_healthz_last_status 200
`
);
});

/* ========= Root & SPA fallback ========= */
app.get("/", (_req, res) => {
res.sendFile(path.join(staticDir, "index.html"));
});

// שמור על נתיבי API/מדדים לפני ה-fallback
app.get("*", (req, res, next) => {
if (
req.path.startsWith("/api/") ||
req.path.startsWith("/metrics") ||
req.path.startsWith("/healthz")
) {
return next();
}
res.sendFile(path.join(staticDir, "index.html"));
});

/* ========= Start ========= */
const server = app.listen(PORT, HOST, () => {
console.log(`🚀 AutoRoy Cloud listening on http://${HOST}:${PORT} (v${VERSION} / ${BUILD} @ ${BRANCH})`);
});

/* ========= Graceful shutdown ========= */
function shutdown(signal) {
console.log(`\n${signal} received. Closing server...`);
server.close(err => {
if (err) {
console.error("Error during close:", err);
process.exit(1);
}
console.log("Server closed. Bye 👋");
process.exit(0);
});
setTimeout(() => process.exit(0), 8000).unref();
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
