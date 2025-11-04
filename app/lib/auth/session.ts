import { cookies } from 'next/headers';

export async function getSession() {
  const cookieStore = await cookies();
  const slug = cookieStore.get('company_slug');
  return slug?.value || null;
}

export async function requireAuth() {
  const slug = await getSession();
  if (!slug) {
    throw new Error('Unauthorized');
  }
  return slug;
}
