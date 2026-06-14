import { FileText, Download, Calendar, Filter, TrendingUp } from 'lucide-react';

const reports = [
    {
        id: '1',
        title: 'Monthly Revenue Report',
        description: 'Detailed breakdown of revenue by service, staff, and time period',
        date: 'Jun 1, 2026',
        type: 'Financial',
        status: 'Ready',
        accent: '#c9a87c',
    },
    {
        id: '2',
        title: 'Customer Activity Report',
        description: 'Analysis of customer behavior, retention, and lifetime value',
        date: 'Jun 1, 2026',
        type: 'Customer',
        status: 'Ready',
        accent: '#9d8fb5',
    },
    {
        id: '3',
        title: 'Staff Performance Report',
        description: 'Individual staff metrics including bookings, revenue, and ratings',
        date: 'May 31, 2026',
        type: 'Operations',
        status: 'Ready',
        accent: '#6b9fa3',
    },
    {
        id: '4',
        title: 'Service Utilization Report',
        description: 'Service popularity, pricing analysis, and optimization opportunities',
        date: 'May 31, 2026',
        type: 'Analytics',
        status: 'Ready',
        accent: '#b89c7e',
    },
    {
        id: '5',
        title: 'Quarterly Business Review',
        description: 'Comprehensive overview of Q2 performance and key insights',
        date: 'Processing...',
        type: 'Executive',
        status: 'Processing',
        accent: '#c9a87c',
    },
    {
        id: '6',
        title: 'Appointment Trends Report',
        description: 'Booking patterns, peak hours, and scheduling recommendations',
        date: 'May 30, 2026',
        type: 'Analytics',
        status: 'Ready',
        accent: '#9d8fb5',
    },
];

const quickStats = [
    { label: 'Reports Generated', value: '48', trend: '+12%', accent: '#c9a87c' },
    { label: 'Data Points', value: '12.4k', trend: '+28%', accent: '#9d8fb5' },
    { label: 'Insights Found', value: '156', trend: '+34%', accent: '#6b9fa3' },
    { label: 'Avg. Report Time', value: '2.3s', trend: '-18%', accent: '#b89c7e' },
];

export function Reports() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[20px] font-medium text-[#e8e8ea] mb-1">Reports</h2>
                    <p className="text-[13px] text-[#9a9aa3]">Generate and download business reports</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2.5 bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-lg text-[13px] font-medium text-[#e8e8ea] hover:border-[rgba(255,255,255,0.15)] transition-all flex items-center gap-2">
                        <Filter size={16} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[13px] font-medium text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all">
                        <FileText size={16} strokeWidth={2} />
                        Generate Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
                {quickStats.map((stat, i) => (
                    <div key={i} className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
                        <p className="text-[13px] text-[#9a9aa3] mb-2">{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <p className="text-[24px] font-medium text-[#e8e8ea]">{stat.value}</p>
                            <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                                <TrendingUp size={12} />
                                {stat.trend}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
                {reports.map((report) => (
                    <div
                        key={report.id}
                        className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 hover:border-[rgba(255,255,255,0.12)] transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${report.accent}20` }}
                                >
                                    <FileText size={20} style={{ color: report.accent }} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-medium text-[#e8e8ea] mb-0.5">{report.title}</h3>
                                    <p className="text-[11px] text-[#9a9aa3]">{report.type}</p>
                                </div>
                            </div>
                            <div
                                className={`px-2.5 py-1 rounded-md text-[11px] font-medium ${report.status === 'Ready'
                                        ? 'bg-emerald-500/10 text-emerald-400'
                                        : 'bg-amber-500/10 text-amber-400'
                                    }`}
                            >
                                {report.status}
                            </div>
                        </div>

                        <p className="text-[12px] text-[#9a9aa3] mb-5 leading-relaxed">{report.description}</p>

                        <div className="flex items-center justify-between pt-5 border-t border-[rgba(255,255,255,0.06)]">
                            <div className="flex items-center gap-2 text-[#9a9aa3]">
                                <Calendar size={14} />
                                <span className="text-[12px]">{report.date}</span>
                            </div>
                            {report.status === 'Ready' && (
                                <button className="px-3 py-1.5 bg-[#1a1a1e] hover:bg-[#2a2a2f] rounded-lg text-[12px] font-medium text-[#e8e8ea] transition-all flex items-center gap-2 group-hover:scale-105">
                                    <Download size={14} />
                                    Download
                                </button>
                            )}
                            {report.status === 'Processing' && (
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                                    <span className="text-[12px] text-amber-400">Processing...</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-[#151518] border border-[rgba(255,255,255,0.08)] rounded-xl p-8">
                <div className="text-center max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] flex items-center justify-center mx-auto mb-4">
                        <FileText size={28} className="text-[#0a0a0c]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[16px] font-medium text-[#e8e8ea] mb-2">Custom Report Builder</h3>
                    <p className="text-[13px] text-[#9a9aa3] mb-6 leading-relaxed">
                        Create custom reports tailored to your specific needs. Choose metrics, date ranges, and export formats.
                    </p>
                    <button className="px-5 py-2.5 bg-gradient-to-br from-[#c9a87c] to-[#b89c7e] rounded-lg text-[13px] font-medium text-[#0a0a0c] hover:shadow-lg hover:shadow-[#c9a87c]/20 transition-all">
                        Build Custom Report
                    </button>
                </div>
            </div>
        </div>
    );
}
