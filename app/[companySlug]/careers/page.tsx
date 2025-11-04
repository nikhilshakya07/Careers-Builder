import { supabaseAdmin } from '@/app/lib/db/client';
import type { Company } from '@/app/lib/types';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CareersPageClient from './CareersPageClient';

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

  return {
    title: `Careers at ${companyName} | Join Our Team`,
    description: `Explore ${jobCount} open positions at ${companyName}. Join our team and help shape the future.`,
    openGraph: {
      title: `Careers at ${companyName}`,
      description: `Explore ${jobCount} open positions at ${companyName}.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Careers at ${companyName}`,
      description: `Explore ${jobCount} open positions at ${companyName}.`,
    },
  };
}

export default async function CareersPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  const company = await getCompany(companySlug);

  if (!company) {
    notFound();
  }

  return <CareersPageClient company={company} />;
}


