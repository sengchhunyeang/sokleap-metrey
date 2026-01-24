# AI Coding Guidelines for Sokleap Metrey Polyclinic System

## Architecture Overview
- **Framework**: Next.js 15 with App Router (`src/app/`)
- **Database**: Prisma ORM + PostgreSQL
- **Authentication**: NextAuth v5 with credentials provider (bcrypt hashing)
- **Styling**: Tailwind CSS v4
- **Domain**: Medical clinic management (doctors, patients, prescriptions, medicines)

## Key Patterns & Conventions

### API Routes (`src/app/api/`)
- RESTful endpoints returning JSON
- Use Prisma client from `@/lib/prisma`
- Error handling: `try/catch` with `NextResponse.json({ error }, { status })`
- Example: `GET /api/patients` includes recent prescriptions via `include`

### Components (`src/app/components/`)
- Client components (`'use client'`) for interactivity
- Data fetching in `useEffect` with `fetch()` to API routes
- Complex forms manage state arrays (e.g., `PrescriptionForm` with `prescriptionMedicines`)
- User feedback via `alert()` (not toast libraries)

### Authentication & Middleware
- Protected routes via `src/middleware.js` redirect to `/login`
- Auth context from `SessionProvider` in `AuthProvider.js`
- User roles: `ADMIN`, `STAFF` (enum in Prisma schema)

### Database Operations
- Scripts: `npm run db:migrate`, `db:push`, `db:seed`, `db:studio`
- Relations: Prescriptions link patients/doctors, medicines via junction table
- Seed file creates admin user (`admin@sokleap.com` / `admin123`)

### Development Workflow
- **Dev server**: `npm run dev --turbopack` (Turbopack enabled)
- **Build**: `npm run build` (standard Next.js)
- **Navigation**: Sidebar menu with `usePathname` for active states
- **Dashboard**: Fetches stats from multiple APIs on mount

### File Structure Examples
- Pages: `src/app/(dashboard)/patients/page.js` (client component)
- APIs: `src/app/api/patients/route.js` (GET/POST handlers)
- Components: `src/app/components/PrescriptionForm.js` (complex form state)

## Common Tasks
- **Add new entity**: Create API route + page + form component
- **Update schema**: Run `npx prisma migrate dev` after schema.prisma changes
- **Seed data**: `npm run db:seed` for initial data
- **New medicine**: Add to `/api/medicines` POST endpoint

Focus on medical workflow accuracy and data relationships when extending features.