import { Outlet, useLocation } from 'react-router';
import { Sidebar } from './components/Sidebar';
import { Search, Bell, Plus } from 'lucide-react';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
    '/calendar': { title: 'Calendar', subtitle: 'Weekly schedule view' },
    '/appointments': { title: 'Appointments', subtitle: 'Manage all bookings' },
    '/customers': { title: 'Customers', subtitle: 'Customer database' },
    '/services': { title: 'Services', subtitle: 'Service offerings' },
    '/settings': { title: 'Settings', subtitle: 'Account preferences' },
};

export function Root() {
    const location = useLocation();
    const pageInfo = pageTitles[location.pathname] || { title: 'Overview', subtitle: 'Welcome back, John' };

    console.log("Root mounted/rendered");

    return (
        <div className="min-h-screen grid grid-cols-[256px_1fr] bg-[#0a0a0c] dark">
            <Sidebar />

            <div className="min-h-screen">

                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
