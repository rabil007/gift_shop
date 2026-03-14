import { Link, useForm, usePage } from '@inertiajs/react';
import {
    HeroSection,
    CollectionsSection,
    FeaturedSection,
    TestimonialsSection,
    WhyUsSection,
    AboutSection,
    EnquirySection,
} from '@/components/landing';
import { Logo } from '@/components/Logo';
import { StorefrontHeader } from '@/components/StorefrontHeader';

export default function Landing() {
    const { flash, auth, name, logo, featuredItems = [], heroItems = [], testimonials = [], features = [], cart_count = 0 } = usePage().props as unknown as { flash?: { success?: string }, auth: { user: any | null }, name: string, logo: string | null, featuredItems?: any[], heroItems?: any[], testimonials?: any[], features?: any[], cart_count?: number };
    const enquiryForm = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    return (
        <div className="landing-theme min-h-screen overflow-x-hidden bg-[var(--landing-bg)] font-sans text-[var(--landing-text)] selection:bg-[var(--landing-accent)] selection:text-white">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600&display=swap');
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-sans { font-family: 'Inter', sans-serif; }
                .scrollbar-none::-webkit-scrollbar { display: none; }
                .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <div
                className="fixed inset-0 pointer-events-none opacity-[0.08] mix-blend-multiply z-[1]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
            <div className="fixed -bottom-[30%] left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] rounded-[100%] bg-gradient-to-t from-[var(--landing-accent)]/20 via-[var(--landing-accent)]/5 to-transparent blur-[80px] -z-10" />

            <StorefrontHeader name={name} logo={logo} auth={auth} cart_count={cart_count} />

            <main className="relative z-10 pt-4 sm:pt-12 md:pt-24 pb-24 sm:pb-32">
                <HeroSection heroItems={heroItems} />
                <CollectionsSection />
                <FeaturedSection featuredItems={featuredItems} />
                <TestimonialsSection testimonials={testimonials} />
                <WhyUsSection features={features} />
                <AboutSection />
                <EnquirySection flashSuccess={flash?.success} form={enquiryForm} />
            </main>

            <footer className="relative z-10 border-t border-black/5 bg-transparent pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-12 text-center md:text-left">
                <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
                    <div>
                        <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-2 touch-target py-2">
                            <Logo logo={logo} name={name} iconClassName="text-neutral-900" />
                            {!logo && (
                                <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
                                    {name}
                                </span>
                            )}
                        </Link>
                        <p className="text-sm text-neutral-500 font-medium">© {new Date().getFullYear()} {name}.</p>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors touch-target py-2 min-h-[44px] flex items-center">Privacy</a>
                        <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors touch-target py-2 min-h-[44px] flex items-center">Terms</a>
                        <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors touch-target py-2 min-h-[44px] flex items-center">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
