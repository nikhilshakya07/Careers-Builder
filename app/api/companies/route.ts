import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/db/client';
import type { Company } from '@/app/lib/types';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ companies: data || [] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, name, theme, sections, jobs } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('companies')
      .insert({
        slug,
        name: name || null,
        theme: theme || {},
        sections: sections || [],
        jobs: jobs || [],
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Company slug already exists' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ company: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

