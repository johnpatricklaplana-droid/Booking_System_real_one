import { useNavigate, useParams } from "react-router-dom";
import type { ServiceAvailability, ServiceResponse, ServiceStatus, ServiceWithRatings, Staff } from "../../interfaces/Types";
import { useEffect, useState, type ChangeEvent } from "react";
import { get, post } from "../../api/api";
import { durationAsMinutes } from "../../hooks/service";
import { useUser } from "../../provider/UserContext";
import { formatDuration } from "../../helper/convertSome";
import { Plus, X } from "lucide-react";

const statusStyles: Record<ServiceStatus, string> = {
    ACTIVE: "bg-(--teal-dim) text-(--teal)",
    DRAFT: "bg-(--surface-2) text-(--text-3)",
    PAUSED: "bg-(--gold-dim) text-(--gold)",
};

function MetricCard({
    icon,
    value,
    label,
    tone = "gold",
}: {
    icon: React.ReactNode;
    value: string;
    label: string;
    tone?: "gold" | "teal";
}) {
    const iconBg = tone === "gold" ? "bg-(--gold-dim) text-(--gold)" : "bg-(--teal-dim) text-(--teal)";
    return (
        <div className="flex items-center gap-3.5 bg-(--surface-2) border border-(--border) rounded-(--radius) py-3.5 px-4">
            <div className={`w-10 h-10 rounded-[50%] flex items-center justify-center shrink-0 ${iconBg}`}>
                {icon}
            </div>
            <div className="min-w-0">
                <div className="text-[1.0625rem] font-bold text-(--text-1) leading-tight truncate">{value}</div>
                <div className="text-[0.75rem] text-(--text-3)">{label}</div>
            </div>
        </div>
    );
}

