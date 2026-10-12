import { requireAdminUser } from '@/lib/supabase/admin';
import InsightsManager from '@/components/admin/InsightsManager';

export default async function InsightsPage() {
    const { supabase } = await requireAdminUser();

    const { data: insights, error } = await supabase
        .from('insights')
        .select('id, slug, title, category, excerpt, content, author, author_role, image_url, og_image_url, website_url, seo_title, seo_description, canonical_url, featured, status, published_at, updated_at')
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Failed to fetch insights:', error);
    }

    return (
        <div className="p-8 w-full max-w-7xl mx-auto">
            <InsightsManager data={insights || []} />
        </div>
    );
}
