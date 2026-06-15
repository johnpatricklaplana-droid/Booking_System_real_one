import { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import {
    Store,
    MailIcon,
    Phone,
    MapPin,
    Globe,
    CloudDownloadIcon,
    Image,
    ArrowLeftIcon,
    ArrowRightIcon
} from 'lucide-react';

interface BusinessFormData {
    businessName: string;
    businessType: string;
    description: string;
    businessEmail: string;
    phoneNumber: string;
    address: string;
    timezone: string;
    logo: File | null;
    logoPreview: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const businessTypes = [
    { value: 'salon', label: 'Salon & Beauty' },
    { value: 'barbershop', label: 'Barbershop' },
    { value: 'spa', label: 'Spa & Wellness' },
    { value: 'gym', label: 'Gym & Fitness' },
    { value: 'clinic', label: 'Medical Clinic' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'home_services', label: 'Home Services' },
    { value: 'other', label: 'Other' },
];

const timezones = [
    'UTC-12:00 (Baker Island)',
    'UTC-11:00 (American Samoa)',
    'UTC-10:00 (Hawaii)',
    'UTC-09:00 (Alaska)',
    'UTC-08:00 (Pacific Time)',
    'UTC-07:00 (Mountain Time)',
    'UTC-06:00 (Central Time)',
    'UTC-05:00 (Eastern Time)',
    'UTC-04:00 (Atlantic Time)',
    'UTC-03:00 (Brazil)',
    'UTC-02:00 (Mid-Atlantic)',
    'UTC-01:00 (Azores)',
    'UTC+00:00 (GMT/London)',
    'UTC+01:00 (CET/Paris)',
    'UTC+02:00 (EET/Helsinki)',
    'UTC+03:00 (Moscow)',
    'UTC+04:00 (Dubai)',
    'UTC+05:00 (Pakistan)',
    'UTC+05:30 (India)',
    'UTC+06:00 (Bangladesh)',
    'UTC+07:00 (Bangkok)',
    'UTC+08:00 (Singapore/Manila)',
    'UTC+09:00 (Tokyo/Seoul)',
    'UTC+10:00 (Sydney)',
    'UTC+11:00 (Solomon Islands)',
    'UTC+12:00 (Auckland)',
];

function SuccessRing() {
    return (
        <div className="relative w-24 h-24 mx-auto mb-8">
            <svg viewBox="0 0 96 96" fill="none" className="w-full h-full">
                <circle cx="48" cy="48" r="40" stroke="rgba(201,168,124,0.12)" strokeWidth="3" />
                <circle
                    cx="48" cy="48" r="40"
                    stroke="url(#goldGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset="251.2"
                    style={{
                        animation: 'drawRing 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s forwards',
                        transformOrigin: '48px 48px',
                        transform: 'rotate(-90deg)',
                    }}
                />
                <polyline
                    points="30,49 42,61 66,36"
                    stroke="url(#goldGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="60"
                    strokeDashoffset="60"
                    style={{ animation: 'drawCheck 0.35s ease 0.75s forwards' }}
                />
                <defs>
                    <linearGradient id="goldGrad" x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#e8c98a" />
                        <stop offset="100%" stopColor="#c9a87c" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}


export function BusinessSetup() {

    const navigate = useNavigate();

    const [logo, setLogo] = useState(null);

    const handleLogoChange = (e: any) => {
        const file = e.target.files[0];

        setLogo(file);
    };

    return (
        <div className='min-h-screen bg-(--bg)'>
            <header className='py-6 border-b border-b-(--border) flex items-center flex-col relative bg-gradient-to-b from-[#1A1A1A] via-[#151515] to-[#0F0F0F]'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_60%)]'>
                </div>
                <Store size={44} className='text-(--gold)'></Store>
                <h1 className='text-4xl font-bold text-(--text-1)'>Create your <span className='text-(--gold)'>business</span></h1>
                <p className='text-(--text-2)'>tell us about your business to get started</p>
            </header>
            <main className='px-16 py-11'>
                <div className='rounded-2xl p-6 max-w-[700px] mx-auto space-y-6'>
                    <div className='w-full'>
                        <h1 className='text-(--text-1) mb-4 text-[24px]'>Business Details</h1>
                        <div className='flex gap-4 w-full mb-5'>
                            <div className='w-full'>
                                <label className='text-(--text-1)'>Business name</label>
                                <input type="text" placeholder='some name' className='w-full mt-2 border border-(--border) outline-0 text-(--text-2) py-2 px-4 rounded-2xl' />
                            </div>
                            <div className='w-full'>
                                <label className='text-(--text-1)'>Business Type</label>
                                <input type="text" placeholder='some business type' className='w-full mt-2 text-(--text-2) border border-(--border) outline-0 py-2 px-4 rounded-2xl' />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-(--text-1) mb-4'>Business description</label>
                            <textarea className='min-h-35 rounded-2xl border border-(--border) outline-0 p-4 text-(--text-2)' placeholder='enter some' name="" id=""></textarea>
                        </div>
                    </div>
                    <div className='w-full'>
                        <h1 className='text-(--text-1) mb-4 text-[24px]'>Contact information</h1>
                        <div className='flex gap-4 w-full mb-5'>
                            <div className='w-full'>
                                <label className='text-(--text-1)'>Email</label>
                                <div className='w-full border mt-2 border-(--border) rounded-2xl flex items-center'>
                                    <MailIcon className='text-(--text-2) ml-4'></MailIcon>
                                    <input type="email" placeholder='some email' className='w-full outline-0 py-2 px-4 text-(--text-1)' />
                                </div>
                            </div>
                            <div className='w-full'>
                                <label className='text-(--text-1)'>Phone number</label>
                                <div className='w-full border mt-2 border-(--border) rounded-2xl flex items-center'>
                                    <Phone className='text-(--text-2) ml-4'></Phone>
                                    <input type="email" placeholder='090343434' className='w-full outline-0 py-2 px-4 text-(--text-1)' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-(--text-1) mb-4 text-[24px]'>Location & Timezone</h1>
                        <div className='flex gap-4 w-full mb-5'>
                            <div className='w-full'>
                                <label className='text-(--text-1)'>Address</label>
                                <div className='w-full border mt-2 border-(--border) rounded-2xl flex items-center'>
                                    <MapPin className='text-(--text-2) ml-4'></MapPin>
                                    <input type="email" placeholder='some address' className='w-full outline-0 py-2 px-4 text-(--text-1)' />
                                </div>
                            </div>
                            <div className='w-full'>
                                <label className='text-(--text-1)'>Timezone</label>
                                <div className='w-full border mt-2 border-(--border) rounded-2xl flex items-center'>
                                    <Globe className='text-(--text-2) ml-4'></Globe>
                                    <input type="email" placeholder='some timezone' className='w-full outline-0 py-2 px-4 text-(--text-1)' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <h1 className='text-(--text-1) mb-4 text-[24px]'>Business Super Logo</h1>
                        <div className='grid grid-cols-[500px_1fr] w-full gap-4'>
                            {logo === null ? <Image className='w-full text-(--gold) h-[300px]' /> : <img className='w-full rounded-2xl text-(--gold) h-[300px]' src={URL.createObjectURL(logo)} />}
                            <div className='flex items-center justify-center h-full w-full'>
                                <label htmlFor='fileInput' className='bg-(--gold-light)/20 cursor-pointer p-9 rounded-2xl'>
                                    <CloudDownloadIcon size={44} className='text-(--gold)'></CloudDownloadIcon>
                                </label>
                            </div>
                            <input onChange={handleLogoChange} type="file" hidden name="" id="fileInput" />
                        </div>
                    </div>
                    <div className='flex justify-between mt-8 w-full'>
                        <button onClick={() => navigate('/profile')} className='flex gap-1 items-center bg-(--surface) cursor-pointer px-4 py-2 rounded-2xl border border-(--border) text-(--text-1)'><ArrowLeftIcon></ArrowLeftIcon>super cancel</button>
                        <button className='flex gap-1 items-center bg-(--gold) cursor-pointer px-4 py-2 rounded-2xl border border-(--border) text-(--text-1)'>create one<ArrowRightIcon></ArrowRightIcon></button>
                    </div>
                </div>
            </main>
        </div>
    );
}