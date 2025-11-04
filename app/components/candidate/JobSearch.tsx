'use client';

import { Input } from '@/app/components/ui/Input';
import { Card } from '@/app/components/ui/Card';

interface JobSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount?: number;
}

export default function JobSearch({ searchQuery, onSearchChange, resultCount }: JobSearchProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="text-sm font-semibold text-foreground">Search Jobs</h3>
        {resultCount !== undefined && (
          <span className="text-sm text-muted-foreground">
            {resultCount} {resultCount === 1 ? 'job' : 'jobs'} found
          </span>
        )}
      </div>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          🔍
        </div>
        <Input
          type="text"
          placeholder="Search by job title, keywords..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
}
