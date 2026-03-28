import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

async function getAdminMembership(userId: string) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();

    if (error) {
        console.error('Failed to verify admin membership:', error);
        return null;
    }

    return data;
}

export async function requireAdminUser() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/admin/login');
    }

    const membership = await getAdminMembership(user.id);

    if (!membership) {
        redirect('/admin/login');
    }

    return { supabase, user };
}
