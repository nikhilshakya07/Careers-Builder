'use client';

import { useState, useMemo } from 'react';
import type { Company, Theme, Job } from '@/app/lib/types';
import CompanyHero from '@/app/components/candidate/CompanyHero';
import JobCard from '@/app/components/candidate/JobCard';
import JobFilters from '@/app/components/candidate/JobFilters';
import JobSearch from '@/app/components/candidate/JobSearch';
import { convertToEmbedUrl } from '@/app/lib/utils/video';

interface CareersPageClientProps {
  company: Company;
}

export default function CareersPageClient({ company }: CareersPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const theme = company.theme || {};
  const visibleSections = (company.sections || []).filter((s) => s.is_visible).sort((a, b) => a.order - b.order);
  const allJobs = (company.jobs || []).filter((job) => job.is_active !== false);

  // Filter jobs based on search, location, job type, and department
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      // Search filter
      const matchesSearch = 
        searchQuery === '' ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Location filter
      const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;

      // Job type filter
      const matchesJobType = selectedJobType === 'all' || job.job_type === selectedJobType;

      // Department filter
      const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;

      return matchesSearch && matchesLocation && matchesJobType && matchesDepartment;
    });
  }, [allJobs, searchQuery, selectedLocation, selectedJobType, selectedDepartment]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedLocation('all');
    setSelectedJobType('all');
    setSelectedDepartment('all');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <CompanyHero company={company} theme={theme} />

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

      {/* Jobs Section */}
      {allJobs.length > 0 && (
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

            {/* Search and Filters */}
            <div className="mb-8 space-y-6 max-w-2xl mx-auto">
              <JobSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                resultCount={filteredJobs.length}
              />
              <JobFilters
                jobs={allJobs}
                selectedLocation={selectedLocation}
                selectedJobType={selectedJobType}
                selectedDepartment={selectedDepartment}
                onLocationChange={setSelectedLocation}
                onJobTypeChange={setSelectedJobType}
                onDepartmentChange={setSelectedDepartment}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Job Listings */}
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} theme={theme} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="text-primary hover:underline font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

