import { Mail, Lock, ArrowRight, Check, CalendarCheck, Bell, Shield, Star, Smartphone, Bookmark, Building2 } from 'lucide-react';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase_config';
import { post } from '../api/api';
import { useNavigate, Link } from 'react-router';

const benefits = [
    { icon: CalendarCheck, text: 'Easy booking and scheduling' },
    { icon: Bell, text: 'Appointment reminders' },
    { icon: Bookmark, text: 'Manage upcoming reservations' },
    { icon: Shield, text: 'Secure account access' },
    { icon: Star, text: 'Save your favorite providers' },
    { icon: Smartphone, text: 'Mobile-friendly experience' },
];

interface AuthData {
    email: string | undefined;
    password: string | undefined;
    first_name: string;
    last_name: string;
    firebase_uid: string;
    id_token: string;
}

export function Signup() {

    const navigate = useNavigate();

    const [authData, setAuthData] = useState<AuthData>({ email: '', password: '', first_name: '', last_name: '', firebase_uid: '', id_token: '' });

    const signUp = async (e: any) => {
        e.preventDefault();

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, authData.email!, authData.password!);
            console.log(userCredential);
            const url = "http://localhost:8080/api/auth/signup";

            const idToken = await userCredential.user.getIdToken();
            authData.firebase_uid = userCredential.user.uid;
            authData.id_token = idToken;
        
            const result = await post(url, authData);
            console.log(result);

            if(!result.success) {
                navigate('/home');
            }

        } catch (error) {
            console.error("TODO: " + error);
        }

    };

    const onInputChange = (e: any) => {
        const { id, value } = e.target;
        setAuthData(prev => ({ ...prev, ...{ [id]: value } }));
    }

    return (
        <div className="min-h-screen bg-[#0a0a0c] dark flex">
            {/* Left Side - Form */}
            <div className="w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <Link to="/landing" className="inline-flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a87c] to-[#9d8fb5] flex items-center justify-center">
                            <span className="text-[#0a0a0c] font-semibold">A</span>
                        </div>
                        <span className="text-[18px] font-medium text-[#e8e8ea]">Apex</span>
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-[32px] font-medium text-[#e8e8ea] mb-2">Create your account</h1>
                        <p className="text-[14px] text-[#9a9aa3]">Get started — it's free. No credit card required.</p>
                    </div>

                    <form className="space-y-5">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[13px] font-medium text-[#e8e8ea] mb-2">First name</label>
                                <input
                                    type="text"
                                    id='first_name'
                                    value={authData.first_name}
                                    onChange={onInputChange}
                                    placeholder="John"
                                    className="w-full px-4 py-3 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[14px] text-[#e8e8ea] placeholder-[#9a9aa3] focus:outline-none focus:border-[#c9a87c] transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-medium text-[#e8e8ea] mb-2">Last name</label>
                                <input
                                    type="text"
                                    id='last_name'
                                    value={authData.last_name}
                                    onChange={onInputChange}
                                    placeholder="Doe"
                                    className="w-full px-4 py-3 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[14px] text-[#e8e8ea] placeholder-[#9a9aa3] focus:outline-none focus:border-[#c9a87c] transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-medium text-[#e8e8ea] mb-2">Email address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9aa3]" size={18} />
                                <input
                                    type="email"
                                    id='email'
                                    value={authData.email}
                                    onChange={onInputChange}
                                    placeholder="you@example.com"
                                    className="w-full pl-11 pr-4 py-3 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[14px] text-[#e8e8ea] placeholder-[#9a9aa3] focus:outline-none focus:border-[#c9a87c] transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] font-medium text-[#e8e8ea] mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9aa3]" size={18} />
                                <input
                                    type="password"
                                    id='password'
                                    value={authData.password}
                                    onChange={onInputChange}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[14px] text-[#e8e8ea] placeholder-[#9a9aa3] focus:outline-none focus:border-[#c9a87c] transition-all"
                                />
                            </div>
                            <p className="text-[12px] text-[#9a9aa3] mt-2">Must be at least 8 characters</p>
                        </div>

                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="w-4 h-4 mt-0.5 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded accent-[#c9a87c]"
                            />
                            <label htmlFor="terms" className="text-[13px] text-[#9a9aa3]">
                                I agree to the{' '}
                                <a href="#" className="text-[#c9a87c] hover:text-[#b89c7e] transition-colors">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-[#c9a87c] hover:text-[#b89c7e] transition-colors">
                                    Privacy Policy
                                </a>
                            </label>
                        </div>

                        <Link
                            to="/"
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[14px] font-medium text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all"
                            onClick={signUp}
                        >
                            Create account
                            <ArrowRight size={16} />
                        </Link>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[rgba(255,255,255,0.08)]" />
                            </div>
                            <div className="relative flex justify-center text-[12px]">
                                <span className="px-3 bg-[#0a0a0c] text-[#9a9aa3]">OR CONTINUE WITH</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] font-medium text-[#e8e8ea] hover:border-[rgba(255,255,255,0.15)] transition-all">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </button>

                            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] font-medium text-[#e8e8ea] hover:border-[rgba(255,255,255,0.15)] transition-all">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                                GitHub
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-[13px] text-[#9a9aa3] mt-8">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#c9a87c] hover:text-[#b89c7e] transition-colors font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Benefits */}
            <div className="w-1/2 relative overflow-hidden bg-gradient-to-br from-[#151518] to-[#0a0a0c] border-l border-[rgba(255,255,255,0.06)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a87c]/10 via-transparent to-[#9d8fb5]/10" />

                <div className="relative h-full flex flex-col items-center justify-center p-16">
                    <div className="mb-12 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#c9a87c]/10 border border-[#c9a87c]/20 rounded-full mb-6">
                            <div className="w-2 h-2 bg-[#c9a87c] rounded-full animate-pulse" />
                            <span className="text-[12px] text-[#c9a87c] font-medium">FREE TO JOIN</span>
                        </div>

                        <h2 className="text-[36px] font-medium text-[#e8e8ea] mb-4 leading-tight">
                            Everything you need
                            <br />
                            in one place
                        </h2>
                        <p className="text-[15px] text-[#9a9aa3] max-w-md">
                            Book services, manage appointments, and discover trusted providers near you
                        </p>
                    </div>

                    <div className="w-full max-w-lg space-y-3">
                        {benefits.map(({ icon: Icon, text }, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-4 bg-[#151518]/50 backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-xl"
                            >
                                <div className="w-8 h-8 rounded-lg bg-[#c9a87c]/20 flex items-center justify-center flex-shrink-0">
                                    <Icon size={15} className="text-[#c9a87c]" />
                                </div>
                                <span className="text-[14px] text-[#e8e8ea]">{text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 p-6 bg-[#151518]/50 backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-xl max-w-lg">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9d8fb5] to-[#7a6f9b] flex items-center justify-center text-[14px] font-medium text-[#e8e8ea] flex-shrink-0">
                                JL
                            </div>
                            <div>
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="w-3 h-3 rounded-sm bg-[#c9a87c]" />
                                    ))}
                                </div>
                                <p className="text-[13px] text-[#e8e8ea] leading-relaxed mb-2">
                                    "I love how easy it is to book and reschedule appointments. The reminders keep me on track every week."
                                </p>
                                <p className="text-[12px] text-[#9a9aa3]">Jamie L., verified customer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
