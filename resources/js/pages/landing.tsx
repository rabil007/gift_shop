import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Clock,
    Gift,
    Heart,
    Leaf,
    Quote,
    ShieldCheck,
    Sparkles,
    Star,
    Truck,
} from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const deliveryOptions = [
    { label: '1 Hour Delivery', sub: '60 mins', icon: Clock },
    { label: 'Same Day', sub: 'Order by 2 PM', icon: Truck },
    { label: 'Midnight Delivery', sub: 'Late night', icon: Sparkles },
];

const featuredItems = [
    { title: 'Blush Rose Bouquet', price: '299', image: '/images/landing/flowers.png' },
    { title: 'Chocolate Dream Cake', price: '249', image: '/images/landing/cakes.png' },
    { title: 'Lucky Bamboo Plant', price: '149', image: '/images/landing/plants.png' },
    { title: 'Personalised Gift Box', price: '349', image: '/images/landing/personalized.png' },
    { title: 'Peach Bloom Harmony', price: '199', image: '/images/landing/flowers.png' },
    { title: 'Red Velvet Cake', price: '279', image: '/images/landing/cakes.png' },
];

const personalisedPicks = [
    { title: 'Anniversary Gift Box', price: '399', image: '/images/landing/personalized.png' },
    { title: 'Birthday Bloom Box', price: '329', image: '/images/landing/flowers.png' },
    { title: 'New Born Gift Set', price: '449', image: '/images/landing/personalized.png' },
    { title: 'Photo Cake', price: '369', image: '/images/landing/cakes.png' },
    { title: 'Engraved Keepsake', price: '199', image: '/images/landing/personalized.png' },
];

const recipients = [
    { title: 'Gifts for Wife', href: '#categories' },
    { title: 'Gifts for Husband', href: '#categories' },
    { title: 'Gifts for Mother', href: '#categories' },
    { title: 'Gifts for Father', href: '#categories' },
    { title: 'Gifts for Girlfriend', href: '#categories' },
    { title: 'Gifts for Boyfriend', href: '#categories' },
];

const categories = [
    {
        title: 'Flowers',
        description: 'Fresh bouquets for every occasion',
        image: '/images/landing/flowers.png',
        href: '#',
        accent: 'from-rose-400/20 to-pink-500/20',
        hoverGradient: 'group-hover:from-rose-400/30 group-hover:to-pink-500/30',
    },
    {
        title: 'Cakes',
        description: 'Sweet celebrations delivered',
        image: '/images/landing/cakes.png',
        href: '#',
        accent: 'from-amber-400/20 to-orange-500/20',
        hoverGradient: 'group-hover:from-amber-400/30 group-hover:to-orange-500/30',
    },
    {
        title: 'Plants',
        description: 'Greenery that lasts',
        image: '/images/landing/plants.png',
        href: '#',
        accent: 'from-emerald-400/20 to-teal-500/20',
        hoverGradient: 'group-hover:from-emerald-400/30 group-hover:to-teal-500/30',
    },
    {
        title: 'Personalized',
        description: 'Gifts made with their name',
        image: '/images/landing/personalized.png',
        href: '#',
        accent: 'from-violet-400/20 to-purple-500/20',
        hoverGradient: 'group-hover:from-violet-400/30 group-hover:to-purple-500/30',
    },
];

const trustItems = [
    {
        icon: Clock,
        title: 'Same-day delivery',
        description: 'Order by noon, delivered today',
    },
    {
        icon: ShieldCheck,
        title: 'Quality guaranteed',
        description: 'Fresh products or we make it right',
    },
    {
        icon: Heart,
        title: 'Handcrafted with care',
        description: 'Every gift prepared by our team',
    },
    {
        icon: Sparkles,
        title: 'Curated collection',
        description: 'Only the best for your loved ones',
    },
];

