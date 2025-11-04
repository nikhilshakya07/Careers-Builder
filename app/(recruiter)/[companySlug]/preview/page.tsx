import { redirect } from 'next/navigation';
import { getSession } from '@/app/lib/auth/session';
import { supabaseAdmin } from '@/app/lib/db/client';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import type { Company } from '@/app/lib/types';
import { convertToEmbedUrl } from '@/app/lib/utils/video';

async function getCompany(slug: string): Promise<Company | null> {
  const { data, error } = await supabaseAdmin
    .from('companies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data as Company;
}

export default async function PreviewPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  const sessionSlug = await getSession();

  if (!sessionSlug || sessionSlug !== companySlug) {
    redirect(`/login?redirect=/${companySlug}/preview`);
  }

  const company = await getCompany(companySlug);

  if (!company) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <Card className="p-8">
            <div className="text-5xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold text-foreground mb-3">Company not found</h1>
            <p className="text-muted-foreground mb-6">The company page you're looking for doesn't exist.</p>
            <Link href={`/${companySlug}/edit`}>
              <Button className="w-full">Go to Edit Page</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const theme = company.theme || {};
  const visibleSections = (company.sections || []).filter((s) => s.is_visible).sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-background">
      {/* Preview Banner */}
      <div className="bg-primary/10 border-b border-border px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-sm">
          <span className="text-foreground font-medium">Preview Mode</span>
          <span className="text-muted-foreground">•</span>
          <Link href={`/${companySlug}/edit`} className="text-primary hover:text-primary/80 font-medium transition-colors">
            Edit Page
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link href={`/${companySlug}/careers`} className="text-primary hover:text-primary/80 font-medium transition-colors">
            View Public Page
          </Link>
        </div>
      </div>

      {/* Hero Section with Banner Background */}
      <div
        className="w-full py-20 md:py-28 px-6 text-center relative overflow-hidden"
        style={{
          backgroundColor: theme.primary || '#3b82f6',
          color: '#ffffff',
        }}
      >
        {/* Banner Image as Background */}
        {theme.banner && (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img 
              src={theme.banner} 
              alt="Banner" 
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
          </div>
        )}
        <div className="max-w-4xl mx-auto relative z-10">
          {theme.logo && (
            <div className="mb-6" style={{ display: 'inline-block' }}>
              <img 
                src={theme.logo} 
                alt={company.name || 'Logo'} 
                className="h-16 md:h-20 max-w-[200px] drop-shadow-lg"
                style={{
                  display: 'block',
                  background: 'transparent',
                }}
              />
            </div>
          )}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
            {company.name || companySlug}
          </h1>
          <p className="text-xl md:text-2xl opacity-95 font-medium drop-shadow-md">Join Our Team</p>
        </div>
      </div>

      {/* Video */}
      {theme.video && (
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="aspect-video bg-muted rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src={convertToEmbedUrl(theme.video)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Company video"
            />
          </div>
        </div>
      )}

      {/* Sections */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:py-20 space-y-16">
        {visibleSections.map((section) => (
          <div key={section.id} className="space-y-6">
            <h2
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
              style={{ color: theme.secondary || '#8b5cf6' }}
            >
              {section.title}
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line leading-relaxed">
              {typeof section.content === 'string' ? section.content : JSON.stringify(section.content)}
            </div>
          </div>
        ))}
      </div>

      {/* Jobs Preview */}
      {company.jobs && company.jobs.length > 0 && (
        <div
          className="py-16 md:py-20 px-6"
          style={{ backgroundColor: theme.accent ? `${theme.accent}10` : '#f9fafb' }}
        >
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-12 text-center tracking-tight"
              style={{ color: theme.accent || '#10b981' }}
            >
              Open Positions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {company.jobs
                .filter((job) => job.is_active !== false)
                .map((job) => (
                  <div
                    key={job.id}
                    className="bg-card p-6 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <h3 className="text-xl font-bold mb-3 text-foreground">{job.title}</h3>
                    <p className="text-muted-foreground mb-3 font-medium">{job.location}</p>
                    <p className="text-foreground/80 mb-6 leading-relaxed line-clamp-3">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white shadow-sm"
                        style={{ backgroundColor: theme.primary || 'hsl(var(--primary))' }}
                      >
                        {job.job_type}
                      </span>
                      {job.department && (
                        <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground">
                          {job.department}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

