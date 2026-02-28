import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AboutSection() {
    return (
        <section className="mt-32 px-6 max-w-5xl mx-auto">
            <div className="rounded-[2.5rem] bg-white/60 backdrop-blur-3xl border border-white shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-10 md:p-16 relative overflow-hidden text-center">
                <div className="absolute -top-[50%] -left-[50%] w-[150%] h-[150%] bg-gradient-to-br from-white via-white/40 to-transparent -z-10 pointer-events-none transform -rotate-12" />
                <Heart className="h-10 w-10 text-[var(--landing-accent)] mx-auto mb-6" />
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">About us</h2>
                <p className="text-lg text-neutral-600 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                    AuraGifts is the UAE's premier gift concierge. We blend impeccable sourcing, white-glove service, and a passion for meaningful gifting to deliver extraordinary experiences across the Emirates.
                </p>
                <Button className="bg-[var(--landing-accent)] hover:bg-[var(--landing-accent-hover)] text-white rounded-none px-8 h-12 text-xs font-bold tracking-widest uppercase transition-all">
                    Our Story
                </Button>
            </div>
        </section>
    );
}
