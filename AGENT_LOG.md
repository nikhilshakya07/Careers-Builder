# AI Agent Usage Log

Short notes on how I used AI tools for this project.

## Getting Started

First, I read through the assignment to understand what I needed to build. Then I used ChatGPT to get a better explanation of the requirements and brainstorm ideas for the overall structure. Asked it about folder organization for Next.js apps and how to structure the project.

## Planning Phase

Used ChatGPT to help create an implementation plan. Broke it down into phases:
1. Setup and authentication
2. Database setup
3. Recruiter features
4. Candidate features
5. SEO and accessibility
6. Documentation

This helped me stay organized and not miss anything.

## Development Phase

Switched to Cursor for actual coding. Used it mainly for:
- Generating boilerplate code (components, API routes)
- Creating the folder structure
- Getting Next.js patterns I wasn't familiar with
- Debugging TypeScript errors

## Specific Prompts That Helped

- "How do I set up Supabase with Next.js App Router?"
- "Generate a Next.js API route for updating a company by slug"
- "Create a color picker component in Next"
- "How to filter an array based on multiple conditions in Next"
- "How do I reorder items in an array in Next?"

## Refinements I Made

**Color Picker Issue:**
AI generated a color picker that had an ugly square border showing through. Tried the overflow:hidden fix AI suggested, but it didn't work. Fixed it by hiding the native input completely and using a custom styled div instead.

**Filter Logic:**
AI's filter implementation was too simple - it only checked one filter at a time. I had to rewrite it so multiple filters work together (location AND job type AND department all at once).

**Section Reordering:**
AI suggested drag-and-drop for reordering sections, but that seemed overcomplicated. I went with simple up/down arrow buttons instead.

**Search Functionality:**
AI's search only searched job titles. I expanded it to search in title, description, and location so candidates can find jobs more easily.

## What I Did Without AI

- Made all architectural decisions (single table vs multiple, JSONB approach)
- Designed the database schema
- Decided on the authentication approach (simple cookies)
- Organized components and folder structure
- All styling and UI decisions
- Testing and debugging

## Time Saved

AI probably saved me 3-4 hours on boilerplate and patterns I didn't know. But I also spent time fixing AI-generated code and simplifying over-engineered solutions. Net benefit was maybe 2 hours.

## Key Takeaway

AI is great for getting started and learning patterns, but you still need to understand what you're building and make your own decisions. Can't just copy-paste and hope it works.
