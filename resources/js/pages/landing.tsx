import { Link, useForm, usePage } from '@inertiajs/react';
import {
    ArrowUp,
    Cake,
    ChevronLeft,
    ChevronRight,
    Clock,
    Gift,
    Heart,
    Image,
    Star,
    Truck,
    MapPin,
    ShieldCheck,
    Phone,
} from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { cn } from '@/lib/utils';

const deliveryOptions = [
    { label: 'Priority Delivery', sub: 'Abu Dhabi & Dubai', icon: Clock },
    { label: 'Same Day Concierge', sub: 'Order before 4 PM', icon: Truck },
    { label: 'Impeccable Sourcing', sub: 'Premium global materials', icon: Sparkles },
];

const whyUs = [
    { title: 'Priority Delivery', description: 'Abu Dhabi & Dubai covered with care. Your gift arrives on time, every time.', icon: Clock },
    { title: 'Same Day Concierge', description: 'Order before 4 PM for same-day hand delivery. We handle the details so you don\'t have to.', icon: Truck },
    { title: 'Impeccable Sourcing', description: 'Premium materials sourced globally. Every piece meets our exacting standards.', icon: Sparkles },
    { title: 'White-Glove Service', description: 'From curation to packaging and delivery—every detail handled with care.', icon: ShieldCheck },
];

const featuredItems = [
    { title: 'The Royal Orchids', price: 'AED 399', image: '/images/landing/flowers.png', Tag: 'Bestseller' },
    { title: 'Signature Saffron Cake', price: 'AED 299', image: '/images/landing/cakes.png', Tag: 'New' },
    { title: 'Desert Rose Arrangement', price: 'AED 189', image: '/images/landing/plants.png' },
    { title: 'Luxury Date Collection', price: 'AED 449', image: '/images/landing/personalized.png', Tag: 'Limited' },
    { title: 'Oud & Amber Gift Set', price: 'AED 249', image: '/images/landing/personalized.png' },
    { title: 'Vanilla Bean Blanc', price: 'AED 229', image: '/images/landing/cakes.png' },
];

// Fallback icon if sparkle not imported properly above
function Sparkles(props: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
}

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
    );
}

function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
    );
}

const categories = [
    {
        title: 'Hamper',
        description: 'Curated gift hampers',
        icon: <Gift className="h-5 w-5 text-[var(--landing-accent)]" />,
        href: '#',
    },
    {
        title: 'Bouquet',
        description: 'Fresh floral arrangements',
        icon: <Heart className="h-5 w-5 text-[var(--landing-accent)]" />,
        href: '#',
    },
    {
        title: 'Photo Gift',
        description: 'Personalized photo gifts',
        icon: <Image className="h-5 w-5 text-[var(--landing-accent)]" />,
        href: '#',
    },
    {
        title: 'Cake',
        description: 'Premium cakes & patisserie',
        icon: <Cake className="h-5 w-5 text-[var(--landing-accent)]" />,
        href: '#',
    },
];

const testimonials = [
    {
        quote: "An absolutely flawless experience from curation to delivery. The aesthetics of the gift box exceeded expectations.",
        name: 'Eleanor V.',
        role: 'Dubai',
    },
    {
        quote: "Their floral arrangements are masterpieces. I rely on their concierge team for all my corporate gifting needs.",
        name: 'Tariq A.',
        role: 'Abu Dhabi',
    },
    {
        quote: "Every order feels like a personal favor. The attention to detail and the quality of packaging is unmatched in the region.",
        name: 'Sara M.',
        role: 'Dubai',
    },
];

function Carousel({ children, className }: { children: ReactNode; className?: string }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scroll = (dir: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const width = scrollRef.current.offsetWidth * 0.85;
        scrollRef.current.scrollBy({ left: dir === 'left' ? -width : width, behavior: 'smooth' });
    };
    return (
        <div className={cn('relative group/carousel', className)}>
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-8 scroll-smooth scrollbar-none"
                style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
            >
                {children}
            </div>
            <button
                type="button"
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 -translate-x-1/2 rounded-full border border-black/5 bg-white/80 backdrop-blur-md p-3 text-neutral-800 shadow-xl transition-all hover:bg-white md:group-hover/carousel:block"
                aria-label="Previous"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            <button
                type="button"
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 rounded-full border border-black/5 bg-white/80 backdrop-blur-md p-3 text-neutral-800 shadow-xl transition-all hover:bg-white md:group-hover/carousel:block"
                aria-label="Next"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    );
}

