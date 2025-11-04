'use client';

import type { Job } from '@/app/lib/types';
import Select, { type SelectOption } from '@/app/components/ui/Select';

interface JobFiltersProps {
  jobs: Job[];
  selectedLocation: string;
  selectedJobType: string;
  selectedDepartment: string;
  onLocationChange: (location: string) => void;
  onJobTypeChange: (jobType: string) => void;
  onDepartmentChange: (department: string) => void;
  onClearFilters: () => void;
}

export default function JobFilters({
  jobs,
  selectedLocation,
  selectedJobType,
  selectedDepartment,
  onLocationChange,
  onJobTypeChange,
  onDepartmentChange,
  onClearFilters,
}: JobFiltersProps) {
  // Get unique locations, job types, and departments from jobs
  const locations = Array.from(new Set(jobs.map((job) => job.location))).sort();
  const jobTypes = Array.from(new Set(jobs.map((job) => job.job_type))).sort();
  const departments = Array.from(new Set(jobs.map((job) => job.department).filter((dept): dept is string => Boolean(dept)))).sort();

  const hasActiveFilters = selectedLocation !== 'all' || selectedJobType !== 'all' || selectedDepartment !== 'all';

  // Convert to SelectOption format
  const locationOptions: SelectOption[] = [
    { value: 'all', label: 'All Locations' },
    ...locations.map((location) => ({ value: location, label: location })),
  ];

  const jobTypeOptions: SelectOption[] = [
    { value: 'all', label: 'All Job Types' },
    ...jobTypes.map((jobType) => ({
      value: jobType,
      label: jobType.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    })),
  ];

  const departmentOptions: SelectOption[] = [
    { value: 'all', label: 'All Departments' },
    ...departments.map((department) => ({ value: department, label: department })),
  ];

  return (
    <div className="space-y-6" role="region" aria-label="Job filters">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground" id="filters-heading">Filter Jobs</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded px-2 py-1"
            aria-label="Clear all job filters"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="group" aria-labelledby="filters-heading">
        {/* Location Filter */}
        <div className="space-y-2">
          <label htmlFor="location-filter" className="block text-sm font-semibold text-foreground">
            Location
          </label>
          <Select
            id="location-filter"
            options={locationOptions}
            value={selectedLocation}
            onChange={onLocationChange}
            placeholder="Select location"
            aria-label="Filter jobs by location"
          />
        </div>

        {/* Job Type Filter */}
        <div className="space-y-2">
          <label htmlFor="job-type-filter" className="block text-sm font-semibold text-foreground">
            Job Type
          </label>
          <Select
            id="job-type-filter"
            options={jobTypeOptions}
            value={selectedJobType}
            onChange={onJobTypeChange}
            placeholder="Select job type"
            aria-label="Filter jobs by type"
          />
        </div>

        {/* Department Filter */}
        <div className="space-y-2">
          <label htmlFor="department-filter" className="block text-sm font-semibold text-foreground">
            Department
          </label>
          <Select
            id="department-filter"
            options={departmentOptions}
            value={selectedDepartment}
            onChange={onDepartmentChange}
            placeholder="Select department"
            aria-label="Filter jobs by department"
          />
        </div>
      </div>
    </div>
  );
}
