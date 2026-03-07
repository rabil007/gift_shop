import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Save, Building2, Check, Image } from 'lucide-react';

export default function Settings({ appName, logoUrl }: { appName: string; logoUrl: string | null }) {
    const { flash } = usePage().props as { flash?: { success?: string } };
    const { data, setData, post, processing, errors } = useForm({
        app_name: appName,
        logo: null as File | null,
        _method: 'put',
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
                        post('/admin/settings', { forceFormData: true, preserveScroll: true });
                    }}
                    className="p-5 sm:p-6 space-y-5"
                    encType="multipart/form-data"
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
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                            <Image className="h-4 w-4 text-teal-600" />
                            Logo
                        </label>
                        <div className="flex items-center gap-4 flex-wrap">
                            {(logoUrl || data.logo) && (
                                <div className="w-16 h-16 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center shrink-0">
                                    {data.logo ? (
                                        <img src={URL.createObjectURL(data.logo)} alt="Logo preview" className="w-full h-full object-contain" />
                                    ) : (
                                        <img src={logoUrl!} alt="Current logo" className="w-full h-full object-contain" />
                                    )}
                                </div>
                            )}
                            <div className="flex flex-col gap-1">
                                <input
                                    id="logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('logo', e.target.files?.[0] ?? null)}
                                    className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-teal-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-teal-700 hover:file:bg-teal-100"
                                />
                                <p className="text-xs text-slate-500">PNG, JPG or GIF. Max 2MB. Shown in header and footer site-wide.</p>
                                {errors.logo && <p className="text-sm text-red-600">{errors.logo}</p>}
                            </div>
                        </div>
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
