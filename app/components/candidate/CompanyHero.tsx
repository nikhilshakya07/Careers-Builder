'use client';

import type { Company, Theme } from '@/app/lib/types';

interface CompanyHeroProps {
  company: Company;
  theme: Theme;
}

export default function CompanyHero({ company, theme }: CompanyHeroProps) {
  const companyName = company.name || company.slug;
  
  return (
    <header
      className="w-full py-20 md:py-28 px-6 text-center relative overflow-hidden"
      style={{
        backgroundColor: theme.primary || '#3b82f6',
        color: '#ffffff',
      }}
      role="banner"
      aria-label={`${companyName} careers page header`}
    >
      {/* Banner Image as Background */}
      {theme.banner && (
        <div className="absolute inset-0 w-full h-full overflow-hidden" aria-hidden="true">
          <img 
            src={theme.banner} 
            alt="" 
            className="w-full h-full object-cover opacity-20"
            role="presentation"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" aria-hidden="true" />
        </div>
      )}
      <div className="max-w-4xl mx-auto relative z-10">
        {theme.logo && (
          <div className="mb-6" style={{ display: 'inline-block' }}>
            <img 
              src={theme.logo} 
              alt={`${companyName} logo`} 
              className="h-16 md:h-20 max-w-[200px] drop-shadow-lg"
              style={{
                display: 'block',
                background: 'transparent',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
          {companyName}
        </h1>
        <p className="text-xl md:text-2xl opacity-95 font-medium drop-shadow-md">Join Our Team</p>
      </div>
    </header>
  );
}
