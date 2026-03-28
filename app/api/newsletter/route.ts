import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();
        const normalizedEmail = email?.trim().toLowerCase();

        if (!normalizedEmail || !normalizedEmail.includes('@')) {
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
            console.error('Supabase newsletter insert error:', dbError);
            if (dbError.code === '23505') { // Unique violation
                return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
            }
            return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Subscribed successfully' }, { status: 200 });
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
