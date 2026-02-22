import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("network_blocker.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    domain TEXT,
    category TEXT,
    keyword TEXT,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS devices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    ip TEXT UNIQUE,
    mac TEXT UNIQUE,
    status TEXT DEFAULT 'online',
    blocked INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id INTEGER,
    domain TEXT,
    action TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(device_id) REFERENCES devices(id)
  );
`);

// Seed initial data if empty
const userCount = db.prepare("SELECT count(*) as count FROM users").get() as { count: number };
if (userCount.count === 0) {
  db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run("admin", "admin123");
  
  const initialRules = [
    ['facebook.com', 'Social', 'facebook', 1],
    ['tiktok.com', 'Social', 'tiktok', 1],
    ['doubleclick.net', 'Ads', 'ads', 1],
    ['tracking.example.com', 'Tracking', 'track', 0]
  ];
  const insertRule = db.prepare("INSERT INTO rules (domain, category, keyword, active) VALUES (?, ?, ?, ?)");
  initialRules.forEach(r => insertRule.run(...r));

  const initialDevices = [
    ['Work Laptop', '192.168.1.15', '00:1A:2B:3C:4D:5E', 'online', 0],
    ['iPhone 15', '192.168.1.22', 'AA:BB:CC:DD:EE:FF', 'online', 0],
    ['Smart TV', '192.168.1.45', '11:22:33:44:55:66', 'offline', 1]
  ];
  const insertDevice = db.prepare("INSERT INTO devices (name, ip, mac, status, blocked) VALUES (?, ?, ?, ?, ?)");
  initialDevices.forEach(d => insertDevice.run(...d));

  const initialLogs = [
    [1, 'facebook.com', 'blocked'],
    [2, 'google.com', 'allowed'],
    [1, 'doubleclick.net', 'blocked'],
    [3, 'netflix.com', 'allowed'],
    [2, 'tiktok.com', 'blocked']
  ];
  const insertLog = db.prepare("INSERT INTO logs (device_id, domain, action) VALUES (?, ?, ?)");
  initialLogs.forEach(l => insertLog.run(...l));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Auth API
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password);
    if (user) {
      res.json({ success: true, user: { username: (user as any).username } });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  // Dashboard Stats API
  app.get("/api/stats", (req, res) => {
    const totalRules = db.prepare("SELECT count(*) as count FROM rules").get() as any;
    const activeBlocks = db.prepare("SELECT count(*) as count FROM logs WHERE action = 'blocked'").get() as any;
    const totalDevices = db.prepare("SELECT count(*) as count FROM devices").get() as any;
    
    const topBlocked = db.prepare(`
      SELECT domain, count(*) as count 
      FROM logs 
      WHERE action = 'blocked' 
      GROUP BY domain 
      ORDER BY count DESC 
      LIMIT 5
    `).all();

    const dailyStats = db.prepare(`
      SELECT date(timestamp) as date, 
             SUM(CASE WHEN action = 'blocked' THEN 1 ELSE 0 END) as blocked,
             SUM(CASE WHEN action = 'allowed' THEN 1 ELSE 0 END) as allowed
      FROM logs 
      GROUP BY date(timestamp)
      LIMIT 7
    `).all();

    res.json({
      summary: {
        totalRules: totalRules.count,
        activeBlocks: activeBlocks.count,
        totalDevices: totalDevices.count
      },
      topBlocked,
      dailyStats
    });
  });

  // Rules API
  app.get("/api/rules", (req, res) => {
    const rules = db.prepare("SELECT * FROM rules ORDER BY created_at DESC").all();
    res.json(rules);
  });

  app.post("/api/rules", (req, res) => {
    const { domain, category, keyword } = req.body;
    const result = db.prepare("INSERT INTO rules (domain, category, keyword) VALUES (?, ?, ?)").run(domain, category, keyword);
    res.json({ id: result.lastInsertRowid });
  });

  app.patch("/api/rules/:id", (req, res) => {
    const { active } = req.body;
    db.prepare("UPDATE rules SET active = ? WHERE id = ?").run(active ? 1 : 0, req.params.id);
    res.json({ success: true });
  });

  app.delete("/api/rules/:id", (req, res) => {
    db.prepare("DELETE FROM rules WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Devices API
  app.get("/api/devices", (req, res) => {
    const devices = db.prepare("SELECT * FROM devices").all();
    res.json(devices);
  });

  app.patch("/api/devices/:id", (req, res) => {
    const { blocked } = req.body;
    db.prepare("UPDATE devices SET blocked = ? WHERE id = ?").run(blocked ? 1 : 0, req.params.id);
    res.json({ success: true });
  });

  // Logs API
  app.get("/api/logs", (req, res) => {
    const logs = db.prepare(`
      SELECT l.*, d.name as device_name 
      FROM logs l 
      JOIN devices d ON l.device_id = d.id 
      ORDER BY l.timestamp DESC
    `).all();
    res.json(logs);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
