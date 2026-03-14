import { Head, Link, router, usePage } from '@inertiajs/react';
import { Package, Plus, Pencil, Trash2, Check } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Item {
    id: number;
    name: string;
    description: string | null;
    price: string;
    image: string | null;
    tag: string | null;
    is_hero: boolean;
    sort_order: number;
    category: Category | null;
}

export default function ItemsIndex({ items }: { items: Item[] }) {
    const { flash } = usePage().props as { flash?: { success?: string } };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Delete item "${name}"?`)) {
            router.delete(`/admin/items/${id}`);
        }
    };

    return (
        <AdminLayout>
            <Head title="Items" />
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Items</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Manage products shown on the shop and landing.</p>
                </div>
                <Link
                    href="/admin/items/create"
                    className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                    <Plus className="h-4 w-4" />
                    Add item
                </Link>
            </div>

            {flash?.success && (
                <div className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">
                    <Check className="h-4 w-4 shrink-0" />
                    {flash.success}
                </div>
            )}

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {items.length > 0 ? (
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead>
                            <tr className="bg-slate-50/80">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tag</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Is Hero</th>
                                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            {item.image ? (
                                                <img src={item.image} alt="" className="h-12 w-12 rounded-lg object-cover bg-slate-100" />
                                            ) : (
                                                <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center">
                                                    <Package className="h-6 w-6 text-slate-400" />
                                                </div>
                                            )}
                                            <span className="text-sm font-medium text-slate-900">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-sm text-slate-500">{item.category?.name ?? '—'}</td>
                                    <td className="px-5 py-3 text-sm font-medium text-slate-900">AED {item.price}</td>
                                    <td className="px-5 py-3 text-sm text-slate-500">{item.tag ?? '—'}</td>
                                    <td className="px-5 py-3 text-sm text-slate-500">
                                        {item.is_hero ? (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
                                                Hero
                                            </span>
                                        ) : '—'}
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/items/${item.id}/edit`}
                                                className="p-2 text-slate-400 hover:text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(item.id, item.name)}
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
                        <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-sm font-medium text-slate-600">No items yet</p>
                        <p className="text-xs text-slate-500 mt-1">Add items to display on the shop and landing page.</p>
                        <Link
                            href="/admin/items/create"
                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                        >
                            <Plus className="h-4 w-4" />
                            Add item
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
