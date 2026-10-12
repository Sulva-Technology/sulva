import { requireAdminUser } from '@/lib/supabase/admin';
import NewsletterManager from '@/components/admin/NewsletterManager';

export const dynamic = 'force-dynamic';

export default async function NewsletterPage() {
    const { supabase } = await requireAdminUser();

    const { data: subscribers, error } = await supabase
        .from('subscribers')
        .select('id, created_at, updated_at, email, notes')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Failed to fetch subscribers:', error);
    }

    return (
        <div className="p-8 w-full max-w-7xl mx-auto">
            <NewsletterManager data={subscribers || []} />
        </div>
    );
}
