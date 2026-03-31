import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { enforceRateLimit, getRequestClientKey } from '@/lib/rate-limit';
import { reportError } from '@/lib/monitoring';

export async function POST(request: Request) {
    try {
        const rateLimit = enforceRateLimit(getRequestClientKey(request, 'newsletter'), 8, 60_000);
        if (!rateLimit.allowed) {
            return NextResponse.json(
                { error: 'Too many subscription attempts. Please try again shortly.' },
                { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
            );
        }

        const { email } = await request.json();
        const normalizedEmail = email?.trim().toLowerCase();

        if (!normalizedEmail || !normalizedEmail.includes('@') || normalizedEmail.length > 254) {
            return NextResponse.json(
                { error: 'A valid email address is required' },
                { status: 400 }
            );
        }

        // Insert into Supabase
        const supabase = await createClient();
        const { error: dbError } = await supabase
            .from('subscribers')
            .insert([{ email: normalizedEmail }]);

        if (dbError) {
            reportError(dbError, { scope: 'newsletter.db.insert' });
            if (dbError.code === '23505') { // Unique violation
                return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
            }
            return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Subscribed successfully' }, { status: 200 });
    } catch (error) {
        reportError(error, { scope: 'newsletter.subscribe' });
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
