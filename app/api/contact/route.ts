import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        const { name, email, message } = body;
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields (name, email, message)' },
                { status: 400 }
            );
        }

        // TODO: Connect external mail service (Resend, SendGrid, etc.)
        // Here we log it to the server console to verify it works
        console.log('\n--- New Contact Form Submission ---');
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Company: ${body.company || 'N/A'}`);
        console.log(`Project Type: ${body.projectType || 'N/A'}`);
        console.log(`Budget: ${body.budget || 'N/A'}`);
        console.log(`Message: \n${message}`);
        console.log('-----------------------------------\n');

        // Simulate external API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json({ success: true, message: 'Message received' }, { status: 200 });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Internal server error while processing request' },
            { status: 500 }
        );
    }
}
