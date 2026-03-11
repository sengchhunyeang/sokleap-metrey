# Development Log - Sokleap Metrey

## Project Overview
Medical prescription management system for hospitals/clinics.

## Tech Stack
- **Framework:** Next.js 15.3.2 + React 19
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** NextAuth.js v5 (JWT-based)
- **Styling:** Tailwind CSS 4
- **Icons:** React Feather

## Database Connection
```
postgresql://postgres:12345@localhost:5432/sokleap_metrey
```

## Default Credentials
- **Email:** admin@sokleap.com
- **Password:** admin123

## Key Features
- Dashboard with statistics
- Patient management (CRUD, CSV import, Khmer/Latin names)
- Doctor management
- Medicine inventory
- Prescription management with dosage schedules (morning/afternoon/evening/night)
- User management (ADMIN, STAFF roles)

## Project Structure
```
src/app/
├── (dashboard)/        # Protected routes
│   ├── page.js         # Dashboard overview
│   ├── patients/       # Patient pages
│   ├── doctors/        # Doctor pages
│   ├── prescriptions/  # Prescription pages
│   └── settings/       # Settings page
├── api/                # REST API endpoints
├── login/              # Public login page
├── components/         # Reusable components
│   ├── Navbar.js
│   ├── Sidebar.js
│   ├── AuthProvider.js
│   └── ui/             # UI components (Button, Card, Table, etc.)
└── lib/
    ├── auth.js         # NextAuth config
    └── prisma.js       # Prisma client

prisma/
├── schema.prisma       # Database schema
└── seed.js             # Seed data
```

## Database Models
- **User** - Admin/Staff accounts
- **Doctor** - Name, specialty, phone, isActive
- **Patient** - Name (Khmer/Latin), gender, age, NSSF ID, national ID, phone, address, enterprise
- **Prescription** - Links Patient + Doctor with diagnosis, appointment date
- **Medicine** - Name, description
- **PrescriptionMedicine** - Dosage schedule (morning/afternoon/evening/night), quantity, instructions

## NPM Scripts
```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Build for production
npm run db:migrate   # Run migrations
npm run db:push      # Push schema to database
npm run db:seed      # Seed initial data
npm run db:studio    # Open Prisma Studio
```

---

## Development Notes

### 2026-01-24
- Project initialized and explored
- Dev server running at http://localhost:3000
- Added "Quick Add" patient mode to `/prescriptions/new`
  - Users can now toggle between "Search Existing" and "Quick Add" modes
  - Quick Add allows entering custom Name, Age, Gender directly
  - Creates new patient record automatically when saving prescription
- Enhanced patient selection with editable fields
  - When selecting a patient from search, Name/Age/Gender fields are now editable
  - Users can modify patient data before saving prescription
  - Patient record is updated automatically if data changes
- Redesigned medicines section with table/array list style
  - Header row: Medicine | Morning | Afternoon | Evening | Night | Qty | Instructions
  - Each medicine displayed as a compact row with inline inputs
  - Delete button on each row
  - Empty state with centered "Add Medicine" button

### 2026-01-29 — Performance & UX Optimization

#### 1. Page-Level Optimizations
- **Dashboard → Server Component**: Removed `'use client'`, `useState`, `useEffect`; queries Prisma directly in async component body. No more client-side fetch for stats.
- **Patients list**: Fixed double-fetch bug — removed redundant `useEffect([page])` that fired alongside the pagination handler's direct `fetchPatients()` call.
- **Doctors list**: Removed redundant initial-load `useEffect`; consolidated separate `total`/`totalPages` states into single `pagination` object.
- **Prescriptions list**: Same consolidation as doctors — merged pagination state, removed redundant useEffect.
- **Prescription detail**: Added `useMemo` for invoice total calculation (`totalKHR`) to avoid recalculating on every render.

#### 2. Build & Runtime Optimization
- **next.config.mjs** fully optimized:
  - `compress: true`, `poweredByHeader: false`, `reactStrictMode: true`
  - `serverExternalPackages`: `@prisma/client`, `bcryptjs`, `xlsx`, `swagger-jsdoc`, `next-swagger-doc` (prevents server-only code leaking into client bundle)
  - Image optimization with `avif`/`webp` formats
  - Cache headers: 1-year immutable for `/_next/static/`, 1-hour for images
  - Security headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`
  - `output: 'standalone'` for minimal production deploys
  - Lazy `@next/bundle-analyzer` integration (only loads when `ANALYZE=true`)
- **Removed 16 unused dependencies** (93 packages total removed from node_modules):
  - All `@radix-ui/*` packages (25), `lucide-react`, `cmdk`, `date-fns`, `react-day-picker`, `next-themes`, `sonner`, `class-variance-authority`, `react-hook-form`, `@hookform/resolvers`, `zod`
- **Deleted unused code**:
  - `src/components/ui/` — 40 shadcn component files (app uses `src/app/components/ui/` instead)
  - `components.json` — shadcn CLI config
  - `src/hooks/` — 4 unused custom hooks (`useApi`, `useDebounce`, `useFetch`, `usePagination`)
  - `src/lib/utils.js` — `cn()` utility only used by deleted shadcn components
- **Font optimization**: Trimmed Inter weights from 7 (`100`–`700`) to 4 (`400`, `500`, `600`, `700`)
- Added `analyze` and `analyze:win` npm scripts for bundle visualization

#### 3. UX Performance — Skeleton Loaders & Suspense
- **Created `Skeleton.js` component** (`src/app/components/ui/Skeleton.js`) with composable primitives:
  - `Skeleton` — base animated pulse block
  - `Skeleton.TableRow` / `Skeleton.TableRows` — configurable row/col skeleton rows
  - `Skeleton.StatCard` — matches dashboard stat card dimensions
  - `Skeleton.Card` — card with header + body line placeholders
  - `Skeleton.DetailPage` — back link + two-column grid layout skeleton
- **Created 7 route-level `loading.js` files** with layout-matching skeletons:
  - `(dashboard)/loading.js` — 4 stat cards + quick actions + table
  - `(dashboard)/patients/loading.js` — header + search + 6-col table
  - `(dashboard)/doctors/loading.js` — header + search + 5-col table
  - `(dashboard)/prescriptions/loading.js` — header + search + 7-col table
  - `(dashboard)/patients/[id]/loading.js` — detail page skeleton
  - `(dashboard)/prescriptions/[id]/loading.js` — prescription document skeleton
  - `(dashboard)/settings/loading.js` — tabs + card + table skeleton
- **Replaced all inline `<Loading>` spinners** in 5 client pages with `<Skeleton.TableRows>` inside always-visible table structures (table headers remain visible → no layout shift)
- **Dashboard Suspense streaming**: Split `RecentPrescriptions` into a separate async component wrapped in `<Suspense fallback={<RecentPrescriptionsFallback />}>` — stat cards render instantly while the table streams in
- Exported `Skeleton` from `src/app/components/ui/index.js`


Pending Task :
To significantly improve performance, I recommend:
   * Converting these pages to Server Components to fetch data directly from Prisma on the server.
   * Implementing Streaming with Suspense to show immediate UI while data is loading.
   * Checking the database indexes in prisma/schema.prisma to ensure queries are optimized.