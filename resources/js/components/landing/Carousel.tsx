import { useRef, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Carousel({ children, className }: { children: ReactNode; className?: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scroll = (dir: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const width = scrollRef.current.offsetWidth * 0.85;
        scrollRef.current.scrollBy({ left: dir === 'left' ? -width : width, behavior: 'smooth' });
    };
    return (
        <div className={cn('relative group/carousel', className)}>
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-8 scroll-smooth scrollbar-none"
                style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
            >
                {children}
            </div>
            <button
                type="button"
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 -translate-x-1/2 rounded-full border border-black/5 bg-white/80 backdrop-blur-md p-3 text-neutral-800 shadow-xl transition-all hover:bg-white md:group-hover/carousel:block"
                aria-label="Previous"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            <button
                type="button"
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 rounded-full border border-black/5 bg-white/80 backdrop-blur-md p-3 text-neutral-800 shadow-xl transition-all hover:bg-white md:group-hover/carousel:block"
                aria-label="Next"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    );
}