const testimonials = [
    {
        quote: 'The flowers arrived the same day and looked even better than the photos. Will definitely order again.',
        name: 'Sarah M.',
        role: 'Dubai',
        rating: 5,
    },
    {
        quote: 'Finally a gift shop that gets it. Fast, beautiful, and the personalized cake was a hit at the party.',
        name: 'Omar K.',
        role: 'Abu Dhabi',
        rating: 5,
    },
    {
        quote: 'I send gifts to my family every month. Same-day delivery and the quality is always consistent.',
        name: 'Layla H.',
        role: 'Sharjah',
        rating: 5,
    },
];

const bannerAds = [
    {
        id: 'main',
        title: 'This Ramadan,',
        subtitle: 'Celebrate togetherness with thoughtful gifts',
        tagline: 'Share the blessings',
        image: '/images/landing/hero.png',
        href: '#categories',
        cta: 'Order Now',
        size: 'large',
    },
    {
        id: 'wishes',
        title: 'Gifts That Speak Louder Than Wishes',
        image: '/images/landing/cakes.png',
        href: '#categories',
        cta: 'Order Now',
        size: 'small',
    },
    {
        id: 'personalised',
        title: 'Personalised Gift Sets for all occasions',
        tagline: "Gift Shop's Special Curation",
        image: '/images/landing/personalized.png',
        href: '#categories',
        cta: 'Order Now',
        size: 'small',
    },
];

const stats = [
    { value: '50k+', label: 'Gifts delivered' },
    { value: '4.9', label: 'Customer rating' },
    { value: 'Same day', label: 'Delivery available' },
];

