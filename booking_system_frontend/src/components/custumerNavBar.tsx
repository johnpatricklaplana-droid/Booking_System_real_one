import { Link, useNavigate } from "react-router-dom";

export function CustomerNavBar () {

    const navigate = useNavigate();

    return (
        <nav 
            className="sticky hidden sm:flex top-0 z-50 bg-black/85 backdrop-blur-lg border-b border-white/10 px-8 h-16 items-center justify-between"
        >
            <div className="text-[1.25rem] font-bold tracking-tight bg-[linear-gradient(135deg,_#e8c98a,_#c9a96e)] bg-clip-text text-transparent">Daddy's home</div>
            <div className="flex gap-2 items-center">
                <Link to="home" className="text-[0.875rem] font-medium text-[#9b9898] py-1.5 px-3.5 rounded-lg transition-colors duration-200 hover:bg-[#1c1c21] hover:text-[#f0ede8] cursor-pointer">Home</Link>
                <Link to="explore" className="text-[0.875rem] font-medium text-[#9b9898] py-1.5 px-3.5 rounded-lg transition-colors duration-200 hover:bg-[#1c1c21] hover:text-[#f0ede8] cursor-pointer">Explore</Link>
                <Link to="jobs" className="text-[0.875rem] font-medium text-[#9b9898] py-1.5 px-3.5 rounded-lg transition-colors duration-200 hover:bg-[#1c1c21] hover:text-[#f0ede8] cursor-pointer">Jobs</Link>
            </div>
            <div className="flex items-center gap-2.5">
                <button 
                    className="py-2.5 btn text-[#9b9898] hover:bg-[#1c1c21] hover:text-[#f0ede8]"
                    onClick={() => navigate('profile')}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    My account
                </button>
                <button className="btn animate-bounce btn-sm bg-[linear-gradient(135deg,var(--gold-light)_0%,var(--gold)_100%)] text-[bg] shadow-[0_2px_16px_rgba(201,169,110,0.25)] hover:shadow-[0_4px_24px_rgba(201,69,110,0.4)] cursor-pointer hover:translate-y-px ">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    Book now
                </button>
            </div>
        </nav>
    );
}