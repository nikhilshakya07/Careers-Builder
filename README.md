# Careers Page Builder

A multi-tenant careers page builder where recruiters can customize their company's careers page and candidates can browse jobs. Built with Next.js, TypeScript, and Supabase.

## What I Built

This is a full-stack app that lets companies create branded careers pages without needing any design skills. Recruiters can customize colors, add sections, upload media, and preview everything before going live. Candidates get a clean, mobile-friendly experience to browse jobs with filters and search.

### Key Features

**For Recruiters:**
- Customize brand theme (colors, logo, banner, video)
- Add/remove/reorder content sections (About Us, Culture, Benefits, etc.)
- Live preview before publishing
- Save and manage all settings per company
- Share public careers link

**For Candidates:**
- Browse jobs with filters (Location, Job Type, Department)
- Search jobs by title or keywords
- Mobile-responsive design
- Accessible UI with keyboard navigation
- SEO-optimized pages with structured data

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Cookie-based (simple slug authentication)
- **Deployment:** Vercel (ready to deploy)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works fine)

### Setup Steps

1. **Clone the repo**
   ```bash
   git clone https://github.com/nikhilshakya07/Careers-Builder.git
   cd Careers-Builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project on [supabase.com](https://supabase.com)
   - Go to SQL Editor and create the companies table:
   ```sql
   CREATE TABLE companies (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     slug TEXT UNIQUE NOT NULL,
     name TEXT,
     theme JSONB DEFAULT '{}',
     sections JSONB DEFAULT '[]',
     jobs JSONB DEFAULT '[]',
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

4. **Environment Variables**
   Create a `.env.local` file in the root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

5. **Seed sample data (optional)**
   ```bash
   # The seed endpoint is available at /api/seed
   # Or use the scripts/seed.ts file
   ```

6. **Run the dev server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## How to Use

### As a Recruiter

1. **Login**
   - Go to `/login`
   - Enter your company slug (e.g., `acme-corp`)
   - You'll be redirected to the edit page

2. **Customize Theme**
   - On `/company-slug/edit`, scroll to Theme Settings
   - Pick colors using the color pickers
   - Add logo URL, banner image URL, and video URL
   - Click "Save Theme"

3. **Add Sections**
   - Scroll to Page Sections
   - Click "Add Section"
   - Choose section type, add title and content
   - Use up/down arrows to reorder
   - Toggle visibility with the eye icon
   - Click "Save Sections"

4. **Preview**
   - Click "Preview" button to see how it looks
   - Make changes and preview again
   - When happy, your public page is at `/company-slug/careers`

### As a Candidate

1. **Visit the careers page**
   - Go to `/[company-slug]/careers`
   - Browse company info and open positions

2. **Search and Filter**
   - Type in the search box to find jobs by title
   - Use dropdown filters for Location, Job Type, Department
   - Click "Clear all" to reset filters

## Project Structure

```
careers-builder/
├── app/
│   ├── (auth)/              # Auth routes
│   │   └── login/
│   ├── (recruiter)/         # Protected recruiter routes
│   │   └── [companySlug]/
│   │       ├── edit/        # Edit page
│   │       └── preview/     # Preview page
│   ├── [companySlug]/
│   │   └── careers/         # Public careers page
│   ├── api/                 # API routes
│   ├── components/          # React components
│   │   ├── candidate/       # Candidate-facing components
│   │   ├── recruiter/       # Recruiter components
│   │   └── ui/              # Base UI components
│   ├── lib/                 # Utilities and helpers
│   └── hooks/               # Custom React hooks
├── data/
│   └── sample-companies.json
└── scripts/
    └── seed.ts
```

## What I Learned

- **Supabase:** This was my first time using Supabase. Learned how to set it up, use JSONB columns for flexible data storage, and connect it with Next.js. The JSONB approach made it easier to store theme, sections, and jobs without creating multiple tables.

- **Accessibility & SEO:** ARIA labels and SEO optimization were completely new to me. Had to learn about semantic HTML, keyboard navigation, structured data (JSON-LD), and making sure screen readers can understand the page. It's more important than I thought.

- **React Patterns:** Got better at organizing components, managing state, and using custom hooks for reusable logic.

## Future Improvements

Here are the future Plans:

1. **File Uploads:** Right now logo/banner are URLs. Would add actual file uploads with Supabase Storage so recruiters can upload images directly.

2. **Complete Candidate Experience:** Add candidate login/registration, then they can see personalized job recommendations and save favorite jobs. The careers page would show more info when they click on a job posting - full description, requirements, benefits, and an apply button.

3. **Job Management UI:** Build a proper interface for recruiters to add/edit/delete jobs with a form, not just editing JSON. Would make it way easier to manage openings.

4. **Analytics Dashboard:** Show recruiters how many people viewed their page, which jobs got the most clicks, what filters candidates used. Help them understand what's working.

5. **Email Notifications:** Let candidates subscribe to job alerts for new positions matching their criteria.

## Deployment

Ready to deploy to Vercel:

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

The app is production-ready and follows Next.js best practices.

## License

This was built as an assignment project. Feel free to use it as a reference or starting point.

---

Built by **Nikhil Shakya**

- 📧 Email: nikhilshakya1308@gmail.com
- 💼 LinkedIn: [nikhil-shakya07](https://www.linkedin.com/in/nikhil-shakya07/)
- 💻 GitHub: [nikhilshakya07](https://github.com/nikhilshakya07)
