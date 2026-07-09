import { Outlet } from 'react-router';
import { Sidebar } from './components/Sidebar';

export function Root() {
    return (
        <div className="min-h-screen bg-[#0a0a0c] grid grid-cols-[270px_1fr]">
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
