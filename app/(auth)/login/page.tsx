'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Card } from '@/app/components/ui/Card';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const redirect = searchParams.get('redirect');
    if (redirect) {
      const match = redirect.match(/\/([^/]+)\/(edit|preview)/);
      if (match) {
        setSlug(match[1]);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      const redirect = searchParams.get('redirect');
      if (redirect) {
        router.push(redirect);
      } else {
        router.push(`/${slug}/edit`);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Careers Builder
            </h1>
          </Link>
          <p className="text-muted-foreground">Sign in to manage your career page</p>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
              <p className="text-sm text-muted-foreground">Enter your company slug to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="slug" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Company Slug
                </label>
                <Input
                  id="slug"
                  type="text"
                  placeholder="e.g., acme-corp"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  disabled={loading}
                />
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-center text-muted-foreground">
                Don't have a company page?{' '}
                <Link href="/" className="text-primary hover:underline font-medium">
                  Get started
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
