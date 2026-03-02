import { Cake, Gift, Heart, Image } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

const categories = [
    { title: 'Hamper', description: 'Curated gift hampers', icon: Gift, href: '/shop' },
    { title: 'Bouquet', description: 'Fresh floral arrangements', icon: Heart, href: '/shop' },
    { title: 'Photo Gift', description: 'Personalized photo gifts', icon: Image, href: '/shop' },
    { title: 'Cake', description: 'Premium cakes & patisserie', icon: Cake, href: '/shop' },
];

export function CollectionsSection() {
    return (
        <section className="mt-20 sm:mt-24 md:mt-32 px-4 sm:px-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6 px-2 sm:px-4">
                <h2 className="text-xs font-bold tracking-[0.15em] text-neutral-500 uppercase">Our Collections</h2>
                <span className="text-xs font-medium text-neutral-500">{categories.length} curations</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <Link
                            key={cat.title}
                            href={cat.href}
                            className="group rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all p-4 flex items-center justify-between hover:scale-[1.02] active:scale-[0.99] duration-300 touch-target min-h-[56px]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100/50">
                                    <Icon className="h-5 w-5 text-[var(--landing-accent)]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-neutral-900">{cat.title}</h3>
                                    <p className="text-xs text-neutral-500 font-medium mt-0.5">{cat.description}</p>
                                </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:text-[var(--landing-accent)] group-hover:translate-x-1 transition-all" />
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
