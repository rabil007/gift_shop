import { Link } from '@inertiajs/react';
import { Gift, ShoppingCart, ArrowLeft, Package, User as UserIcon, LogOut, MapPin, Phone, Mail } from 'lucide-react';

export default function Profile() {
    return (
        <div className="landing-theme min-h-screen overflow-x-hidden bg-[var(--landing-bg)] font-sans text-[var(--landing-text)] selection:bg-[var(--landing-accent)] selection:text-white flex flex-col">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600&display=swap');
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-sans { font-family: 'Inter', sans-serif; }
                .scrollbar-none::-webkit-scrollbar { display: none; }
                .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <div
                className="fixed inset-0 pointer-events-none opacity-[0.08] mix-blend-multiply z-[1]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
            <div className="fixed -bottom-[30%] left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] rounded-[100%] bg-gradient-to-t from-[var(--landing-accent)]/20 via-[var(--landing-accent)]/5 to-transparent blur-[80px] -z-10" />

            <header className="relative z-50 flex h-14 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-12 border-b border-black/5 bg-white/30 backdrop-blur-md">
                <Link href="/" className="flex items-center gap-2 transition-opacity active:opacity-80 touch-target py-2 -my-2 shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-full px-3 bg-white/60">
                    <Gift className="h-5 w-5 text-neutral-900 shrink-0" />
                    <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
                        Aura<span className="font-medium text-neutral-500">Gifts</span>
                    </span>
                </Link>
                <div className="flex items-center gap-2 sm:gap-4">
                    <Link href="/profile" className="relative p-2 text-[var(--landing-accent)] transition-colors active:scale-95 touch-target flex items-center justify-center bg-white shadow-sm rounded-full">
                        <UserIcon className="h-5 w-5" />
                    </Link>
                    <Link href="/cart" className="relative p-2 text-neutral-800 hover:text-[var(--landing-accent)] transition-colors active:scale-95 touch-target flex items-center justify-center bg-white shadow-sm rounded-full">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-4 w-4 bg-[var(--landing-accent)] text-white text-[10px] font-bold flex items-center justify-center rounded-full transform translate-x-1/4 -translate-y-1/4 shadow-sm border border-white">2</span>
                    </Link>
                </div>
            </header>

            <main className="relative z-10 pt-8 sm:pt-16 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors uppercase tracking-widest active:scale-95 touch-target mb-6 border border-black/5 bg-white/60 backdrop-blur-md rounded-full px-4 py-2 shadow-sm">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Shop
                        </Link>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-neutral-900">My Profile</h1>
                    </div>
                </div>
                
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
                    {/* User Details Section */}
                    <div className="w-full lg:col-span-4 lg:sticky lg:top-24">
                        <div className="rounded-2xl sm:rounded-[2.5rem] bg-white/70 backdrop-blur-3xl border border-white shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-6 sm:p-8 relative overflow-hidden">
                            <div className="absolute -top-[50%] -left-[50%] w-[150%] h-[150%] bg-gradient-to-br from-white via-white/40 to-transparent -z-10 pointer-events-none transform -rotate-12" />
                            
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="h-24 w-24 rounded-full bg-neutral-100 border-4 border-white shadow-md flex items-center justify-center mb-4 text-[var(--landing-accent)]">
                                    <UserIcon className="h-10 w-10" />
                                </div>
                                <h2 className="text-2xl font-serif font-bold text-neutral-900">John Doe</h2>
                                <p className="text-sm text-neutral-500 font-medium">Premium Member</p>
                            </div>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-4 text-sm font-medium text-neutral-600">
                                    <Mail className="h-4 w-4 text-[var(--landing-accent)]" />
                                    <span>john.doe@example.com</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm font-medium text-neutral-600">
                                    <Phone className="h-4 w-4 text-[var(--landing-accent)]" />
                                    <span>+971 50 123 4567</span>
                                </div>
                                <div className="flex items-start gap-4 text-sm font-medium text-neutral-600">
                                    <MapPin className="h-4 w-4 shrink-0 text-[var(--landing-accent)] mt-0.5" />
                                    <span>Dubai Marina, Tower A<br />Apartment 402<br />Dubai, UAE</span>
                                </div>
                            </div>

                            <button className="w-full bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200 rounded-none px-6 h-12 text-xs font-bold tracking-widest uppercase transition-all touch-target active:scale-[0.98] mb-4">
                                Edit Details
                            </button>
                            <button className="w-full bg-neutral-900 hover:bg-black text-white rounded-none px-6 h-12 text-xs font-bold tracking-widest uppercase transition-all touch-target active:scale-[0.98] flex items-center justify-center gap-2">
                                <LogOut className="h-3 w-3" />
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Order History Section */}
                    <div className="w-full lg:col-span-8 flex flex-col gap-6 sm:gap-8">
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">Recent Orders</h2>
                        </div>

                        {/* Order Item 1 */}
                        <div className="flex flex-col p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_40px_rgb(0,0,0,0.04)] relative">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-black/5">
                                <div>
                                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Order #AG-9042</p>
                                    <p className="text-sm font-medium text-neutral-900">Placed on March 4, 2026</p>
                                </div>
                                <div className="flex items-center gap-2 pl-4 border-l border-black/5">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Delivered</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-row items-center gap-4 sm:gap-6">
                                <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 bg-neutral-100 rounded-xl overflow-hidden shadow-inner border border-black/5">
                                    <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=200&auto=format&fit=crop" alt="The Royal Collection" className="h-full w-full object-cover mix-blend-multiply" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate">The Royal Collection</h3>
                                    <p className="text-xs sm:text-sm font-medium text-neutral-500 mt-1">AED 850.00 x 1</p>
                                </div>
                                <button className="self-center hidden sm:flex items-center gap-2 text-xs font-bold text-[var(--landing-accent)] hover:text-neutral-900 uppercase tracking-widest transition-colors py-2 touch-target">
                                    <Package className="h-4 w-4" />
                                    Track
                                </button>
                            </div>
                        </div>

                        {/* Order Item 2 */}
                        <div className="flex flex-col p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_40px_rgb(0,0,0,0.04)] relative">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-black/5">
                                <div>
                                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Order #AG-8815</p>
                                    <p className="text-sm font-medium text-neutral-900">Placed on February 14, 2026</p>
                                </div>
                                <div className="flex items-center gap-2 pl-4 border-l border-black/5">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Delivered</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-row items-center gap-4 sm:gap-6">
                                <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 bg-neutral-100 rounded-xl overflow-hidden shadow-inner border border-black/5">
                                    <img src="https://images.unsplash.com/photo-1558350315-8aa00e8e4590?q=80&w=200&auto=format&fit=crop" alt="Signature Saffron Cake" className="h-full w-full object-cover mix-blend-multiply" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 truncate">Signature Saffron Cake</h3>
                                    <p className="text-xs sm:text-sm font-medium text-neutral-500 mt-1">AED 240.00 x 1</p>
                                </div>
                                <button className="self-center hidden sm:flex items-center gap-2 text-xs font-bold text-[var(--landing-accent)] hover:text-neutral-900 uppercase tracking-widest transition-colors py-2 touch-target">
                                    <Package className="h-4 w-4" />
                                    Track
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="relative z-10 border-t border-black/5 bg-transparent pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-12 text-center md:text-left mt-auto">
                <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
                    <div>
                        <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-2 touch-target py-2">
                            <Gift className="h-5 w-5 text-neutral-900 shrink-0" />
                            <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
                                Aura<span className="font-medium text-neutral-500">Gifts</span>
                            </span>
                        </Link>
                        <p className="text-sm text-neutral-500 font-medium">© {new Date().getFullYear()} AuraGifts Technologies.</p>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors touch-target py-2 min-h-[44px] flex items-center">Privacy</a>
                        <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors touch-target py-2 min-h-[44px] flex items-center">Terms</a>
                        <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors touch-target py-2 min-h-[44px] flex items-center">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
