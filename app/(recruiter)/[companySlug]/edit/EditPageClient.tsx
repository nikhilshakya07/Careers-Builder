'use client';

import Link from 'next/link';
import { useCompany } from '@/app/hooks/useCompany';
import ThemeEditor from '@/app/components/recruiter/ThemeEditor';
import SectionBuilder from '@/app/components/recruiter/SectionBuilder';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import type { Theme, Section } from '@/app/lib/types';

interface EditPageClientProps {
  companySlug: string;
}

export default function EditPageClient({ companySlug }: EditPageClientProps) {
  const { company, loading, error, updateCompany } = useCompany(companySlug);

  const handleThemeUpdate = async (theme: Theme) => {
    if (!company) return;
    await updateCompany({ theme });
  };

  const handleSectionsUpdate = async (sections: Section[]) => {
    if (!company) return;
    await updateCompany({ sections });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground font-medium">Loading company data...</p>
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <Card className="p-8 text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Something went wrong</h2>
            <p className="text-muted-foreground mb-6">{error || 'Company not found'}</p>
            <Link href="/login">
              <Button className="w-full">Go to Login</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-50">
        <div className="w-full px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">
                {company.name || companySlug}
              </h1>
              <p className="text-sm text-muted-foreground">Customize your careers page theme and content</p>
            </div>
            <div className="flex gap-3">
              <Link href={`/${companySlug}/preview`}>
                <Button variant="secondary">
                  Preview
                </Button>
              </Link>
              <Link href={`/${companySlug}/careers`}>
                <Button variant="ghost">
                  View Public
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Content */}
      <div className="w-full px-8 py-12">
        <div className="max-w-[1600px] mx-auto space-y-12">
          {/* Theme Editor */}
          <ThemeEditor
            theme={company.theme || {}}
            onUpdate={handleThemeUpdate}
            loading={loading}
          />

          {/* Section Builder */}
          <SectionBuilder
            sections={company.sections || []}
            onUpdate={handleSectionsUpdate}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

