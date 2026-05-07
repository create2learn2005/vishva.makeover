// ═══════════════════════════════════════════════════════════
//  Makeover By Vishva — Express + PostgreSQL Server v3.0
// ═══════════════════════════════════════════════════════════

require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ── DATABASE ────────────────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL ||
    'postgresql://neondb_owner:npg_O4AgwPM9hyFl@ep-withered-shape-aorlmoix-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false },
  max: 10,
  min: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 15000,
  allowExitOnIdle: false,
});

pool.on('error', (err) => {
  console.error('❌  Idle client error:', err.message);
});

pool.on('connect', () => {
  console.log('✅  New DB client connected');
});

// ── QUERY WITH RETRY ────────────────────────────────────────
async function queryWithRetry(text, params = [], retries = 3) {
  let lastErr;
  for (let i = 0; i < retries; i++) {
    try {
      return await pool.query(text, params);
    } catch (err) {
      lastErr = err;
      const isRetryable = err.code === 'ECONNRESET' || err.code === '57P01' ||
        err.message?.includes('terminating connection') ||
        err.message?.includes('connection timeout') ||
        err.message?.includes('idle');
      if (!isRetryable || i === retries - 1) throw err;
      const delay = 200 * Math.pow(2, i);
      console.warn(`⚠️  DB query retry ${i + 1}/${retries} in ${delay}ms:`, err.message);
      await new Promise(r => setTimeout(r, delay));
    }
  }
  throw lastErr;
}

