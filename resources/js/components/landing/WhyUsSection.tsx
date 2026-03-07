import { usePage } from '@inertiajs/react';
import { Clock, Truck, ShieldCheck, Heart, Gift, Cake, Image as ImageIcon, Star, Compass, Award } from 'lucide-react';
import { Sparkles } from './icons';

const iconMap: Record<string, any> = {
    Clock, Truck, ShieldCheck, Sparkles, Heart, Gift, Cake, Image: ImageIcon, Star, Compass, Award
};

export function WhyUsSection({ features = [] }: { features?: any[] }) {
    const { name } = usePage().props as { name: string };
    
    if (features.length === 0) return null;

    return (
        <section className="mt-20 sm:mt-24 md:mt-32 px-4 sm:px-6 max-w-6xl mx-auto">
            <div className="mb-8 sm:mb-10 px-2 sm:px-4">
                <div className="flex items-center gap-4 mb-2">
                    <div className="h-px w-6 sm:w-8 bg-[var(--landing-accent)]" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--landing-accent)]">Why {name}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900">Why Choose Us</h2>
                <p className="mt-2 text-sm text-neutral-500 font-medium max-w-xl">We redefine the art of gifting through seamless service and unwavering quality.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {features.map((item) => {
                    const Icon = iconMap[item.icon] || Sparkles;
                    return (
                        <div
                            key={item.id}
                            className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all p-5 sm:p-6 flex flex-col hover:scale-[1.02] duration-300"
                        >
                            <div className="h-11 w-11 rounded-full bg-slate-50 border border-slate-100/50 flex items-center justify-center mb-4">
                                <Icon className="h-5 w-5 text-[var(--landing-accent)]" />
                            </div>
                            <h3 className="text-base font-bold text-neutral-900">{item.title}</h3>
                            <p className="text-sm text-neutral-500 font-medium mt-2 leading-relaxed">{item.description}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
