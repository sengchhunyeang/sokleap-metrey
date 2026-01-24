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
