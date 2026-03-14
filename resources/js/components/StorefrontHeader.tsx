import { Link } from '@inertiajs/react';
import { ShoppingCart, User } from 'lucide-react';
import { Logo } from '@/components/Logo';

interface StorefrontHeaderProps {
    name: string;
    logo: string | null;
    auth: { user: unknown | null };
    cart_count?: number;
    showShopLink?: boolean;
}

export function StorefrontHeader({ name, logo, auth, cart_count = 0, showShopLink = false }: StorefrontHeaderProps) {
    return (
        <header className="relative z-50 flex h-14 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-12">
            <Link href="/" className="flex items-center gap-2 transition-opacity active:opacity-80 touch-target py-2 -my-2">
                <Logo logo={logo} name={name} iconClassName="text-neutral-900" />
                {!logo && (
                    <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
                        {name}
                    </span>
                )}
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
                {showShopLink && (
                    <Link href="/shop" className="text-sm font-bold text-neutral-900 hover:text-[var(--landing-accent)] transition-colors hidden sm:block">Shop</Link>
                )}
                {auth.user ? (
                    <Link href="/profile" className="relative p-2 text-neutral-800 hover:text-[var(--landing-accent)] transition-colors active:scale-95 touch-target flex items-center justify-center">
                        <User className="h-5 w-5" />
                    </Link>
                ) : (
                    <div className="flex items-center gap-2 sm:gap-4 hidden sm:flex">
                        <Link href="/login" className="text-xs font-bold tracking-widest uppercase text-neutral-700 hover:text-[var(--landing-accent)] transition-colors hidden sm:block px-2">Log In</Link>
                        <Link href="/register" className="text-xs font-bold tracking-widest uppercase text-white bg-[var(--landing-accent)] hover:bg-[var(--landing-accent-hover)] px-6 py-2.5 rounded-none transition-colors hidden sm:block shadow-sm">Sign Up</Link>
                        <Link href="/login" className="relative p-2 text-neutral-800 hover:text-[var(--landing-accent)] transition-colors active:scale-95 touch-target flex items-center justify-center sm:hidden">
                            <User className="h-5 w-5" />
                        </Link>
                    </div>
                )}
                <Link href="/cart" className="relative p-2 text-neutral-800 hover:text-[var(--landing-accent)] transition-colors active:scale-95 touch-target flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5" />
                    {cart_count > 0 && (
                        <span className="absolute top-0 right-0 h-4 w-4 bg-[var(--landing-accent)] text-white text-[10px] font-bold flex items-center justify-center rounded-full transform translate-x-1/4 -translate-y-1/4 shadow-sm border border-white">{cart_count}</span>
                    )}
                </Link>
            </div>
        </header>
    );
}
