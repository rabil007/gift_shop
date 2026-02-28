import { Gift, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export function HeroSection() {
    return (
        <section className="px-6 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                <div className="flex flex-col items-start text-left lg:pr-8 animate-in slide-in-from-left-8 fade-in duration-1000">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px w-8 bg-[var(--landing-accent)]" />
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[var(--landing-accent)]">
                            The UAE's Premier Gift Concierge
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-[5rem] lg:text-[5.5rem] font-sans text-neutral-900 font-medium tracking-tight leading-[1] mb-2">
                        Elevate the Art
                    </h1>
                    <h1 className="text-6xl md:text-[6rem] lg:text-[6.5rem] font-serif text-[var(--landing-accent)] italic tracking-tight leading-[1] mb-8 pr-4">
                        of Gifting.
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 font-medium max-w-lg leading-relaxed mb-12 animate-in slide-in-from-bottom-6 fade-in duration-1000 delay-150">
                        Curated collections honoring the spirit of generosity. From exquisite floral arrangements to gourmet masterpieces, delivered across the Emirates with flawless precision.
                    </p>
                    <div className="flex flex-wrap items-center gap-6 animate-in slide-in-from-bottom-6 fade-in duration-1000 delay-300">
                        <Button className="bg-[var(--landing-accent)] hover:bg-[var(--landing-accent-hover)] text-white rounded-none px-8 h-14 text-xs font-bold tracking-widest uppercase transition-all">
                            Explore Collections
                        </Button>
                        <Button variant="ghost" className="rounded-none px-8 h-14 text-xs font-bold tracking-widest uppercase text-neutral-900 hover:bg-neutral-100 transition-all">
                            View Lookbook
                        </Button>
                    </div>
                </div>
                <div className="relative w-full aspect-[4/5] max-w-lg mx-auto lg:ml-auto animate-in zoom-in-95 fade-in duration-1000 delay-300">
                    <div className="absolute inset-0 bg-[var(--landing-hero-arch)] rounded-t-[1000px] rounded-b-none translate-x-4 -translate-y-4 shadow-sm border border-neutral-200/50" />
                    <div className="relative w-full h-full rounded-t-[1000px] rounded-b-none overflow-hidden m-4 shadow-2xl border-4 border-white bg-white">
                        <img
                            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200"
                            alt="Luxury Gift Concierge Box"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-neutral-100 flex items-center gap-5 z-10 w-[280px]">
                        <div className="h-12 w-12 rounded-full border border-[var(--landing-accent)]/30 flex items-center justify-center bg-orange-50/50 shrink-0">
                            <Star className="h-5 w-5 fill-[var(--landing-accent)] text-[var(--landing-accent)]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-400 mb-1">Featured</span>
                            <span className="text-sm font-bold text-neutral-900 leading-tight">The Royal Collection</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
