import { requireAdminUser } from '@/lib/supabase/admin';
import { DataTable } from '@/components/admin/DataTable';

export const dynamic = 'force-dynamic';

export default async function ContactsPage() {
    const { supabase } = await requireAdminUser();

    // Fetch contacts ordered by created_at descending
    const { data: contacts, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Failed to fetch contacts:', error);
    }

    const columns = [
        { header: 'Date', accessor: 'created_at', render: (val: string) => new Date(val).toLocaleDateString() },
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Company', accessor: 'company', render: (val: string) => val || '-' },
        {
            header: 'Message', accessor: 'message', render: (val: string) => (
                <div className="max-w-md truncate">{val}</div>
            )
        },
    ];

    return (
        <div className="p-8 w-full max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">Contacts</h1>
            <DataTable
                data={contacts || []}
                columns={columns}
                emptyMessage="No contacts found."
            />
        </div>
    );
}
