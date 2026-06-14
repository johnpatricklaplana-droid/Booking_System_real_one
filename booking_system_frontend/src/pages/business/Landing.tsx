import { Link } from 'react-router';
import { Calendar, Users, TrendingUp, Shield, Zap, Globe, ArrowRight, Check, Star } from 'lucide-react';

const features = [
    {
        icon: Calendar,
        title: 'Smart Scheduling',
        description: 'Intelligent booking system that maximizes your team\'s efficiency and reduces no-shows',
        accent: '#c9a87c',
    },
    {
        icon: Users,
        title: 'Customer Management',
        description: 'Complete CRM with customer profiles, history, and personalized communication',
        accent: '#9d8fb5',
    },
    {
        icon: TrendingUp,
        title: 'Analytics & Insights',
        description: 'Real-time business intelligence to drive growth and optimize operations',
        accent: '#6b9fa3',
    },
    {
        icon: Shield,
        title: 'Enterprise Security',
        description: 'Bank-level encryption and compliance with GDPR, HIPAA, and SOC 2',
        accent: '#b89c7e',
    },
    {
        icon: Zap,
        title: 'Automation',
        description: 'Automated reminders, confirmations, and follow-ups to save hours every week',
        accent: '#c9a87c',
    },
    {
        icon: Globe,
        title: 'Multi-Location',
        description: 'Manage multiple businesses and locations from a single unified dashboard',
        accent: '#9d8fb5',
    },
];

