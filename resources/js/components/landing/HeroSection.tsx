import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroImages } from './data';

const SLIDE_INTERVAL_MS = 4000;
const SLIDE_DURATION_MS = 600;

export function HeroSection() {
    const [index, setIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (distance > 50) setIndex((i) => (i + 1) % heroImages.length);
        if (distance < -50) setIndex((i) => (i - 1 + heroImages.length) % heroImages.length);
    };

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % heroImages.length);
        }, SLIDE_INTERVAL_MS);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="px-4 sm:px-6 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-8 items-center">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left lg:pr-8 animate-in slide-in-from-left-8 fade-in duration-1000 order-2 lg:order-1">
                    <div className="flex items-center gap-4 mb-4 sm:mb-6">
                        <div className="h-px w-6 sm:w-8 bg-[var(--landing-accent)]" />
                        <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[var(--landing-accent)]">
                            The UAE's Premier Gift Concierge
                        </span>
                        <div className="h-px w-6 sm:hidden bg-[var(--landing-accent)]" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-[5rem] lg:text-[5.5rem] font-sans text-neutral-900 font-medium tracking-tight leading-[1.05] mb-1 sm:mb-2">
                        Elevate the Art
                    </h1>
                    <h1 className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[6.5rem] font-serif text-[var(--landing-accent)] italic tracking-tight leading-[1.05] mb-4 sm:mb-8 lg:pr-4">
                        of Gifting.
                    </h1>
                    <p className="text-sm sm:text-lg md:text-xl text-neutral-600 font-medium max-w-lg leading-relaxed mb-6 sm:mb-12 animate-in slide-in-from-bottom-6 fade-in duration-1000 delay-150">
                        Curated collections honoring the spirit of generosity. From exquisite floral arrangements to gourmet masterpieces, delivered across the Emirates with flawless precision.
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 animate-in slide-in-from-bottom-6 fade-in duration-1000 delay-300">
                        <Link href="/shop" className="inline-flex items-center justify-center bg-[var(--landing-accent)] hover:bg-[var(--landing-accent-hover)] text-white rounded-none px-6 sm:px-8 h-12 sm:h-14 text-xs font-bold tracking-widest uppercase transition-all touch-target min-h-[48px] active:scale-[0.98]">
                            Explore Collections
                        </Link>
                        <Button variant="ghost" className="rounded-none px-6 sm:px-8 h-12 sm:h-14 text-xs font-bold tracking-widest uppercase text-neutral-900 hover:bg-neutral-100 transition-all touch-target min-h-[48px] active:scale-[0.98]">
                            View Lookbook
                        </Button>
                    </div>
                </div>
                <div className="relative w-full aspect-[4/5] max-w-[16rem] sm:max-w-[22rem] md:max-w-lg mx-auto lg:ml-auto animate-in zoom-in-95 fade-in duration-1000 delay-300 order-1 lg:order-2 mt-2 sm:mt-0">
                    <div className="absolute inset-0 bg-[var(--landing-hero-arch)] rounded-t-[1000px] rounded-b-none translate-x-2 sm:translate-x-4 -translate-y-2 sm:-translate-y-4 shadow-sm border border-neutral-200/50" />
                    <div className="relative w-full h-full rounded-t-[1000px] rounded-b-none overflow-hidden m-2 sm:m-4 shadow-2xl border-2 sm:border-4 border-white bg-white cursor-grab active:cursor-grabbing"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <div
                            className="flex h-full w-full"
                            style={{
                                transform: `translateX(-${index * 100}%)`,
                                transition: `transform ${SLIDE_DURATION_MS}ms ease-in-out`,
                            }}
                        >
                            {heroImages.map((img) => (
                                <img
                                    key={img.src}
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full shrink-0 h-full object-cover"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="absolute -bottom-4 left-2 sm:-bottom-6 sm:-left-6 bg-white p-3 sm:p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-neutral-100 flex items-center gap-3 sm:gap-5 z-10 w-[240px] sm:w-[280px] max-w-[calc(100vw-2rem)]">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-[var(--landing-accent)]/30 flex items-center justify-center bg-orange-50/50 shrink-0">
                            <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-[var(--landing-accent)] text-[var(--landing-accent)]" />
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-400 mb-0.5 sm:mb-1">Featured</span>
                            <span key={index} className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight truncate animate-in fade-in duration-300">{heroImages[index].featuredTitle}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
