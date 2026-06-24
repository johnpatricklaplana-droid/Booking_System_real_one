export function ServiceBox() {

    return (
        
        <div className="bg-(--surface) border border-(--border) rounded-(radius-lg) rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 relative">
            <img src="https://picsum.photos/200/300?random=1" className="h-40 w-full relative" />
            <div className="pt-4 px-4.5 pb-4.5">
                <p className="text-[0.75rem] text-(--text-3) mb-1 font-medium">Lumière Beauty Studio</p>
                <h1 className="text-[0.9375rem] text-(--text-1) font-semibold mb-2">Gel Manicure + Nail Art</h1>
                <div className="flex items-center gap-2.5 text-[0.8125rem] text-(--text-2) mb-3.5">
                    <div className="flex gap-0.5"><span className="text-(--gold) text-[0.8125rem]">★</span><span className="text-(--gold)">★</span><span
                        className="text-[0.8125rem] text-(-gold)">★</span><span className="text-[0.8125rem] text-(--text-3)">★</span><span className="text-[0.8125rem] text-(--text-3)">★</span></div>
                    4.9 (218)
                    <span className="w-0.75 h-0.75 rounded-[50%] bg-(--text-3)"></span>
                    BGC · 0.8 km
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-[1rem] text-(--gold) font-semibold">₱550</div>
                    <div className="text-[0.75rem] text-(--teal) font-medium">Today 3:00 PM</div>
                </div>
            </div>
            <div className="absolute inset-0 flex items-end p-4.5 opacity-0 transition-opacity duration-200 bg-[linear-gradient(to_top,rgba(10,10,12,0.95)0%,transparent_60%)]">
                <button className="btn btn-primary w-full justify-center">Book now</button>
            </div>
        </div>
    );
}