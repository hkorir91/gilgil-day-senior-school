-- Gilgil Day Senior School — Admin CMS schema (Cloudflare D1)
-- Run: wrangler d1 execute gdss-db --remote --file=schema.sql

CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  admin_id INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

-- News & announcements (body = paragraphs separated by blank lines)
CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  photo TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Gallery photos
CREATE TABLE IF NOT EXISTS gallery (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  filter TEXT NOT NULL,
  photo TEXT,
  sort INTEGER NOT NULL DEFAULT 0
);

-- Downloads centre & results files (url points to /api/media/<key> in R2)
CREATE TABLE IF NOT EXISTS downloads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  size TEXT NOT NULL DEFAULT '',
  url TEXT,
  restricted INTEGER NOT NULL DEFAULT 0,
  sort INTEGER NOT NULL DEFAULT 0
);

-- Leadership, staff & page people.
-- section: principal | deputies | academicLeadership | pathwayHeads | trackHeads | coordinators | teachers
CREATE TABLE IF NOT EXISTS people (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  short TEXT,
  section TEXT NOT NULL,
  photo TEXT,
  message TEXT,
  sort INTEGER NOT NULL DEFAULT 0
);

-- Students' Council members (captain message lives in settings)
CREATE TABLE IF NOT EXISTS council (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  photo TEXT,
  sort INTEGER NOT NULL DEFAULT 0
);

-- KCSE achievers / top performers (Alumni page)
CREATE TABLE IF NOT EXISTS achievers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  position TEXT NOT NULL,      -- learner name or "Learner 1"
  grade TEXT NOT NULL,
  destination TEXT,
  note TEXT,
  photo TEXT,
  sort INTEGER NOT NULL DEFAULT 0
);

-- Key/value settings: logo, captain_message, achievers_headline, achievers_summary...
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);

-- Seed admin account. Email: admin@gilgilday.co.ke  Password: ChangeMe@2026
-- CHANGE THIS PASSWORD from the admin panel immediately after first login.
INSERT OR IGNORE INTO admins (email, name, password_hash, salt) VALUES (
  'admin@gilgilday.co.ke',
  'School Administrator',
  '5b28f2f027df4f09f34d2660e343d7b3a9650533d79f26ef93617332cb45d16e',
  '6ed9def1781232490bcea788c8d8c08e'
);

-- ---------------------------------------------------------------
-- Seed KCSE 2025 achievers (24 learners: 4×B, 12×B-, 8×C+)
-- After seeding, sign in and edit each learner to upload their photo.
-- NOTE: these are plain INSERTs, so only run this schema file ONCE.
-- To re-seed, first: wrangler d1 execute gdss-db --remote --command "DELETE FROM achievers; DELETE FROM council;"
-- ---------------------------------------------------------------
INSERT INTO achievers (position, grade, destination, sort) VALUES
  ('Lazaro Brian Suku',         'B',  'University pathway — pending KUCCPS placement', 1),
  ('Wangare Gichungu Samuel',   'B',  'University pathway — pending KUCCPS placement', 2),
  ('Chege Naomi Nyambura',      'B',  'University pathway — pending KUCCPS placement', 3),
  ('Waithera Kelvin Mwaniki',   'B',  'University pathway — pending KUCCPS placement', 4),
  ('Faith Wanjiku Macharia',    'B-', 'University pathway — pending KUCCPS placement', 5),
  ('Waithera Hellen Wambui',    'B-', 'University pathway — pending KUCCPS placement', 6),
  ('Anyango Abdi Suleiman',     'B-', 'University pathway — pending KUCCPS placement', 7),
  ('Wakanyi Elizabeth Ruhiu',   'B-', 'University pathway — pending KUCCPS placement', 8),
  ('Wakonyu Leskar Gakou',      'B-', 'University pathway — pending KUCCPS placement', 9),
  ('Wangari Mary Wanjiku',      'B-', 'University pathway — pending KUCCPS placement', 10),
  ('Wambui Francis Maigua',     'B-', 'University pathway — pending KUCCPS placement', 11),
  ('Njenga Josphat Kimani',     'B-', 'University pathway — pending KUCCPS placement', 12),
  ('Kienje Purity Wangare',     'B-', 'University pathway — pending KUCCPS placement', 13),
  ('Macharia Maryann Njeri',    'B-', 'University pathway — pending KUCCPS placement', 14),
  ('Nanjala Evon Naliaka',      'B-', 'University pathway — pending KUCCPS placement', 15),
  ('Kamau Joseph Karanja',      'B-', 'University pathway — pending KUCCPS placement', 16),
  ('Maingi Peter Kariri',       'C+', 'University pathway — pending KUCCPS placement', 17),
  ('Wambui Francis Gatehi',     'C+', 'University pathway — pending KUCCPS placement', 18),
  ('Ryan Murimi Gichira',       'C+', 'University pathway — pending KUCCPS placement', 19),
  ('Ondieki Peacenate Nyaboke', 'C+', 'University pathway — pending KUCCPS placement', 20),
  ('Macharia Dennis Mwangi',    'C+', 'University pathway — pending KUCCPS placement', 21),
  ('Rotich Edwin Kimutai',      'C+', 'University pathway — pending KUCCPS placement', 22),
  ('Kimani Esther Watiri',      'C+', 'University pathway — pending KUCCPS placement', 23),
  ('Gitonga Junior Njoroge',    'C+', 'University pathway — pending KUCCPS placement', 24);

-- Seed default achievers-section text
INSERT OR IGNORE INTO settings (key, value) VALUES
  ('achievers_headline', 'KCSE 2025 — Our University-Bound Class'),
  ('achievers_summary', 'Congratulations to the 2025 candidate class and their teachers. These 24 learners scored C+ and above — the KUCCPS threshold for direct university placement.');

-- ---------------------------------------------------------------
-- Seed Students' Council slots (3 executive + 9 areas × 2 = 21)
-- ---------------------------------------------------------------
INSERT INTO council (name, role, sort) VALUES
  ('Name — placeholder', 'School Captain', 1),
  ('Name — placeholder', 'Deputy School Captain — Boy', 2),
  ('Name — placeholder', 'Deputy School Captain — Girl', 3),
  ('Name — placeholder', 'Academics Captain', 10),
  ('Name — placeholder', 'Academics Deputy', 11),
  ('Name — placeholder', 'Environment Captain', 12),
  ('Name — placeholder', 'Environment Deputy', 13),
  ('Name — placeholder', 'Furniture Captain', 14),
  ('Name — placeholder', 'Furniture Deputy', 15),
  ('Name — placeholder', 'Laboratory Captain', 16),
  ('Name — placeholder', 'Laboratory Deputy', 17),
  ('Name — placeholder', 'First Responders Captain', 18),
  ('Name — placeholder', 'First Responders Deputy', 19),
  ('Name — placeholder', 'Dining Captain', 20),
  ('Name — placeholder', 'Dining Deputy', 21),
  ('Name — placeholder', 'Games Captain', 22),
  ('Name — placeholder', 'Games Deputy', 23),
  ('Name — placeholder', 'Computer Lab Captain', 24),
  ('Name — placeholder', 'Computer Lab Deputy', 25),
  ('Name — placeholder', 'Peer Counselling Captain', 26),
  ('Name — placeholder', 'Peer Counselling Deputy', 27);
