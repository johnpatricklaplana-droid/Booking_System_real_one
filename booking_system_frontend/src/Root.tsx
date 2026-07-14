import { Outlet } from 'react-router';
import { Sidebar } from './components/Sidebar';
import { useState } from 'react';
import { PanelLeft, PanelLeftClose } from 'lucide-react';
import { Logo } from './components/AppLogo';
import { useUser } from './provider/UserContext';

export function Root() {

    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);

    const business = useUser().activeBusiness;

    return (
        <div className="min-h-screen max-h-screen w-screen bg-[#0a0a0c] flex">
            <div className={`transition-all overflow-hidden lg:static sm:static absolute duration-300 z-50 ${sideBarOpen ? 'lg:w-87.5 w-[80%]': 'w-0 -translate-x-full'}`}>
                <Sidebar close={() => setSideBarOpen(false)} />
            </div>
            <div className='w-full overflow-y-auto'>
                <header className='py-4 sticky lg:hidden flex justify-between top-0 bg-(--surface-2)/20 backdrop-blur-2xl z-40 px-6 border-b border-b-(--border)'>
                    <div className='items-center flex gap-4'>
                        <button
                            className='text-(--text-1) z-40 left-0 cursor-pointer'
                            onClick={() => {
                                sideBarOpen ? setSideBarOpen(false) : setSideBarOpen(true);
                            }}
                        >
                            {sideBarOpen ? <PanelLeftClose /> : <PanelLeft />}
                        </button>
                        <Logo size={32} showWordmark={false} />
                    </div>
                    <div>
                        <img className='border-(--border) border rounded-full w-11 h-11' src={business?.businessLogoUrl} alt={business?.businessName} />
                    </div>
                </header>
                <main className='w-full h-fit p-6 lg:p-8'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
