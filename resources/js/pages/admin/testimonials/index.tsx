import { Head, Link, router, usePage } from '@inertiajs/react';
import { Star, Plus, Pencil, Trash2, Check, CheckCircle2, XCircle } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';

interface Testimonial {
    id: number;
    name: string;
    role: string | null;
    quote: string;
    rating: number;
    is_active: boolean;
    sort_order: number;
}

export default function TestimonialIndex({ testimonials = [] }: { testimonials: Testimonial[] }) {
    const { flash } = usePage().props as { flash?: { success?: string } };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Delete testimonial from "${name}"?`)) {
            router.delete(`/admin/testimonials/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Testimonials" />
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Testimonials</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Manage customer reviews shown on the landing page.</p>
                </div>
                <Link
                    href="/admin/testimonials/create"
                    className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                    <Plus className="h-4 w-4" />
                    Add testimonial
                </Link>
            </div>

            {flash?.success && (
                <div className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">
                    <Check className="h-4 w-4 shrink-0" />
                    {flash.success}
                </div>
            )}

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden auto-cols-auto">
                {testimonials.length > 0 ? (
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead>
                            <tr className="bg-slate-50/80">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/4">Name / Role</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/3">Quote</th>
                                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Rating</th>
                                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {testimonials.map((t) => (
                                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-5 py-3 text-sm">
                                        <p className="font-medium text-slate-900">{t.name}</p>
                                        <p className="text-slate-500">{t.role || '—'}</p>
                                    </td>
                                    <td className="px-5 py-3 text-sm text-slate-600 max-w-xs truncate" title={t.quote}>
                                        {t.quote}
                                    </td>
                                    <td className="px-5 py-3 text-center">
                                        <div className="flex justify-center gap-0.5">
                                            {[...Array(t.rating || 5)].map((_, i) => (
                                                <Star key={i} className="h-3.5 w-3.5 fill-teal-500 text-teal-500 line-clamp-1" />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-center">
                                        <div className="inline-flex justify-center">
                                            {t.is_active ? 
                                                <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : 
                                                <XCircle className="h-5 w-5 text-slate-300" />
                                            }
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/testimonials/${t.id}/edit`}
                                                className="p-2 text-slate-400 hover:text-teal-600 rounded-lg hover:bg-teal-50 transition-colors touch-target"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(t.id, t.name)}
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
                        <Star className="h-12 w-12 text-slate-300 mx-auto mb-4 stroke-1" />
                        <p className="text-sm font-medium text-slate-600">No testimonials yet</p>
                        <p className="text-xs text-slate-500 mt-1">Add client testimonials to show them on your landing page.</p>
                        <Link
                            href="/admin/testimonials/create"
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition"
                        >
                            <Plus className="h-4 w-4" />
                            Add Testimonial
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
