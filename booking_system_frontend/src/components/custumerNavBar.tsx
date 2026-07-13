import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./AppLogo";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function CustomerNavBar () {

    const navigate = useNavigate();

    const [openMiniNav, setOpenMiniNav] = useState<boolean>(false);

    return (
        <div className="sticky top-0 z-50">
            <nav 
                className="flex bg-black/85 backdrop-blur-lg border-b border-white/10 px-8 h-16 items-center justify-between"
            >
                <Logo showWordmark={false} />
                <div className="gap-2 lg:flex hidden items-center">
                    <Link to="home" className="text-[0.875rem] font-medium text-[#9b9898] py-1.5 px-3.5 rounded-lg transition-colors duration-200 hover:bg-[#1c1c21] hover:text-[#f0ede8] cursor-pointer">Home</Link>
                    <Link to="explore" className="text-[0.875rem] font-medium text-[#9b9898] py-1.5 px-3.5 rounded-lg transition-colors duration-200 hover:bg-[#1c1c21] hover:text-[#f0ede8] cursor-pointer">Explore</Link>
                    <Link to="bookings" className="text-[0.875rem] font-medium text-[#9b9898] py-1.5 px-3.5 rounded-lg transition-colors duration-200 hover:bg-[#1c1c21] hover:text-[#f0ede8] cursor-pointer">Appointments</Link>
                </div>
                <button 
                    className="py-2.5 lg:flex hidden btn text-[#9b9898] hover:bg-[#1c1c21] hover:text-[#f0ede8]"
                    onClick={() => navigate('profile')}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    My account
                </button>
                <button
                    className="lg:hidden block text-(--text-1)"
                    onClick={() => {
                        openMiniNav 
                        ? setOpenMiniNav(false)
                        : setOpenMiniNav(true)
                    }}
                > 
                    {openMiniNav ? <X /> : <Menu />}
                </button>
            </nav>
            {openMiniNav && <div className="flex flex-col top-0 backdrop-blur-2xl gap-2">
                <Link to="home" className="text-[0.875rem] font-medium text-[#9b9898] py-1.5 px-3.5 rounded-lg transition-colors duration-200 hover:bg-[#1c1c21] hover:text-[#f0ede8] cursor-pointer">Home</Link>
                <Link to="explore" className="text-[0.875rem] font-medium text-[#9b9898] py-1.5 px-3.5 rounded-lg transition-colors duration-200 hover:bg-[#1c1c21] hover:text-[#f0ede8] cursor-pointer">Explore</Link>
                <Link to="bookings" className="text-[0.875rem] font-medium text-[#9b9898] py-1.5 px-3.5 rounded-lg transition-colors duration-200 hover:bg-[#1c1c21] hover:text-[#f0ede8] cursor-pointer">Appointments</Link>
                <Link to="profile" className="text-[0.875rem] font-medium text-[#9b9898] py-1.5 px-3.5 rounded-lg transition-colors duration-200 hover:bg-[#1c1c21] hover:text-[#f0ede8] cursor-pointer">Account</Link>
            </div>}
        </div>
    );
}