import { supabaseAdmin } from '@/app/lib/db/client';
import type { Company } from '@/app/lib/types';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CareersPageClient from './CareersPageClient';
import StructuredData from './StructuredData';

async function getCompany(slug: string): Promise<Company | null> {
  const { data, error } = await supabaseAdmin
    .from('companies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data as Company;
}

export async function generateMetadata({ params }: { params: Promise<{ companySlug: string }> }): Promise<Metadata> {
  const { companySlug } = await params;
  const company = await getCompany(companySlug);

  if (!company) {
    return {
      title: 'Careers Page Not Found',
    };
  }

  const jobCount = (company.jobs || []).filter((job) => job.is_active !== false).length;
  const companyName = company.name || companySlug;
  const description = `Explore ${jobCount} ${jobCount === 1 ? 'open position' : 'open positions'} at ${companyName}. Join our team and help shape the future. Browse opportunities across various departments and locations.`;
  const url = `/${companySlug}/careers`;
  const ogImage = company.theme?.banner || company.theme?.logo || '';

  return {
    title: `Careers at ${companyName} | Join Our Team`,
    description,
    keywords: [
      companyName,
      'careers',
      'jobs',
      'hiring',
      'employment',
      'opportunities',
      ...(company.jobs || [])
        .filter((job) => job.is_active !== false)
        .map((job) => job.department)
        .filter((dept): dept is string => Boolean(dept))
        .slice(0, 5),
    ].join(', '),
    authors: [{ name: companyName }],
    openGraph: {
      title: `Careers at ${companyName}`,
      description,
      type: 'website',
      url,
      siteName: companyName,
      ...(ogImage && { images: [{ url: ogImage, alt: `${companyName} Careers` }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `Careers at ${companyName}`,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function CareersPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  const company = await getCompany(companySlug);

  if (!company) {
    notFound();
  }

  return (
    <>
      <StructuredData company={company} />
      <CareersPageClient company={company} />
    </>
  );
}


