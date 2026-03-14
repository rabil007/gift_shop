import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';

interface Testimonial {
    id?: number;
    name: string;
    role: string | null;
    quote: string;
    rating: number;
    is_active: boolean;
    sort_order: number;
}

export default function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
    const isEditing = !!testimonial;
    
    const { data, setData, post, put, processing, errors } = useForm({
        name: testimonial?.name || '',
        role: testimonial?.role || '',
        quote: testimonial?.quote || '',
        rating: testimonial?.rating || 5,
        is_active: testimonial?.is_active ?? true,
        sort_order: testimonial?.sort_order || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(`/admin/testimonials/${testimonial.id}`);
        } else {
            post('/admin/testimonials');
        }
    };

    return (
        <AdminLayout>
            <Head title={isEditing ? 'Edit Testimonial' : 'New Testimonial'} />
            
            <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/testimonials"
                        className="p-2 -ml-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors touch-target"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                            {isEditing ? 'Edit Testimonial' : 'New Testimonial'}
                        </h1>
                        <p className="text-sm text-slate-500 mt-0.5">
                            {isEditing ? 'Update customer testimonial content.' : 'Add a new client review to the landing page.'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className={`w-full rounded-lg border px-3 py-2 outline-none transition-shadow ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'}`}
                                placeholder="Client's name..."
                            />
                            {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">
                                Designation / Role / City
                            </label>
                            <input
                                type="text"
                                id="role"
                                value={data.role}
                                onChange={e => setData('role', e.target.value)}
                                className={`w-full rounded-lg border px-3 py-2 outline-none transition-shadow ${errors.role ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'}`}
                                placeholder="E.g., Dubai, CEO at XYZ..."
                            />
                            {errors.role && <p className="mt-1.5 text-sm text-red-500">{errors.role}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="quote" className="block text-sm font-medium text-slate-700 mb-1">
                            Quote / Review Content <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="quote"
                            rows={4}
                            value={data.quote}
                            onChange={e => setData('quote', e.target.value)}
                            className={`w-full rounded-lg border px-3 py-2 outline-none transition-shadow resize-none ${errors.quote ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'}`}
                            placeholder="What did the client say about their gift experience?"
                        />
                        {errors.quote && <p className="mt-1.5 text-sm text-red-500">{errors.quote}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="rating" className="block text-sm font-medium text-slate-700 mb-1">
                                Rating (1-5)
                            </label>
                            <input
                                type="number"
                                id="rating"
                                min={1}
                                max={5}
                                value={data.rating}
                                onChange={e => setData('rating', parseInt(e.target.value))}
                                className={`w-full rounded-lg border px-3 py-2 outline-none transition-shadow ${errors.rating ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'}`}
                            />
                            {errors.rating && <p className="mt-1.5 text-sm text-red-500">{errors.rating}</p>}
                        </div>

                        <div>
                            <label htmlFor="sort_order" className="block text-sm font-medium text-slate-700 mb-1">
                                Sort Order
                            </label>
                            <input
                                type="number"
                                id="sort_order"
                                value={data.sort_order}
                                onChange={e => setData('sort_order', parseInt(e.target.value))}
                                className={`w-full rounded-lg border px-3 py-2 outline-none transition-shadow ${errors.sort_order ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'}`}
                            />
                            {errors.sort_order && <p className="mt-1.5 text-sm text-red-500">{errors.sort_order}</p>}
                        </div>
                    </div>

                    <div className="py-2 border-t border-slate-100">
                        <label className="flex items-center gap-3 select-none touch-target" htmlFor="is_active">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active}
                                onChange={e => setData('is_active', e.target.checked)}
                                className="h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-600 transition duration-150 ease-in-out cursor-pointer"
                            />
                            <div>
                                <span className="block text-sm font-medium text-slate-900 leading-none">Active</span>
                                <span className="block text-xs text-slate-500 mt-1">Show this testimonial on the landing page</span>
                            </div>
                        </label>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3 mt-8">
                        <Link
                            href="/admin/testimonials"
                            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save className="h-4 w-4" />
                            {processing ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Testimonial')}
                        </button>
                    </div>

                </form>
            </div>
        </AdminLayout>
    );
}
