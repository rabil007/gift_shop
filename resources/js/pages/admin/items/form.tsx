import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Save, ArrowLeft, Image, Package } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface ItemFormData {
    id?: number;
    name: string;
    category_id: number | null;
    description: string | null;
    price: string;
    image: string | null;
    tag: string | null;
    sort_order: number;
}

const TAG_OPTIONS = ['', 'Bestseller', 'New', 'Limited', 'Premium'];

export default function ItemForm({
    item,
    categories,
}: {
    item: ItemFormData | null;
    categories: Category[];
}) {
    const isEdit = !!item;
    const { data, setData, post, put, processing, errors } = useForm({
        name: item?.name ?? '',
        category_id: item?.category_id ?? null,
        description: item?.description ?? '',
        price: item?.price ?? '',
        image: null as File | null,
        tag: item?.tag ?? '',
        sort_order: item?.sort_order ?? 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const hasFile = data.image instanceof File;
        if (isEdit) {
            put(`/admin/items/${item!.id}`, { forceFormData: hasFile, preserveScroll: true });
        } else {
            post('/admin/items', { forceFormData: hasFile, preserveScroll: true });
        }
    };

    return (
        <AdminLayout>
            <Head title={isEdit ? 'Edit Item' : 'Add Item'} />
            <div className="mb-6">
                <Link
                    href="/admin/items"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to items
                </Link>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{isEdit ? 'Edit item' : 'Add item'}</h1>
                <p className="text-sm text-slate-500 mt-0.5">
                    {isEdit ? 'Update item details.' : 'Create a new item for the shop.'}
                </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-2xl">
                <form onSubmit={submit} className="p-5 sm:p-6 space-y-5" encType="multipart/form-data">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 sm:text-sm"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="category_id" className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                        <select
                            id="category_id"
                            value={data.category_id ?? ''}
                            onChange={(e) => setData('category_id', e.target.value ? Number(e.target.value) : null)}
                            className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 sm:text-sm"
                        >
                            <option value="">— None —</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1.5">Description (optional)</label>
                        <textarea
                            id="description"
                            rows={3}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 sm:text-sm"
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-1.5">Price (AED)</label>
                        <input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 sm:text-sm max-w-32"
                        />
                        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                            <Image className="h-4 w-4 text-teal-600" />
                            Image
                        </label>
                        <div className="flex items-center gap-4 flex-wrap">
                            {(item?.image || data.image) && (
                                <div className="w-24 h-24 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center shrink-0">
                                    {data.image instanceof File ? (
                                        <img src={URL.createObjectURL(data.image)} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <img src={item?.image!} alt="" className="w-full h-full object-cover" />
                                    )}
                                </div>
                            )}
                            {!item?.image && !data.image && (
                                <div className="w-24 h-24 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0">
                                    <Package className="h-8 w-8 text-slate-400" />
                                </div>
                            )}
                            <div className="flex flex-col gap-1">
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
                                    className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-teal-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-teal-700 hover:file:bg-teal-100"
                                />
                                {isEdit && <p className="text-xs text-slate-500">Leave empty to keep current image.</p>}
                            </div>
                        </div>
                        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                    </div>
                    <div>
                        <label htmlFor="tag" className="block text-sm font-medium text-slate-700 mb-1.5">Tag (optional)</label>
                        <select
                            id="tag"
                            value={data.tag}
                            onChange={(e) => setData('tag', e.target.value || null)}
                            className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 sm:text-sm max-w-40"
                        >
                            {TAG_OPTIONS.map((opt) => (
                                <option key={opt || 'none'} value={opt}>{opt || '— None —'}</option>
                            ))}
                        </select>
                        {errors.tag && <p className="mt-1 text-sm text-red-600">{errors.tag}</p>}
                    </div>
                    <div>
                        <label htmlFor="sort_order" className="block text-sm font-medium text-slate-700 mb-1.5">Sort order</label>
                        <input
                            id="sort_order"
                            type="number"
                            min={0}
                            value={data.sort_order}
                            onChange={(e) => setData('sort_order', parseInt(e.target.value, 10) || 0)}
                            className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 sm:text-sm max-w-24"
                        />
                        {errors.sort_order && <p className="mt-1 text-sm text-red-600">{errors.sort_order}</p>}
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            <Save className="h-4 w-4" />
                            {isEdit ? 'Update' : 'Create'} item
                        </button>
                        <Link href="/admin/items" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
