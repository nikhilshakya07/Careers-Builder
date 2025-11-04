'use client';

import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has session cookie (client-side check)
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return {
    isAuthenticated,
    loading,
    logout,
  };
}
