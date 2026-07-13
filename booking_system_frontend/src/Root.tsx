import { Outlet } from 'react-router';
import { Sidebar } from './components/Sidebar';
import { useState } from 'react';
import { PanelLeft, PanelLeftClose } from 'lucide-react';

export function Root() {

    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);

    return (
        <div className="min-h-screen max-h-screen w-screen bg-[#0a0a0c] flex">
            <div className={`transition-all overflow-hidden lg:static sm:static absolute duration-300 z-50 ${sideBarOpen ? 'lg:w-87.5 w-[80%]': 'w-0 -translate-x-full'}`}>
                <Sidebar close={() => setSideBarOpen(false)} />
            </div>
            <main className='w-full relative'>
                <button
                    className='text-(--gold) block absolute z-40 left-0 lg:hidden ml-2 cursor-pointer'
                    onClick={() => {
                        sideBarOpen ? setSideBarOpen(false) : setSideBarOpen(true);
                    }}
                >
                    {sideBarOpen ? <PanelLeftClose /> : <PanelLeft />}
                </button>
                <Outlet />
            </main>
        </div>
    );
}