// ── AUTO-CREATE TABLES ──────────────────────────────────────
async function initDB() {
  let client;
  try {
    client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id          SERIAL PRIMARY KEY,
        name        VARCHAR(200)  NOT NULL,
        phone       VARCHAR(30)   NOT NULL,
        email       VARCHAR(200),
        service     VARCHAR(200)  NOT NULL,
        date        DATE          NOT NULL,
        time        VARCHAR(20)   NOT NULL,
        message     TEXT,
        status      VARCHAR(30)   NOT NULL DEFAULT 'pending',
        created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS contacts (
        id          SERIAL PRIMARY KEY,
        name        VARCHAR(200)  NOT NULL,
        phone       VARCHAR(30),
        email       VARCHAR(200),
        message     TEXT          NOT NULL,
        created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS testimonials (
        id          SERIAL PRIMARY KEY,
        name        VARCHAR(200)  NOT NULL,
        service     VARCHAR(200),
        rating      INTEGER       NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
        review      TEXT          NOT NULL,
        approved    BOOLEAN       NOT NULL DEFAULT TRUE,
        created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS gallery (
        id          SERIAL PRIMARY KEY,
        title       VARCHAR(300)  NOT NULL DEFAULT 'Untitled',
        description TEXT,
        category    VARCHAR(50)   NOT NULL DEFAULT 'general',
        image_data  BYTEA         NOT NULL,
        image_type  VARCHAR(50)   NOT NULL DEFAULT 'image/jpeg',
        created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS settings (
        key         VARCHAR(100)  PRIMARY KEY,
        value       TEXT          NOT NULL,
        updated_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
      );
    `);

    // Seed default settings if empty
    await client.query(`
      INSERT INTO settings (key, value) VALUES
        ('site_name', 'Makeover By Vishva'),
        ('site_phone', '6355781262'),
        ('site_location', 'Juni Vasni, Gujarat'),
        ('site_instagram', 'v.i.s.h.v.a__b.e.a.u.t.y'),
        ('booking_hours', 'Mon-Sat 10AM-7PM'),
        ('price_eyebrow', '₹100'),
        ('price_wax', '₹150'),
        ('price_facial', '₹300'),
        ('price_hairspa', '₹400'),
        ('price_makeup', '₹500')
      ON CONFLICT (key) DO NOTHING;
    `);

    console.log('✅  Database tables ready (bookings, contacts, testimonials, gallery, settings)');
  } catch (err) {
    console.error('❌  DB init error:', err.message);
    // Don't exit — let server run, DB might come online later
  } finally {
    if (client) client.release();
  }
}

// ── MIDDLEWARE ──────────────────────────────────────────────
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});

// Serve static files from same directory
app.use(express.static(__dirname, {
  etag: true,
  lastModified: true,
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
}));

const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// ── HEALTH ──────────────────────────────────────────────────
app.get('/api/health', wrap(async (req, res) => {
  try {
    const r = await queryWithRetry('SELECT NOW() as time');
    res.json({ ok: true, db: 'connected', time: r.rows[0].time, server: 'Makeover By Vishva v3' });
  } catch (err) {
    res.status(503).json({ ok: false, db: 'disconnected', error: err.message });
  }
}));

// ── SETTINGS ────────────────────────────────────────────────
app.get('/api/settings', wrap(async (req, res) => {
  const { rows } = await queryWithRetry('SELECT key, value FROM settings ORDER BY key');
  const settings = Object.fromEntries(rows.map(r => [r.key, r.value]));
  res.json(settings);
}));

app.post('/api/settings', wrap(async (req, res) => {
  const { key, value } = req.body;
  if (!key || value === undefined)
    return res.status(400).json({ success: false, error: 'Key and value required' });

  await queryWithRetry(
    `INSERT INTO settings (key, value) VALUES ($1, $2)
     ON CONFLICT (key) DO UPDATE SET value=$2, updated_at=NOW()`,
    [key.trim(), String(value).trim()]
  );
  res.json({ success: true });
}));

// ════════ BOOKINGS ══════════════════════════════════════════
app.get('/api/bookings', wrap(async (req, res) => {
  const { rows } = await queryWithRetry('SELECT * FROM bookings ORDER BY created_at DESC');
  res.json(rows);
}));

app.post('/api/bookings', wrap(async (req, res) => {
  const { name, phone, email, service, date, time, message } = req.body;
  if (!name || !phone || !service || !date || !time)
    return res.status(400).json({ success: false, error: 'Required fields missing' });

  const { rows } = await queryWithRetry(
    `INSERT INTO bookings (name, phone, email, service, date, time, message)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
    [name.trim(), phone.trim(), email?.trim() || null,
     service.trim(), date, time.trim(), message?.trim() || null]
  );
  console.log(`📅  New booking #${rows[0].id}: ${name} – ${service}`);
  res.json({ success: true, id: rows[0].id });
}));

app.patch('/api/bookings/:id', wrap(async (req, res) => {
  const { status } = req.body;
  const valid = ['pending', 'confirmed', 'cancelled', 'completed'];
  if (!valid.includes(status))
    return res.status(400).json({ success: false, error: 'Invalid status' });

  await queryWithRetry('UPDATE bookings SET status=$1 WHERE id=$2', [status, req.params.id]);
  res.json({ success: true });
}));

app.delete('/api/bookings/:id', wrap(async (req, res) => {
  await queryWithRetry('DELETE FROM bookings WHERE id=$1', [req.params.id]);
  res.json({ success: true });
}));

// ════════ CONTACT ════════════════════════════════════════════
app.get('/api/contact', wrap(async (req, res) => {
  const { rows } = await queryWithRetry('SELECT * FROM contacts ORDER BY created_at DESC');
  res.json(rows);
}));

app.post('/api/contact', wrap(async (req, res) => {
  const { name, phone, email, message } = req.body;
  if (!name || !message)
    return res.status(400).json({ success: false, error: 'Name and message required' });

  await queryWithRetry(
    'INSERT INTO contacts (name, phone, email, message) VALUES ($1,$2,$3,$4)',
    [name.trim(), phone?.trim() || null, email?.trim() || null, message.trim()]
  );
  console.log(`💬  New message from: ${name}`);
  res.json({ success: true });
}));

app.delete('/api/contact/:id', wrap(async (req, res) => {
  await queryWithRetry('DELETE FROM contacts WHERE id=$1', [req.params.id]);
  res.json({ success: true });
}));

// ════════ TESTIMONIALS ═══════════════════════════════════════
app.get('/api/testimonials', wrap(async (req, res) => {
  const { rows } = await queryWithRetry(
    'SELECT id, name, service, rating, review, created_at FROM testimonials WHERE approved=TRUE ORDER BY created_at DESC'
  );
  res.json(rows);
}));

app.post('/api/testimonials', wrap(async (req, res) => {
  const { name, service, rating, review } = req.body;
  if (!name || !review)
    return res.status(400).json({ success: false, error: 'Name and review required' });

  const r = Math.min(5, Math.max(1, parseInt(rating) || 5));
  await queryWithRetry(
    'INSERT INTO testimonials (name, service, rating, review) VALUES ($1,$2,$3,$4)',
    [name.trim(), service?.trim() || null, r, review.trim()]
  );
  res.json({ success: true });
}));

app.patch('/api/testimonials/:id', wrap(async (req, res) => {
  const { approved } = req.body;
  await queryWithRetry('UPDATE testimonials SET approved=$1 WHERE id=$2', [!!approved, req.params.id]);
  res.json({ success: true });
}));

app.delete('/api/testimonials/:id', wrap(async (req, res) => {
  await queryWithRetry('DELETE FROM testimonials WHERE id=$1', [req.params.id]);
  res.json({ success: true });
}));

// ════════ GALLERY ════════════════════════════════════════════
app.get('/api/gallery', wrap(async (req, res) => {
  const { rows } = await queryWithRetry(
    'SELECT id, title, description, category, image_type, created_at FROM gallery ORDER BY created_at DESC'
  );
  res.json(rows);
}));

app.get('/api/gallery/:id/image', wrap(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

  const { rows } = await queryWithRetry('SELECT image_data, image_type FROM gallery WHERE id=$1', [id]);
  if (!rows.length) return res.status(404).json({ error: 'Photo not found' });

  const { image_data, image_type } = rows[0];
  let buffer;

  if (Buffer.isBuffer(image_data)) {
    buffer = image_data;
  } else if (typeof image_data === 'string') {
    if (image_data.startsWith('\\x')) {
      buffer = Buffer.from(image_data.slice(2), 'hex');
    } else {
      try {
        buffer = /^[0-9a-fA-F]+$/.test(image_data)
          ? Buffer.from(image_data, 'hex')
          : Buffer.from(image_data, 'base64');
      } catch {
        return res.status(500).json({ error: 'Failed to decode image' });
      }
    }
  } else {
    return res.status(500).json({ error: 'Unknown image data type' });
  }

  res.set('Content-Type', image_type || 'image/jpeg');
  res.set('Cache-Control', 'public, max-age=86400');
  res.set('ETag', `"gallery-${id}"`);
  res.send(buffer);
}));

