import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabaseAdmin } from '@/app/lib/db/client';

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Company slug is required' },
        { status: 400 }
      );
    }

    // Check if company exists
    const { data: company, error } = await supabaseAdmin
      .from('companies')
      .select('id, slug, name')
      .eq('slug', slug.toLowerCase().trim())
      .single();

    if (error || !company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('company_slug', company.slug, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      success: true,
      company: {
        slug: company.slug,
        name: company.name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('company_slug');

  return NextResponse.json({ success: true });
}
