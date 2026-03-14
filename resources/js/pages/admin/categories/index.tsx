import { Head, Link, router, usePage } from '@inertiajs/react';
import { FolderTree, Plus, Pencil, Trash2, Check } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    sort_order: number;
}

export default function CategoriesIndex({ categories }: { categories: Category[] }) {
    const { flash } = usePage().props as { flash?: { success?: string } };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Delete category "${name}"?`)) {
            router.delete(`/admin/categories/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Categories" />
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Categories</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Manage product categories shown on the website.</p>
                </div>
                <Link
                    href="/admin/categories/create"
                    className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                    <Plus className="h-4 w-4" />
                    Add category
                </Link>
            </div>

            {flash?.success && (
                <div className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">
                    <Check className="h-4 w-4 shrink-0" />
                    {flash.success}
                </div>
            )}

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {categories.length > 0 ? (
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead>
                            <tr className="bg-slate-50/80">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Slug</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Order</th>
                                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {categories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-slate-50/50">
                                    <td className="px-5 py-3 text-sm font-medium text-slate-900">{cat.name}</td>
                                    <td className="px-5 py-3 text-sm text-slate-500">{cat.slug}</td>
                                    <td className="px-5 py-3 text-sm text-slate-500 max-w-xs truncate">{cat.description || '—'}</td>
                                    <td className="px-5 py-3 text-sm text-slate-500">{cat.sort_order}</td>
                                    <td className="px-5 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/categories/${cat.id}/edit`}
                                                className="p-2 text-slate-400 hover:text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(cat.id, cat.name)}
                                                className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
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
                        <FolderTree className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-sm font-medium text-slate-600">No categories yet</p>
                        <p className="text-xs text-slate-500 mt-1">Add categories to organize your shop and show them on the website.</p>
                        <Link
                            href="/admin/categories/create"
                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                        >
                            <Plus className="h-4 w-4" />
                            Add category
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
