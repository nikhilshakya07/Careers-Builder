// Jobs hook - placeholder
export function useJobs(companyId: string) {
  return {
    jobs: [],
    loading: false,
    error: null,
    filters: {
      location: '',
      jobType: '',
      search: '',
    },
    setFilters: () => {},
  };
}

