import { requireAdminUser } from '@/lib/supabase/admin';
import { DataTable } from '@/components/admin/DataTable';

export default async function InsightsPage() {
    const { supabase } = await requireAdminUser();

    const { data: insights, error } = await supabase
        .from('insights')
        .select('title, category, author, featured, is_published, published_at')
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Failed to fetch insights:', error);
    }

    const columns = [
        { header: 'Published', accessor: 'published_at', render: (val: string) => new Date(val).toLocaleDateString() },
        { header: 'Title', accessor: 'title' },
        { header: 'Category', accessor: 'category' },
        { header: 'Author', accessor: 'author' },
        { header: 'Featured', accessor: 'featured', render: (val: boolean) => (val ? 'Yes' : 'No') },
        { header: 'Status', accessor: 'is_published', render: (val: boolean) => (val ? 'Published' : 'Draft') },
    ];

    return (
        <div className="p-8 w-full max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">Insights Management</h1>
            <DataTable
                data={insights || []}
                columns={columns}
                emptyMessage="No insights found. Run the database seed to populate the blog."
            />
        </div>
    );
}