export function ManageService() {

    const navigate = useNavigate();

    const { serviceId } = useParams();

    const businessId = useUser().activeBusiness?.businessId;

    const [service, setService] = useState<ServiceResponse | null>(null);
    const [staffs, setStaffs] = useState<Staff[]>([]);
    const [allStaff, setAllStaff] = useState<Staff[]>([]);
    const [serviceAvailability, setServiceAvailability] = useState<ServiceAvailability[]>([]);

    const [addingStaff, setAddingStaff] = useState<boolean>(false);
    const [addingServiceAvailability, setAddingServiceAvailability] = useState<boolean>(false);

    const [addServiceAvailability, setAddServiceAvailability] = useState<ServiceAvailability>({ day: 'MONDAY', startTime: '09:00', endTime: '17:00' });

    useEffect(() => {

        if(!serviceId) return;

        const url = `http://localhost:8080/api/services/${serviceId}`;

        const getIt = async () => {

            const result = await get(url);

            setService(result.services);
            setStaffs(result.staff);
            setServiceAvailability(result.serviceAvailability);
            console.log(result);

        };

        getIt();

    }, [serviceId]);

    useEffect(() => {

        if(!businessId) return;

        const getIt = async () => {
            const url = `http://localhost:8080/api/staff/business/${businessId}/staff-only`;

            const result = await get(url);
          console.log(result);
            setAllStaff(result);
            
        }

        getIt();

    }, [businessId]);

    const addStaffToThisService = async (staff: Staff) => {
        setAddingStaff(true);
        setStaffs(prev => [...prev, staff]);

        const url = `http://localhost:8080/api/staff/business/${businessId}`;

        const body = {
            serviceId: serviceId,
            staffIds: [
                staff.id
            ]
        };

        try {
            const result = await post(url, body);

            if (result.status === 201) {
                setAddingStaff(false);
            }
        } catch (error) {
            setStaffs(prev => prev.filter(s => s.id !== staff.id));
            setAddingStaff(false);
        }

    };

    const addServiceAvailabilityFunction = async () => {
    
        if(serviceAvailabilityNoGoods()) return;

        setServiceAvailability(prev => [...prev, body]);

        setAddingServiceAvailability(true);

        const url = `http://localhost:8080/api/services/${serviceId}/${businessId}`;
        const body: ServiceAvailability = addServiceAvailability;

        console.log(body);

        try {
            const result = await post(url, body);

            if(result.status === 201) {
                setAddingServiceAvailability(false);
            }
        } catch (error) {
            setAddingServiceAvailability(false);
            setServiceAvailability(prev => prev.filter(sa => sa.day !== body.day));
        }

    };

    const serviceAvailabilityNoGoods = () => {
        return addServiceAvailability?.day === ''.trim()
            || addServiceAvailability?.startTime === ''.trim()
            || addServiceAvailability?.endTime === ''.trim()
            || serviceAvailability.some(sa => sa.day === addServiceAvailability.day);
    };

    const handleAvailabilityInputChange = (event: any): void  => {
        
        let value = event.target.value;
        const id = event.target.id;

        setAddServiceAvailability(prev => ({ ...prev, [id]: value }));

    }

    return (
        <div className="p-8 overflow-y-auto h-screen">

            <div className="max-w-280 mx-auto">

                <button 
                    className="inline-flex items-center gap-1.5 text-[0.875rem] text-(--text-3) hover:text-(--text-2) mb-8 cursor-pointer transition-colors duration-200"
                    onClick={() => navigate('/business/services')}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                    Back to services
                </button>

                {/* Service — the main subject of this page */}
                <div className="bg-(--surface) border border-(--border) rounded-xl overflow-hidden mb-10">
                    <div className="flex gap-7 p-8">
                        <div className="w-40 h-40 shrink-0 rounded-(--radius) bg-(--surface-2) border border-(--border) overflow-hidden flex items-center justify-center">
                            {service?.serviceLogoUrl ? (
                                <img className="w-full h-full object-cover" src={service?.serviceLogoUrl} alt="" />
                            ) : (
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-(--text-3)">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <path d="M21 15l-5-5L5 21" />
                                </svg>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div>
                                    <span className={`inline-block text-[0.6875rem] font-bold py-1 px-2.5 rounded-[100px] tracking-widest mb-3 ${service?.status ? statusStyles[service?.status] : ''}`}>
                                        {service?.status}
                                    </span>
                                    <h1 className="text-[1.875rem] font-bold text-(--text-1) leading-tight">{service?.serviceName}</h1>
                                </div>
                                <button className="btn btn-secondary shrink-0 flex items-center gap-1.5 text-[0.8125rem]">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" />
                                    </svg>
                                    Edit service
                                </button>
                            </div>

                            <p className="text-[0.9375rem] text-(--text-2) leading-[1.7] max-w-160">
                                {service?.description}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3 px-8 pb-8">
                        <MetricCard
                            tone="teal"
                            value={`₱${service?.price.toLocaleString()}`}
                            label="Price"
                            icon={
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            }
                        />
                        <MetricCard
                            tone="gold"
                            value={service?.duration ? formatDuration(Number(durationAsMinutes(service?.duration))) : ''}
                            label="Duration"
                            icon={
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M12 7v5l3 3" />
                                </svg>
                            }
                        />
                        <MetricCard
                            tone="gold"
                            value={`${service?.capacity} at once`}
                            label="Capacity per slot"
                            icon={
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            }
                        />
                        <MetricCard
                            tone="teal"
                            value={`${staffs.length} assigned`}
                            label="Staff"
                            icon={
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            }
                        />
                    </div>
                </div>

                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.3em] text-(--text-3) mb-4">Service configuration</p>

                <div className="grid grid-cols-2 gap-6">

                    {/* Staff panel */}
                    <div className="bg-(--surface) h-fit border border-(--border) rounded-xl p-6">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-[0.9375rem] font-semibold text-(--text-1)">Staff who perform this</h2>
                                <p className="text-[0.75rem] text-(--text-3) mt-0.5">Only assigned staff show up as bookable</p>
                            </div>
                            <button className="btn btn-secondary text-[0.75rem] flex items-center gap-1.5 py-1.5 px-3 shrink-0">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                                Add staff
                            </button>
                        </div>

                        {/* Picker of unassigned staff, always shown for editing */}
                        <div className="bg-(--surface-2) border border-(--border) rounded-(--radius) p-2 mb-4">
                            <p className="text-[0.6875rem] uppercase tracking-wide text-(--text-3) px-2 pt-1 pb-1.5">Available to add</p>
                            {allStaff.filter(al => !staffs.some(st => st.id === al.id)).map(s => (
                                <div
                                    key={s.id}
                                    className={`w-full flex items-center justify-between px-2 py-2 rounded-(--radius) hover:bg-(--surface) transition-colors`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <img 
                                            className="w-8 h-8 rounded-[50%]"
                                            src={s.avatarUrl}
                                        />
                                        <div className="text-left">
                                            <div className="text-[0.8125rem] text-(--text-1)">{s.fullName}</div>
                                            <div className="text-[0.6875rem] text-(--text-3)">{s.title}</div>
                                        </div>
                                    </div>
                                    <button 
                                        className={`cursor-pointer hover:scale-105`}
                                        onClick={() => addStaffToThisService(s)}
                                        disabled={addingStaff}
                                    >
                                        <Plus className="text-(--gold)" size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <p className="text-[0.6875rem] uppercase tracking-wide text-(--text-3) mb-2">Assigned</p>
                        <div className="flex flex-col gap-2">
                            {staffs?.map(s => (
                                <div
                                    key={s.id}
                                    className="flex items-center justify-between px-3.5 py-3 bg-(--surface-2) border border-(--border) rounded-(--radius)"
                                >
                                    <div className="flex items-center gap-3">
                                        <img className="w-9 h-9 rounded-[50%] border border-(--border) object-cover" src={s.avatarUrl} alt="" />
                                        <div>
                                            <div className="text-[0.8125rem] text-(--text-1)">{s.fullName}</div>
                                            <div className="text-[0.6875rem] text-(--text-3)">{s.title}</div>
                                        </div>
                                    </div>
                                    <button className="p-1.5 rounded-(--radius) text-(--text-3) hover:text-red-500 transition-colors">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {staffs.length <= 0 && (
                                <div className="bg-(--surface-2) border border-(--border) rounded-2xl py-2 text-sm">
                                    <p className="text-(--text-2) text-center">no staff assigned yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Availability panel */}
                    <div className="bg-(--surface) border border-(--border) rounded-xl p-6">
                        <div className="mb-5">
                            <h2 className="text-[0.9375rem] font-semibold text-(--text-1)">When it's bookable</h2>
                            <p className="text-[0.75rem] text-(--text-3) mt-0.5">Up to {service?.capacity} booking{service?.capacity === 1 ? "" : "s"} per slot</p>
                        </div>

                        {/* Add slot row, editable, no logic attached */}
                        <div className="flex items-end gap-2 bg-(--surface-2) border border-(--border) rounded-(--radius) p-3 mb-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-[0.6875rem] text-(--text-3)">Day</label>
                                <select 
                                    defaultValue="MONDAY" className="bg-(--surface) border border-(--border) rounded-(--radius) text-[0.8125rem] text-(--text-1) py-1.5 px-2"
                                    onChange={handleAvailabilityInputChange}
                                    id="day"
                                    value={addServiceAvailability?.day}
                                >
                                    <option value="MONDAY">Monday</option>
                                    <option value="TUESDAY">Tuesday</option>
                                    <option value="WEDNESDAY">Wednesday</option>
                                    <option value="THURSDAY">Thursday</option>
                                    <option value="FRIDAY">Friday</option>
                                    <option value="SATURDAY">Saturday</option>
                                    <option value="SUNDAY">Sunday</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[0.6875rem] text-(--text-3)">Start</label>
                                <input 
                                    type="time" defaultValue="09:00" className="bg-(--surface) border border-(--border) rounded-(--radius) text-[0.8125rem] text-(--text-1) py-1.5 px-2" 
                                    onChange={handleAvailabilityInputChange}
                                    id="startTime"
                                    value={addServiceAvailability?.startTime}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[0.6875rem] text-(--text-3)">End</label>
                                <input 
                                    type="time" defaultValue="17:00" className="bg-(--surface) border border-(--border) rounded-(--radius) text-[0.8125rem] text-(--text-1) py-1.5 px-2"
                                    onChange={handleAvailabilityInputChange}
                                    id="endTime"
                                    value={addServiceAvailability?.endTime}
                                />
                            </div>
                            <button 
                                className="btn btn-primary text-[0.75rem] py-1.5 px-3 flex items-center gap-1.5"
                                disabled={serviceAvailabilityNoGoods()}
                                onClick={addServiceAvailabilityFunction}
                            >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                                Add
                            </button>
                        </div>

                        <p className="text-[0.6875rem] uppercase tracking-wide text-(--text-3) mb-2">Weekly slots</p>
                        <div className="flex flex-col gap-2">
                            {serviceAvailability.map((sa, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between px-3.5 py-3 bg-(--surface-2) border border-(--border) rounded-(--radius)"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-[50%] bg-(--teal-dim) flex items-center justify-center shrink-0">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-(--teal)">
                                                <circle cx="12" cy="12" r="9" />
                                                <path d="M12 7v5l3 3" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="text-[0.8125rem] text-(--text-1) capitalize">{sa.day.toLowerCase()}</div>
                                            <div className="text-[0.6875rem] text-(--text-3)">{new Date(2000, 9, 1, Number(sa.startTime.split(':')[0])).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} – {new Date(2000, 9, 1, Number(sa.endTime.split(':')[0])).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                                        </div>
                                    </div>
                                    <button className="p-1.5 rounded-(--radius) text-(--text-3) hover:text-red-500 transition-colors">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}