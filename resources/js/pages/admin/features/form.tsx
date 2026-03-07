import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { ArrowLeft, Save, Sparkles, Clock, Truck, ShieldCheck, Heart, Gift, Cake, Image as ImageIcon, Star, Compass, Award } from 'lucide-react';
import * as Icons from 'lucide-react';

interface Feature {
    id?: number;
    title: string;
    description: string;
    icon: string;
    is_active: boolean;
    sort_order: number;
}

const iconOptions = [
    { value: 'Star', label: 'Star', icon: Star },
    { value: 'Sparkles', label: 'Sparkles', icon: Sparkles },
    { value: 'Heart', label: 'Heart', icon: Heart },
    { value: 'Gift', label: 'Gift', icon: Gift },
    { value: 'Cake', label: 'Cake', icon: Cake },
    { value: 'Image', label: 'Image', icon: ImageIcon },
    { value: 'Clock', label: 'Priority / Time', icon: Clock },
    { value: 'Truck', label: 'Delivery / Truck', icon: Truck },
    { value: 'ShieldCheck', label: 'Secure / Shield', icon: ShieldCheck },
    { value: 'Compass', label: 'Compass', icon: Compass },
    { value: 'Award', label: 'Award', icon: Award },
];

export default function FeatureForm({ feature }: { feature?: Feature }) {
    const isEditing = !!feature;
    
    const { data, setData, post, put, processing, errors } = useForm({
        title: feature?.title || '',
        description: feature?.description || '',
        icon: feature?.icon || 'Sparkles',
        is_active: feature?.is_active ?? true,
        sort_order: feature?.sort_order || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            put(`/admin/features/${feature.id}`);
        } else {
            post('/admin/features');
        }
    };

    return (
        <AdminLayout>
            <Head title={isEditing ? 'Edit Feature' : 'New Feature'} />
            
            <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/features"
                        className="p-2 -ml-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors touch-target"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                            {isEditing ? 'Edit Feature' : 'New Feature'}
                        </h1>
                        <p className="text-sm text-slate-500 mt-0.5">
                            {isEditing ? 'Update why choose us item details.' : 'Add a new feature to the landing page.'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className={`w-full rounded-lg border px-3 py-2 outline-none transition-shadow ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'}`}
                                placeholder="E.g., Priority Delivery"
                            />
                            {errors.title && <p className="mt-1.5 text-sm text-red-500">{errors.title}</p>}
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                rows={3}
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className={`w-full rounded-lg border px-3 py-2 outline-none transition-shadow resize-none ${errors.description ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-500'}`}
                                placeholder="Short explanation of this feature..."
                            />
                            {errors.description && <p className="mt-1.5 text-sm text-red-500">{errors.description}</p>}
                        </div>
                    </div>

                    <div className="pt-2">
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                            Icon Selection
                        </label>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                            {iconOptions.map((option) => {
                                const IconComp = option.icon;
                                const isSelected = data.icon === option.value;
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setData('icon', option.value)}
                                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                                            isSelected 
                                            ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm ring-1 ring-teal-500' 
                                            : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300'
                                        }`}
                                        title={option.label}
                                    >
                                        <IconComp className="h-6 w-6" />
                                    </button>
                                );
                            })}
                        </div>
                        {errors.icon && <p className="mt-1.5 text-sm text-red-500">{errors.icon}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 mt-4">
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
                        
                        <div className="flex items-center mt-6">
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
                                    <span className="block text-xs text-slate-500 mt-1">Show on the landing page</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3 mt-8">
                        <Link
                            href="/admin/features"
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
                            {processing ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Feature')}
                        </button>
                    </div>

                </form>
            </div>
        </AdminLayout>
    );
}
