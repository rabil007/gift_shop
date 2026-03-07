import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Save, Building2, Check } from 'lucide-react';

export default function Settings({ appName }: { appName: string }) {
    const { flash } = usePage().props as { flash?: { success?: string } };
    const { data, setData, put, processing, errors } = useForm({
        app_name: appName,
    });

    return (
        <AdminLayout>
            <Head title="Settings" />
            <div className="mb-6">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Settings</h1>
                <p className="text-sm text-slate-500 mt-0.5">Manage your application settings.</p>
            </div>

            {flash?.success && (
                <div className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">
                    <Check className="h-4 w-4 shrink-0" />
                    {flash.success}
                </div>
            )}

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-w-2xl">
                <div className="px-5 py-4 border-b border-slate-100">
                    <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-teal-600" />
                        General
                    </h2>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        put('/admin/settings');
                    }}
                    className="p-5 sm:p-6 space-y-5"
                >
                    <div>
                        <label htmlFor="app_name" className="block text-sm font-medium text-slate-700 mb-1.5">
                            Application name
                        </label>
                        <input
                            id="app_name"
                            type="text"
                            value={data.app_name}
                            onChange={(e) => setData('app_name', e.target.value)}
                            placeholder="e.g. AuraGifts"
                            className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 sm:text-sm"
                        />
                        {errors.app_name && (
                            <p className="mt-1 text-sm text-red-600">{errors.app_name}</p>
                        )}
                        <p className="mt-1.5 text-xs text-slate-500">
                            This name appears in the header and footer of the storefront and in the admin panel.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            <Save className="h-4 w-4" />
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
