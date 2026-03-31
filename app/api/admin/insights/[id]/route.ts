import { NextResponse } from 'next/server';
import { getAdminRouteContext } from '@/lib/supabase/admin';
import { reportError } from '@/lib/monitoring';

const ALLOWED_STATUSES = new Set(['draft', 'published', 'archived']);

function normalizeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeNullable(value: unknown) {
  const trimmed = normalizeText(value);
  return trimmed ? trimmed : null;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { supabase, isAdmin } = await getAdminRouteContext();

  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const title = normalizeText(body.title);
    const slug = normalizeText(body.slug).toLowerCase();
    const category = normalizeText(body.category);
    const excerpt = normalizeText(body.excerpt);
    const content = normalizeText(body.content);
    const author = normalizeText(body.author);
    const status = normalizeText(body.status) || 'draft';

    if (!title || !slug || !category || !excerpt || !content || !author) {
      return NextResponse.json(
        { error: 'Title, slug, category, excerpt, content, and author are required.' },
        { status: 400 }
      );
    }

    if (!ALLOWED_STATUSES.has(status)) {
      return NextResponse.json({ error: 'Invalid status supplied.' }, { status: 400 });
    }

    const publishedAt =
      status === 'published'
        ? normalizeNullable(body.publishedAt) ?? new Date().toISOString()
        : null;

    const { error } = await supabase
      .from('insights')
      .update({
        title,
        slug,
        category,
        excerpt,
        content,
        author,
        author_role: normalizeNullable(body.authorRole),
        image_url: normalizeNullable(body.imageUrl),
        og_image_url: normalizeNullable(body.ogImageUrl),
        website_url: normalizeNullable(body.websiteUrl),
        seo_title: normalizeNullable(body.seoTitle),
        seo_description: normalizeNullable(body.seoDescription),
        canonical_url: normalizeNullable(body.canonicalUrl),
        featured: Boolean(body.featured),
        status,
        is_published: status === 'published',
        published_at: publishedAt,
      })
      .eq('id', id);

    if (error) {
      const statusCode = error.code === '23505' ? 409 : 500;
      return NextResponse.json(
        { error: error.code === '23505' ? 'An insight with this slug already exists.' : 'Failed to update insight.' },
        { status: statusCode }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    reportError(error, { scope: 'admin.insights.update' });
    return NextResponse.json({ error: 'Failed to update insight.' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { supabase, isAdmin } = await getAdminRouteContext();

  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { error } = await supabase.from('insights').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: 'Failed to delete insight.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    reportError(error, { scope: 'admin.insights.delete' });
    return NextResponse.json({ error: 'Failed to delete insight.' }, { status: 500 });
  }
}

