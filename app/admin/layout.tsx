import { Sidebar } from '@/components/admin/Sidebar';
import { requireAdminUser } from '@/lib/supabase/admin';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = await requireAdminUser();

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900">
            <Sidebar userEmail={user.email} />
            <main className="flex-1 overflow-y-auto w-full">
                {children}
            </main>
        </div>
    );
}
