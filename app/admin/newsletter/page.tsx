import { requireAdminUser } from '@/lib/supabase/admin';
import { DataTable } from '@/components/admin/DataTable';

export const dynamic = 'force-dynamic';

export default async function NewsletterPage() {
    const { supabase } = await requireAdminUser();

    // Fetch subscribers ordered by created_at descending
    const { data: subscribers, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Failed to fetch subscribers:', error);
    }

    const columns = [
        { header: 'Date Subscribed', accessor: 'created_at', render: (val: string) => new Date(val).toLocaleDateString() },
        { header: 'Email', accessor: 'email' },
    ];

    return (
        <div className="p-8 w-full max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Newsletter Subscribers</h1>
                {/* Export functionality could be added here */}
            </div>
            <DataTable
                data={subscribers || []}
                columns={columns}
                emptyMessage="No subscribers found."
            />
        </div>
    );
}
