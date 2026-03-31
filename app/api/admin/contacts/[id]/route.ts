import { NextResponse } from 'next/server';
import { getAdminRouteContext } from '@/lib/supabase/admin';
import { reportError } from '@/lib/monitoring';

const ALLOWED_CONTACT_STATUSES = new Set([
  'new',
  'in_review',
  'replied',
  'qualified',
  'closed',
]);

function normalizeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
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
    const status = normalizeText(body.status);
    const notes = normalizeText(body.notes);

    if (!ALLOWED_CONTACT_STATUSES.has(status)) {
      return NextResponse.json({ error: 'Invalid lead status.' }, { status: 400 });
    }

    const { error } = await supabase
      .from('contacts')
      .update({
        status,
        notes: notes || null,
      })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: 'Failed to update contact.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    reportError(error, { scope: 'admin.contacts.update' });
    return NextResponse.json({ error: 'Failed to update contact.' }, { status: 500 });
  }
}

