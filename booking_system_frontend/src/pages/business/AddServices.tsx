import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import {
    ArrowLeft, Clock, FileText, X, Clock1,
    CloudDownload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { to24Hour, toISODuration } from '../../helper/convertSome';
import { PostFormData } from '../../api/api';
import { useUser } from '../../provider/UserContext';
import DaddysHomeLoader from '../../components/MainLoadingScreen';
import DaddysHomeStatus from '../../components/Error';
import { isDurationCanFitToTimeSlots } from '../../hooks/service';

interface Services {
    businessId: string;
    serviceName: string;
    description: string;
    duration: string;
    price: string;
    capacity: string;
};

interface FeaturedCategory {
    label: string;
    value: string;
}

const featuredCategories: FeaturedCategory[] = [
    { label: 'realme', value: 'realme' },
    { label: 'iphone', value: 'iphone' },
    { label: 'samsung', value: 'samsung' },
    { label: 'kdrama', value: 'kdrama' },
    { label: 'cdrama', value: 'cdrama' },
    { label: 'teach you lesson', value: 'teach you lesson' },
    { label: 'error', value: 'error' },
    { label: 'success', value: 'success' },
]

interface Days {
    label: string;
    value: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
}

const days: Days[] = [
    { label: 'Mon', value: 'MONDAY' },
    { label: 'Tue', value: 'TUESDAY' },
    { label: 'Wed', value: 'WEDNESDAY' },
    { label: 'Thu', value: 'THURSDAY' },
    { label: 'Fri', value: 'FRIDAY' },
    { label: 'Sat', value: 'SATURDAY' },
    { label: 'Sun', value: 'SUNDAY' },
];

interface DayTime {
    start: string;
    end: string;
}

interface Availability {
    day: string;
    startTime: string;
    endTime: string;
}


export default function ServiceForm() {
    const [selectedCategory, setSelectedCategory] = useState<string[]>(['realme']);
    const [service, setService] = useState<Services>({
        businessId: "",
        serviceName: "",
        description: "",
        duration: "",
        price: "",
        capacity: ""
    });
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [selectedDay, setSelectedDay] = useState<Days[]>([]);
    const [unit, setUnit] = useState<'min' | 'hr'>('min');
    const [hours, setHours] = useState<Map<'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY', DayTime> | null>(null);
    const [serviceImage, setServiceImage] = useState<File | null>(null);
    const [result, setResult] = useState<'success' | 'fail' | 'serviceAlreadyExist' | null>(null);
    const [validDuration, setValidDuration] = useState<boolean>();

    const bussId = useUser().activeBusiness?.businessId;

    useEffect(() => {
        if (!bussId) return;

        setService(prev => ({ ...prev, businessId: bussId }));

    }, [bussId]);

    const handleInputsChange = (e: any) => {
        const id = e.target.id;
        const value = e.target.value;

        setService(prev => ({...prev, [id]: value}));

    };

    const saveService = async () => {
        
        if (selectedDay.some(sa => {
            if (!hours?.get(sa.value)?.start && !hours?.get(sa.value)?.end) return false;
            const start = to24Hour(hours?.get(sa.value)?.start!);
            const end = to24Hour(hours?.get(sa.value)?.end!);

            const durationMin = unit === 'hr' ? (Number(service.duration) * 60) : Number(service.duration);

            return !isDurationCanFitToTimeSlots(start!, end!, durationMin);
        }
        )) {
            setValidDuration(false);
            return;
        }

        setIsSaving(true);

        const url = "http://localhost:8080/api/user/business/services";

        const duration = toISODuration(Number(service.duration), unit);

        const availability: Availability[] = selectedDay.map(sd => {
            const time = hours?.get(sd.value)!;
            return {
                day: sd.value,
                startTime: to24Hour(time?.start),
                endTime: to24Hour(time?.end)
            }
        });

        const categories = selectedCategory.map(sc => ({ categoryName: sc }));

        const serviceBody = {
            ...service,
            duration: duration,
            availability,
            categories
        };

        console.log(serviceBody);

        const body = new FormData();
        body.append('body', new Blob([JSON.stringify(serviceBody)], { type: 'application/json' }));
        body.append('file', serviceImage as File);

        const apiResult = await PostFormData(url, body);

        if (apiResult.status === 201) {
            setIsSaving(false);
            setResult('success');
        } else if(apiResult.status === 409) {
            setResult('serviceAlreadyExist');
            setIsSaving(false);
        } else {
            setIsSaving(false);
            setResult('fail');
        }

        setTimeout(() => {
            setResult(null);
        }, 10000);

    };

    const isItValid = (input: string) => {
        if(Number.isNaN(Number(input))) {
            return false;
        }
        return true;
    }

    const notGoods = () => {
        return  service.businessId.trim() === ""
            ||  service.capacity.trim() === ""
            ||  service.description.trim() === ""
            ||  service.duration.trim() === ""
            ||  service.price.trim() === ""
            ||  service.serviceName.trim() === ""
            ||  serviceImage === null
            ||  selectedCategory.length <= 0
            ||  !hours?.size
            ||  selectedDay.length <= 0
            ||  !selectedDay.every(d => hours.has(d.value))
            ||  !validDuration;
    }

    const navigate = useNavigate();

    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>): void => {
        setServiceImage(event.target?.files?.[0]!);
    }

    console.log(selectedDay.map((sd: any) => 
        hours?.get(sd.value)
    ));

    console.log(validDuration);

    return (
        <div>
            {isSaving && <DaddysHomeLoader />}

            {result !== null && result === 'fail' && <DaddysHomeStatus type='error' onPrimaryAction={() => console.log("TODO")} message='check your internet connection and try again' onDismiss={() => setResult(null)}  />}
            {result !== null && result === 'success' && <DaddysHomeStatus type='success' onPrimaryAction={() => console.log("TODO")} onDismiss={() => setResult(null)} />}
            {result !== null && result === 'serviceAlreadyExist' && <DaddysHomeStatus type='conflict' onPrimaryAction={() => console.log("TODO")} onDismiss={() => setResult(null)} />}

            <div className='grid gap-4 grid-cols-1 lg:grid-cols-[1fr_320px]'>
                <div className='space-y-4'>
                    <div className='bg-(--surface) border border-(--border) p-4 rounded-2xl'>
                        <div className='flex gap-2 items-center mb-4'>
                            <div className='bg-(--text-1)/5 w-fit p-2 rounded-sm'>
                                <FileText color='white' />
                            </div>
                            <div>
                                <h1 className='leading-4 text-(--text-1) text-base'>Basics</h1>
                                <p className='text-xs text-(--text-2)'>Name and description what customers are booking</p>
                            </div>
                        </div>
                        <div>
                            <div className=''>
                                <p className='text-(--text-1) mb-2 text-[16px]'>Service Name <span className='text-red-600'>*</span></p>
                                <input 
                                    className={`w-full py-2 px-4 text-(--text-1) rounded-2xl ${service.serviceName ? 'ring ring-(--teal) border border-(--teal)' : 'ring ring-red-600 border border-red-600'} outline-0 placeholder:text-(--text-2) text-sm text-(--text-1)`} 
                                    type="text"
                                    placeholder='service name'
                                    onChange={handleInputsChange}
                                    id='serviceName'
                                    value={service.serviceName}
                                />
                            </div>
                            <div className='mb-4 mt-2'>
                                <p className='text-(--text-1) text-[16px]'>Description</p>
                                <textarea 
                                    className={`text-(--text-1) py-2 px-4 ${service.description ? 'ring ring-(--teal) border border-(--teal)' : 'ring ring-red-600 border border-red-600'} rounded-2xl mt-2 placeholder:text-(--text-2) w-full text-sm outline-0`}
                                    placeholder='what are you waiting for to the left to the right' 
                                    id="description"
                                    onChange={handleInputsChange}
                                    value={service.description}
                                ></textarea>
                            </div>
                        </div>
                        <div>
                            <p className='text-(--text-1) mb-2 text-[16px]'>Category <span className='text-red-600'>*</span></p>
                            <div className='flex flex-wrap gap-2'>
                                {featuredCategories.map(cat =>
                                    <button
                                        key={cat.value}
                                        onClick={() => setSelectedCategory(prev => {
                                            if(prev.includes(cat.value)) return prev;
                                            return [...prev, cat.value]
                                        })}
                                        className={`py-2 px-4 cursor-pointer text-sm font-medium active:scale-105 transition border rounded-2xl ${selectedCategory?.includes(cat.value) ? 'bg-(--gold-light) ring ring-(--gold-light) border-(--gold) text-(--text-3)' : 'bg-(--text-3) text-(--text-1) border-(--border)'} `}
                                    >
                                        {cat.label}
                                    </button>
                                )}
                            </div>
                            <div
                                className='flex gap-2 mt-2'
                            >
                                <input className='w-full rounded-2xl outline-0 placeholder:text-(--text-2) text-sm focus:ring ring-(--gold-light) focus:border-(--gold-light) text-(--text-1) border border-(--border) py-2 px-4' placeholder='add some categories' type="text" />
                                <button className='py-2 px-4 font-medium text-(--text-1) bg-(--violet) rounded-2xl'>Add</button>
                            </div>
                            <div className={`mt-4 flex flex-wrap ${selectedCategory.length <= 0 ? 'border-[rgba(255,70,70,.2)] border bg-[rgba(255,70,70,0.07)]' : 'bg-(--teal-dim) border border-(--teal)'} p-2 rounded-2xl gap-2`}>
                                {selectedCategory.map(sCat => 
                                    <div
                                        key={sCat}
                                        className='relative rounded-2xl py-2 px-4 bg-white'
                                    >
                                        <button 
                                            className='absolute top-0 right-0 cursor-pointer bg-red-600'
                                            onClick={() => setSelectedCategory(prev => prev.filter(p => p !== sCat))}
                                        >
                                            <X size={16} /> 
                                        </button>
                                        {sCat}
                                    </div>
                                )}
                                {selectedCategory.length <= 0 && 
                                    <p className='text-center w-full text-[#ff6b6b]'>no category please add some</p>
                                }
                            </div>
                        </div>
                    </div>

                    <div className='bg-(--surface) border border-(--border) p-4 rounded-2xl'>
                        <div className='flex gap-2 items-center mb-4'>
                            <div className='bg-(--text-1)/5 w-fit p-2 rounded-sm'>
                                <Clock color='white' />
                            </div>
                            <div>
                                <h1 className='leading-4 text-(--text-1) text-base'>Duration and pricing</h1>
                                <p className='text-xs text-(--text-2)'>How long it takes and what it costs</p>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className='w-full'>
                                <p className='text-(--text-1) text-[16px]'>Price <span className='text-red-600'>*</span></p>
                                <div className={`w-full flex ${service.price ? 'ring ring-(--teal) border border-(--teal)' : 'ring ring-red-600 border border-red-600'} mt-2 text-(--text-1) gap-2 pl-4 items-center rounded-2xl`}>
                                    <p>₱</p>
                                    <input
                                        className='outline-0 placeholder:text-(--text-2) py-2 w-full text-sm'
                                        type="text"
                                        placeholder='sevice price'
                                        id='price'
                                        onChange={(e) => {
                                            if (isItValid(e.target.value)) {
                                                handleInputsChange(e);
                                            }
                                        }}
                                        value={service.price}
                                    />
                                </div>
                            </div>
                            <div>
                                <p className='text-[16px] text-(--text-2)'>Capacity</p>
                                <input
                                    className={`w-full mt-2 py-2 px-4 rounded-2xl ${service.capacity ? 'ring ring-(--teal) border border-(--teal)' : 'ring ring-red-600 border border-red-600'} outline-0 placeholder:text-(--text-2) text-sm text-(--text-1)`}
                                    type="text"
                                    placeholder='capacity'
                                    id='capacity'
                                    onChange={(e) => {
                                        if (isItValid(e.target.value)) {
                                            handleInputsChange(e);
                                        }
                                    }}
                                    value={service.capacity}
                                />
                            </div>
                        </div>
                        <div className='w-full'>
                            <p className='text-(--text-1) text-[16px]'>Duration <span className='text-red-600'>*</span></p>
                            <div className={`w-full items-center flex mt-2 text-(--text-1) gap-2 px-4 rounded-2xl ${service.duration ? 'ring ring-(--teal) border border-(--teal)' : 'ring ring-red-600 border border-red-600'}`}>
                                <p><Clock1 size={16}></Clock1></p>
                                <input
                                    className='outline-0 w-full py-2 placeholder:text-(--text-2) text-sm'
                                    type="text"
                                    placeholder='servrice duration'
                                    id='duration'
                                    onChange={(e) => {
                                        if (isItValid(e.target.value)) {
                                            const invalidOne = selectedDay.some(sa => {
                                                    if(!hours?.get(sa.value)?.start && !hours?.get(sa.value)?.end) return false;
                                                    const start = to24Hour(hours?.get(sa.value)?.start!);
                                                    const end = to24Hour(hours?.get(sa.value)?.end!);

                                                    const durationMin = unit === 'hr' ? (Number(e.target.value) * 60) : Number(e.target.value);

                                                    return !isDurationCanFitToTimeSlots(start!, end!, durationMin);
                                                }
                                            );

                                            if(invalidOne) {
                                                setValidDuration(false);
                                            } else {
                                                setValidDuration(true);
                                            }

                                            handleInputsChange(e);
                                        }
                                    }}
                                    value={service.duration}
                                />
                                <div className='flex gap-2 bg-(--surface-3) rounded-sm'>
                                    <button
                                        className={`text-sm border p-2 border-(--border) cursor-pointer active:scale-95 transition-colors ${unit === 'min' ? 'bg-(--gold)' : ''} rounded-sm`}
                                        onClick={() => setUnit('min')}
                                    >min</button>
                                    <button
                                        className={`text-sm border p-2 cursor-pointer active:scale-95 ${unit === 'hr' ? 'bg-(--gold)' : ''} border-(--border) rounded-sm`}
                                        onClick={() => setUnit('hr')}
                                    >hr</button>
                                </div>
                            </div>
                            {!validDuration && <p className='text-red-700 text-center'>invalid duration buddy check your time slots</p>}
                        </div>
                    </div>

                    <div className='bg-(--surface) border border-(--border) p-4 rounded-2xl'>
                        <div className='flex gap-2 items-center mb-4'>
                            <div className='bg-(--text-1)/5 w-fit p-2 rounded-sm'>
                                <Clock color='white' />
                            </div>
                            <div>
                                <h1 className='leading-4 text-(--text-1) text-base'>Availability</h1>
                                <p className='text-xs text-(--text-2)'>Days and time this service can be booked</p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <p className='text-(--text-1) mb-2 text-[16px]'>Available days <span className='text-red-600'>*</span></p>
                                <div className='flex gap-2 overflow-x-auto scrollbar-thumb-(--gold) p-2'>
                                    {days.map(d =>
                                        <button
                                            key={d.value}
                                            onClick={() => setSelectedDay(prev => {
                                                if(prev.includes(d)) return prev;
                                                return [...prev ,d];
                                            })}
                                            className={`py-2 px-4 border border-(--border) cursor-pointer active:scale-105 transition ${selectedDay.includes(d) ? 'ring ring-(--gold) bg-(--gold-dim)' : ''} text-(--text-1) text-sm rounded-2xl`}
                                        >
                                            {d.label}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className={`bg-(--text-3) flex flex-wrap ${selectedDay.length <= 0 ? 'bg-[rgba(255,70,70,0.07)] border-[rgba(255,70,70,.2)] border' : ''} gap-2 p-4 rounded-2xl mt-4`}>
                                {selectedDay.map(sd => {

                                    const hasTime = hours?.get(sd.value);

                                    const featureTime: DayTime[] = [
                                        { start: '09:00 AM', end: '05:00 PM' },
                                        { start: '09:00 AM', end: '05:00 PM' },
                                        { start: '09:00 AM', end: '05:00 PM' },
                                        { start: '09:00 AM', end: '05:00 PM' },
                                        { start: '09:00 AM', end: '05:00 PM' },
                                    ];

                                    return (
                                        <div
                                            key={sd.value}
                                            className='p-2 bg-(--surface-2) max-w-full rounded-sm relative'
                                        >
                                            <button 
                                                className='absolute bg-red-600 p-1 rounded-sm top-0 right-0 cursor-pointer hover:scale-105 active:scale-95 transition -translate-y-1 translate-x-1'
                                                onClick={() => {
                                                    setSelectedDay(prev => { return prev.filter(p => p.value !== sd.value) })
                                                    setHours(prev => {
                                                        const next = new Map(prev ?? []);
                                                        next.delete(sd.value);
                                                        return next;
                                                    });
                                                }}
                                            ><X size={10} color='white' /></button>

                                            <div className='border w-fit py-2 px-4 rounded-2xl border-(--gold-light) bg-(--gold-dim) text-(--gold) text-sm'>{sd.label}</div>
                                            {hasTime 
                                                ? <div className='bg-amber-100 mt-2 relative rounded-sm py-2 px-4'>
                                                    <button 
                                                        className='absolute bg-red-600 p-1 rounded-sm top-0 right-0 cursor-pointer hover:scale-105 transition active:scale-95 -translate-y-1 translate-x-1'
                                                        onClick={() => setHours(prev => {
                                                            const next = new Map(prev ?? []);
                                                            next.delete(sd.value);
                                                            return next;
                                                        })}
                                                    ><X size={8} color='white' /></button>
                                                    {hasTime.start}-{hasTime.end}
                                                </div> 
                                                : <div className='mt-4'>
                                                    <p className='text-xs text-(--text-2)'>no time choose some</p>
                                                    <div className='space-x-2'>
                                                        {featureTime.map(ft =>
                                                            <button 
                                                                className='bg-(--violet) text-sm cursor-pointer active:scale-105 transition text-(--text-1) py-2 px-4 rounded-sm mt-2'
                                                                key={ft.start}
                                                                onClick={() => setHours(prev => {
                                                                    const next = new Map(prev ?? []);
                                                                    next.set(sd.value, ft);
                                                                    return next;
                                                                })}
                                                            >{ft.start}-{ft.end}</button>
                                                        )}
                                                    </div>
                                                    <p className='text-xs mb-1 text-(--text-2) mt-2'>or add manually</p>
                                                    <div className='space-x-2'>
                                                        <input className='max-w-[50%] border-(--border) border rounded-sm focus:ring w-125 outline-0 px-4 py-2 placeholder:text-(--text-2) text-(--text-1)' placeholder='add some' type="text" />
                                                        <button className='bg-(--text-1) py-2 px-4 rounded-sm active:scale-105 transition cursor-pointer'>confirm</button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    )
                                })}
                                {selectedDay.length <= 0 && 
                                    <p className={`text-[#ff6b6b] text-center w-full`}>no days selected please select a bit</p>
                                }
                            </div>
                        </div>

                    </div>

                </div>

                <div className='bg-(--surface) h-fit border border-(--border) p-4 rounded-2xl'>
                    <p className='text-(--text-1) mb-2 text-[16px]'>Image</p>
                    <label 
                        className={`${serviceImage ? 'ring ring-(--teal) border border-(--teal)' : 'ring ring-red-600 border border-red-600'} group relative overflow-hidden rounded-2xl h-45 w-full flex items-center justify-center`} 
                        htmlFor="serviceImage"
                    >
                        <div className='flex flex-col text-blue-400 backdrop-blur-2xl w-full h-full cursor-pointer group-hover:z-50 items-center justify-center'>
                            <CloudDownload size={44} />
                            <p>Add some</p>
                        </div>
                        {serviceImage && <img className='absolute' src={URL.createObjectURL(serviceImage)} alt="" />}
                        <input type="file" onChange={handleFileInputChange} id="serviceImage" hidden />
                    </label>
                </div>
            </div>
            <div className="sticky bottom-0 z-10 bg-[#0a0a0c]/95 backdrop-blur-sm border-b border-[rgba(255,255,255,0.08)]">
                <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#9a9aa3] hover:bg-[#151518] hover:text-[#e8e8ea] transition-all"
                            onClick={() => navigate('/business/services')}
                        >
                            <ArrowLeft size={18} strokeWidth={2} />
                        </button>
                        <div>
                            <h1 className="text-[16px] font-medium text-[#e8e8ea]">New Service</h1>
                        </div>
                    </div>
                    <button
                        className="px-5 py-2.5 bg-linear-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[13px] font-medium text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                        onClick={saveService}
                        disabled={notGoods()}
                    >
                        Save service
                    </button>
                </div>
            </div>
        </div>
    );
}