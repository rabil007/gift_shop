import { Head, Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Mail, Trash2, CheckCircle2, Circle, Eye, MailOpen } from 'lucide-react';

interface Enquiry {
    id: number;
    name: string;
    email: string;
    subject: string;
    status: 'new' | 'read' | 'resolved';
    created_at: string;
}

export default function EnquiriesIndex({ enquiries }: { enquiries: { data: Enquiry[], links: any[] } }) {
    const { flash } = usePage().props as { flash?: { success?: string } };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Delete enquiry from "${name}"?`)) {
            router.delete(`/admin/enquiries/${id}`);
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

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'new': return <Circle className="h-3 w-3 fill-blue-500 text-blue-500" />;
            case 'read': return <MailOpen className="h-3 w-3 text-slate-500" />;
            case 'resolved': return <CheckCircle2 className="h-3 w-3 text-emerald-500" />;
            default: return null;
        }
    };

    return (
        <AdminLayout>
            <Head title="Enquiries" />
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Enquiries</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Manage messages from customers submitted via the landing page.</p>
                </div>
            </div>

            {flash?.success && (
                <div className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    {flash.success}
                </div>
            )}

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {enquiries.data.length > 0 ? (
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead>
                            <tr className="bg-slate-50/80">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/4">Sender</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/3">Subject</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {enquiries.data.map((enquiry) => (
                                <tr key={enquiry.id} className={`hover:bg-slate-50/50 transition-colors ${enquiry.status === 'new' ? 'bg-blue-50/10' : ''}`}>
                                    <td className="px-5 py-4 text-sm">
                                        <p className={`font-medium ${enquiry.status === 'new' ? 'text-slate-900' : 'text-slate-700'}`}>{enquiry.name}</p>
                                        <p className="text-slate-500 text-xs mt-0.5">{enquiry.email}</p>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-slate-600">
                                        <span className={`line-clamp-1 ${enquiry.status === 'new' ? 'font-medium text-slate-800' : ''}`}>
                                            {enquiry.subject}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-slate-500 whitespace-nowrap">
                                        {new Date(enquiry.created_at).toLocaleDateString(undefined, {
                                            month: 'short', day: 'numeric', year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-5 py-4 text-center whitespace-nowrap">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${getStatusStyle(enquiry.status)}`}>
                                            {getStatusIcon(enquiry.status)}
                                            {enquiry.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/enquiries/${enquiry.id}`}
                                                className="p-2 text-slate-400 hover:text-teal-600 rounded-lg hover:bg-teal-50 transition-colors touch-target"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(enquiry.id, enquiry.name)}
                                                className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors touch-target"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-12 text-center">
                        <div className="h-16 w-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="h-8 w-8 text-slate-300 stroke-1" />
                        </div>
                        <p className="text-sm font-medium text-slate-600">No enquiries received</p>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">When customers submit the contact form on your landing page, their messages will appear here.</p>
                    </div>
                )}
            </div>
            
            {/* Pagination Placeholder (would map through enquiries.links) */}
        </AdminLayout>
    );
}
