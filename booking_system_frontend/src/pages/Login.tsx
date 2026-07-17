import { Link, useNavigate } from 'react-router';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase_config';
import { login } from '../api/api';
import { useUser } from '../provider/UserContext';
import { API_URL } from '../api/config';

interface AuthData {
    email: string;
    password: string;
}

interface FieldErrors {
    email?: string;
    password?: string;
}

type Status = 'idle' | 'loading' | 'error';


export function Login() {
    const [authData, setAuthData] = useState<AuthData>({ email: '', password: '' });
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [authError, setAuthError] = useState('');
    const [status, setStatus] = useState<Status>('idle');

    const navigate = useNavigate();

    const user = useUser();

    const validate = (): boolean => {
        const errors: FieldErrors = {};
        if (!authData.email.trim()) {
            errors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authData.email)) {
            errors.email = 'Enter a valid email address.';
        }
        if (!authData.password) {
            errors.password = 'Password is required.';
        } else if (authData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const signIn = async (e: React.MouseEvent) => {
        e.preventDefault();
        setAuthError('');
        if (!validate()) return;

        setStatus('loading');

        try {
            const result = await signInWithEmailAndPassword(auth, authData.email, authData.password);

            console.log(await result.user.getIdToken());
            setStatus("idle");

            const userinfo = await login(`${API_URL}/api/auth/login`, await result.user.getIdToken());

            user?.setUser({ firstName: userinfo.message.firstName, lastName: userinfo.message.lastName, email: userinfo.message.email, roles: userinfo.message.roles, profilePic: userinfo.message.avatarUrl, addres: null, phone: null, activeRole: userinfo.message.lastActiveRole, lastBusinessIdImViewing: userinfo.message.lastBusinessImViewing });

            if(userinfo.status === 200) {
                user.setLoading(false);
            }

            navigate("/customer/home");
        } catch (error) {
            setStatus("error");
            setAuthError("something went super wrong");
        }
       
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setAuthData(prev => ({ ...prev, [id]: value }));
       
        if (fieldErrors[id as keyof FieldErrors]) {
            setFieldErrors(prev => ({ ...prev, [id]: undefined }));
        }
        if (authError) setAuthError('');
        if (status === 'error') setStatus('idle');
    };

    const isLoading = status === 'loading';

    console.log("LOOPING?");

    return (
        <>
            <style>{`
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-6px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%      { transform: translateX(-5px); }
                    40%      { transform: translateX(5px); }
                    60%      { transform: translateX(-4px); }
                    80%      { transform: translateX(4px); }
                }
                .field-error { animation: fadeInDown 0.2s ease both; }
                .auth-error  { animation: shake 0.4s ease both; }
            `}</style>

            <div className="min-h-screen bg-[#0a0a0c] flex">

                {/* ── Left — Form ── */}
                <div className="w-1/2 flex items-center justify-center p-8">
                    <div className="w-full max-w-md">

                        <Link to="/landing" className="inline-flex items-center gap-3 mb-12">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a87c] to-[#9d8fb5] flex items-center justify-center">
                                <span className="text-[#0a0a0c] font-semibold">A</span>
                            </div>
                            <span className="text-[18px] font-medium text-[#e8e8ea]">Apex</span>
                        </Link>

                        <div className="mb-8">
                            <h1 className="text-[32px] font-medium text-[#e8e8ea] mb-2">Welcome back</h1>
                            <p className="text-[14px] text-[#9a9aa3]">Sign in to your account to continue</p>
                        </div>

                        {/* ── Auth error — shake banner, sits above fields ── */}
                        {authError && (
                            <div className="auth-error flex items-center gap-3 px-4 py-3 mb-5 rounded-lg border border-[rgba(255,80,80,0.22)] bg-[rgba(255,80,80,0.07)]">
                                <svg className="w-4 h-4 shrink-0 text-[#ff6b6b]" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M8 5v3.5M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                <p className="text-[13px] text-[#ff8080] leading-snug">{authError}</p>
                            </div>
                        )}

                        <form>

                            {/* Email */}
                            <div className='mb-6'>
                                <label className="block text-[13px] font-medium text-[#e8e8ea] mb-2">Email address</label>
                                <div className="relative">
                                    <Mail
                                        className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${fieldErrors.email ? 'text-[#ff6b6b]' : 'text-[#9a9aa3]'}`}
                                        size={18}
                                    />
                                    <input
                                        type="email" id="email"
                                        value={authData.email} onChange={onInputChange}
                                        placeholder="you@example.com"
                                        disabled={isLoading}
                                        className={`w-full pl-11 pr-4 py-3 bg-[#151518] border rounded-lg text-[14px] text-[#e8e8ea] placeholder-[#9a9aa3] focus:outline-none transition-all disabled:opacity-50
                                            ${fieldErrors.email
                                                ? 'border-[rgba(255,80,80,0.45)] focus:border-[rgba(255,80,80,0.7)]'
                                                : 'border-[rgba(255,255,255,0.08)] focus:border-[#c9a87c]'
                                            }`}
                                    />
                                </div>
                                {fieldErrors.email && (
                                    <p className="field-error flex items-center gap-1.5 mt-1.5 text-[12px] text-[#ff8080]">
                                        <svg className="w-3 h-3 shrink-0" viewBox="0 0 12 12" fill="none">
                                            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                                            <path d="M6 3.5v3M6 8.5h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                        </svg>
                                        {fieldErrors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div className='mb-6'>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-[13px] font-medium text-[#e8e8ea]">Password</label>
                                    <a href="#" className="text-[13px] text-[#c9a87c] hover:text-[#b89c7e] transition-colors">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <Lock
                                        className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${fieldErrors.password ? 'text-[#ff6b6b]' : 'text-[#9a9aa3]'}`}
                                        size={18}
                                    />
                                    <input
                                        type="password" id="password"
                                        value={authData.password} onChange={onInputChange}
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                        className={`w-full pl-11 pr-4 py-3 bg-[#151518] border rounded-lg text-[14px] text-[#e8e8ea] placeholder-[#9a9aa3] focus:outline-none transition-all disabled:opacity-50
                                            ${fieldErrors.password
                                                ? 'border-[rgba(255,80,80,0.45)] focus:border-[rgba(255,80,80,0.7)]'
                                                : 'border-[rgba(255,255,255,0.08)] focus:border-[#c9a87c]'
                                            }`}
                                    />
                                </div>
                                {fieldErrors.password && (
                                    <p className="field-error flex items-center gap-1.5 mt-1.5 text-[12px] text-[#ff8080]">
                                        <svg className="w-3 h-3 shrink-0" viewBox="0 0 12 12" fill="none">
                                            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                                            <path d="M6 3.5v3M6 8.5h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                        </svg>
                                        {fieldErrors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember me */}
                            <div className="flex items-center gap-2 mb-5">
                                <input
                                    type="checkbox" id="remember"
                                    className="w-4 h-4 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded accent-[#c9a87c]"
                                    disabled={isLoading}
                                />
                                <label htmlFor="remember" className="text-[13px] text-[#9a9aa3]">
                                    Remember me for 30 days
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                onClick={signIn}
                                disabled={isLoading}
                                className="relative w-full flex items-center mb-4 justify-center gap-2 px-4 py-3 rounded-lg text-[14px] font-medium text-[#0a0a0c] overflow-hidden transition-all disabled:cursor-not-allowed"
                                style={{
                                    background: isLoading
                                        ? 'linear-gradient(90deg,#c9a87c 0%,#e8c98a 40%,#c9a87c 60%,#b89c7e 100%)'
                                        : 'linear-gradient(135deg,#c9a87c,#b89c7e)',
                                    backgroundSize: isLoading ? '200% auto' : '100%',
                                    animation: isLoading ? 'shimmer 1.4s linear infinite' : 'none',
                                }}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
                                            <circle cx="8" cy="8" r="6" stroke="rgba(10,10,12,0.3)" strokeWidth="2" />
                                            <path d="M8 2a6 6 0 0 1 6 6" stroke="#0a0a0c" strokeWidth="2" strokeLinecap="round">
                                                <animateTransform attributeName="transform" type="rotate" from="0 8 8" to="360 8 8" dur="0.7s" repeatCount="indefinite" />
                                            </path>
                                        </svg>
                                        Signing you in…
                                    </>
                                ) : (
                                    <>
                                        Sign in
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                            <p className='text-(--error) text-center text-sm'>too many request!!!!!</p>
                            <p className='text-(--text-2) text-center text-sm'>try again in 100 seconds</p>

                            {/* Divider */}
                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[rgba(255,255,255,0.08)]" />
                                </div>
                                <div className="relative flex justify-center text-[12px]">
                                    <span className="px-3 bg-[#0a0a0c] text-[#9a9aa3]">OR CONTINUE WITH</span>
                                </div>
                            </div>

                            {/* Social */}
                            <div className="grid grid-cols-2 gap-3">
                                <button type="button" disabled={isLoading} className="flex items-center justify-center gap-2 px-4 py-3 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] font-medium text-[#e8e8ea] hover:border-[rgba(255,255,255,0.15)] transition-all disabled:opacity-40">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </button>
                                <button type="button" disabled={isLoading} className="flex items-center justify-center gap-2 px-4 py-3 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] font-medium text-[#e8e8ea] hover:border-[rgba(255,255,255,0.15)] transition-all disabled:opacity-40">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                    GitHub
                                </button>
                            </div>
                        </form>

                        <p className="text-center text-[13px] text-[#9a9aa3] mt-8">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-[#c9a87c] hover:text-[#b89c7e] transition-colors font-medium">
                                Sign up for free
                            </Link>
                        </p>


                    </div>
                </div>

                {/* ── Right — Visual ── */}
                <div className="w-1/2 relative overflow-hidden bg-gradient-to-br from-[#151518] to-[#0a0a0c] border-l border-[rgba(255,255,255,0.06)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c9a87c]/10 via-transparent to-[#9d8fb5]/10" />

                    <div className="relative h-full flex flex-col items-center justify-center p-16 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c9a87c] to-[#9d8fb5] flex items-center justify-center mb-8 shadow-[0_0_48px_rgba(201,168,124,0.18)]">
                            <span className="text-[#0a0a0c] font-bold text-2xl">A</span>
                        </div>

                        <h2 className="text-[34px] font-medium text-[#e8e8ea] mb-4 leading-tight">
                            Good to have<br />you back.
                        </h2>
                        <p className="text-[15px] text-[#9a9aa3] max-w-xs leading-relaxed">
                            Sign in to manage your bookings, connect with providers, and keep your schedule on track.
                        </p>

                        <div className="mt-12 w-full max-w-xs space-y-3">
                            {[
                                { icon: '📅', text: 'View and manage your appointments' },
                                { icon: '⭐', text: 'Access your saved providers' },
                                { icon: '🔔', text: 'Stay on top of reminders' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 px-4 py-3 bg-[#151518]/60 backdrop-blur-xl border border-[rgba(255,255,255,0.07)] rounded-xl text-left">
                                    <span className="text-base shrink-0">{item.icon}</span>
                                    <span className="text-[13px] text-[#9a9aa3]">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}