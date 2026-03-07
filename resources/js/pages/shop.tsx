import { useState, useMemo } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ShoppingCart, Search, ArrowRight, User } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { featuredItems } from '@/components/landing/data';

const categories = ['All', 'Hampers', 'Flowers', 'Cakes', 'Personalized'];

export default function Shop() {
    const { auth, name, logo } = usePage().props as { auth: { user: any | null }, name: string, logo: string | null };
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredItems = useMemo(() => {
        return featuredItems.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

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
                    <Logo logo={logo} name={name} iconClassName="text-neutral-900" />
                    <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
                        {name}
                    </span>
                </Link>
                <div className="flex items-center gap-4 sm:gap-6">
                    <Link href="/shop" className="text-sm font-bold text-neutral-900 hover:text-[var(--landing-accent)] transition-colors hidden sm:block">Shop</Link>
                    {auth.user ? (
                        <Link href="/profile" className="relative p-2 text-neutral-800 hover:text-[var(--landing-accent)] transition-colors active:scale-95 touch-target flex items-center justify-center bg-white shadow-sm rounded-full">
                            <User className="h-5 w-5" />
                        </Link>
                    ) : (
                        <div className="flex items-center gap-2 sm:gap-4 hidden sm:flex">
                            <Link href="/login" className="text-xs font-bold tracking-widest uppercase text-neutral-700 hover:text-[var(--landing-accent)] transition-colors hidden sm:block px-2">Log In</Link>
                            <Link href="/register" className="text-xs font-bold tracking-widest uppercase text-white bg-[var(--landing-accent)] hover:bg-[var(--landing-accent-hover)] px-6 py-2.5 rounded-none transition-colors hidden sm:block shadow-sm">Sign Up</Link>
                            <Link href="/login" className="relative p-2 text-neutral-800 hover:text-[var(--landing-accent)] transition-colors active:scale-95 touch-target flex items-center justify-center bg-white shadow-sm rounded-full sm:hidden">
                                <User className="h-5 w-5" />
                            </Link>
                        </div>
                    )}
                    <Link href="/cart" className="relative p-2 text-neutral-800 hover:text-[var(--landing-accent)] transition-colors active:scale-95 touch-target flex items-center justify-center bg-white shadow-sm rounded-full">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-4 w-4 bg-[var(--landing-accent)] text-white text-[10px] font-bold flex items-center justify-center rounded-full transform translate-x-1/4 -translate-y-1/4 shadow-sm border border-white">2</span>
                    </Link>
                </div>
            </header>

            <main className="relative z-10 pt-8 sm:pt-16 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto flex-1 w-full">
                
                <div className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[var(--landing-accent)] italic tracking-tight leading-[1.05] mb-4">
                        Curated Collections
                    </h1>
                    <p className="text-sm sm:text-lg text-neutral-600 font-medium">
                        Discover our hand-selected masterpieces for extraordinary gifting.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-10 sticky top-14 sm:top-20 z-40 bg-[var(--landing-bg)]/80 backdrop-blur-xl py-4 sm:py-6 -mx-4 sm:mx-0">
                    <div className="flex gap-2 w-full flex-1 min-w-0 overflow-x-auto px-4 sm:px-0 pb-4 pt-2 -mt-2 scrollbar-none">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all whitespace-nowrap active:scale-95 touch-target ${
                                    activeCategory === category 
                                    ? 'bg-[var(--landing-accent)] text-white shadow-md border border-transparent' 
                                    : 'bg-white/60 text-neutral-600 hover:bg-white hover:text-[var(--landing-accent)] shadow-sm border border-white'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                        {/* Spacer for proper right padding on scroll */}
                        <div className="w-1 shrink-0 sm:hidden"></div>
                    </div>

                    <div className="relative w-full lg:w-80 shrink-0 px-4 sm:px-0">
                        <div className="absolute inset-y-0 left-8 sm:left-4 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-neutral-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Find the perfect gift..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-11 pr-4 rounded-full bg-white/80 border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] focus:outline-none focus:ring-2 focus:ring-[var(--landing-accent)]/20 focus:border-[var(--landing-accent)]/30 transition-all text-sm font-medium text-neutral-900 placeholder:text-neutral-400"
                        />
                    </div>
                </div>

                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {filteredItems.map((item, idx) => (
                            <div key={idx} className="group relative">
                                <Link href={`/item/${item.id}`} className="block">
                                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/50 backdrop-blur-md border border-white shadow-[0_4px_20px_rgb(0,0,0,0.04)] m-1 mb-4 p-2 transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] group-hover:-translate-y-1">
                                        <div className="absolute inset-2 rounded-2xl overflow-hidden bg-neutral-100">
                                            {'Tag' in item && item.Tag && (
                                                <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-neutral-800 shadow-sm border border-black/5">
                                                    {item.Tag}
                                                </div>
                                            )}
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                                            />
                                        </div>
                                    </div>
                                    <div className="px-3 flex flex-col items-center text-center">
                                        <h4 className="text-lg font-bold text-neutral-900 leading-tight mb-1">{item.title}</h4>
                                        <p className="text-sm font-bold text-[var(--landing-accent)]">{item.price}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center">
                        <div className="h-16 w-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm border border-black/5 mb-4">
                            <Search className="h-6 w-6 text-neutral-400" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">No items found</h3>
                        <p className="text-neutral-500 max-w-sm mx-auto">We couldn't find any gifts matching your search. Try different keywords or browse all categories.</p>
                        <button 
                            onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                            className="mt-6 text-sm font-bold text-[var(--landing-accent)] hover:underline uppercase tracking-widest"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </main>

            <footer className="relative z-10 border-t border-black/5 bg-transparent pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-12 text-center md:text-left mt-auto">
                <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
                    <div>
                        <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-2 touch-target py-2">
                            <Logo logo={logo} name={name} iconClassName="text-neutral-900" />
                            <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
                                {name}
                            </span>
                        </Link>
                        <p className="text-sm text-neutral-500 font-medium">© {new Date().getFullYear()} {name}.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
