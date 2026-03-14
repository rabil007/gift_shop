import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { StorefrontHeader } from '@/components/StorefrontHeader';

export default function CheckoutSuccess() {
    const { auth, name, logo, order, cart_count = 0 } = usePage().props as any;

    return (
        <>
            <Head title="Order confirmed" />
        <div className="landing-theme min-h-screen overflow-x-hidden bg-[var(--landing-bg)] font-sans text-[var(--landing-text)] selection:bg-[var(--landing-accent)] selection:text-white flex flex-col">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600&display=swap');
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-sans { font-family: 'Inter', sans-serif; }
            `}</style>
            <div className="fixed inset-0 pointer-events-none opacity-[0.08] mix-blend-multiply z-[1]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
            <div className="fixed -bottom-[30%] left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] rounded-[100%] bg-gradient-to-t from-[var(--landing-accent)]/20 via-[var(--landing-accent)]/5 to-transparent blur-[80px] -z-10" />

            <StorefrontHeader name={name} logo={logo} auth={auth} cart_count={cart_count} />

            <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-16">
                <div className="text-center max-w-md">
                    <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 mb-2">Thank you for your order</h1>
                    <p className="text-neutral-600 mb-6">Your order has been placed successfully.</p>
                    <p className="text-sm font-medium text-neutral-500 mb-8">Order #{order?.id} · AED {Number(order?.total).toFixed(2)}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/shop" className="inline-flex items-center justify-center bg-[var(--landing-accent)] hover:bg-[var(--landing-accent-hover)] text-white rounded-none px-6 h-12 text-xs font-bold tracking-widest uppercase transition-colors">
                            Continue shopping
                        </Link>
                        <Link href="/" className="inline-flex items-center justify-center border-2 border-neutral-200 hover:border-neutral-900 text-neutral-900 rounded-none px-6 h-12 text-xs font-bold tracking-widest uppercase transition-colors">
                            Back to home
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="relative z-10 border-t border-black/5 bg-transparent pt-12 pb-8 px-4 text-center">
                <Link href="/" className="inline-flex items-center justify-center gap-2 mb-2">
                    <Logo logo={logo} name={name} iconClassName="text-neutral-900" />
                    {!logo && <span className="text-lg font-bold tracking-tight text-neutral-900">{name}</span>}
                </Link>
                <p className="text-sm text-neutral-500">© {new Date().getFullYear()} {name}.</p>
            </footer>
        </div>
        </>
    );
}
