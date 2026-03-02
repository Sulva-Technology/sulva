import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: 'A valid email address is required' },
                { status: 400 }
            );
        }

        // TODO: Connect external newsletter service (Mailchimp, Loops, etc.)
        console.log(`\n[Newsletter Subscription] New subscriber: ${email}\n`);

        // Simulate external API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        return NextResponse.json({ success: true, message: 'Subscribed successfully' }, { status: 200 });
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
