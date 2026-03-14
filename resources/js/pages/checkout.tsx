import { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Lock, MapPin } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { StorefrontHeader } from '@/components/StorefrontHeader';

interface Address {
    id: number;
    label: string;
    line_1: string;
    line_2: string | null;
    city: string;
    state: string | null;
    postal_code: string | null;
    country: string;
    is_default: boolean;
}

export default function Checkout() {
    const { auth, name, logo, cart, addresses = [], cart_count = 0, errors: pageErrors = {} } = usePage().props as any;
    const [useCustomAddress, setUseCustomAddress] = useState(addresses.length === 0);
    const [processing, setProcessing] = useState(false);

    const defaultAddressId = addresses.length > 0 ? (addresses.find((a: Address) => a.is_default)?.id ?? addresses[0].id) : null;
    const [addressId, setAddressId] = useState(defaultAddressId);
    const [shipping, setShipping] = useState({
        shipping_name: '',
        shipping_line_1: '',
        shipping_line_2: '',
        shipping_city: '',
        shipping_state: '',
        shipping_postal_code: '',
        shipping_country: 'UAE',
        shipping_phone: '',
    });

    const errors = pageErrors as Record<string, string>;

    const subtotal = cart?.items?.reduce((acc: number, cartItem: any) => acc + (Number(cartItem.item.price) * cartItem.quantity), 0) ?? 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = useCustomAddress
            ? {
                shipping_name: shipping.shipping_name,
                shipping_line_1: shipping.shipping_line_1,
                shipping_line_2: shipping.shipping_line_2 || null,
                shipping_city: shipping.shipping_city,
                shipping_state: shipping.shipping_state || null,
                shipping_postal_code: shipping.shipping_postal_code || null,
                shipping_country: shipping.shipping_country,
                shipping_phone: shipping.shipping_phone || null,
            }
            : { address_id: addressId };
        setProcessing(true);
        router.post('/checkout', payload, { onFinish: () => setProcessing(false) });
    };

    return (
        <>
            <Head title="Checkout" />
        <div className="landing-theme min-h-screen overflow-x-hidden bg-[var(--landing-bg)] font-sans text-[var(--landing-text)] selection:bg-[var(--landing-accent)] selection:text-white flex flex-col">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600&display=swap');
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-sans { font-family: 'Inter', sans-serif; }
                .scrollbar-none::-webkit-scrollbar { display: none; }
                .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            <div className="fixed inset-0 pointer-events-none opacity-[0.08] mix-blend-multiply z-[1]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
            <div className="fixed -bottom-[30%] left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] rounded-[100%] bg-gradient-to-t from-[var(--landing-accent)]/20 via-[var(--landing-accent)]/5 to-transparent blur-[80px] -z-10" />

            <StorefrontHeader name={name} logo={logo} auth={auth} cart_count={cart_count} />

            <main className="relative z-10 pt-8 sm:pt-16 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto flex-1 w-full">
                <Link href="/cart" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 uppercase tracking-widest mb-6 border border-black/5 bg-white/60 backdrop-blur-md rounded-full px-4 py-2 shadow-sm w-fit">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Cart
                </Link>
                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-neutral-900 mb-8">Checkout</h1>

                <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-7 space-y-6">
                        <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm p-6 sm:p-8">
                            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2 mb-4">
                                <MapPin className="h-5 w-5 text-[var(--landing-accent)]" />
                                Shipping Address
                            </h2>
                            {addresses.length > 0 && !useCustomAddress && (
                                <div className="space-y-3">
                                    {addresses.map((addr: Address) => (
                                        <label key={addr.id} className="flex gap-3 p-4 rounded-xl border border-neutral-200 bg-white/80 cursor-pointer hover:border-[var(--landing-accent)]/30 has-[:checked]:border-[var(--landing-accent)] has-[:checked]:ring-2 has-[:checked]:ring-[var(--landing-accent)]/20">
                                            <input type="radio" name="address_id" value={addr.id} checked={addressId == addr.id} onChange={() => setAddressId(addr.id)} className="mt-1" />
                                            <div>
                                                <span className="font-medium text-neutral-900">{addr.label}</span>
                                                <p className="text-sm text-neutral-600 mt-0.5">{addr.line_1}{addr.line_2 ? `, ${addr.line_2}` : ''}, {addr.city}{addr.state ? `, ${addr.state}` : ''} {addr.postal_code ?? ''}, {addr.country}</p>
                                            </div>
                                        </label>
                                    ))}
                                    <button type="button" onClick={() => setUseCustomAddress(true)} className="text-sm font-bold text-[var(--landing-accent)] hover:underline">
                                        Ship to a different address
                                    </button>
                                </div>
                            )}
                            {useCustomAddress && (
                                <div className="space-y-4">
                                    {addresses.length > 0 && (
                                        <button type="button" onClick={() => setUseCustomAddress(false)} className="text-sm font-bold text-[var(--landing-accent)] hover:underline">
                                            Use saved address
                                        </button>
                                    )}
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Full name</label>
                                        <input type="text" value={shipping.shipping_name} onChange={e => setShipping(s => ({ ...s, shipping_name: e.target.value }))} className="block w-full rounded-lg border border-neutral-200 px-3 py-2 text-neutral-900 focus:border-[var(--landing-accent)] focus:ring-1 focus:ring-[var(--landing-accent)]" required={useCustomAddress} />
                                        {errors.shipping_name && <p className="text-sm text-red-600 mt-1">{errors.shipping_name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Address line 1</label>
                                        <input type="text" value={shipping.shipping_line_1} onChange={e => setShipping(s => ({ ...s, shipping_line_1: e.target.value }))} className="block w-full rounded-lg border border-neutral-200 px-3 py-2 text-neutral-900 focus:border-[var(--landing-accent)] focus:ring-1 focus:ring-[var(--landing-accent)]" required={useCustomAddress} />
                                        {errors.shipping_line_1 && <p className="text-sm text-red-600 mt-1">{errors.shipping_line_1}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Address line 2 (optional)</label>
                                        <input type="text" value={shipping.shipping_line_2} onChange={e => setShipping(s => ({ ...s, shipping_line_2: e.target.value }))} className="block w-full rounded-lg border border-neutral-200 px-3 py-2 text-neutral-900 focus:border-[var(--landing-accent)] focus:ring-1 focus:ring-[var(--landing-accent)]" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">City</label>
                                            <input type="text" value={shipping.shipping_city} onChange={e => setShipping(s => ({ ...s, shipping_city: e.target.value }))} className="block w-full rounded-lg border border-neutral-200 px-3 py-2 text-neutral-900 focus:border-[var(--landing-accent)] focus:ring-1 focus:ring-[var(--landing-accent)]" required={useCustomAddress} />
                                            {errors.shipping_city && <p className="text-sm text-red-600 mt-1">{errors.shipping_city}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Phone (optional)</label>
                                            <input type="text" value={shipping.shipping_phone} onChange={e => setShipping(s => ({ ...s, shipping_phone: e.target.value }))} className="block w-full rounded-lg border border-neutral-200 px-3 py-2 text-neutral-900 focus:border-[var(--landing-accent)] focus:ring-1 focus:ring-[var(--landing-accent)]" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">State / Region</label>
                                            <input type="text" value={shipping.shipping_state} onChange={e => setShipping(s => ({ ...s, shipping_state: e.target.value }))} className="block w-full rounded-lg border border-neutral-200 px-3 py-2 text-neutral-900 focus:border-[var(--landing-accent)] focus:ring-1 focus:ring-[var(--landing-accent)]" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Postal code</label>
                                            <input type="text" value={shipping.shipping_postal_code} onChange={e => setShipping(s => ({ ...s, shipping_postal_code: e.target.value }))} className="block w-full rounded-lg border border-neutral-200 px-3 py-2 text-neutral-900 focus:border-[var(--landing-accent)] focus:ring-1 focus:ring-[var(--landing-accent)]" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-neutral-600 mb-1">Country</label>
                                        <input type="text" value={shipping.shipping_country} onChange={e => setShipping(s => ({ ...s, shipping_country: e.target.value }))} className="block w-full rounded-lg border border-neutral-200 px-3 py-2 text-neutral-900 focus:border-[var(--landing-accent)] focus:ring-1 focus:ring-[var(--landing-accent)]" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="rounded-2xl sm:rounded-[2.5rem] bg-white/70 backdrop-blur-3xl border border-white shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-6 sm:p-8 sticky top-24">
                            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-4">Order Summary</h2>
                            <ul className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                                {cart?.items?.map((ci: any) => (
                                    <li key={ci.id} className="flex justify-between text-sm">
                                        <span className="text-neutral-700">{ci.item.name} × {ci.quantity}</span>
                                        <span className="font-medium text-neutral-900">AED {(Number(ci.item.price) * ci.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm text-neutral-600">
                                    <span>Subtotal</span>
                                    <span className="text-neutral-900">AED {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-neutral-600">
                                    <span>Delivery</span>
                                    <span className="text-emerald-600 font-bold uppercase text-xs">Free</span>
                                </div>
                            </div>
                            <div className="h-px bg-neutral-200 my-4" />
                            <div className="flex justify-between text-lg font-bold text-neutral-900 mb-6">
                                <span>Total</span>
                                <span className="text-[var(--landing-accent)]">AED {subtotal.toFixed(2)}</span>
                            </div>
                            <button type="submit" disabled={processing} className="w-full bg-[var(--landing-accent)] hover:bg-[var(--landing-accent-hover)] text-white rounded-none px-6 h-14 text-xs font-bold tracking-widest uppercase transition-all touch-target active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed">
                                {processing ? 'Placing order…' : 'Place order'}
                            </button>
                            <div className="mt-4 flex items-center justify-center gap-2 text-neutral-400">
                                <Lock className="h-3 w-3" />
                                <span className="text-[10px] uppercase tracking-widest font-bold">Secure checkout</span>
                            </div>
                        </div>
                    </div>
                </form>
            </main>

            <footer className="relative z-10 border-t border-black/5 bg-transparent pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-12 text-center md:text-left mt-auto">
                <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
                    <div>
                        <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-2 touch-target py-2">
                            <Logo logo={logo} name={name} iconClassName="text-neutral-900" />
                            {!logo && <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">{name}</span>}
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
        </>
    );
}
