/**
 * pm2 process definition.
 *
 * The port and paths live here rather than in the shell that happens to start
 * the app, so `pm2 reload --update-env` on a later deploy cannot lose them and
 * fall back to port 3000 — which on a shared box is how you end up fighting
 * something else for a socket.
 *
 * Values come from deploy/deploy.env, with real environment variables winning.
 */
const fs = require("node:fs");
const path = require("node:path");

const fromFile = {};
const envPath = path.join(__dirname, "deploy.env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    if (/^\s*(#|$)/.test(line)) continue;
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match) fromFile[match[1]] = match[2];
  }
}

const pick = (key, fallback) =>
  process.env[key] || fromFile[key] || fallback;

const APP_DIR = pick("APP_DIR", path.resolve(__dirname, ".."));

module.exports = {
  apps: [
    {
      name: pick("APP_NAME", "trezuh"),
      script: path.join(APP_DIR, ".next", "standalone", "server.js"),
      cwd: path.join(APP_DIR, ".next", "standalone"),
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 10,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: pick("APP_PORT", "3100"),
        // Loopback only: nginx is the sole way in from outside.
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
