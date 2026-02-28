import { Clock, Truck, ShieldCheck } from 'lucide-react';
import { Sparkles } from './icons';

const whyUs = [
    { title: 'Priority Delivery', description: 'Abu Dhabi & Dubai covered with care. Your gift arrives on time, every time.', icon: Clock },
    { title: 'Same Day Concierge', description: 'Order before 4 PM for same-day hand delivery. We handle the details so you don\'t have to.', icon: Truck },
    { title: 'Impeccable Sourcing', description: 'Premium materials sourced globally. Every piece meets our exacting standards.', icon: Sparkles },
    { title: 'White-Glove Service', description: 'From curation to packaging and delivery—every detail handled with care.', icon: ShieldCheck },
];

export function WhyUsSection() {
    return (
        <section className="mt-32 px-6 max-w-6xl mx-auto">
            <div className="mb-10 px-4">
                <div className="flex items-center gap-4 mb-2">
                    <div className="h-px w-8 bg-[var(--landing-accent)]" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--landing-accent)]">Why AuraGifts</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">Why Choose Us</h2>
                <p className="mt-2 text-sm text-neutral-500 font-medium max-w-xl">We redefine the art of gifting through seamless service and unwavering quality.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {whyUs.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.title}
                            className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all p-6 flex flex-col hover:scale-[1.02] duration-300"
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
