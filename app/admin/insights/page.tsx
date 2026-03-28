import { requireAdminUser } from '@/lib/supabase/admin';

export default async function InsightsPage() {
    await requireAdminUser();

    return (
        <div className="p-8 w-full max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">Insights Management</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
                <p>Insights CMS module is currently under development.</p>
                <p className="text-sm mt-2">Future plans include Markdown/Rich text editor for creating blog posts.</p>
            </div>
        </div>
    );
}