function Carousel({ children, className }: { children: ReactNode; className?: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scroll = (dir: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const width = scrollRef.current.offsetWidth * 0.85;
        scrollRef.current.scrollBy({ left: dir === 'left' ? -width : width, behavior: 'smooth' });
    };
    return (
        <div className={cn('relative', className)}>
            <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto pb-2 scroll-smooth scrollbar-thin [scrollbar-width:thin] md:gap-6"
                style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
            >
                {children}
            </div>
            <button
                type="button"
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-2 shadow-md transition hover:bg-neutral-50 md:-left-4 md:block"
                aria-label="Previous"
            >
                <ChevronLeft className="h-5 w-5 text-neutral-700" />
            </button>
            <button
                type="button"
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-neutral-200 bg-white p-2 shadow-md transition hover:bg-neutral-50 md:-right-4 md:block"
                aria-label="Next"
            >
                <ChevronRight className="h-5 w-5 text-neutral-700" />
            </button>
        </div>
    );
}

export default function Landing() {
    return (
        <div className="min-h-screen bg-[#faf9f7] font-display">
            <div className="relative overflow-hidden bg-[linear-gradient(135deg,#fef7f5_0%,#fefdfb_40%,#f5f9ff_100%)]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(251,113,133,0.25),transparent)]" />
                <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl" />
                <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-rose-200/20 blur-3xl" />

                <header className="relative z-50 border-b border-neutral-200/50 bg-white/80 backdrop-blur-xl">
                        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 py-4 md:h-20">
                        <Link
                            href="/"
                            className="flex items-center gap-2.5 font-semibold text-neutral-900 transition hover:opacity-90"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-rose-500 to-pink-500 shadow-lg shadow-rose-500/25">
                                <Gift className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl tracking-tight">Gift Shop</span>
                        </Link>
                        <nav className="hidden items-center gap-8 md:flex">
                            <a
                                href="#categories"
                                className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
                            >
                                Shop
                            </a>
                            <a
                                href="#why-us"
                                className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
                            >
                                Why us
                            </a>
                            <a
                                href="#reviews"
                                className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
                            >
                                Reviews
                            </a>
                            <Link
                                href="/login"
                                className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
                            >
                                Log in
                            </Link>
                            <Link href="/register" prefetch>
                                <Button
                                    size="sm"
                                    className="rounded-full bg-neutral-900 px-5 font-medium text-white shadow-lg shadow-neutral-900/20 transition hover:bg-neutral-800 hover:shadow-neutral-900/30"
                                >
                                    Sign up
                                </Button>
                            </Link>
                        </nav>
                    </div>
                </header>

                <section className="relative px-4 py-8 md:py-10">
                    <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-neutral-100/80 shadow-inner ring-1 ring-neutral-200/50">
                        <div className="grid grid-cols-1 gap-px bg-neutral-200/50 md:grid-cols-2">
                            {bannerAds
                                .filter((b) => b.size === 'large')
                                .map((banner) => (
                                    <a
                                        key={banner.id}
                                        href={banner.href}
                                        className="group relative flex min-h-[320px] overflow-hidden bg-white md:min-h-[420px]"
                                    >
                                        <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:w-3/5 md:p-10">
                                            {banner.tagline && (
                                                <p className="text-xs font-medium uppercase tracking-widest text-rose-600">
                                                    {banner.tagline}
                                                </p>
                                            )}
                                            <div>
                                                <h2 className="mt-2 text-2xl font-bold leading-tight text-neutral-900 md:text-4xl">
                                                    {banner.title}
                                                </h2>
                                                {banner.subtitle && (
                                                    <p className="mt-2 text-neutral-600 md:text-lg">{banner.subtitle}</p>
                                                )}
                                            </div>
                                            <span className="mt-6 inline-flex w-fit rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition group-hover:bg-neutral-800">
                                                {banner.cta}
                                            </span>
                                        </div>
                                        {banner.image && (
                                            <div className="absolute inset-0 md:left-auto md:right-0 md:w-2/5">
                                                <img
                                                    src={banner.image}
                                                    alt=""
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-r from-white via-white/80 to-transparent md:from-transparent md:via-transparent" />
                                            </div>
                                        )}
                                    </a>
                                ))}
                            <div className="grid grid-rows-2 gap-px bg-neutral-200/50">
                                {bannerAds
                                    .filter((b) => b.size === 'small')
                                    .map((banner) => (
                                        <a
                                            key={banner.id}
                                            href={banner.href}
                                            className="group relative flex min-h-[200px] overflow-hidden bg-white md:min-h-[210px]"
                                        >
                                            <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 md:w-3/5 md:p-6">
                                                {banner.tagline && (
                                                    <p className="text-[10px] font-medium uppercase tracking-widest text-rose-600">
                                                        {banner.tagline}
                                                    </p>
                                                )}
                                                <h3 className="mt-0.5 text-base font-bold leading-tight text-neutral-900 md:text-lg">
                                                    {banner.title}
                                                </h3>
                                                <span className="mt-3 inline-flex w-fit rounded-full bg-neutral-900 px-4 py-2 text-xs font-medium text-white transition group-hover:bg-neutral-800">
                                                    {banner.cta}
                                                </span>
                                            </div>
                                            {banner.image && (
                                                <div className="absolute inset-0 md:left-auto md:right-0 md:w-2/5">
                                                    <img
                                                        src={banner.image}
                                                        alt=""
                                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-linear-to-r from-white via-white/90 to-transparent md:from-transparent md:via-transparent" />
                                                </div>
                                            )}
                                        </a>
                                    ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative border-t border-neutral-200/50 bg-white/60 px-4 py-6 backdrop-blur-sm">
                    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 md:gap-12">
                        {deliveryOptions.map((opt) => (
                            <div key={opt.label} className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-neutral-200/80">
                                    <opt.icon className="h-5 w-5 text-rose-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-neutral-900">{opt.label}</p>
                                    <p className="text-sm text-neutral-500">{opt.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <section id="categories" className="px-4 py-20 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-rose-500">Categories</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                            Shop by category
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-600">
                            Find the perfect gift for every occasion
                        </p>
                    </div>
                    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((cat, i) => (
                            <a
                                key={cat.title}
                                href={cat.href}
                                className={cn(
                                    'group relative overflow-hidden rounded-3xl bg-linear-to-br p-[2px] transition-all duration-300 hover:shadow-xl hover:shadow-neutral-300/50 hover:-translate-y-1',
                                    cat.accent,
                                    cat.hoverGradient,
                                )}
                            >
                                <div className="flex h-full flex-col overflow-hidden rounded-[22px] bg-white transition duration-300 group-hover:scale-[0.98]">
                                    <div className="relative aspect-4/5 overflow-hidden bg-neutral-100">
                                        <img
                                            src={cat.image}
                                            alt={cat.title}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white">
                                                Shop now
                                                <ArrowRight className="h-4 w-4" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col p-5">
                                        <h3 className="font-bold text-neutral-900">{cat.title}</h3>
                                        <p className="mt-1 text-sm text-neutral-600">{cat.description}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-neutral-200/80 bg-neutral-50/50 px-4 py-16 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">Fresh bouquets & gifts</h2>
                            <p className="mt-1 text-neutral-600">Handpicked arrangements, delivered same day</p>
                        </div>
                        <a href="#categories" className="hidden shrink-0 text-sm font-medium text-rose-600 hover:text-rose-700 md:block">
                            View all
                        </a>
                    </div>
                    <Carousel className="mt-8">
                        {featuredItems.map((item) => (
                            <a
                                key={item.title}
                                href="#"
                                className="group flex w-[260px] shrink-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:shadow-xl md:w-[280px]"
                                style={{ scrollSnapAlign: 'start' }}
                            >
                                <div className="aspect-square overflow-hidden bg-neutral-100">
                                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition group-hover:scale-105" />
                                </div>
                                <div className="flex flex-1 flex-col p-4">
                                    <h3 className="font-semibold text-neutral-900">{item.title}</h3>
                                    <p className="mt-1 text-lg font-bold text-rose-600">AED {item.price}</p>
                                </div>
                            </a>
                        ))}
                    </Carousel>
                </div>
            </section>

            <section className="border-t border-neutral-200/80 bg-white px-4 py-16 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <h2 className="text-center text-2xl font-bold text-neutral-900 md:text-3xl">Shop by recipient</h2>
                    <p className="mt-2 text-center text-neutral-600">Gifts for everyone who matters</p>
                    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
                        {recipients.map((r) => (
                            <a
                                key={r.title}
                                href={r.href}
                                className="flex items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/80 py-5 text-center font-semibold text-neutral-800 transition hover:border-rose-200 hover:bg-rose-50/50 hover:text-rose-700 md:py-6"
                            >
                                {r.title}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-neutral-200/80 bg-neutral-50/50 px-4 py-16 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">Personalised gift picks</h2>
                            <p className="mt-1 text-neutral-600">Add their name for a special touch</p>
                        </div>
                        <a href="#categories" className="hidden shrink-0 text-sm font-medium text-rose-600 hover:text-rose-700 md:block">
                            View all
                        </a>
                    </div>
                    <Carousel className="mt-8">
                        {personalisedPicks.map((item) => (
                            <a
                                key={item.title}
                                href="#"
                                className="group flex w-[260px] shrink-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:shadow-xl md:w-[280px]"
                                style={{ scrollSnapAlign: 'start' }}
                            >
                                <div className="aspect-square overflow-hidden bg-neutral-100">
                                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition group-hover:scale-105" />
                                </div>
                                <div className="flex flex-1 flex-col p-4">
                                    <h3 className="font-semibold text-neutral-900">{item.title}</h3>
                                    <p className="mt-1 text-lg font-bold text-rose-600">AED {item.price}</p>
                                </div>
                            </a>
                        ))}
                    </Carousel>
                </div>
            </section>

            <section id="why-us" className="border-y border-neutral-200/80 bg-white px-4 py-20 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-rose-500">Why choose us</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                            We make gifting simple
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-600">
                            From handpicked products to reliable delivery
                        </p>
                    </div>
                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {trustItems.map((item) => (
                            <div
                                key={item.title}
                                className="group relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:border-rose-200/60 hover:shadow-lg hover:shadow-rose-100/50 hover:-translate-y-0.5"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-rose-50 to-pink-50 text-rose-600 transition duration-300 group-hover:from-rose-100 group-hover:to-pink-100 group-hover:scale-105">
                                    <item.icon className="h-7 w-7" />
                                </div>
                                <h3 className="mt-6 text-lg font-bold text-neutral-900">{item.title}</h3>
                                <p className="mt-2 text-neutral-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="reviews" className="px-4 py-20 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-rose-500">Reviews</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                            Loved by thousands
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-600">
                            See why customers keep coming back
                        </p>
                    </div>
                    <div className="mt-16 grid gap-6 md:grid-cols-3">
                        {testimonials.map((t) => (
                            <div
                                key={t.name}
                                className="rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-sm transition hover:shadow-md"
                            >
                                <Quote className="h-10 w-10 text-rose-200" />
                                <div className="mt-4 flex gap-1">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="mt-4 text-neutral-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                                <div className="mt-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 font-semibold text-rose-600">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-neutral-900">{t.name}</p>
                                        <p className="text-sm text-neutral-500">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-4 py-20 md:py-28">
                <div className="mx-auto max-w-4xl">
                    <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-rose-500 via-pink-500 to-amber-400 px-8 py-16 text-center shadow-2xl shadow-rose-500/25 md:px-16 md:py-20">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(255,255,255,0.2),transparent)]" />
                        <div className="relative">
                            <Leaf className="mx-auto h-14 w-14 text-white/90" />
                            <h2 className="mt-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                                Ready to send something special?
                            </h2>
                            <p className="mx-auto mt-4 max-w-lg text-lg text-white/90">
                                Create a free account to browse our full collection and get same-day delivery.
                            </p>
                            <div className="mt-10">
                                <Link href="/register" prefetch>
                                    <Button
                                        size="lg"
                                        className="rounded-full bg-white px-10 text-base font-semibold text-rose-600 shadow-lg transition hover:bg-white/95 hover:shadow-xl"
                                    >
                                        Create free account
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-neutral-200 bg-neutral-50 px-4 py-14">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
                        <div>
                            <Link href="/" className="flex items-center gap-2.5 font-semibold text-neutral-900">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-rose-500 to-pink-500">
                                    <Gift className="h-4 w-4 text-white" />
                                </div>
                                Gift Shop
                            </Link>
                            <p className="mt-4 max-w-xs text-sm text-neutral-600">
                                Thoughtful gifting, delivered. Flowers, cakes, plants & personalized gifts across the UAE.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-12">
                            <div>
                                <h4 className="font-semibold text-neutral-900">Shop</h4>
                                <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                                    <li><a href="#categories" className="transition hover:text-neutral-900">Categories</a></li>
                                    <li><a href="#" className="transition hover:text-neutral-900">Flowers</a></li>
                                    <li><a href="#" className="transition hover:text-neutral-900">Cakes</a></li>
                                    <li><a href="#" className="transition hover:text-neutral-900">Gift Hampers</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-neutral-900">Company</h4>
                                <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                                    <li><a href="#why-us" className="transition hover:text-neutral-900">Why us</a></li>
                                    <li><a href="#reviews" className="transition hover:text-neutral-900">Reviews</a></li>
                                    <li><a href="#" className="transition hover:text-neutral-900">Contact</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-neutral-900">Account</h4>
                                <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                                    <li><Link href="/login" className="transition hover:text-neutral-900">Log in</Link></li>
                                    <li><Link href="/register" className="transition hover:text-neutral-900">Sign up</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-10 md:flex-row">
                        <p className="text-sm text-neutral-500">
                            © {new Date().getFullYear()} Gift Shop. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-neutral-500">
                            <a href="#" className="transition hover:text-neutral-700">Privacy</a>
                            <a href="#" className="transition hover:text-neutral-700">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
