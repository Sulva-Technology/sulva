import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { enforceRateLimit, getRequestClientKey } from '@/lib/rate-limit';
import { Resend } from 'resend';

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function safeText(value?: string) {
    return escapeHtml(value?.trim() || 'N/A');
}

export async function POST(request: Request) {
    try {
        const rateLimit = enforceRateLimit(getRequestClientKey(request, 'contact'), 5, 60_000);
        if (!rateLimit.allowed) {
            return NextResponse.json(
                { error: 'Too many contact submissions. Please try again shortly.' },
                { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
            );
        }

        const body = await request.json();

        // Basic validation
        const { name, email, message, company, projectType, budget, website } = body;
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields (name, email, message)' },
                { status: 400 }
            );
        }

        if (website) {
            return NextResponse.json({ success: true, message: 'Message received' }, { status: 200 });
        }

        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedMessage = message.trim();
        const trimmedCompany = company?.trim() || null;
        const trimmedProjectType = projectType?.trim() || null;
        const trimmedBudget = budget?.trim() || null;
        const allowedProjectTypes = new Set(['web', 'mobile', 'software', 'branding', 'other']);
        const allowedBudgets = new Set(['10-25k', '25-50k', '50-100k', '100k+']);

        if (
            !trimmedName ||
            trimmedName.length > 120 ||
            !trimmedEmail ||
            trimmedEmail.length > 254 ||
            !trimmedMessage ||
            trimmedMessage.length < 20 ||
            trimmedMessage.length > 5000 ||
            !trimmedEmail.includes('@')
        ) {
            return NextResponse.json(
                { error: 'Please provide a valid name, email, and message with enough detail.' },
                { status: 400 }
            );
        }

        if (trimmedProjectType && !allowedProjectTypes.has(trimmedProjectType)) {
            return NextResponse.json({ error: 'Invalid project type selected' }, { status: 400 });
        }

        if (trimmedBudget && !allowedBudgets.has(trimmedBudget)) {
            return NextResponse.json({ error: 'Invalid budget selected' }, { status: 400 });
        }

        // 1. Insert into Supabase
        const supabase = await createClient();
        const { error: dbError } = await supabase
            .from('contacts')
            .insert([{
                name: trimmedName,
                email: trimmedEmail,
                message: trimmedMessage,
                company: trimmedCompany,
                projectType: trimmedProjectType,
                budget: trimmedBudget,
            }]);

        if (dbError) {
            console.error('Supabase contact insert error:', dbError);
            return NextResponse.json(
                { error: 'Database error' },
                { status: 500 }
            );
        }

        // 2. Send Email via Resend
        const contactEmail = process.env.CONTACT_EMAIL;
        const contactFromEmail = process.env.CONTACT_FROM_EMAIL;
        const contactFromName = process.env.CONTACT_FROM_NAME || 'Sulva Tech';
        const resendApiKey = process.env.RESEND_API_KEY;

        if (resendApiKey && contactEmail && contactFromEmail) {
            const resend = new Resend(resendApiKey);
            const { error: emailError } = await resend.emails.send({
                from: `${contactFromName} <${contactFromEmail}>`,
                to: [contactEmail],
                replyTo: trimmedEmail,
                subject: `New Contact Submission from ${trimmedName}`,
                html: `
                    <p><strong>Name:</strong> ${safeText(trimmedName)}</p>
                    <p><strong>Email:</strong> ${safeText(trimmedEmail)}</p>
                    <p><strong>Company:</strong> ${safeText(trimmedCompany || undefined)}</p>
                    <p><strong>Project Type:</strong> ${safeText(trimmedProjectType || undefined)}</p>
                    <p><strong>Budget:</strong> ${safeText(trimmedBudget || undefined)}</p>
                    <p><strong>Message:</strong><br/>${escapeHtml(trimmedMessage).replace(/\n/g, '<br/>')}</p>
                `,
            });
            if (emailError) {
                console.error('Resend email error:', emailError);
            }
        } else if (resendApiKey) {
            console.warn('Resend is configured, but CONTACT_EMAIL or CONTACT_FROM_EMAIL is missing. Skipping contact notification email.');
        }

        return NextResponse.json({ success: true, message: 'Message received' }, { status: 200 });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Internal server error while processing request' },
            { status: 500 }
        );
    }
}
