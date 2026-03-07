import { Head, Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { ArrowLeft, Mail, Calendar, User, AlignLeft, Check, CheckCircle2 } from 'lucide-react';

interface Enquiry {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'resolved';
    created_at: string;
}

export default function EnquiryShow({ enquiry }: { enquiry: Enquiry }) {
    const { flash } = usePage().props as { flash?: { success?: string } };

    const updateStatus = (status: 'new' | 'read' | 'resolved') => {
        router.put(`/admin/enquiries/${enquiry.id}/status`, { status }, { preserveScroll: true });
    };

    const handleDelete = () => {
        if (confirm(`Delete this enquiry? This action cannot be undone.`)) {
            router.delete(`/admin/enquiries/${enquiry.id}`);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'read': return 'bg-slate-100 text-slate-800 border-slate-200';
            case 'resolved': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    return (
        <AdminLayout>
            <Head title={`Enquiry: ${enquiry.subject}`} />
            
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/enquiries"
                        className="p-2 -ml-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors touch-target"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">View Enquiry</h1>
                        <p className="text-sm text-slate-500 mt-0.5">Message details and status management.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border uppercase tracking-wider ${getStatusStyle(enquiry.status)}`}>
                        {enquiry.status}
                    </span>
                    <button
                        onClick={handleDelete}
                        className="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors border border-red-100 ml-2"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {flash?.success && (
                <div className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    {flash.success}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 relative">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">{enquiry.subject}</h2>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                                <div className="flex items-center gap-1.5">
                                    <User className="h-4 w-4 shrink-0 text-teal-600" />
                                    <span className="font-medium text-slate-900">{enquiry.name}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Mail className="h-4 w-4 shrink-0 text-slate-400" />
                                    <a href={`mailto:${enquiry.email}`} className="text-teal-600 hover:underline">{enquiry.email}</a>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
                                    <span>
                                        {new Date(enquiry.created_at).toLocaleString(undefined, {
                                            month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 sm:p-8">
                            <div className="flex items-start gap-4">
                                <AlignLeft className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                                <div className="prose prose-slate prose-sm max-w-none w-full">
                                    <p className="text-base text-slate-700 whitespace-pre-wrap leading-relaxed">{enquiry.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl -translate-y-12 translate-x-12"></div>
                        
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Set Status</h3>
                        
                        <div className="space-y-3 relative z-10">
                            <button
                                onClick={() => updateStatus('new')}
                                disabled={enquiry.status === 'new'}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                                    enquiry.status === 'new' 
                                    ? 'bg-blue-50 border-blue-200 text-blue-800 ring-1 ring-blue-500/20' 
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50/50'
                                }`}
                            >
                                <span className="font-medium">Mark as New</span>
                                {enquiry.status === 'new' && <Check className="h-4 w-4 text-blue-600" />}
                            </button>

                            <button
                                onClick={() => updateStatus('read')}
                                disabled={enquiry.status === 'read'}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                                    enquiry.status === 'read' 
                                    ? 'bg-slate-100 border-slate-300 text-slate-800 ring-1 ring-slate-400/20' 
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                }`}
                            >
                                <span className="font-medium">Mark as Read</span>
                                {enquiry.status === 'read' && <Check className="h-4 w-4 text-slate-600" />}
                            </button>

                            <button
                                onClick={() => updateStatus('resolved')}
                                disabled={enquiry.status === 'resolved'}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                                    enquiry.status === 'resolved' 
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 ring-1 ring-emerald-500/20' 
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50/50'
                                }`}
                            >
                                <span className="font-medium">Mark as Resolved</span>
                                {enquiry.status === 'resolved' && <Check className="h-4 w-4 text-emerald-600" />}
                            </button>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-slate-100">
                             <a 
                                href={`mailto:${enquiry.email}?subject=Re: ${enquiry.subject}`}
                                className="w-full flex justify-center items-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-teal-700 transition"
                            >
                                <Mail className="h-4 w-4" />
                                Reply via Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