const pricing = [
    {
        name: 'Starter',
        price: '$29',
        description: 'Perfect for solo practitioners and small teams',
        features: ['Up to 100 bookings/month', '1 business location', 'Basic analytics', 'Email support', 'Mobile app access'],
        accent: '#6b9fa3',
    },
    {
        name: 'Professional',
        price: '$79',
        description: 'For growing businesses ready to scale',
        features: ['Unlimited bookings', 'Up to 5 locations', 'Advanced analytics', 'Priority support', 'Custom branding', 'API access'],
        accent: '#c9a87c',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Tailored solutions for large organizations',
        features: ['Unlimited everything', 'Unlimited locations', 'White-label solution', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee'],
        accent: '#9d8fb5',
    },
];

const testimonials = [
    {
        name: 'Sarah Mitchell',
        role: 'Owner, Luxe Salon',
        content: 'Apex transformed how we manage appointments. Our no-show rate dropped by 60% and revenue increased 35% in just 3 months.',
        rating: 5,
        initials: 'SM',
        accent: '#c9a87c',
    },
    {
        name: 'Michael Chen',
        role: 'Director, Wellness Center',
        content: 'The analytics alone paid for itself. We identified peak hours, optimized staffing, and increased our booking capacity by 40%.',
        rating: 5,
        initials: 'MC',
        accent: '#9d8fb5',
    },
    {
        name: 'Emma Davis',
        role: 'Founder, FitCore Gyms',
        content: 'Managing 8 locations was chaos until Apex. Now everything is centralized, automated, and our team loves the interface.',
        rating: 5,
        initials: 'ED',
        accent: '#6b9fa3',
    },
];

export function Landing() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] dark scroll-smooth">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]">
                <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a87c] to-[#9d8fb5] flex items-center justify-center">
                            <span className="text-[#0a0a0c] font-semibold text-sm">A</span>
                        </div>
                        <span className="text-[17px] font-medium text-[#e8e8ea]">Apex</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <button onClick={() => scrollToSection('features')} className="text-[13px] text-[#9a9aa3] hover:text-[#e8e8ea] transition-colors">Features</button>
                        <button onClick={() => scrollToSection('pricing')} className="text-[13px] text-[#9a9aa3] hover:text-[#e8e8ea] transition-colors">Pricing</button>
                        <button onClick={() => scrollToSection('testimonials')} className="text-[13px] text-[#9a9aa3] hover:text-[#e8e8ea] transition-colors">Testimonials</button>
                        <Link to="/login" className="text-[13px] text-[#9a9aa3] hover:text-[#e8e8ea] transition-colors">Login</Link>
                        <Link
                            to="/signup"
                            className="px-4 py-2 bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[13px] font-medium text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all"
                        >
                            Start Free Trial
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#c9a87c]/10 to-transparent blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#9d8fb5]/10 to-transparent blur-3xl" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-full mb-6">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="text-[12px] text-[#9a9aa3]">Trusted by 10,000+ businesses worldwide</span>
                        </div>

                        <h1 className="text-[56px] font-medium text-[#e8e8ea] mb-6 leading-[1.1] tracking-tight">
                            The Ultimate Booking Platform for{' '}
                            <span className="bg-gradient-to-r from-[#c9a87c] to-[#9d8fb5] bg-clip-text text-transparent">
                                Modern Businesses
                            </span>
                        </h1>

                        <p className="text-[18px] text-[#9a9aa3] leading-relaxed mb-10 max-w-2xl mx-auto">
                            Transform how you manage appointments, customers, and staff with our premium SaaS platform.
                            Built for salons, clinics, gyms, consultants, and service businesses.
                        </p>

                        <div className="flex items-center justify-center gap-4">
                            <Link
                                to="/signup"
                                className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[14px] font-medium text-[#0a0a0c] hover:shadow-2xl hover:shadow-[#c9a87c]/30 transition-all"
                            >
                                Start Free 14-Day Trial
                                <ArrowRight size={16} />
                            </Link>
                            <button className="px-6 py-3.5 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[14px] font-medium text-[#e8e8ea] hover:border-[rgba(255,255,255,0.15)] transition-all">
                                Watch Demo
                            </button>
                        </div>

                        <p className="text-[12px] text-[#9a9aa3] mt-4">No credit card required · Free forever plan available</p>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent z-10" />
                        <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-2xl p-2 shadow-2xl">
                            <div className="bg-[#0a0a0c] rounded-xl aspect-[16/9] flex items-center justify-center border border-[rgba(255,255,255,0.06)]">
                                <div className="text-center">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#c9a87c] to-[#9d8fb5] flex items-center justify-center mx-auto mb-4">
                                        <Calendar size={40} className="text-[#0a0a0c]" />
                                    </div>
                                    <p className="text-[14px] text-[#9a9aa3]">Dashboard Preview</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-8 border-t border-[rgba(255,255,255,0.06)]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-[40px] font-medium text-[#e8e8ea] mb-4">Everything you need to succeed</h2>
                        <p className="text-[16px] text-[#9a9aa3] max-w-2xl mx-auto">
                            Powerful features designed to streamline operations and accelerate growth
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8 hover:border-[rgba(255,255,255,0.15)] transition-all group"
                            >
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: `${feature.accent}20` }}
                                >
                                    <feature.icon size={24} style={{ color: feature.accent }} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-[18px] font-medium text-[#e8e8ea] mb-3">{feature.title}</h3>
                                <p className="text-[14px] text-[#9a9aa3] leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 px-8 border-t border-[rgba(255,255,255,0.06)]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-[40px] font-medium text-[#e8e8ea] mb-4">Simple, transparent pricing</h2>
                        <p className="text-[16px] text-[#9a9aa3] max-w-2xl mx-auto">
                            Choose the perfect plan for your business. Upgrade or downgrade anytime.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        {pricing.map((plan, i) => (
                            <div
                                key={i}
                                className={`bg-[#151518] border rounded-2xl p-8 transition-all ${plan.popular
                                        ? 'border-[#c9a87c] shadow-2xl shadow-[#c9a87c]/20 scale-105'
                                        : 'border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)]'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="inline-flex px-3 py-1 bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] rounded-full text-[11px] font-medium text-[#0a0a0c] mb-6">
                                        Most Popular
                                    </div>
                                )}

                                <h3 className="text-[22px] font-medium text-[#e8e8ea] mb-2">{plan.name}</h3>
                                <p className="text-[13px] text-[#9a9aa3] mb-6">{plan.description}</p>

                                <div className="mb-8">
                                    <span className="text-[48px] font-medium text-[#e8e8ea]">{plan.price}</span>
                                    {plan.price !== 'Custom' && <span className="text-[14px] text-[#9a9aa3]">/month</span>}
                                </div>

                                <Link
                                    to="/signup"
                                    className={`block text-center px-6 py-3 rounded-lg text-[14px] font-medium transition-all mb-8 ${plan.popular
                                            ? 'bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20'
                                            : 'bg-[#1a1a1e] text-[#e8e8ea] hover:bg-[#2a2a2f]'
                                        }`}
                                >
                                    Get Started
                                </Link>

                                <div className="space-y-3">
                                    {plan.features.map((feature, j) => (
                                        <div key={j} className="flex items-center gap-3">
                                            <Check size={16} className="text-[#c9a87c] flex-shrink-0" />
                                            <span className="text-[13px] text-[#9a9aa3]">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 px-8 border-t border-[rgba(255,255,255,0.06)]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-[40px] font-medium text-[#e8e8ea] mb-4">Loved by thousands of businesses</h2>
                        <p className="text-[16px] text-[#9a9aa3] max-w-2xl mx-auto">
                            See what our customers have to say about Apex
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        {testimonials.map((testimonial, i) => (
                            <div key={i} className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8">
                                <div className="flex items-center gap-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, j) => (
                                        <Star key={j} size={16} className="fill-[#c9a87c] text-[#c9a87c]" />
                                    ))}
                                </div>

                                <p className="text-[14px] text-[#e8e8ea] leading-relaxed mb-8">{testimonial.content}</p>

                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-medium text-[#0a0a0c]"
                                        style={{ background: `linear-gradient(135deg, ${testimonial.accent}, ${testimonial.accent}dd)` }}
                                    >
                                        {testimonial.initials}
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-medium text-[#e8e8ea]">{testimonial.name}</p>
                                        <p className="text-[12px] text-[#9a9aa3]">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-8 border-t border-[rgba(255,255,255,0.06)]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-[40px] font-medium text-[#e8e8ea] mb-4">
                        Ready to transform your business?
                    </h2>
                    <p className="text-[16px] text-[#9a9aa3] mb-10 max-w-2xl mx-auto">
                        Join thousands of businesses already using Apex to streamline operations and grow revenue
                    </p>

                    <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[15px] font-medium text-[#0a0a0c] hover:shadow-2xl hover:shadow-[#c9a87c]/30 transition-all"
                    >
                        Start Your Free Trial
                        <ArrowRight size={18} />
                    </Link>

                    <p className="text-[13px] text-[#9a9aa3] mt-4">14-day free trial · No credit card required</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-8 border-t border-[rgba(255,255,255,0.06)]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a87c] to-[#9d8fb5] flex items-center justify-center">
                                <span className="text-[#0a0a0c] font-semibold text-sm">A</span>
                            </div>
                            <span className="text-[15px] font-medium text-[#e8e8ea]">Apex</span>
                        </div>

                        <div className="flex items-center gap-8">
                            <a href="#" className="text-[13px] text-[#9a9aa3] hover:text-[#e8e8ea] transition-colors">Privacy</a>
                            <a href="#" className="text-[13px] text-[#9a9aa3] hover:text-[#e8e8ea] transition-colors">Terms</a>
                            <a href="#" className="text-[13px] text-[#9a9aa3] hover:text-[#e8e8ea] transition-colors">Contact</a>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-[rgba(255,255,255,0.06)] text-center">
                        <p className="text-[12px] text-[#9a9aa3]">© 2026 Apex Booking Platform. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
