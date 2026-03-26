-- PicBoost D1 Database Schema
-- Run with: wrangler d1 execute picboost-db --file=./migrations/0001_init.sql

-- Jobs table: tracks image enhancement jobs
CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  enhanced_r2_key TEXT,
  mode TEXT NOT NULL DEFAULT 'enhance',
  scale INTEGER NOT NULL DEFAULT 2,
  file_name TEXT,
  file_size INTEGER,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed
  progress INTEGER DEFAULT 0,
  error TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_jobs_client_id ON jobs(client_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at);

-- Usage quota table: tracks daily usage per client
CREATE TABLE IF NOT EXISTS usage_quota (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id TEXT NOT NULL,
  date TEXT NOT NULL, -- YYYY-MM-DD format
  count INTEGER NOT NULL DEFAULT 0,
  UNIQUE(client_id, date)
);

CREATE INDEX IF NOT EXISTS idx_usage_quota_client_date ON usage_quota(client_id, date);

-- Users table: for authenticated users (Phase 2)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, -- Clerk user ID
  email TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free', -- free, starter, pro
  daily_limit INTEGER NOT NULL DEFAULT 10,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Subscriptions table: for paid plans (Phase 2)
CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  plan TEXT NOT NULL, -- starter, pro
  provider TEXT NOT NULL, -- paypal, stripe
  provider_subscription_id TEXT,
  status TEXT NOT NULL DEFAULT 'active', -- active, cancelled, expired
  current_period_start TEXT NOT NULL,
  current_period_end TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
