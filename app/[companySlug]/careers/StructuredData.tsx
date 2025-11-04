import type { Company } from '@/app/lib/types';

interface StructuredDataProps {
  company: Company;
}

export default function StructuredData({ company }: StructuredDataProps) {
  const companyName = company.name || company.slug;
  const activeJobs = (company.jobs || []).filter((job) => job.is_active !== false);
  // Use environment variable or construct from available env vars
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
    (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : '');
  const companyUrl = baseUrl || '';
  const careersUrl = baseUrl ? `${baseUrl}/${company.slug}/careers` : `/${company.slug}/careers`;

  // Organization structured data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyName,
    url: companyUrl,
    logo: company.theme?.logo || '',
    sameAs: [], // Can be extended with social media links
    jobPostings: activeJobs.map((job) => ({
      '@type': 'JobPosting',
      title: job.title,
      description: job.description,
      identifier: {
        '@type': 'PropertyValue',
        name: companyName,
        value: job.id,
      },
      datePosted: company.created_at,
      employmentType: job.job_type.replace('-', ' '),
      hiringOrganization: {
        '@type': 'Organization',
        name: companyName,
        sameAs: companyUrl,
        logo: company.theme?.logo || '',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: job.location,
          addressCountry: 'US', // Default, can be made dynamic
        },
      },
      ...(job.department && {
        department: {
          '@type': 'Organization',
          name: job.department,
        },
      }),
      ...(job.requirements && job.requirements.length > 0 && {
        qualifications: job.requirements.join(', '),
      }),
      ...(job.benefits && job.benefits.length > 0 && {
        benefits: job.benefits.join(', '),
      }),
    })),
  };

  // BreadcrumbList structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: companyUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Careers',
        item: careersUrl,
      },
    ],
  };

  // CollectionPage structured data for the careers page
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Careers at ${companyName}`,
    description: `Explore ${activeJobs.length} open positions at ${companyName}`,
    url: careersUrl,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: activeJobs.length,
      itemListElement: activeJobs.map((job, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'JobPosting',
          title: job.title,
          description: job.description,
          identifier: job.id,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
    </>
  );
}

