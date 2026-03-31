import { NextResponse } from 'next/server';
import { getAdminRouteContext } from '@/lib/supabase/admin';
import { reportError } from '@/lib/monitoring';

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
    const notes = normalizeText(body.notes);

    const { error } = await supabase
      .from('subscribers')
      .update({
        notes: notes || null,
      })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: 'Failed to update subscriber.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    reportError(error, { scope: 'admin.subscribers.update' });
    return NextResponse.json({ error: 'Failed to update subscriber.' }, { status: 500 });
  }
}

