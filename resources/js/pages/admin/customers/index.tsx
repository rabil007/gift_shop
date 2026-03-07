import { Head, Link, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Users } from 'lucide-react';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    created_at: string;
}

export default function CustomersIndex({ customers }: { customers: Customer[] }) {
    const { flash } = usePage().props as { flash?: { success?: string } };

    return (
        <AdminLayout>
            <Head title="Customers" />
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Customers</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Registered customers who can shop and manage their profile.</p>
                </div>
            </div>

            {flash?.success && (
                <div className="mb-6 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">
                    {flash.success}
                </div>
            )}

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {customers.length > 0 ? (
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead>
                            <tr className="bg-slate-50/80">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</th>
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-slate-50/50">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                                <Users className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <span className="text-sm font-medium text-slate-900">{customer.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-sm text-slate-600">{customer.email}</td>
                                    <td className="px-5 py-3 text-sm text-slate-500">{customer.phone}</td>
                                    <td className="px-5 py-3 text-sm text-slate-500">{customer.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-12 text-center">
                        <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-sm font-medium text-slate-600">No customers yet</p>
                        <p className="text-xs text-slate-500 mt-1">Customers will appear here once they register on the website.</p>
                        <Link
                            href="/admin"
                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                        >
                            Back to dashboard
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
