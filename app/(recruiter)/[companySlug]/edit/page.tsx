import { redirect } from 'next/navigation';
import { getSession } from '@/app/lib/auth/session';
import EditPageClient from './EditPageClient';

export default async function EditPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = await params;
  const sessionSlug = await getSession();

  if (!sessionSlug || sessionSlug !== companySlug) {
    redirect(`/login?redirect=/${companySlug}/edit`);
  }

  return <EditPageClient companySlug={companySlug} />;
}
