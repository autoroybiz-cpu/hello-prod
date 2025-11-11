// server.js (ESM, zero extra deps) — AutoRoy Cloud
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

/* ========= ESM dirname/filename ========= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ========= App ========= */
const app = express();

/* ========= Config ========= */
const HOST = "0.0.0.0";
const PORT = Number(process.env.PORT || 3000);
const VERSION = process.env.APP_VERSION || "1.0.0";
const BUILD_RAW = process.env.APP_BUILD || process.env.RENDER_GIT_COMMIT || "dev";
const BUILD = String(BUILD_RAW).slice(0, 7);
const DEPLOYED_AT = process.env.APP_DEPLOYED_AT || new Date().toISOString();
const BRANCH = process.env.APP_BRANCH || process.env.RENDER_GIT_BRANCH || "main";
const STARTED_AT = Date.now();

const staticDir = path.join(__dirname, "public");

/* ========= Tiny logger (חוסך רעש ב-/healthz,/metrics) ========= */
app.use((req, res, next) => {
const t0 = Date.now();
res.on("finish", () => {
if (req.path === "/healthz" || req.path === "/metrics") return;
const ms = Date.now() - t0;
console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${ms}ms)`);
});
next();
});

/* ========= Trust proxy + HTTPS redirect (לא נוגעים ב-health/metrics) ========= */
app.set("trust proxy", true);
app.use((req, res, next) => {
if (req.path === "/healthz" || req.path === "/metrics") return next();
const proto = req.get("x-forwarded-proto");
if (proto && proto !== "https") {
return res.redirect(301, `https://${req.get("host")}${req.originalUrl}`);
}
next();
});

/* ========= Basic security headers ========= */
app.use((_, res, next) => {
// לא מציב CSP כדי לא לשבור inline styles/scripts בדף הסטטי.
res.setHeader("X-Frame-Options", "SAMEORIGIN");
res.setHeader("X-Content-Type-Options", "nosniff");
res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
next();
});

/* ========= No-cache ל־HTML בלבד (מתקן "נפתח מאמצע"/קאש ישן) ========= */
app.use((req, res, next) => {
if (
req.method === "GET" &&
!/\.(?:css|js|png|jpe?g|svg|ico|webp|txt|json|map)$/.test(req.path)
) {
res.setHeader("Cache-Control", "no-store");
}
next();
});

/* ========= Static assets with smart caching ========= */
app.use(
express.static(staticDir, {
etag: true,
lastModified: true,
maxAge: "5m",
setHeaders: (res, filePath) => {
// קבצים עם hash יקבלו immutable לשנה
if (/\.[0-9a-f]{8,}\.(css|js|png|jpe?g|svg|webp)$/.test(filePath)) {
res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
} else {
res.setHeader("Cache-Control", "public, max-age=300");
}
res.setHeader("X-Content-Type-Options", "nosniff");
},
})
);

/* ========= Health JSON (למוניטורים) ========= */
app.get("/healthz", (_req, res) => {
const uptimeSec = Math.round((Date.now() - STARTED_AT) / 1000);
res.status(200).json({
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

/* ========= Pretty health page (לציבור) ========= */
app.get("/health", (_req, res) => {
res.sendFile(path.join(staticDir, "health.html"));
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

/* ========= Root ========= */
app.get("/", (_req, res) => {
res.sendFile(path.join(staticDir, "index.html"));
});

/* ========= API 404 (מונע ליפול לספא) ========= */
app.use("/api", (_req, res) => {
res.status(404).json({ error: "Not found" });
});

/* ========= SPA fallback ========= */
app.get("*", (req, res, next) => {
if (req.path.startsWith("/metrics") || req.path.startsWith("/healthz")) {
return next();
}
res.sendFile(path.join(staticDir, "index.html"));
});

/* ========= Start ========= */
const server = app.listen(PORT, HOST, () => {
console.log(
`🚀 AutoRoy Cloud on http://${HOST}:${PORT} (v${VERSION} / ${BUILD} @ ${BRANCH})`
);
});

/* ========= Graceful shutdown ========= */
function shutdown(signal) {
console.log(`\n${signal} received. Closing server...`);
server.close((err) => {
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
