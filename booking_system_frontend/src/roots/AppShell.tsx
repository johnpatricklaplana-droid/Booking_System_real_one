import { Outlet, useLocation } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { CustomerNavBar } from '../components/custumerNavBar';
import { useUser } from '../provider/UserContext';

export function AppShell() {
    const { user } = useUser();
    const location = useLocation();

    const isBusinessRoute = location.pathname.startsWith('/business');
    const isCustomerRoute = location.pathname.startsWith('/customer');
    const showBusinessShell = isBusinessRoute && user?.activeRole === 'BUSINESS_OWNER';
    const showCustomerShell = isCustomerRoute && user?.activeRole === 'CUSTOMER';

    if (showBusinessShell) {
        return (
            <div className="min-h-screen grid grid-cols-[256px_1fr] bg-[#0a0a0c] dark">
                <Sidebar />
                <main className="min-h-screen">
                    <Outlet />
                </main>
            </div>
        );
    }

    if (showCustomerShell) {
        return (
            <div className="min-h-screen bg-[#0a0a0c] dark">
                <CustomerNavBar />
                <main>
                    <Outlet />
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0c] dark">
            <main>
                <Outlet />
            </main>
        </div>
    );
}