app.post('/api/gallery/upload', wrap(async (req, res) => {
  const { title, description, image_data, image_type, category } = req.body;
  if (!image_data)
    return res.status(400).json({ success: false, error: 'No image data provided' });

  // Strip data-URL prefix
  const base64Clean = image_data.includes(',') ? image_data.split(',')[1] : image_data;
  if (!base64Clean || base64Clean.length < 50)
    return res.status(400).json({ success: false, error: 'Image data invalid or too small' });

  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const type = validTypes.includes(image_type) ? image_type : 'image/jpeg';

  let buf;
  try { buf = Buffer.from(base64Clean, 'base64'); }
  catch { return res.status(400).json({ success: false, error: 'Invalid base64 data' }); }

  if (!buf.length) return res.status(400).json({ success: false, error: 'Empty image buffer' });
  if (buf.length > 15 * 1024 * 1024)
    return res.status(413).json({ success: false, error: 'Image too large (max 15MB)' });

  const safeTitle = (title || 'Untitled').trim().substring(0, 290);
  const safeCat = ['general', 'facial', 'hair', 'makeup'].includes(category) ? category : 'general';

  const { rows } = await queryWithRetry(
    `INSERT INTO gallery (title, description, category, image_data, image_type)
     VALUES ($1,$2,$3,$4,$5) RETURNING id`,
    [safeTitle, description?.trim() || null, safeCat, buf, type]
  );

  console.log(`📷  Photo uploaded  id:${rows[0].id}  size:${(buf.length / 1024).toFixed(1)}KB`);
  res.json({ success: true, id: rows[0].id });
}));

app.delete('/api/gallery/:id', wrap(async (req, res) => {
  await queryWithRetry('DELETE FROM gallery WHERE id=$1', [req.params.id]);
  res.json({ success: true });
}));

// ════════ PAGE ROUTES ════════════════════════════════════════
const pub = (f) => path.join(__dirname, f);

app.get('/',        (_, res) => res.sendFile(pub('index.html')));
app.get('/gallery', (_, res) => res.sendFile(pub('gallery.html')));
app.get('/booking', (_, res) => res.sendFile(pub('booking.html')));
app.get('/book',    (_, res) => res.sendFile(pub('booking.html')));
app.get('/admin',   (_, res) => res.sendFile(pub('admin.html')));
app.get('/photos',  (_, res) => res.sendFile(pub('photos.html')));

// ── 404 / ERROR ─────────────────────────────────────────────
app.use((req, res) => {
  if (req.path.startsWith('/api/'))
    return res.status(404).json({ error: 'API endpoint not found' });
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

app.use((err, req, res, _next) => {
  console.error('🔥  Server error:', err.message);
  if (!res.headersSent)
    res.status(500).json({ success: false, error: 'Internal server error' });
});

// ── GRACEFUL SHUTDOWN ────────────────────────────────────────
function gracefulShutdown(signal) {
  console.log(`\n⚠️  ${signal} received. Closing server...`);
  pool.end(() => {
    console.log('✅  DB pool closed');
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000);
}
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT',  () => gracefulShutdown('SIGINT'));

// ── START ────────────────────────────────────────────────────
initDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🌸  Makeover By Vishva running at http://localhost:${PORT}\n`);
    console.log('   Pages:');
    console.log(`   Homepage  → http://localhost:${PORT}/`);
    console.log(`   Gallery   → http://localhost:${PORT}/gallery`);
    console.log(`   Booking   → http://localhost:${PORT}/booking`);
    console.log(`   Admin     → http://localhost:${PORT}/admin`);
    console.log(`   Photos    → http://localhost:${PORT}/photos\n`);
  });
}).catch(err => {
  console.error('❌  Fatal startup error:', err);
  // Try starting anyway even if DB init fails
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n⚠️  Server running WITHOUT DB at http://localhost:${PORT}`);
  });
});
