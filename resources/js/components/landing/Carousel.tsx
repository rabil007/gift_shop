import { useRef, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Carousel({ children, className }: { children: ReactNode; className?: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scroll = (dir: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const el = scrollRef.current;
        const cardWidth = el.querySelector('[data-carousel-item]')?.getBoundingClientRect().width ?? el.offsetWidth * 0.8;
        el.scrollBy({ left: dir === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' });
    };
    return (
        <div className={cn('relative group/carousel', className)}>
            <div
                ref={scrollRef}
                className="flex gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden pb-6 sm:pb-8 scroll-smooth scrollbar-none -mx-4 sm:mx-0 px-4 sm:px-0 touch-pan-x"
                style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
            >
                {children}
            </div>
            <button
                type="button"
                onClick={() => scroll('left')}
                className="hidden md:flex absolute left-2 sm:left-0 top-1/2 z-10 -translate-y-1/2 sm:-translate-x-1/2 rounded-full border border-black/5 bg-white/90 sm:bg-white/80 backdrop-blur-md p-2.5 sm:p-3 text-neutral-800 shadow-lg sm:shadow-xl transition-all hover:bg-white active:scale-95 touch-target min-h-[44px] min-w-[44px] items-center justify-center lg:left-0 opacity-0 pointer-events-none group-hover/carousel:opacity-100 group-hover/carousel:pointer-events-auto"
                aria-label="Previous"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            <button
                type="button"
                onClick={() => scroll('right')}
                className="hidden md:flex absolute right-2 sm:right-0 top-1/2 z-10 -translate-y-1/2 sm:translate-x-1/2 rounded-full border border-black/5 bg-white/90 sm:bg-white/80 backdrop-blur-md p-2.5 sm:p-3 text-neutral-800 shadow-lg sm:shadow-xl transition-all hover:bg-white active:scale-95 touch-target min-h-[44px] min-w-[44px] items-center justify-center lg:right-0 opacity-0 pointer-events-none group-hover/carousel:opacity-100 group-hover/carousel:pointer-events-auto"
                aria-label="Next"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    );
}
