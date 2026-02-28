import { Star } from 'lucide-react';
import { Carousel } from './Carousel';
import { testimonials } from './data';

export function TestimonialsSection() {
    return (
        <section className="mt-32 px-6 max-w-6xl mx-auto">
            <div className="mb-10 px-4">
                <div className="flex items-center gap-4 mb-2">
                    <div className="h-px w-8 bg-[var(--landing-accent)]" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--landing-accent)]">Testimonials</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">What Our Clients Say</h2>
                <p className="mt-2 text-sm text-neutral-500 font-medium max-w-xl">Trusted by discerning clients across the Emirates.</p>
            </div>
            <Carousel>
                {testimonials.map((t, i) => (
                    <div
                        key={i}
                        className="w-[320px] md:w-[360px] shrink-0 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all p-6 md:p-8 flex flex-col m-2"
                    >
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, j) => (
                                <Star key={j} className="h-4 w-4 fill-[var(--landing-accent)] text-[var(--landing-accent)]" />
                            ))}
                        </div>
                        <p className="text-neutral-600 font-medium leading-relaxed flex-1 mb-6">"{t.quote}"</p>
                        <div className="flex items-center gap-3">
                            <div className="h-11 w-11 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                {t.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-neutral-900">{t.name}</p>
                                <p className="text-xs text-neutral-500 font-medium">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>
    );
}
