import { NextResponse } from 'next/server';
import { getAdminRouteContext } from '@/lib/supabase/admin';
import { reportError } from '@/lib/monitoring';

function csvEscape(value: unknown) {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET() {
  const { supabase, isAdmin } = await getAdminRouteContext();

  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from('subscribers')
      .select('created_at, updated_at, email, notes')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to export subscribers.' }, { status: 500 });
    }

    const lines = [
      ['created_at', 'updated_at', 'email', 'notes'].map(csvEscape).join(','),
      ...(data ?? []).map((row) =>
        [row.created_at, row.updated_at, row.email, row.notes].map(csvEscape).join(',')
      ),
    ];

    return new NextResponse(lines.join('\n'), {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="sulva-subscribers.csv"',
      },
    });
  } catch (error) {
    reportError(error, { scope: 'admin.subscribers.export' });
    return NextResponse.json({ error: 'Failed to export subscribers.' }, { status: 500 });
  }
}
