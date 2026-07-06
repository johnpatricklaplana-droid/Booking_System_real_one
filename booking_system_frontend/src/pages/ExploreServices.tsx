import { useEffect, useState } from "react";
import type { ServiceResponse, ServiceWithBusiness } from "../interfaces/Types";
import { getAllServices } from "../hooks/service";
import { useNavigate } from "react-router-dom";
import { useUser } from "../provider/UserContext";
import { TimezoneLabel } from "../helper/convertSome";

export function ExploreServices() {

    const [services, setServices] = useState<ServiceWithBusiness[]>([]);

    const activeBusiness = useUser().activeBusiness;

    const navigate = useNavigate();
    
    useEffect(() => {
        
        const getIt = async () => {

            const result = await getAllServices();

            setServices(result);

        }

        getIt();

    }, []);

    return (
        <div className="min-h-screen" id="page-explore">
            <div className="pt-12 px-0 pb-8">
                <div className="max-w-280 my-0 mx-auto py-0 px-8">
                    <h1 className="text-[1.75rem] text-(--text-1) font-bold tracking-[-0.03em] mb-5">Explore services
                    </h1>
                    <div className="flex gap-3 items-center mb-5">
                        <div className="relative pl-4 gap-4 items-center bg-(--surface-2) text-(--text-2) placeholder:text-(--text-2) rounded-2xl border border-(--border) flex flex-[1.8]">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                            <input className="w-full py-2 text-(--text-1) outline-none" type="text" placeholder="Search services, businesses…" />
                        </div>
                        <div className="relative pl-4 items-center border border-(--border) gap-4 flex text-(--text-2) rounded-2xl flex-1 bg-(--surface-2)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <input className="py-2 w-full placeholder:text-(--text-2) text-(--text-1) outline-none" type="text" placeholder="Manila, PH" />
                        </div>
                        <button className="btn btn-primary">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                            Search
                        </button>
                    </div>

                    <div className="flex gap-2.5 flex-wrap items-center">
                        <div className="flex active:border-[rgba(201,169,110,0.4)] active:text-(--gold) active:bg-(--gold-dim) py-1.75 px-3.5 text-[0.8125rem] font-medium text-(--text-2) cursor-pointer transition-all duration-200 items-center gap-1.5 bg-(--surface-2) border border-(--border) rounded-[100px]">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            All
                        </div>
                        <div className="flex py-1.75 px-3.5 text-[0.8125rem] font-medium text-(--text-2) cursor-pointer transition-all duration-200 items-center gap-1.5 bg-(--surface-2) border border-(--border) rounded-[100px]">💆 Beauty</div>
                        <div className="flex py-1.75 px-3.5 text-[0.8125rem] font-medium text-(--text-2) cursor-pointer transition-all duration-200 items-center gap-1.5 bg-(--surface-2) border border-(--border) rounded-[100px]">🏋️ Fitness</div>
                        <div className="flex py-1.75 px-3.5 text-[0.8125rem] font-medium text-(--text-2) cursor-pointer transition-all duration-200 items-center gap-1.5 bg-(--surface-2) border border-(--border) rounded-[100px]">🧘 Wellness</div>
                        <div className="flex py-1.75 px-3.5 text-[0.8125rem] font-medium text-(--text-2) cursor-pointer transition-all duration-200 items-center gap-1.5 bg-(--surface-2) border border-(--border) rounded-[100px]">🩺 Medical</div>
                        <div className="flex py-1.75 px-3.5 text-[0.8125rem] font-medium text-(--text-2) cursor-pointer transition-all duration-200 items-center gap-1.5 bg-(--surface-2) border border-(--border) rounded-[100px]">🔧 Home</div>
                        <div className="w-px h-7 bg-(--border)"></div>
                        <div className="flex py-1.75 px-3.5 text-[0.8125rem] font-medium text-(--text-2) cursor-pointer transition-all duration-200 items-center gap-1.5 bg-(--surface-2) border border-(--border) rounded-[100px]">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                            Price
                        </div>
                        <div className="flex py-1.75 px-3.5 text-[0.8125rem] font-medium text-(--text-2) cursor-pointer transition-all duration-200 items-center gap-1.5 bg-(--surface-2) border border-(--border) rounded-[100px]">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <polygon
                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            Rating: 4+
                        </div>
                        <div className="flex py-1.75 px-3.5 text-[0.8125rem] font-medium text-(--text-2) cursor-pointer transition-all duration-200 items-center gap-1.5 bg-(--surface-2) border border-(--border) rounded-[100px]">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            Available today
                        </div>
                        <div className="w-px h-7 bg-(--border)"></div>
                        <div className="relative">
                            <select className="bg-(--surface-2) text-[0.8125rem] text-(--text-2) cursor-pointer appearance-none min-w-0 w-auto border border-(--border) rounded-[100px] pt-1.75 pr-8 pb-1.75 pl-3.5">
                                <option>Sort: Relevance</option>
                                <option>Nearest first</option>
                                <option>Highest rated</option>
                                <option>Price: low to high</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-280 my-0 mx-auto py-0 px-8">
                <div className="flex items-center justify-between pt-6 px-0 pb-5">
                    <p className="text-[0.875rem] text-(--text-2)"><strong>{services.length}</strong> services near Manila, PH</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 pb-20">

                    {services.map(swb => 
                        <div 
                            className="service-card group relative bg-(--surface) border border-(--border) rounded-2xl overflow-hidden transition-transform duration-200 cursor-pointer hover:-translate-y-1.5"
                            key={swb.services.id}
                            onClick={() => navigate(`/customer/service/${swb.services.id}`)}
                        >
                            <img src={swb.services.serviceLogoUrl} className="h-40 w-full object-contain" />
                            <div className="pt-4 px-4.5 pb-4.5">
                                <div className="flex gap-2 items-center">
                                    <img className="w-5.5 h-5.5 mb-2 rounded-[50%]" src={swb.business.businessLogoUrl} alt={swb.business.businessName} />
                                    <div className="text-[0.75rem] text-(--text-3) mb-1 font-medium">{swb.business.businessName}</div>
                                </div>
                                <div className="text-[0.9375rem] text-(--text-1)">{swb.services.serviceName}</div>
                                <p className="flex items-center gap-2.5 text-[0.8125rem] text-(--text-2) mt-2">
                                    {swb.business.address.displayName}
                                </p>
                                <div className="flex mt-2 items-center justify-between">
                                    <div className="font-semibold text-(--gold-light) text-[1rem]">₱{swb.services.price}</div>
                                    <div className="text-[0.75rem] text-(--teal) font-medium">{activeBusiness ? TimezoneLabel(activeBusiness?.timezone) : ""}</div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}