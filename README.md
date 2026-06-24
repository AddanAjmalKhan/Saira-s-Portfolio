# Saira Adnan — Portfolio + Admin Dashboard

This repository contains **two applications** that share **one database**:

```
Portfolio_Saira/
├── Frontend/             # The public portfolio website (Next.js 16)
└── portfolio-dashboard/  # The admin dashboard / CMS (Next.js 16)
```

- The **Frontend** is the public site. Every page reads its content live from the
  database, so anything edited in the dashboard appears immediately.
- The **portfolio-dashboard** is a password-protected admin panel where authorized
  users log in and edit *everything* — name, phone, email, education, publications,
  news, gallery, etc. — with create / edit / delete / reorder for each section.

Both apps talk to the same **Neon Postgres** database via **Prisma**. Images are
uploaded to **Cloudinary**.

---

## 1. Requirements

- Node.js 18+ and npm
- A **Neon** Postgres database (free): https://neon.tech
- A **Cloudinary** account for image uploads (free): https://cloudinary.com

---

## 2. Environment variables

Each app has its own `.env` (copy from the provided `.env.example`). **Never commit `.env`.**

### `Frontend/.env`
```
DATABASE_URL="postgresql://...@...neon.tech/neondb?sslmode=require"
```

### `portfolio-dashboard/.env`
```
DATABASE_URL="postgresql://...@...neon.tech/neondb?sslmode=require"   # SAME as Frontend
JWT_SECRET="a-long-random-string"                                     # openssl rand -base64 32
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
SEED_ADMIN_EMAIL="addenajmalkhanpk@gmail.com"
SEED_ADMIN_PASSWORD="your-strong-password"
SEED_ADMIN_NAME="Adden Ajmal Khan"
```

> The `DATABASE_URL` **must be identical** in both apps — that's how the public
> site shows what you edit in the dashboard.

---

## 3. First-time setup

```bash
# Dashboard — owns the database schema + migrations
cd portfolio-dashboard
npm install
npx prisma migrate dev --name init   # create the database tables
npm run db:seed                       # load all content + create your admin user

# Frontend — read-only client
cd ../Frontend
npm install                           # postinstall runs `prisma generate`
```

`db:seed` is safe to re-run: it only inserts content when the database is empty,
and always makes sure your admin account exists.

---

## 4. Running locally

Open two terminals:

```bash
# Terminal 1 — public site  ->  http://localhost:3000
cd Frontend
npm run dev

# Terminal 2 — dashboard    ->  http://localhost:3001
cd portfolio-dashboard
npm run dev
```

Log in at **http://localhost:3001/login** with your `SEED_ADMIN_EMAIL` /
`SEED_ADMIN_PASSWORD`.

---

## 5. Using the dashboard

- **Sidebar** groups every content type (Identity, Background, Research,
  Achievements, Content pages).
- Each section has a **list** (with delete and ▲▼ reorder) and an **add / edit form**.
- **Profile** and **Page text blocks** are single forms (no list).
- **Users** (admins only) — add, edit, or remove people who can log in. Roles:
  - **ADMIN** — full access, including managing users.
  - **EDITOR** — can edit all content, but not users.
  - **Validation when adding/editing a user:**
    - **Name** — letters/spaces/hyphens/apostrophes/periods, and must be **unique**.
    - **Email** — must be a valid address and **unique**.
    - **Password** — at least 8 characters with **a letter, a number, and a special character**.
- **Images** — Profile photo, Gallery, and News items support uploading an image
  (sent to Cloudinary) or pasting an image URL.

---

## 6. Data model

The schema lives in **`portfolio-dashboard/prisma/schema.prisma`** (source of truth).
`Frontend/prisma/schema.prisma` is a copy used only to generate the read client.

> If you change the schema: edit it in `portfolio-dashboard`, run
> `npx prisma migrate dev` there, then copy the updated `schema.prisma` into
> `Frontend/prisma/` and run `npx prisma generate` in `Frontend`.

---

## 7. Deploying (Vercel)

Deploy the two folders as **two separate Vercel projects**, both pointing at the
**same** Neon database.

1. **Frontend project**
   - Root directory: `Frontend`
   - Env var: `DATABASE_URL`
2. **Dashboard project**
   - Root directory: `portfolio-dashboard`
   - Env vars: `DATABASE_URL`, `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`,
     `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - (No need for `SEED_*` in production — see below.)

Both apps run `prisma generate` automatically during build. After the first deploy,
seed production once from your machine (with the production `DATABASE_URL` in your
local dashboard `.env`): `npm run db:seed`.

> Tip: for higher traffic you can switch `DATABASE_URL` to Neon's **pooled**
> connection string and keep the direct one as `DIRECT_URL` for migrations.

---

## 8. Security notes

- Passwords are hashed with bcrypt; sessions are signed JWTs in an httpOnly **session
  cookie** (cleared when the browser closes, so users are logged out automatically).
- **New users are validated**: unique name, valid + unique email, and a strong password
  (8+ chars with a letter, number and special character). You can optionally restrict
  *which* emails may be added with `ALLOWED_EMAIL_DOMAINS` / `ALLOWED_EMAILS` in the
  dashboard `.env` (leave blank to allow any valid email).
- If your Cloudinary **API Secret** was ever shared in plain text, rotate it in the
  Cloudinary dashboard and update `CLOUDINARY_API_SECRET`.
- Change the seeded admin password after first login (Users → edit yourself).
