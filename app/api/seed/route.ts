import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase, createSampleCompany } from '@/app/lib/db/seed';

// Only allow seeding in development
const isDevelopment = process.env.NODE_ENV === 'development';

export async function POST(request: NextRequest) {
  if (!isDevelopment) {
    return NextResponse.json(
      { error: 'Seeding is only allowed in development mode' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { companies, useSample } = body;

    let companiesToSeed;

    if (useSample) {
      // Create sample companies
      companiesToSeed = [
        createSampleCompany(
          'acme-corp',
          'Acme Corporation',
          {
            primary: '#3b82f6',
            secondary: '#8b5cf6',
            accent: '#10b981',
            logo: '',
            banner: '',
            video: '',
          },
          [
            {
              id: '1',
              type: 'about',
              title: 'About Us',
              content: 'We are a leading technology company...',
              order: 0,
              is_visible: true,
            },
            {
              id: '2',
              type: 'benefits',
              title: 'Benefits',
              content: 'Competitive salary, health insurance, remote work...',
              order: 1,
              is_visible: true,
            },
          ],
          [
            {
              id: '1',
              title: 'Senior Software Engineer',
              description: 'We are looking for an experienced software engineer...',
              location: 'San Francisco, CA',
              job_type: 'full-time',
              department: 'Engineering',
              requirements: ['5+ years experience', 'React, Node.js', 'Team leadership'],
              benefits: ['Health insurance', '401k', 'Remote work'],
              is_active: true,
            },
            {
              id: '2',
              title: 'Product Designer',
              description: 'Join our design team...',
              location: 'New York, NY',
              job_type: 'full-time',
              department: 'Design',
              requirements: ['3+ years experience', 'Figma, UI/UX'],
              benefits: ['Health insurance', 'Flexible hours'],
              is_active: true,
            },
          ]
        ),
        createSampleCompany(
          'tech-startup',
          'Tech Startup Inc',
          {
            primary: '#ef4444',
            secondary: '#f59e0b',
            accent: '#06b6d4',
          },
          [
            {
              id: '1',
              type: 'about',
              title: 'Our Story',
              content: 'Founded in 2020...',
              order: 0,
              is_visible: true,
            },
          ],
          [
            {
              id: '1',
              title: 'Frontend Developer',
              description: 'Build amazing user interfaces...',
              location: 'Remote',
              job_type: 'full-time',
              department: 'Engineering',
              requirements: ['React, TypeScript', '2+ years'],
              benefits: ['Remote work', 'Stock options'],
              is_active: true,
            },
          ]
        ),
      ];
    } else if (companies && Array.isArray(companies)) {
      companiesToSeed = companies;
    } else {
      return NextResponse.json(
        { error: 'Invalid request. Provide companies array or useSample: true' },
        { status: 400 }
      );
    }

    const result = await seedDatabase(companiesToSeed);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Seed API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

