import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || "1.0.0";

app.get("/", (_req, res) => {
  res.send(Hello Prod 🚀 (version ${VERSION}));
});

app.get("/healthz", (_req, res) => {
  // בדיקה בסיסית – אפשר להוסיף בדיקות DB/תלויות בהמשך
  res.status(200).json({ status: "ok", version: VERSION, timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(Server listening on port ${PORT});
});
