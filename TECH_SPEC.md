# Technical Specification

## Architecture

I built this with Next.js 16 and Supabase. Used the App Router because it works well for SEO with server-side rendering.

**Why Supabase?** 
First time using it, but the free tier is good and PostgreSQL is flexible. I stored everything in one table with JSONB columns - theme, sections, and jobs are all JSON. Makes it easier to add fields without migrations.

**Authentication:**
Simple cookie-based auth. When recruiter logs in with company slug, I set a cookie. Middleware checks for that cookie before allowing access to edit/preview pages. No NextAuth or complex auth - just a cookie with the company slug.

**Data Storage:**
Everything in one `companies` table. Each company has its own row with JSONB columns for theme, sections, and jobs. Not the most normalized approach, but it's fast to build and works fine for an MVP.

## Database Schema

Single table stores everything:

```sql
create table public.companies (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  name text,
  theme jsonb default '{}'::jsonb,
  sections jsonb default '[]'::jsonb,
  jobs jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

```

**theme** stores: `{ primary, secondary, accent, logo, banner, video }`
**sections** stores: array of `{ id, type, title, content, order, is_visible }`
**jobs** stores: array of `{ id, title, description, location, job_type, department, is_active }`

That's it. One table, JSONB for flexibility.

## Assumptions Made

1. One recruiter per company. No multi-user support - each company slug is one login.

2. Public pages are open. Anyone can view `/company-slug/careers` without logging in.

3. URLs are trusted. No validation on logo/banner/video URLs. If someone puts a bad URL, it just won't load.

4. Jobs are just for browsing. No application flow - candidates just see the listings.

5. **Responsive design is a priority:** The page works well on all screen sizes - mobile, tablet, and desktop. Used Tailwind breakpoints to make it adapt properly.

6. SEO only for public pages. Edit and preview pages don't need meta tags.

## Test Plan

**What I tested manually:**

- Login flow works, redirects properly
- Can edit theme colors, logo, banner, video
- Can add/remove/reorder sections
- Preview shows changes correctly
- Public careers page loads and displays everything
- Job search works (title, location, description)
- Filters work (location, job type, department)
- Filters combine correctly
- Mobile view looks good on different screen sizes
- Keyboard navigation works (Tab through page, arrow keys in dropdowns)
- SEO meta tags are in page source
- Structured data (JSON-LD) is present

**What I'd add if this was production:**
- File upload functionality so recruiters can upload logos and banners directly instead of using URLs
- Complete candidate flow - let candidates create accounts, save favorite jobs, and apply directly from the careers page
- Automated tests for API routes to catch bugs early
- Error monitoring and logging so we know when something breaks
- Better job management UI so recruiters can add/edit jobs through a form instead of editing JSON

But for an MVP, manual testing was enough to verify everything works.
