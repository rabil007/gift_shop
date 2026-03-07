import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Users, ShoppingBag, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { auth, name, logo } = usePage().props as { auth: { user: any | null }, name: string, logo: string | null };
    
    // We'll use a clean, sophisticated dark/light look for the admin panel, distinct from the customer-facing gold/cream theme.
    
    return (
        <div className="min-h-screen bg-slate-50/50 flex font-sans text-slate-900 selection:bg-teal-600 selection:text-white">
            
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex shrink-0 border-r border-slate-800">
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        {logo ? (
                            <img src={logo} alt={name} className="h-6 w-6 w-auto object-contain" />
                        ) : (
                            <div className="w-6 h-6 rounded bg-teal-600 flex items-center justify-center">
                                <span className="text-xs font-black text-white">A</span>
                            </div>
                        )}
                        {name}<span className="font-medium text-slate-400"> Admin</span>
                    </span>
                </div>
                
                <div className="px-4 py-4">
                    <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
                    <nav className="flex-1 space-y-1">
                        <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md bg-teal-500/10 text-teal-400 font-medium transition-all group">
                            <LayoutDashboard className="h-5 w-5 stroke-[1.5] group-hover:scale-110 transition-transform" />
                            Dashboard
                        </Link>
                        <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-400 hover:text-slate-50 hover:bg-slate-800/50 font-medium transition-all group">
                            <ShoppingBag className="h-5 w-5 stroke-[1.5] group-hover:scale-110 transition-transform" />
                            Orders
                        </Link>
                        <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-400 hover:text-slate-50 hover:bg-slate-800/50 font-medium transition-all group">
                            <Users className="h-5 w-5 stroke-[1.5] group-hover:scale-110 transition-transform" />
                            Customers
                        </Link>
                    </nav>

                    <p className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-8 mb-2">System</p>
                    <nav className="space-y-1">
                        <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-slate-400 hover:text-slate-50 hover:bg-slate-800/50 font-medium transition-all group">
                            <Settings className="h-5 w-5 stroke-[1.5] group-hover:scale-110 transition-transform" />
                            Settings
                        </Link>
                    </nav>
                </div>
                
                <div className="mt-auto p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-md bg-slate-800/50 border border-slate-700/50">
                        <div className="h-8 w-8 rounded bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-sm font-bold text-white uppercase shadow-inner">
                            {auth?.user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-medium text-slate-200 truncate">{auth?.user?.name || 'Admin User'}</span>
                            <span className="text-xs text-slate-500 truncate">{auth?.user?.email || 'admin@auragifts.com'}</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0 relative z-10 shadow-sm shadow-slate-100">
                    {/* Mobile Logo */}
                    <div className="flex items-center md:hidden gap-3">
                        {logo ? (
                            <img src={logo} alt={name} className="h-8 w-8 w-auto object-contain" />
                        ) : (
                            <div className="w-8 h-8 rounded bg-teal-600 flex items-center justify-center">
                                <span className="text-sm font-black text-white">A</span>
                            </div>
                        )}
                        <span className="text-lg font-bold tracking-tight text-slate-900">
                            {name}<span className="font-medium text-slate-500"> Admin</span>
                        </span>
                    </div>

                    {/* Desktop Left: Breadcrumb/Search (Placeholder) */}
                    <div className="hidden md:flex flex-1 items-center">
                        <div className="w-full max-w-md relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search orders, customers, products..." 
                                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 focus:bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 sm:text-sm transition-colors"
                            />
                        </div>
                    </div>

                    {/* Right Tools */}
                    <div className="flex items-center gap-4 ml-auto">
                        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                        
                        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
                        
                        <Link href="/" className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                            <LogOut className="h-4 w-4" />
                            Storefront
                        </Link>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-slate-50/50 p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