export default function Landing() {
    const { flash } = usePage().props as { flash?: { success?: string } };
    const enquiryForm = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    return (
        <div className="landing-theme min-h-screen bg-[var(--landing-bg)] font-sans text-[var(--landing-text)] selection:bg-[var(--landing-accent)] selection:text-white">
            {/* Custom Fonts */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600&display=swap');
                
                .font-serif {
                    font-family: 'Playfair Display', serif;
                }
                .font-sans {
                    font-family: 'Inter', sans-serif;
                }
                
                /* Hide scrollbar for carousel */
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-none {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* Background Texture & Gradient */}
            <div 
                className="fixed inset-0 pointer-events-none opacity-[0.08] mix-blend-multiply z-[1]" 
                style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }} 
            />
            {/* Soft subtle gold aura matching the requested UI */}
            <div className="fixed -bottom-[30%] left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] rounded-[100%] bg-gradient-to-t from-[var(--landing-accent)]/20 via-[var(--landing-accent)]/5 to-transparent blur-[80px] -z-10" />

            {/* Header */}
            <header className="relative z-50 flex h-20 items-center justify-between px-6 lg:px-12">
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <Gift className="h-5 w-5 text-neutral-900" />
                    <span className="text-xl font-bold tracking-tight text-neutral-900">
                        Aura<span className="font-medium text-neutral-500">Gifts</span>
                    </span>
                </Link>
            </header>

            <main className="relative z-10 pt-16 md:pt-24 pb-32">
                {/* Hero Section */}
                <section className="px-6 mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                        {/* Left Content */}
                        <div className="flex flex-col items-start text-left lg:pr-8 animate-in slide-in-from-left-8 fade-in duration-1000">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-px w-8 bg-[var(--landing-accent)]"></div>
                                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-[var(--landing-accent)]">
                                    The UAE's Premier Gift Concierge
                                </span>
                            </div>
                            
                            <h1 className="text-5xl md:text-[5rem] lg:text-[5.5rem] font-sans text-neutral-900 font-medium tracking-tight leading-[1] mb-2">
                                Elevate the Art
                            </h1>
                            <h1 className="text-6xl md:text-[6rem] lg:text-[6.5rem] font-serif text-[var(--landing-accent)] italic tracking-tight leading-[1] mb-8 pr-4">
                                of Gifting.
                            </h1>
                            
                            <p className="text-lg md:text-xl text-neutral-600 font-medium max-w-lg leading-relaxed mb-12 animate-in slide-in-from-bottom-6 fade-in duration-1000 delay-150">
                                Curated collections honoring the spirit of generosity. From exquisite floral arrangements to gourmet masterpieces, delivered across the Emirates with flawless precision.
                            </p>

                            <div className="flex flex-wrap items-center gap-6 animate-in slide-in-from-bottom-6 fade-in duration-1000 delay-300">
                                <Button className="bg-[var(--landing-accent)] hover:bg-[var(--landing-accent-hover)] text-white rounded-none px-8 h-14 text-xs font-bold tracking-widest uppercase transition-all">
                                    Explore Collections
                                </Button>
                                <Button variant="ghost" className="rounded-none px-8 h-14 text-xs font-bold tracking-widest uppercase text-neutral-900 hover:bg-neutral-100 transition-all">
                                    View Lookbook
                                </Button>
                            </div>
                        </div>

                        {/* Right Content - Arched Image */}
                        <div className="relative w-full aspect-[4/5] max-w-lg mx-auto lg:ml-auto animate-in zoom-in-95 fade-in duration-1000 delay-300">
                            {/* Outer Arch Background */}
                            <div className="absolute inset-0 bg-[var(--landing-hero-arch)] rounded-t-[1000px] rounded-b-none translate-x-4 -translate-y-4 shadow-sm border border-neutral-200/50"></div>
                            
                            {/* Image Container with inner arch */}
                            <div className="relative w-full h-full rounded-t-[1000px] rounded-b-none overflow-hidden m-4 shadow-2xl border-4 border-white bg-white">
                                <img 
                                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200" 
                                    alt="Luxury Gift Concierge Box" 
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating Card */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-neutral-100 flex items-center gap-5 z-10 w-[280px]">
                                <div className="h-12 w-12 rounded-full border border-[var(--landing-accent)]/30 flex items-center justify-center bg-orange-50/50 shrink-0">
                                    <Star className="h-5 w-5 fill-[var(--landing-accent)] text-[var(--landing-accent)]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-neutral-400 mb-1">
                                        Featured
                                    </span>
                                    <span className="text-sm font-bold text-neutral-900 leading-tight">
                                        The Royal Collection
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Collections (Mimicking "YOUR VIBIZ" section) */}
                <section className="mt-32 px-6 max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-6 px-4">
                        <h2 className="text-xs font-bold tracking-[0.15em] text-neutral-500 uppercase">Our Collections</h2>
                        <span className="text-xs font-medium text-neutral-500">{categories.length} curations</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {categories.map((cat, i) => (
                            <div 
                                key={cat.title} 
                                className="group cursor-pointer rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all p-4 flex items-center justify-between hover:scale-[1.02] duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 flex flex-shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-100/50">
                                        {cat.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-neutral-900">{cat.title}</h3>
                                        <p className="text-xs text-neutral-500 font-medium mt-0.5">{cat.description}</p>
                                    </div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:text-[var(--landing-accent)] group-hover:translate-x-1 transition-all" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Masterpieces Carousel */}
                <section className="mt-32 px-6 max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8 px-4">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-neutral-900">Featured Exclusives</h2>
                            <p className="mt-2 text-sm text-neutral-500 font-medium">Hand-selected masterpieces for extraordinary gifting.</p>
                        </div>
                        <a className="hidden md:flex items-center gap-1 text-sm font-semibold text-[var(--landing-accent)] hover:text-[var(--landing-accent-hover)] cursor-pointer">
                            View All <ArrowUp className="h-4 w-4 rotate-45" />
                        </a>
                    </div>

                    <Carousel>
                        {featuredItems.map((item, idx) => (
                            <div key={idx} className="group relative w-[280px] md:w-[320px] shrink-0">
                                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/50 backdrop-blur-md border border-white shadow-[0_4px_20px_rgb(0,0,0,0.04)] m-2 mb-4 p-2">
                                    <div className="absolute inset-2 rounded-2xl overflow-hidden bg-neutral-100">
                                        {item.Tag && (
                                            <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-neutral-800 shadow-sm border border-black/5">
                                                {item.Tag}
                                            </div>
                                        )}
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                                        />
                                    </div>
                                    {/* Hover Action Overlay */}
                                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-3xl">
                                        <div className="bg-white text-neutral-900 px-6 py-3 rounded-full font-semibold shadow-lg translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 cursor-pointer">
                                            Quick View <ArrowUp className="h-4 w-4 rotate-45 text-[var(--landing-accent)]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4">
                                    <h4 className="text-lg font-bold text-neutral-900">{item.title}</h4>
                                    <p className="text-sm text-neutral-500 font-medium mt-1">{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </section>

                {/* Testimonials */}
                <section className="mt-32 px-6 max-w-6xl mx-auto">
                    <div className="mb-10 px-4">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="h-px w-8 bg-[var(--landing-accent)]"></div>
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

                {/* Why Us */}
                <section className="mt-32 px-6 max-w-6xl mx-auto">
                    <div className="mb-10 px-4">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="h-px w-8 bg-[var(--landing-accent)]"></div>
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

                {/* CTA / About us */}
                <section className="mt-32 px-6 max-w-5xl mx-auto">
                    <div className="rounded-[2.5rem] bg-white/60 backdrop-blur-3xl border border-white shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-10 md:p-16 relative overflow-hidden text-center">
                        <div className="absolute -top-[50%] -left-[50%] w-[150%] h-[150%] bg-gradient-to-br from-white via-white/40 to-transparent -z-10 pointer-events-none transform -rotate-12"></div>
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

                {/* Enquiry form + Quick links */}
                <section className="mt-32 px-6 max-w-6xl mx-auto">
                    <div className="rounded-[2.5rem] bg-white/60 backdrop-blur-3xl border border-white shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-10 md:p-16 relative overflow-hidden">
                        <div className="absolute -top-[50%] -left-[50%] w-[150%] h-[150%] bg-gradient-to-br from-white via-white/40 to-transparent -z-10 pointer-events-none transform -rotate-12" />
                        <div className="mb-10">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="h-px w-8 bg-[var(--landing-accent)]" />
                                <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--landing-accent)]">Get in touch</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 mb-2">Enquiry</h2>
                            <p className="text-lg text-neutral-600 font-medium max-w-xl">
                                Share your requirements and we’ll get back to you.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                            <div className="min-w-0">
                                {flash?.success && (
                                    <p className="mb-6 text-sm font-medium text-neutral-700">{flash.success}</p>
                                )}
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        enquiryForm.post('/enquiry', { preserveScroll: true });
                                    }}
                                    className="space-y-6"
                                >
                            <div className="grid gap-2">
                                <Label htmlFor="enquiry-name" className="text-sm font-bold text-neutral-900">Name</Label>
                                <Input
                                    id="enquiry-name"
                                    type="text"
                                    name="name"
                                    value={enquiryForm.data.name}
                                    onChange={(e) => enquiryForm.setData('name', e.target.value)}
                                    placeholder="Your name"
                                    className="rounded-2xl border-white bg-white/70 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border focus-visible:border-[var(--landing-accent)] focus-visible:ring-[var(--landing-accent)]/30 focus-visible:ring-[3px] placeholder:text-neutral-400 h-12 px-4"
                                />
                                <InputError message={enquiryForm.errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="enquiry-email" className="text-sm font-bold text-neutral-900">Email</Label>
                                <Input
                                    id="enquiry-email"
                                    type="email"
                                    name="email"
                                    value={enquiryForm.data.email}
                                    onChange={(e) => enquiryForm.setData('email', e.target.value)}
                                    placeholder="you@example.com"
                                    className="rounded-2xl border-white bg-white/70 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border focus-visible:border-[var(--landing-accent)] focus-visible:ring-[var(--landing-accent)]/30 focus-visible:ring-[3px] placeholder:text-neutral-400 h-12 px-4"
                                />
                                <InputError message={enquiryForm.errors.email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="enquiry-subject" className="text-sm font-bold text-neutral-900">Subject</Label>
                                <Input
                                    id="enquiry-subject"
                                    type="text"
                                    name="subject"
                                    value={enquiryForm.data.subject}
                                    onChange={(e) => enquiryForm.setData('subject', e.target.value)}
                                    placeholder="What is this regarding?"
                                    className="rounded-2xl border-white bg-white/70 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border focus-visible:border-[var(--landing-accent)] focus-visible:ring-[var(--landing-accent)]/30 focus-visible:ring-[3px] placeholder:text-neutral-400 h-12 px-4"
                                />
                                <InputError message={enquiryForm.errors.subject} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="enquiry-message" className="text-sm font-bold text-neutral-900">Message</Label>
                                <textarea
                                    id="enquiry-message"
                                    name="message"
                                    rows={4}
                                    value={enquiryForm.data.message}
                                    onChange={(e) => enquiryForm.setData('message', e.target.value)}
                                    placeholder="Tell us more..."
                                    className={cn(
                                        'w-full min-h-[120px] rounded-2xl border border-white bg-white/70 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] px-4 py-3 text-base transition-[color,box-shadow] outline-none placeholder:text-neutral-400 resize-y',
                                        'focus-visible:border-[var(--landing-accent)] focus-visible:ring-[var(--landing-accent)]/30 focus-visible:ring-[3px]',
                                        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive md:text-sm'
                                    )}
                                />
                                <InputError message={enquiryForm.errors.message} />
                            </div>
                                    <Button
                                        type="submit"
                                        disabled={enquiryForm.processing}
                                        className="bg-[var(--landing-accent)] hover:bg-[var(--landing-accent-hover)] text-white rounded-none px-8 h-12 text-xs font-bold tracking-widest uppercase transition-all"
                                    >
                                        {enquiryForm.processing ? 'Sending…' : 'Send enquiry'}
                                    </Button>
                                </form>
                            </div>
                            <div className="lg:pl-4 border-t border-neutral-200/60 pt-10 lg:border-t-0 lg:pt-0 lg:border-l lg:border-l-neutral-200/60 lg:pl-16">
                                <p className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 mb-6">Quick links</p>
                                <div className="flex flex-col gap-4">
                                    <a
                                        href="https://wa.me/971501234567"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:scale-[1.02] group"
                                    >
                                        <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                                            <WhatsAppIcon className="h-6 w-6 text-emerald-600" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-neutral-900">WhatsApp</p>
                                            <p className="text-sm text-neutral-500">Chat with us</p>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-[var(--landing-accent)] ml-auto transition-colors" />
                                    </a>
                                    <a
                                        href="https://instagram.com/auragifts"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:scale-[1.02] group"
                                    >
                                        <div className="h-12 w-12 rounded-full bg-pink-500/10 flex items-center justify-center shrink-0 group-hover:bg-pink-500/20 transition-colors">
                                            <InstagramIcon className="h-6 w-6 text-pink-600" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-neutral-900">Instagram</p>
                                            <p className="text-sm text-neutral-500">Follow us</p>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-[var(--landing-accent)] ml-auto transition-colors" />
                                    </a>
                                    <a
                                        href="tel:+971501234567"
                                        className="flex items-center gap-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:scale-[1.02] group"
                                    >
                                        <div className="h-12 w-12 rounded-full bg-[var(--landing-accent)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--landing-accent)]/20 transition-colors">
                                            <Phone className="h-6 w-6 text-[var(--landing-accent)]" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-neutral-900">Call</p>
                                            <p className="text-sm text-neutral-500">+971 50 123 4567</p>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-[var(--landing-accent)] ml-auto transition-colors" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="relative z-10 border-t border-black/5 bg-transparent pt-16 pb-8 px-6 lg:px-12 text-center md:text-left">
                <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-2">
                            <Gift className="h-5 w-5 text-neutral-900" />
                            <span className="text-xl font-bold tracking-tight text-neutral-900">
                                Aura<span className="font-medium text-neutral-500">Gifts</span>
                            </span>
                        </Link>
                        <p className="text-sm text-neutral-500 font-medium">© {new Date().getFullYear()} AuraGifts Technologies.</p>
                    </div>
                    
                    <div className="flex gap-6">
                        <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">Privacy</a>
                        <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">Terms</a>
                        <a href="#" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
