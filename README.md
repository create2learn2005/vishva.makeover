# 🌸 Viishhva Patel – Beauty Studio Website v2.0

A full-stack beauty salon website with Express.js + PostgreSQL (Neon), featuring a stunning user-facing site and a complete admin panel.

---

## 📁 Project Structure

```
viishhva-beauty/
├── server.js              # Express server (entry point)
├── package.json
├── .env.example           # Copy to .env with your DB URL
├── .gitignore
└── public/
    ├── index.html         # 🌐 Main homepage (hero, services, gallery, booking, reviews, contact)
    ├── gallery.html       # 🖼️  Public masonry gallery with filters & lightbox
    ├── booking.html       # 📅 Dedicated booking page
    ├── admin.html         # 🔐 Admin dashboard (bookings, messages, charts, activity)
    ├── photos.html        # 📷 Admin photo upload & manager
    ├── css/
    │   └── style.css      # Full design system & all page styles
    └── js/
        └── main.js        # Frontend logic (i18n, forms, animations)
```

---

## 🚀 Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Copy .env.example and add your DB URL
cp .env.example .env
# Edit .env and set DATABASE_URL

# 3. Start the server
npm start
```

Server runs at: **http://localhost:3000**

> Tables are **auto-created** on first run — no manual SQL needed.

---

## 📋 Pages

| Page | URL | Who |
|------|-----|-----|
| Homepage | `/` | Public |
| Gallery | `/gallery` | Public |
| Booking | `/booking` | Public |
| **Admin Dashboard** | `/admin` | Admin only |
| **Photo Manager** | `/photos` | Admin only |

---

## 🗄️ Database Tables (auto-created)

| Table | Purpose |
|-------|---------|
| `bookings` | Appointment requests |
| `contacts` | Contact form messages |
| `testimonials` | Client reviews |
| `gallery` | Gallery photos (stored as BYTEA) |

---

## 🔌 API Endpoints

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/bookings` | Get all bookings |
| `POST` | `/api/bookings` | Create booking |
| `PATCH` | `/api/bookings/:id` | Update status |
| `DELETE` | `/api/bookings/:id` | Delete booking |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/contact` | Get all messages |
| `POST` | `/api/contact` | Submit message |

### Testimonials
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/testimonials` | Get approved reviews |
| `POST` | `/api/testimonials` | Submit review |
| `PATCH` | `/api/testimonials/:id` | Toggle approval |
| `DELETE` | `/api/testimonials/:id` | Delete review |

### Gallery
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gallery` | List all photos |
| `GET` | `/api/gallery/:id/image` | Serve photo |
| `POST` | `/api/gallery/upload` | Upload photo (base64) |
| `DELETE` | `/api/gallery/:id` | Delete photo |

---

## 🌐 Deploy on Render / Railway

1. Push this folder to a GitHub repo
2. Create a new **Web Service** on [Render](https://render.com) or [Railway](https://railway.app)
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node server.js`
5. Add environment variable:
   ```
   DATABASE_URL = your_neon_postgresql_url
   ```
6. Done! The site deploys automatically.

### Neon DB (free PostgreSQL)
Sign up at [neon.tech](https://neon.tech) → create a project → copy the connection string → paste into `DATABASE_URL`.

---

## 🔐 Admin Panel Security

The admin panel (`/admin` and `/photos`) is currently open. For production, add a simple password check. Here's a quick approach:

Add to `server.js` before admin routes:
```js
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'viishhva2025';
app.use(['/admin','/photos'], (req, res, next) => {
  const auth = req.headers.authorization;
  // implement basic auth or session check
  next();
});
```

Or deploy admin on a separate private repo/domain.

---

## ✨ Features

- 🌸 Stunning luxury beauty aesthetic
- 📱 Fully responsive (mobile-first)
- 🇮🇳 English + Gujarati language toggle
- 💄 Animated hero with floating petals
- 🖼️ Masonry photo gallery with filters
- 📅 Booking form → PostgreSQL
- 💬 Contact form → PostgreSQL
- ⭐ Client reviews system
- 🔒 Admin dashboard with live stats
- 📊 Booking status doughnut chart
- 📷 Drag & drop photo upload
- 🔄 Auto-refresh every 60s
- 🗑️ Delete/update bookings from admin
- 🌐 WhatsApp float button

---

© 2025 Viishhva Patel Beauty Studio · Juni Vasni, Gujarat
