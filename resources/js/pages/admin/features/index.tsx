import { Head, Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Plus, Pencil, Trash2, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import * as Icons from 'lucide-react';

interface Feature {
    id: number;
    title: string;
    description: string;
    icon: string;
    is_active: boolean;
    sort_order: number;
}

export default function FeaturesIndex({ features = [] }: { features: Feature[] }) {
    const { flash } = usePage().props as { flash?: { success?: string } };

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Delete feature "${title}"?`)) {
            router.delete(`/admin/features/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Features" />
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Features</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Manage the "Why Choose Us" items shown on the landing page.</p>
                </div>
                <Link
                    href="/admin/features/create"
                    className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                    <Plus className="h-4 w-4" />
                    Add Feature
                </Link>
            </div>

            {flash?.success && (
                <div className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    {flash.success}
                </div>
            )}

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden auto-cols-auto">
                {features.length > 0 ? (
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead>
                            <tr className="bg-slate-50/80">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/4">Title</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-1/3">Description</th>
                                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {features.map((f) => {
                                const IconComponent = (Icons as any)[f.icon] || Sparkles;
                                return (
                                <tr key={f.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-5 py-4 text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 shrink-0 bg-slate-100 rounded-full flex items-center justify-center">
                                                <IconComponent className="h-5 w-5 text-teal-600" />
                                            </div>
                                            <p className="font-bold text-slate-900">{f.title}</p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-slate-600 max-w-xs">
                                        {f.description}
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <div className="inline-flex justify-center">
                                            {f.is_active ? 
                                                <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : 
                                                <XCircle className="h-5 w-5 text-slate-300" />
                                            }
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/features/${f.id}/edit`}
                                                className="p-2 text-slate-400 hover:text-teal-600 rounded-lg hover:bg-teal-50 transition-colors touch-target"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(f.id, f.title)}
                                                className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors touch-target"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-12 text-center">
                        <Sparkles className="h-12 w-12 text-slate-300 mx-auto mb-4 stroke-1" />
                        <p className="text-sm font-medium text-slate-600">No features yet</p>
                        <p className="text-xs text-slate-500 mt-1">Add points about why customers should choose you.</p>
                        <Link
                            href="/admin/features/create"
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition"
                        >
                            <Plus className="h-4 w-4" />
                            Add Feature
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
