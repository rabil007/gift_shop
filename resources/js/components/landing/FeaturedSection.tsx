import { ArrowUp } from 'lucide-react';
import { Carousel } from './Carousel';
import { featuredItems } from './data';
import { Link } from '@inertiajs/react';

export function FeaturedSection() {
    return (
        <section className="mt-20 sm:mt-24 md:mt-32 px-4 sm:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6 px-2 sm:px-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900">Featured Exclusives</h2>
                    <p className="mt-1 sm:mt-2 text-sm text-neutral-500 font-medium">Hand-selected masterpieces for extraordinary gifting.</p>
                </div>
                <Link href="/item/1" className="hidden md:flex items-center gap-1 text-sm font-semibold text-[var(--landing-accent)] hover:text-[var(--landing-accent-hover)] cursor-pointer touch-target min-h-[44px]">
                    View All <ArrowUp className="h-4 w-4 rotate-45" />
                </Link>
            </div>
            <Carousel>
                {featuredItems.map((item, idx) => (
                    <div key={idx} data-carousel-item className="group relative w-[260px] sm:w-[280px] md:w-[320px] shrink-0 [scroll-snap-align:start]">
                        <Link href={`/item/${item.id}`} className="block">
                            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/50 backdrop-blur-md border border-white shadow-[0_4px_20px_rgb(0,0,0,0.04)] m-2 mb-4 p-2">
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
                                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-3xl">
                                    <div className="bg-white text-neutral-900 px-6 py-3 rounded-full font-semibold shadow-lg translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 cursor-pointer active:scale-95 touch-target">
                                        Quick View <ArrowUp className="h-4 w-4 rotate-45 text-[var(--landing-accent)]" />
                                    </div>
                                </div>
                            </div>
                            <div className="px-4">
                                <h4 className="text-lg font-bold text-neutral-900">{item.title}</h4>
                                <p className="text-sm text-neutral-500 font-medium mt-1">{item.price}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </Carousel>
        </section>
    );
}
