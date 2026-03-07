import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { DollarSign, ShoppingCart, Users, TrendingUp, Package, PieChart } from 'lucide-react';

interface StatsProps {
    totalOrders: number;
    revenue: string;
    activeUsers: number;
}

export default function Dashboard({ stats }: { stats: StatsProps }) {
    
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Here’s what’s happening with your store.</p>
                </div>
                <div className="flex items-center gap-2">
                    <select className="text-sm text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" defaultValue="30">
                        <option value="7">Last 7 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 90 days</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6">
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500">Total Revenue</h3>
                        <div className="h-9 w-9 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                            <DollarSign className="h-4 w-4" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 tracking-tight">{stats.revenue}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs">
                        <span className="inline-flex items-center text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                            <TrendingUp className="h-3 w-3 mr-0.5" />
                            +12.5%
                        </span>
                        <span className="text-slate-400">vs last month</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500">Total Orders</h3>
                        <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                            <ShoppingCart className="h-4 w-4" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 tracking-tight">{stats.totalOrders}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs">
                        <span className="inline-flex items-center text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                            <TrendingUp className="h-3 w-3 mr-0.5" />
                            +8.2%
                        </span>
                        <span className="text-slate-400">vs last month</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-medium uppercase tracking-wider text-slate-500">Active Customers</h3>
                        <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                            <Users className="h-4 w-4" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 tracking-tight">{stats.activeUsers}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs">
                        <span className="inline-flex items-center text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                            <TrendingUp className="h-3 w-3 mr-0.5" />
                            +4.1%
                        </span>
                        <span className="text-slate-400">vs last month</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
                <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-900">Recent Orders</h3>
                        <button type="button" className="text-xs font-medium text-teal-600 hover:text-teal-700">View all</button>
                    </div>
                    <div className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                            <Package className="h-5 w-5 text-slate-400" />
                        </div>
                        <p className="text-sm font-medium text-slate-600">No orders yet</p>
                        <p className="text-xs text-slate-400 mt-0.5">Orders will show here once customers place them.</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-5 py-4 border-b border-slate-100">
                        <h3 className="text-sm font-semibold text-slate-900">Top Categories</h3>
                    </div>
                    <div className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                            <PieChart className="h-5 w-5 text-slate-400" />
                        </div>
                        <p className="text-sm font-medium text-slate-600">No data yet</p>
                        <p className="text-xs text-slate-400 mt-0.5">Category performance will appear here.</p>
                    </div>
                </div>
            </div>

        </AdminLayout>
    );
}
