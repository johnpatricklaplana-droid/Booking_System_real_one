import { useEffect, useMemo, useState } from "react";
import { BookingDatePicker } from "../components/DatePicker";
import type { Business, ReviewWithUser, ServiceAvailability, ServiceResponse, Staff, Time } from "../interfaces/Types";
import { useParams } from "react-router-dom";
import { get, post } from "../api/api";
import { buildBookingPayloadTime, formatDuration, TimezoneLabel } from "../helper/convertSome";
import { durationAsMinutes, getAverageRating } from "../hooks/service";
import DaddysHomeBanner from "../components/DaddysHomeBanner";
import DaddysHomeBookingTicket from "../components/BookingConfirmation";
import StarRating from "../components/Star";

function BookingResultModal ({ 
    serviceDetails, 
    selectedStaff, 
    selectedTime, 
    selectedDate 
}: 
    Readonly<{ 
        serviceDetails: ServiceResponse | null, 
        selectedStaff: string, 
        selectedTime: Time | null, 
        selectedDate: Date 
    }>) {
    return (
        <div className="bg-(--surface) w-[90%] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] z-50 lg:w-125 fixed border border-(--teal)/30 rounded-xl p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-(--teal-dim) flex items-center justify-center mx-auto mb-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-(--teal)">
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            </div>
            <div className="text-(--text-1) text-[1.125rem] font-semibold mb-1.5">You're all set</div>
            <p className="text-(--text-2) text-sm mb-1">{serviceDetails?.serviceName} with {selectedStaff}</p>
            <p className="text-(--text-3) text-[0.8125rem] mb-6">
                {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · {selectedTime?.label}
            </p>
            <button
                className="text-(--gold) text-sm font-medium hover:underline"
            >
                View my bookings →
            </button>
        </div> 
    );
}

function dayAsNumber(day: string): number {
    if (day === "MONDAY") {
        return 1;
    } else if (day === "TUESDAY") {
        return 2;
    } else if (day === "WEDNESDAY") {
        return 3;
    } else if (day === "THURSDAY") {
        return 4;
    } else if (day === "FRIDAY") {
        return 5;
    } else if (day === "SATURDAY") {
        return 6;
    } else {
        return 7;
    }
}

export function ServiceDetails() {

    const [serviceDetails, setServiceDetails] = useState<ServiceResponse | null>(null);
    const [business, setBusiness] = useState<Business | null>(null);
    const [staff, setStaff] = useState<Staff[] | null>(null);
    const [rating, setRating] = useState<ReviewWithUser[] | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>((new Date()));
    const [selectedTime, setSelectedTime] = useState<Time | null>(null);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [bookingResult, setBookingResult] = useState<{ success: boolean, message: string } | null>(null);
    const [serviceAvailability, setServiceAvailability] = useState<ServiceAvailability[]>([]);
    const [openBookingConfirmation, setOpenBookingConfirmation] = useState<boolean>(false);
    const [validTime, setValidTime] = useState<boolean>();
    
    const { serviceId } = useParams();

    const notGoods = () => {
        
        return selectedDate === null
            || selectedTime === null
            || selectedStaff === null
            || serviceId === null
            || validTime;
    };

    useEffect(() => {

        if(!serviceId) return;

        const getIt = async () => {
            const url = `http://localhost:8080/api/services/${serviceId}`;

            const result: any = await get(url);
        console.log(result);
            setBusiness(result.business);
            setStaff(result.staff);
            setServiceDetails(result.services);
            setServiceAvailability(result.serviceAvailability);
        };
        
        getIt();

    }, [serviceId]);

    useEffect(() => {
        
        if(!serviceId) return;

        const url = `http://localhost:8080/api/review/services/${serviceId}`;

        const getIt = async () => {
            const result: ReviewWithUser[] = await get(url);

            setRating(result);

        };

        getIt();

    }, [serviceId]);

    const book = async () => {

        if(!selectedTime) {
            return;
        };

        if(!selectedStaff) {
            return;
        }

        if(!serviceId) return;

        if(!selectedDate) return;

        const datetimeWithTimeZone = buildBookingPayloadTime(selectedDate, selectedTime?.value, business?.timezone ?? "");

        const body: { startsAt: string, staffId: string, serviceId: string } = {
            startsAt: datetimeWithTimeZone,
            staffId: selectedStaff.id,
            serviceId: serviceId
        }

        const url = "http://localhost:8080/api/schedule";

        try {
            const result = await post(url, body);

            if (result.status === 201) {
                console.log("good one");
                setBookingResult({ success: true, message: "super success" });
            }
        } catch (error) {
            console.log(error);
            setBookingResult({ success: false, message: "something went super wrong try again later" });
        }

        setTimeout(() => {
            setBookingResult(null);
        }, 2000);

    };

    const toMinutes = (t: string): number => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    };

    const isTimeCanDoIt = (sa: ServiceAvailability): boolean => {
        if (!selectedTime) return false;

        const start = toMinutes(sa.startTime);
        const end = toMinutes(sa.endTime);
        const selected = toMinutes(selectedTime.value);
        const duration = Number(durationAsMinutes(serviceDetails?.duration!));

        return start <= selected && (end - duration) >= selected;
    };

    return (
        <div className="min-h-screen">
            <DaddysHomeBanner>
                <img className="rounded-[50%] w-40 h-40" src={business?.businessLogoUrl} alt="" />
            </DaddysHomeBanner>

            {openBookingConfirmation && <DaddysHomeBookingTicket onClick={book} onClose={() => setOpenBookingConfirmation(false)} staff={selectedStaff!} service={serviceDetails!} date={selectedDate} time={selectedTime!} />}

            {bookingResult && <BookingResultModal selectedTime={selectedTime} selectedDate={selectedDate} serviceDetails={serviceDetails} selectedStaff={selectedStaff?.id!} />}

            <div className="min-h-screen lg:p-8 p-6 max-w-280 mx-auto">
                <div className="grid lg:grid-cols-[1fr_340px] gap-12 pt-12 items-start">
                    <div>
                        <div className="inline-flex items-center gap-1.5 text-[0.875rem] text-(--text-3) hover:text-(--text-2) mb-7 cursor-pointer transition-colors duration-200">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2">
                                <path d="M19 12H5M12 5l-7 7 7 7" />
                            </svg>
                            Back to results
                        </div>
                        <div className="text-[2rem] font-bold tracking-[0.3em] text-(--text-1) mb-2.5">{serviceDetails?.serviceName}</div>
                        <div className="flex lg:flex-row flex-col gap-3.5 mb-6">
                            <div className="flex items-center gap-1.25">
                                {/* todo fetch the rating */}
                                <StarRating rating={4} />
                                <span className="text-[0.8125rem] text-(--text-2) font-semibold">{rating ? getAverageRating(rating?.map(r => r.review.rating)) : 'no rating'}</span>
                                <span className="text-[0.75rem] text-(--text-3)">({rating?.length})</span>
                            </div>
                            <span className="text-[0.8125rem] text-(--text-3)">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2" className="inline mr-1">
                                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                {business?.address.displayName}
                            </span>
                        </div>
                        <p className="text-[1rem] text-(--text-2) leading-[1.7] mb-10 max-w-140">
                            {serviceDetails?.description}
                        </p>
                        <p className="text-[0.75rem] font-semibold uppercase leading-[0.8em] text-(--text-3) mb-3.5">Pick a date</p>
                        <BookingDatePicker availableDay={serviceAvailability.map(sa => sa.day)} selectDate={setSelectedDate} />
                        <p className="text-[0.75rem] mt-8 font-semibold uppercase tracking-[0.8em] text-(--text-3) mb-3.5">Available times</p>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
                            {/* DESIGN IF BOOKED : 
                                opacity: 0.35;
                                cursor: not-allowed;
                                text-decoration: line-through; 
                            */}
                            {serviceAvailability.map(sa => {

                                const day = dayAsNumber(sa.day);

                                const chosenOne = selectedDate.getDay() === day;

                                const vt = isTimeCanDoIt(sa);

                                return (<div
                                    key={sa.day}
                                    className={`p-2 border ${chosenOne ? 'bg-(--gold-dim) border-(--gold)' : 'bg-(--surface-2)'} h-fit rounded-sm relative`}
                                >
                                    <div className='border w-fit py-2 px-4 rounded-sm border-(--gold-light) bg-(--gold-dim) text-(--gold) text-sm'>{sa.day.toLocaleLowerCase()} {chosenOne ? selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : ''}</div>
                                    
                                    <div className='bg-(--gold) mt-2 relative rounded-sm py-2 px-4'>
                                        {new Date(2000, 9, 1, Number(sa.startTime.split(':')[0])).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}-
                                        {new Date(2000, 9, 1, Number(sa.endTime.split(':')[0])).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    {chosenOne 
                                        ? <>
                                            <p className="mt-2 text-xs uppercase tracking-tight font-semibold text-(--text-2)">select some time</p>
                                            <input 
                                                className={`w-full mt-1 border ${isTimeCanDoIt(sa) ? 'border-(--gold) text-(--gold) bg-(--gold)/10' : 'border-red-700 text-red-700 bg-red-700/10' } py-2 px-4 rounded-sm`}
                                                type="time" 
                                                onChange={(e) => {
                                                    setSelectedTime({ label: e.target.value, value: e.target.value })
                                                    setValidTime(vt);
                                                }}
                                            />
                                            {!vt && <p className="text-red-700 text-center">i gave my heart</p>}
                                        </> 
                                        : ''
                                    }
                                </div>)
                            })}
                        </div>  
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.8em] text-(--text-3) mb-3.5 mt-10">Select Staff</p>
                        <div className="mb-8 grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {staff?.map(s => 
                                <button
                                    key={s.id}
                                    className={`flex gap-2 ${selectedStaff?.id === s.id ? 'bg-(--gold-dim) border-(--gold-light)' : 'bg-(--surface-2)'} rounded-sm hover:border-(--gold-light) border border-(--border) cursor-pointer py-2 px-4`}
                                    onClick={() => {
                                        setSelectedStaff(s);
                                    }}
                                >
                                    <img className="w-9 h-9 rounded-[50%]" src={`http://localhost:8080/api/staff/${s.avatarUrl}`} alt="" />
                                    <div>
                                        <h1 className="text-(--text-1) text-sm">{s.fullName}</h1>
                                        <p className="text-(--text-2) text-xs">{s.title}</p>
                                    </div>
                                </button>
                            )}
                        </div>
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.8em] text-(--text-3) mb-3.5 mt-10">What clients say</p>
                        <div className="flex flex-col mb-8 gap-5">
                            {rating?.map((r) => 
                                <div 
                                    className="pb-5 border-b border-b-(--border)"
                                    key={r.review.comment}
                                >
                                    <div className="gap-2.5 mb-2.5 flex items-center">
                                        <img className="w-9 h-9 rounded-[50%] border border-(--border)" src={r.user.avatarUrl} alt="" />
                                        <div>
                                            <div className="text-[0.9rem] text-(--text-1) font-semibold">{r.user.firstName} {r.user.lastName}</div>
                                            <div className="text-[0.75rem] mt-0.5 text-(--text-3)">{r.review.createdAt}</div>
                                        </div>
                                        <div className="flex gap-0.5 ml-auto"><span className="star">★</span><span
                                            className="star">★</span><span className="star">★</span><span className="star">★</span><span
                                                className="star">★</span></div>
                                    </div>
                                    <p className="text-[0.875rem] text-(--text-2) tracking-wide">{r.review.comment}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="sticky lg:block hidden top-[25%]">
                        <div className="bg-(--surface) border border-(--border) rounded-xl p-7 sticky top-21">
                            <div className="text-[1rem] text-(--text-1) font-semibold mb-5">Reserve your spot</div>
                            <div className="bg-(--surface-2) border border-(--border) rounded-(--radius) py-3.5 px-4 mb-4">
                                <div className="text-[0.75rem] text-(--text-3) mb-0.5">Service</div>
                                <div className="text-[0.9375rem] text-(--text-1) font-semibold" id="sidebarService">{serviceDetails?.serviceName}</div>
                            </div>
                            <div className="sidebar-selection">
                                <div className="text-[0.75rem] text-(--text-3) mb-0.5">Date & time</div>
                                <div className="text-[0.9375rem] text-(--text-2) font-semibold">
                                    <span className="text-(--text-1)">{selectedDate?.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} </span>
                                    · 
                                    <span className="text-(--gold)"> {selectedTime?.label}</span>
                                    <span className="text-[0.75rem] ml-1.5 font-normal">{business?.timezone ? TimezoneLabel(business.timezone) : "enter some"}</span>
                                </div>
                            </div>
                            <p className="text-(--text-2) my-2 text-sm">duration: {formatDuration(Number(durationAsMinutes(serviceDetails?.duration!)))}</p>
                            <div className="flex justify-between items-center py-4 px-0 border-t border-t-(--border) mb-5">
                                <div className="text-[0.875rem] text-(--text-2)">Total</div>
                                <div className="text-[1.375rem] text-(--teal) font-bold">₱{serviceDetails?.price.toLocaleString()}</div>
                            </div>
                            <button 
                                className="btn btn-primary btn-lg w-full"
                                disabled={notGoods()}
                                onClick={() => setOpenBookingConfirmation(true)}
                            >
                                Book now
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                            <p className="text-[0.75rem] text-(--text-3) text-center mt-3">
                                Free cancellation up to 2 hours before
                            </p>
                        </div>
                    </div>
                </div>
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.8em] text-(--text-3) mb-4">Services From Lumiere studio</p>
                <div className="flex mb-16 overflow-x-auto px-4 gap-6">
                    {/* {featuredServices.map(service =>
                        <div 
                            key={service.id}
                            className="shrink-0 w-[32%]"
                        >
                            <ServiceBox services={service} />
                        </div>
                    )} */}
                </div>
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.8em] text-(--text-3) mb-4">Related Services</p>
                <div className="grid grid-cols-3 gap-6">
                    {/* {featuredServices.map(service =>
                        <ServiceBox key={service.id} services={service} />
                    )} */}
                </div>
            </div>
        </div>
    );
}