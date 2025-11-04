# Careers Page Builder - Implementation Plan

## 📋 Project Overview
Build a multi-tenant Careers Page Builder where Recruiters can customize their company's Careers page and Candidates can browse jobs.

---

## 🏗️ Project Structure

```
careers-builder/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes group
│   │   └── login/
│   │       └── page.tsx
│   ├── (recruiter)/              # Recruiter routes (protected)
│   │   ├── [companySlug]/
│   │   │   ├── edit/
│   │   │   │   └── page.tsx      # Edit page builder
│   │   │   └── preview/
│   │   │       └── page.tsx      # Preview page
│   ├── [companySlug]/
│   │   └── careers/
│   │       └── page.tsx          # Public Careers page
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   │   └── route.ts
│   │   └── companies/
│   │       ├── route.ts          # GET all, POST create
│   │       └── [slug]/
│   │           └── route.ts      # GET, PUT, DELETE by slug
│   ├── components/               # Shared components
│   │   ├── ui/                   # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ...
│   │   ├── recruiter/            # Recruiter-specific components
│   │   │   ├── ThemeEditor/
│   │   │   ├── SectionBuilder/
│   │   │   ├── LogoUploader/
│   │   │   └── PreviewPanel/
│   │   └── candidate/            # Candidate-facing components
│   │       ├── JobCard.tsx
│   │       ├── JobFilters.tsx
│   │       ├── JobSearch.tsx
│   │       └── CompanyHero.tsx
│   ├── lib/                      # Utilities & helpers
│   │   ├── db/                   # Database utilities
│   │   │   ├── client.ts        # Supabase client
│   │   │   └── seed.ts          # Seed data
│   │   ├── auth/                 # Authentication
│   │   │   └── session.ts
│   │   ├── utils/
│   │   │   ├── validation.ts
│   │   │   ├── formatting.ts
│   │   │   └── cn.ts            # Class name utility
│   │   └── types/
│   │       ├── company.ts       # Company, Theme, Section, Job types
│   │       └── index.ts
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useCompany.ts
│   │   └── useJobs.ts
│   ├── middleware.ts             # Route protection
│   ├── layout.tsx
│   └── page.tsx                  # Landing page
├── public/
│   ├── uploads/                  # Uploaded assets
│   │   ├── logos/
│   │   ├── banners/
│   │   └── videos/
├── data/                         # Sample data
│   └── sample-jobs.json
├── .env.local                    # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📦 Dependencies to Install

### Core Dependencies
```bash
# Database - Supabase (PostgreSQL)
npm install @supabase/supabase-js

# Authentication
npm install next-auth@beta  # or @auth/core for Next.js 16
npm install bcryptjs
npm install -D @types/bcryptjs

# Form handling & validation
npm install react-hook-form
npm install zod
npm install @hookform/resolvers

# UI Components & Icons
npm install lucide-react        # Icons
npm install clsx               # Class name utilities
npm install tailwind-merge     # Tailwind merge utility

# File uploads
npm install react-dropzone

# Image handling
npm install next-cloudinary    # or use local storage

# Drag & drop (for section reordering)
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

# SEO & Metadata
npm install next-seo           # Optional but helpful

# Date formatting
npm install date-fns
```

### Development Dependencies
```bash
npm install -D @types/node
npm install -D @types/react
npm install -D @types/react-dom
```

---

## 🗄️ Database Schema (Supabase PostgreSQL)

### Table Created:

**companies** - Single table storing everything:
   - id (UUID), slug (unique), name
   - theme (JSONB) - stores colors, logo, banner, video
   - sections (JSONB) - array of page sections
   - jobs (JSONB) - array of job postings
   - created_at, updated_at (timestamps)

### Database Setup:
- See `SUPABASE_SETUP.md` for detailed setup instructions
- SQL schema file: `supabase/schema.sql` - single table with JSONB
- Run the SQL in Supabase SQL Editor to create the table

---

## 🚀 Implementation Steps

### Phase 1: Project Setup & Foundation (Step 1-3)
1. ✅ Install dependencies
2. ✅ Set up Supabase database and create tables
3. ✅ Create folder structure
4. ✅ Set up environment variables
5. ✅ Create base UI components

### Phase 2: Authentication (Step 4-5)
6. ✅ Implement login system
7. ✅ Set up session management
8. ✅ Create middleware for route protection

### Phase 3: Database & Sample Data (Step 6-7)
9. ✅ Create database schema
10. ✅ Seed sample data from provided spreadsheet

### Phase 4: Recruiter Features (Step 8-12)
11. ✅ Company creation/management API
12. ✅ Theme editor (colors, logo, banner, video)
13. ✅ Section builder (add/remove/reorder sections)
14. ✅ Preview functionality
15. ✅ Edit page UI

### Phase 5: Candidate Features (Step 13-15)
16. ✅ Public Careers page
17. ✅ Job listing with filters (Location, Job Type)
18. ✅ Job search by title
19. ✅ Mobile-responsive design

### Phase 6: SEO & Polish (Step 16-17)
20. ✅ SEO meta tags
21. ✅ Structured data (JSON-LD)
22. ✅ Accessibility improvements

### Phase 7: Documentation & Deployment (Step 18-20)
23. ✅ Write README.md
24. ✅ Write TECH_SPEC.md
25. ✅ Write AGENT_LOG.md
26. ✅ Deploy to Vercel
27. ✅ Create demo video

---

## 📝 Detailed Step-by-Step Plan

### Step 1: Install Dependencies
```bash
npm install @supabase/supabase-js next-auth@beta bcryptjs react-hook-form zod @hookform/resolvers lucide-react clsx tailwind-merge react-dropzone @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities date-fns

