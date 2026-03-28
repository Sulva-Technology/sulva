import { requireAdminUser } from '@/lib/supabase/admin';
import { Users, Mail } from 'lucide-react';

export default async function AdminDashboard() {
    const { supabase } = await requireAdminUser();

    // Fetch counts
    const { count: contactsCount } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true });

    const { count: subscribersCount } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true });

    const stats = [
        { name: 'Total Contacts', value: contactsCount || 0, icon: Users },
        { name: 'Total Subscribers', value: subscribersCount || 0, icon: Mail },
    ];

    return (
        <div className="p-8 w-full max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                            <div className="p-3 rounded-lg bg-gray-50 text-gray-700 mr-4">
                                <Icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
