const $ = (id) => document.getElementById(id);
$("year").textContent = new Date().getFullYear();

async function refresh() {
  try {
    const res = await fetch("/healthz", {cache: "no-store"});
    const data = await res.json();
    $("status").textContent = data.status === "ok" ? "OK" : "Degraded";
    $("status").className = data.status === "ok" ? "ok" : "warn";
    $("version").textContent = data.version ?? "—";
    $("build").textContent = data.build ?? "—";
    $("deployed").textContent = data.deployed_at
      ? new Date(data.deployed_at).toLocaleString()
      : "—";
    const secs = Number((data.uptime ?? "0s").toString().replace("s","")) || 0;
    $("uptime").textContent = (secs/60).toFixed(2) + " minutes";
  } catch (e) {
    $("status").textContent = "Error";
    $("status").className = "warn";
  }
}
refresh();
setInterval(refresh, 5000);
