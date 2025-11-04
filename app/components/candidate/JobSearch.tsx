'use client';

import { Input } from '@/app/components/ui/Input';
import { Card } from '@/app/components/ui/Card';

interface JobSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount?: number;
}

export default function JobSearch({ searchQuery, onSearchChange, resultCount }: JobSearchProps) {
  const searchId = 'job-search-input';
  
  return (
    <div className="space-y-4" role="search" aria-label="Search jobs">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <label htmlFor={searchId} className="text-sm font-semibold text-foreground">
          Search Jobs
        </label>
        {resultCount !== undefined && (
          <span className="text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
            {resultCount} {resultCount === 1 ? 'job' : 'jobs'} found
          </span>
        )}
      </div>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">
          🔍
        </div>
        <Input
          id={searchId}
          type="search"
          placeholder="Search by job title, keywords..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
          aria-label="Search jobs by title, keywords, or location"
          aria-describedby={resultCount !== undefined ? 'search-results-count' : undefined}
        />
        {resultCount !== undefined && (
          <span id="search-results-count" className="absolute -left-[10000px] w-1 h-1 overflow-hidden">
            {resultCount} {resultCount === 1 ? 'job' : 'jobs'} found
          </span>
        )}
      </div>
    </div>
  );
}
