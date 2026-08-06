# LaunchifyX

Marketing site + admin dashboard for **LaunchifyX** — a startup/agency that builds websites, apps, e-commerce stores and brands.

Built as a single **Next.js full-stack** app: the frontend (landing page UI) and the backend (API + database) live in one project, cleanly separated by directory.

## Tech stack

| Layer        | Tech                                  |
| ------------ | ------------------------------------- |
| Frontend     | Next.js 14 (App Router), React 18, TypeScript |
| Backend      | Next.js Route Handlers (`src/app/api`) |
| Database     | PostgreSQL via Prisma ORM             |
| Styling      | Global CSS + inline styles, dark/light theme |

## Project structure

```
launchifyX/
├── prisma/
│   ├── schema.prisma        # ← DATABASE: models (User, Service, PricingPlan, ClientRequest)
│   └── seed.ts              # seeds demo services + pricing plans
├── public/                  # static assets (logo, favicon)
├── src/
│   ├── app/
│   │   ├── layout.tsx       # root layout + ThemeProvider
│   │   ├── page.tsx         # landing page (composes the components below)
│   │   ├── globals.css
│   │   ├── admin/page.tsx   # admin dashboard
│   │   └── api/             # ← BACKEND (API route handlers)
│   │       ├── clients/         GET, POST   (+ [id]: PUT, DELETE)
│   │       ├── pricing/         GET, POST   (+ [id]: PUT, DELETE)
│   │       ├── services/        GET, POST
│   │       └── analytics/overview/  GET
│   ├── components/          # ← FRONTEND (Navbar, Hero, Pricing, Contact, …)
│   ├── context/             # ThemeContext (dark/light)
│   └── lib/prisma.ts        # Prisma client singleton
├── .env.example
└── next.config.mjs
```

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the database

Copy `.env.example` to `.env` and set `DATABASE_URL` to your PostgreSQL connection string
(local Postgres, or a free hosted DB like [Neon](https://neon.tech) / Supabase / Vercel Postgres).

```bash
cp .env.example .env
```

### 3. Create the schema + seed demo data

```bash
npm run db:push    # create tables from prisma/schema.prisma
npm run db:seed    # insert demo services & pricing plans
```

### 4. Run the dev server

```bash
npm run dev
```

- Site: <http://localhost:3000>
- Admin: <http://localhost:3000/admin>

The contact form submits to `POST /api/clients`, which writes to the database;
new submissions then show up in the admin dashboard.

## Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the dev server                 |
| `npm run build`     | `prisma generate` + production build |
| `npm start`         | Run the production build             |
| `npm run db:push`   | Push the Prisma schema to the DB     |
| `npm run db:seed`   | Seed demo data                       |
| `npm run db:studio` | Open Prisma Studio (DB GUI)          |

## API reference

| Method | Route                     | Description                |
| ------ | ------------------------- | -------------------------- |
| GET    | `/api/clients`            | List all client requests   |
| POST   | `/api/clients`            | Create a request (contact) |
| PUT    | `/api/clients/:id`        | Update status / notes      |
| DELETE | `/api/clients/:id`        | Delete a request           |
| GET    | `/api/services`           | List active services       |
| POST   | `/api/services`           | Create a service           |
| GET    | `/api/pricing`            | List active pricing plans  |
| POST   | `/api/pricing`            | Create a pricing plan      |
| PUT    | `/api/pricing/:id`        | Update a pricing plan      |
| DELETE | `/api/pricing/:id`        | Delete a pricing plan      |
| GET    | `/api/analytics/overview` | Dashboard summary stats    |


