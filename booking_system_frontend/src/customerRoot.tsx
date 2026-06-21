import { Outlet } from 'react-router';
import { CustomerNavBar } from './components/custumerNavBar';

export function CustomerRoot() {

    return (
        <div className="min-h-screen bg-[#0a0a0c] dark">
            <CustomerNavBar />

            <main className="p-8">
                <Outlet />
            </main>
        </div>
    );
}
