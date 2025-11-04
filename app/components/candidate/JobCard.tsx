'use client';

import type { Job, Theme } from '@/app/lib/types';
import { Card } from '@/app/components/ui/Card';

interface JobCardProps {
  job: Job;
  theme: Theme;
}

export default function JobCard({ job, theme }: JobCardProps) {
  return (
    <article
      className="p-6 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      aria-label={`Job posting: ${job.title}`}
      tabIndex={0}
      role="article"
    >
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-3 text-foreground">{job.title}</h3>
        <p className="text-muted-foreground mb-3 font-medium flex items-center gap-2" aria-label={`Location: ${job.location}`}>
          <span aria-hidden="true">📍</span>
          <span>{job.location}</span>
        </p>
        <p className="text-foreground/80 mb-6 leading-relaxed line-clamp-3 text-sm">
          {job.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-auto" role="list" aria-label="Job details">
        <span
          className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white shadow-sm"
          style={{ backgroundColor: theme.primary || 'hsl(var(--primary))' }}
          role="listitem"
          aria-label={`Job type: ${job.job_type.replace('-', ' ')}`}
        >
          {job.job_type.replace('-', ' ')}
        </span>
        {job.department && (
          <span 
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground"
            role="listitem"
            aria-label={`Department: ${job.department}`}
          >
            {job.department}
          </span>
        )}
      </div>
    </article>
  );
}
