'use client';

import { useState, useEffect } from 'react';
import type { Company } from '@/app/lib/types';

export function useCompany(slug: string) {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/companies/${slug}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch company');
        }

        setCompany(data.company);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [slug]);

  const updateCompany = async (updates: Partial<Company>) => {
    if (!slug) return;

    try {
      setError(null);
      const response = await fetch(`/api/companies/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update company');
      }

      setCompany(data.company);
      return data.company;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    }
  };

  return {
    company,
    loading,
    error,
    updateCompany,
  };
}

