import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth/session';

export async function GET() {
  const slug = await getSession();
  
  if (!slug) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, slug });
}