npm install -D @types/bcryptjs
```

### Step 2: Set Up Supabase Database
1. Create Supabase account and project at [supabase.com](https://supabase.com)
2. Get your project URL and API keys from Settings > API
3. Open Supabase SQL Editor
4. Copy SQL from `supabase/schema.sql`
5. Run the SQL to create the companies table
6. Verify table is created in Table Editor
7. See `SUPABASE_SETUP.md` for detailed instructions

### Step 3: Create Folder Structure
- Create all directories as per structure above
- Set up base UI components

### Step 4: Environment Variables
Create `.env.local`:
```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# For server-side API routes (if needed)
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Authentication
NEXTAUTH_SECRET="generate-a-random-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Step 5: Authentication Setup
- Create login page
- Set up NextAuth
- Create session utilities
- Protect recruiter routes

### Step 6: Database Schema Implementation
- SQL schema already created in `supabase/schema.sql`
- Table should already exist from Step 2
- Create Supabase client utility in `app/lib/db/client.ts`
- Create seed script in `app/lib/db/seed.ts`

### Step 7: Sample Data Import
- Parse Google Sheets data
- Create seed script
- Import into database

### Step 8: Company Management API
- GET /api/companies
- POST /api/companies
- PUT /api/companies/[slug]
- DELETE /api/companies/[slug]

### Step 9: Theme Editor Component
- Color picker
- Logo upload
- Banner upload
- Video URL input
- Save to database

### Step 10: Section Builder
- Add section component
- Remove section
- Reorder sections (drag & drop)
- Edit section content
- Toggle visibility

### Step 11: Preview Page
- Fetch company data
- Apply theme
- Render sections
- Show jobs preview

### Step 12: Edit Page UI
- Combine theme editor + section builder
- Real-time preview panel
- Save/publish buttons

### Step 13: Public Careers Page
- Dynamic route: `/[companySlug]/careers`
- Fetch company data
- Apply theme
- Render sections
- Display jobs

### Step 14: Job Filters & Search
- Filter by location
- Filter by job type
- Search by title
- Clear filters

### Step 15: Mobile Responsiveness
- Test on mobile
- Adjust layouts
- Touch-friendly interactions

### Step 16: SEO Implementation
- Dynamic meta tags
- Open Graph tags
- Structured data (JSON-LD)
- Sitemap (optional)

### Step 17: Accessibility
- ARIA labels
- Keyboard navigation
- Focus states
- Color contrast checks

### Step 18: Documentation
- README.md (setup, features, usage)
- TECH_SPEC.md (architecture, schema, assumptions)
- AGENT_LOG.md (AI usage notes)

### Step 19: Deployment
- Deploy to Vercel
- Set environment variables
- Test production build

### Step 20: Final Polish
- Bug fixes
- Performance optimization
- Create demo video

---

## 🎯 Key Design Decisions

1. **Database**: Supabase (PostgreSQL) for both development and production
2. **Authentication**: NextAuth.js for simplicity (can integrate with Supabase Auth if needed)
3. **File Storage**: Supabase Storage buckets for logos/banners, or Cloudinary for production
4. **State Management**: React hooks + Context API (no Redux needed for MVP)
5. **Styling**: Tailwind CSS (already set up)
6. **Form Validation**: Zod + React Hook Form

---

## ✅ Testing Checklist

- [ ] Recruiter can login
- [ ] Recruiter can create company
- [ ] Recruiter can customize theme
- [ ] Recruiter can add/remove/reorder sections
- [ ] Recruiter can preview page
- [ ] Recruiter can save changes
- [ ] Candidate can view public Careers page
- [ ] Candidate can filter jobs
- [ ] Candidate can search jobs
- [ ] Mobile responsive
- [ ] SEO meta tags present
- [ ] Accessibility features work

---

## 📅 Estimated Timeline

- **Phase 1-2** (Setup + Auth): 1-2 hours
- **Phase 3** (Database): 1 hour
- **Phase 4** (Recruiter Features): 3-4 hours
- **Phase 5** (Candidate Features): 2-3 hours
- **Phase 6** (SEO & Polish): 1 hour
- **Phase 7** (Documentation): 1-2 hours

**Total: ~9-13 hours** (within the 6-8 hour estimate with some buffer)

---

## 🚨 Important Notes

1. Keep commits small and meaningful
2. Test each feature before moving to next
3. Document AI usage in AGENT_LOG.md as you go
4. Write documentation files manually (not AI-generated)
5. Focus on core functionality first, then polish

