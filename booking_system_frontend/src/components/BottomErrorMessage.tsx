import { AlertCircle, CheckCircle } from "lucide-react";

export function ErrorMessage({ 
    message, 
    success, 
    head 
}: 
Readonly<{ 
    message: string, 
    success: boolean, 
    head: string 
}>) {
    return (
        <div className={`w-95 rounded-2xl border ${success ? 'border-(--teal)/40 bg-[#0f2222]' : 'border-[#6b1f28] bg-[#221214]'} backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-5 flex gap-4 items-start fixed z-50 bottom-4 right-4 overflow-hidden opacity-0 translate-y-2 animate-[fade-in_0.4s_ease-out_forwards] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.75)] hover:-translate-y-0.5`}>
            <div className={`absolute left-0 top-0 bottom-0 w-0.75 bg-linear-to-b ${success ? 'from-(--teal)/80 via-(--teal) to-(--teal)/40' : 'from-[#e0453f]/80 via-[#c93a35] to-[#e0453f]/40'}`} />

            <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-inset ring-[#d4af37]/8" />

            <div className="shrink-0 mt-0.5">
                <div className={`w-9 h-9 rounded-full  flex items-center ${success ? 'bg-(--teal)/10 border border-(--teal)/20' : 'bg-[#c93a35]/10 border border-[#c93a35]/20'} justify-center`}>
                    {success ? <CheckCircle className="text-(--teal)" /> : <AlertCircle color="#e0645f" />}
                </div>
            </div>

            <div className="flex-1 min-w-0 pr-1">
                <h4 className="text-[14.5px] font-semibold text-[#f2f0ea] tracking-[-0.01em] leading-snug">
                    {head}
                </h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#a8a5a0] font-normal">
                    {message}
                </p>
                <div className="mt-3 h-px w-full bg-linear-to-r from-[#d4af37]/20 via-[#d4af37]/5 to-transparent" />
            </div>

            <button className="shrink-0 mt-0.5 w-6 h-6 rounded-md flex items-center justify-center text-[#6b6864] hover:text-[#d4af37] hover:bg-white/4 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
    );
}