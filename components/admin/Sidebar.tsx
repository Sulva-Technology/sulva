'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, Mail, FileText, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function Sidebar({ userEmail }: { userEmail?: string }) {
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Contacts', href: '/admin/contacts', icon: Users },
        { name: 'Newsletter', href: '/admin/newsletter', icon: Mail },
        { name: 'Insights', href: '/admin/insights', icon: FileText },
    ];

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/admin/login');
        router.refresh();
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between hidden md:flex">
            <div>
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <span className="text-xl font-bold tracking-tight">Sulva Admin</span>
                </div>
                <nav className="p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                        ? 'bg-black text-white'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center mb-4 px-2">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {userEmail || 'Admin User'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
