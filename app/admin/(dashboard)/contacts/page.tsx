import { requireAdminUser } from '@/lib/supabase/admin';
import ContactsManager from '@/components/admin/ContactsManager';

export const dynamic = 'force-dynamic';

export default async function ContactsPage() {
    const { supabase } = await requireAdminUser();

    const { data: contacts, error } = await supabase
        .from('contacts')
        .select('id, created_at, updated_at, name, email, company, projectType, budget, message, status, notes')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Failed to fetch contacts:', error);
    }

    return (
        <div className="p-8 w-full max-w-7xl mx-auto">
            <ContactsManager data={contacts || []} />
        </div>
    );
}
