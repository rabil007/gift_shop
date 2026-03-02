import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Gift, ShoppingCart, ArrowLeft, Heart, Share2, Star, Truck, ShieldCheck, Check } from 'lucide-react';

export default function ItemDetail() {
    const [mainImage, setMainImage] = useState("https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop");
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const images = [
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576402830856-12c80145c3b1?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1498805983167-a5aa204e339a?q=80&w=1200&auto=format&fit=crop",
    ];

    const handleAddToCart = () => {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

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
                    <Link href="/cart" className="relative p-2 text-neutral-800 hover:text-[var(--landing-accent)] transition-colors active:scale-95 touch-target flex items-center justify-center bg-white shadow-sm rounded-full">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-4 w-4 bg-[var(--landing-accent)] text-white text-[10px] font-bold flex items-center justify-center rounded-full transform translate-x-1/4 -translate-y-1/4 shadow-sm border border-white">2</span>
                    </Link>
                </div>
            </header>

            <main className="relative z-10 pt-6 sm:pt-12 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto flex-1 w-full">
                <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors uppercase tracking-widest active:scale-95 touch-target mb-6 sm:mb-10 lg:mb-12 border border-black/5 bg-white/60 backdrop-blur-md rounded-full px-4 py-2 shadow-sm">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Collection
                </Link>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
                    <div className="w-full md:w-[min(100%,320px)] md:flex-shrink-0 flex flex-col gap-3 sm:gap-4">
                        <div className="relative aspect-[4/5] w-full max-h-[48vh] sm:max-h-[420px] md:max-h-[360px] rounded-2xl overflow-hidden bg-neutral-100 shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-white">
                            <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-neutral-800 shadow-sm border border-black/5 flex items-center gap-1.5">
                                <Star className="h-3 w-3 fill-[var(--landing-accent)] text-[var(--landing-accent)]" />
                                Bestseller
                            </div>
                            <img src={mainImage} className="w-full h-full object-contain transition-opacity duration-500" alt="Product View" />
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
                            {images.map((img, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => setMainImage(img)}
                                    className={`relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-xl overflow-hidden shadow-sm transition-all border-2 snap-center touch-target active:scale-95 ${mainImage === img ? 'border-[var(--landing-accent)] ring-2 ring-[var(--landing-accent)]/20 shadow-md' : 'border-white hover:border-neutral-200 opacity-70 hover:opacity-100'}`}
                                >
                                    <img src={img} className="w-full h-full object-cover bg-neutral-100" alt={`Thumbnail ${i+1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-full md:flex-1 min-w-0 flex flex-col sticky top-24">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[var(--landing-accent)]">
                                Curated Hampers
                            </span>
                            <div className="flex gap-2">
                                <button className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-black/5 bg-white/60 backdrop-blur-md shadow-sm flex items-center justify-center text-neutral-600 hover:text-[var(--landing-accent)] hover:bg-white transition-all active:scale-95 touch-target">
                                    <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                                </button>
                            </div>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-neutral-900 font-bold tracking-tight leading-[1.15] mb-3 sm:mb-4">
                            The Royal Collection
                        </h1>
                        
                        <div className="flex items-end gap-4 mb-4 sm:mb-6">
                            <p className="text-xl sm:text-2xl font-bold text-neutral-900">AED 850.00</p>
                            <p className="text-xs sm:text-sm text-neutral-500 font-medium pb-1 uppercase tracking-wider">Taxes included</p>
                        </div>

                        <div className="h-px w-full bg-black/5 mb-4 sm:mb-6" />

                        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6 sm:mb-8">
                            An exquisite curation of our finest offerings, designed to make an unforgettable impression. The Royal Collection features artisan-crafted treats, premium dates, and elegant floral accents presented in a bespoke velvet-lined chest.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-10">
                            <div className="flex items-center justify-between rounded-xl sm:rounded-2xl border border-white bg-white/70 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-2">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-12 w-12 flex items-center justify-center text-neutral-500 hover:text-neutral-900 bg-black/5 hover:bg-black/10 rounded-lg sm:rounded-xl transition-colors active:scale-95 font-bold touch-target">
                                    -
                                </button>
                                <span className="text-lg font-bold text-neutral-900 w-12 sm:w-16 text-center">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="h-12 w-12 flex items-center justify-center text-neutral-500 hover:text-neutral-900 bg-black/5 hover:bg-black/10 rounded-lg sm:rounded-xl transition-colors active:scale-95 font-bold touch-target">
                                    +
                                </button>
                            </div>
                            
                            <button 
                                onClick={handleAddToCart}
                                className={`flex-1 h-16 min-h-[64px] rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold tracking-widest uppercase transition-all shadow-lg touch-target active:scale-[0.98] flex items-center justify-center gap-3 ${
                                    added ? 'bg-emerald-600 text-white shadow-emerald-500/25' : 'bg-[var(--landing-accent)] hover:bg-[var(--landing-accent-hover)] text-white shadow-[var(--landing-accent)]/20'
                                }`}
                            >
                                {added ? (
                                    <>
                                        <Check className="h-5 w-5" />
                                        Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart className="h-5 w-5" />
                                        Add to Cart
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-white/60 backdrop-blur-xl border border-white shadow-sm">
                                <div className="h-10 w-10 shrink-0 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center">
                                    <Truck className="h-4 w-4 text-[var(--landing-accent)]" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-neutral-900">Same-Day Delivery</p>
                                    <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">Available in Abu Dhabi & Dubai for orders before 4 PM.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-white/60 backdrop-blur-xl border border-white shadow-sm">
                                <div className="h-10 w-10 shrink-0 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center">
                                    <ShieldCheck className="h-4 w-4 text-[var(--landing-accent)]" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-neutral-900">White-Glove Service</p>
                                    <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">Hand-delivered in pristine condition guaranteed.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <footer className="relative z-10 border-t border-black/5 bg-transparent pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-12 text-center md:text-left mt-auto">
                <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
                    <div>
                        <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-2 touch-target py-2">
                            <Gift className="h-5 w-5 text-neutral-900 shrink-0" />
                            <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
                                Aura<span className="font-medium text-neutral-500">Gifts</span>
                            </span>
                        </Link>
                        <p className="text-sm text-neutral-500 font-medium">© {new Date().getFullYear()} AuraGifts Technologies.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
