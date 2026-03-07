import { useState, useRef } from 'react';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import { ShoppingCart, ArrowLeft, User as UserIcon, LogOut, MapPin, Camera } from 'lucide-react';
import { Logo } from '@/components/Logo';

interface ProfileData {
    name: string;
    email: string;
    phone: string;
    address: string;
}

interface SavedAddress {
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

function formatAddress(a: SavedAddress): string {
    const parts = [a.line_1];
    if (a.line_2) parts.push(a.line_2);
    const cityLine = [a.city, a.state, a.postal_code].filter(Boolean).join(', ');
    if (cityLine) parts.push(cityLine);
    if (a.country) parts.push(a.country);
    return parts.join('\n');
}

function AddressWithLabels({ address, labelClassName = 'text-xs font-bold text-neutral-400 uppercase tracking-wider', valueClassName = 'text-sm text-neutral-600 font-medium' }: { address: SavedAddress; labelClassName?: string; valueClassName?: string }) {
    const rows: { label: string; value: string }[] = [
        { label: 'Address line 1', value: address.line_1 },
        ...(address.line_2 ? [{ label: 'Address line 2', value: address.line_2 }] : []),
        { label: 'City', value: address.city },
        ...(address.state ? [{ label: 'State / Region', value: address.state }] : []),
        ...(address.postal_code ? [{ label: 'Postal code', value: address.postal_code }] : []),
        ...(address.country ? [{ label: 'Country', value: address.country }] : []),
    ];
    return (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {rows.map(({ label, value }) => (
                <div key={label}>
                    <dt className={labelClassName}>{label}</dt>
                    <dd className={`${valueClassName} mt-0.5`}>{value}</dd>
                </div>
            ))}
        </dl>
    );
}

export default function Profile() {
    const { name, logo, profile, flash, auth, addresses = [] } = usePage().props as {
        name: string;
        logo: string | null;
        profile?: ProfileData;
        flash?: { success?: string };
        auth?: { user?: { name: string; email: string } | null };
        addresses?: SavedAddress[];
    };
    const user = profile ?? (auth?.user ? { name: auth.user.name, email: auth.user.email, phone: '', address: '' } : null);
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeTab, setActiveTab] = useState<'account' | 'addresses'>('account');
    const [addressModal, setAddressModal] = useState<{ open: boolean; editing: SavedAddress | null }>({ open: false, editing: null });
    const { data, setData, put, processing, errors } = useForm({
        name: user?.name ?? '',
        phone: user?.phone ?? '',
        address: user?.address ?? '',
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        put('/profile', { onSuccess: () => setIsEditing(false) });
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const addressForm = useForm({
        label: '',
        line_1: '',
        line_2: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'UAE',
        is_default: false,
    });

    const openAddAddress = () => {
        addressForm.reset();
        setAddressModal({ open: true, editing: null });
    };
    const openEditAddress = (a: SavedAddress) => {
        addressForm.setData({
            label: a.label,
            line_1: a.line_1,
            line_2: a.line_2 ?? '',
            city: a.city,
            state: a.state ?? '',
            postal_code: a.postal_code ?? '',
            country: a.country,
            is_default: a.is_default,
        });
        setAddressModal({ open: true, editing: a });
    };
    const closeAddressModal = () => setAddressModal({ open: false, editing: null });
    const submitAddress = (e: React.FormEvent) => {
        e.preventDefault();
        if (addressModal.editing) {
            addressForm.put(`/profile/addresses/${addressModal.editing.id}`, { onSuccess: closeAddressModal });
        } else {
            addressForm.post('/profile/addresses', { onSuccess: closeAddressModal });
        }
    };
    const deleteAddress = (a: SavedAddress) => {
        if (!confirm(`Delete "${a.label}"?`)) return;
        router.delete(`/profile/addresses/${a.id}`);
    };
    const setDefaultAddress = (a: SavedAddress) => {
        router.post(`/profile/addresses/${a.id}/default`);
    };

    const displayName = user?.name ?? data.name;
    const displayEmail = user?.email ?? '';
    const displayPhone = isEditing ? data.phone : (user?.phone || data.phone);

    const primaryAddress = addresses.length > 0 ? (addresses.find((a) => a.is_default) ?? addresses[0]) : null;

    if (!user) {
        return null;
    }

    return (
        <div className="landing-theme min-h-screen overflow-x-hidden bg-[var(--landing-bg)] font-sans text-[var(--landing-text)] selection:bg-[var(--landing-accent)] selection:text-white flex flex-col">
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

            <header className="relative z-50 flex h-14 sm:h-20 items-center justify-between px-4 sm:px-6 lg:px-12 border-b border-black/5 bg-white/30 backdrop-blur-md">
                <Link href="/" className="flex items-center gap-2 transition-opacity active:opacity-80 touch-target py-2 -my-2 shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-full px-3 bg-white/60">
                    <Logo logo={logo} name={name} iconClassName="text-neutral-900" />
                    <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
                        {name}
                    </span>
                </Link>
                <div className="flex items-center gap-2 sm:gap-4">
                    <Link href="/profile" className="relative p-2 text-[var(--landing-accent)] transition-colors active:scale-95 touch-target flex items-center justify-center bg-white shadow-sm rounded-full">
                        <UserIcon className="h-5 w-5" />
                    </Link>
                    <Link href="/cart" className="relative p-2 text-neutral-800 hover:text-[var(--landing-accent)] transition-colors active:scale-95 touch-target flex items-center justify-center bg-white shadow-sm rounded-full">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute top-0 right-0 h-4 w-4 bg-[var(--landing-accent)] text-white text-[10px] font-bold flex items-center justify-center rounded-full transform translate-x-1/4 -translate-y-1/4 shadow-sm border border-white">2</span>
                    </Link>
                </div>
            </header>

            <main className="relative z-10 pt-8 sm:pt-16 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors uppercase tracking-widest active:scale-95 touch-target mb-6 border border-black/5 bg-white/60 backdrop-blur-md rounded-full px-4 py-2 shadow-sm">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Shop
                        </Link>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-neutral-900">My Profile</h1>
                    </div>
                </div>
                
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
                    {/* Sidebar / Profile Summary */}
                    <div className="w-full lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-4 sm:gap-6">
                        <div className="rounded-2xl sm:rounded-[2.5rem] bg-white/70 backdrop-blur-3xl border border-white shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-6 sm:p-8 relative overflow-hidden">
                            <div className="absolute -top-[50%] -left-[50%] w-[150%] h-[150%] bg-gradient-to-br from-white via-white/40 to-transparent -z-10 pointer-events-none transform -rotate-12" />
                            
                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="relative mb-4 group touch-target">
                                    <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-neutral-100 border-4 border-white shadow-md flex items-center justify-center text-[var(--landing-accent)] overflow-hidden">
                                        <UserIcon className="h-10 w-10 sm:h-12 sm:w-12" />
                                    </div>
                                    <button 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute bottom-0 right-0 h-8 w-8 sm:h-10 sm:w-10 bg-white rounded-full shadow-lg border border-neutral-100 flex items-center justify-center text-[var(--landing-accent)] hover:bg-neutral-50 transition-colors active:scale-95 group-hover:scale-110 duration-200"
                                    >
                                        <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </button>
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                // In a real app we'd upload this file or read it as a data URL
                                                alert("Profile picture selected: " + e.target.files[0].name);
                                            }
                                        }}
                                    />
                                </div>
                                <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-1">{displayName}</h2>
                                <p className="text-sm font-medium text-neutral-500">{displayEmail}</p>
                            </div>
                        </div>

                        <div className="rounded-2xl sm:rounded-[2rem] bg-white/70 backdrop-blur-3xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.02)] p-4 sm:p-6 flex flex-col gap-2">
                            <button 
                                onClick={() => setActiveTab('account')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all touch-target ${activeTab === 'account' ? 'bg-[var(--landing-accent)] text-white shadow-md' : 'hover:bg-white/60 text-neutral-600'}`}
                            >
                                <UserIcon className="h-4 w-4" />
                                Account Details
                            </button>
                            <button 
                                onClick={() => setActiveTab('addresses')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all touch-target ${activeTab === 'addresses' ? 'bg-[var(--landing-accent)] text-white shadow-md' : 'hover:bg-white/60 text-neutral-600'}`}
                            >
                                <MapPin className="h-4 w-4" />
                                Saved Addresses
                            </button>
                            <div className="h-px bg-black/5 my-2"></div>
                            <button type="button" onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 font-bold text-sm transition-all touch-target w-full text-left">
                                <LogOut className="h-4 w-4 shrink-0" />
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full lg:col-span-8 flex flex-col gap-6 sm:gap-8">
                        {activeTab === 'account' ? (
                            <form onSubmit={handleSave} className="rounded-2xl sm:rounded-[2.5rem] bg-white/70 backdrop-blur-3xl border border-white shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-6 sm:p-10 relative overflow-hidden">
                                {flash?.success && (
                                    <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">
                                        {flash.success}
                                    </div>
                                )}
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-serif font-bold text-neutral-900">Personal Information</h2>
                                    {!isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                            className="text-[var(--landing-accent)] hover:text-neutral-900 text-xs font-bold tracking-widest uppercase transition-colors touch-target py-2"
                                        >
                                            Edit Details
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 w-full">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Full Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="bg-white/80 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--landing-accent)]/20 focus:border-[var(--landing-accent)] w-full text-neutral-900 font-medium transition-shadow"
                                            />
                                        ) : (
                                            <p className="text-base font-medium text-neutral-900 px-1 py-3 border border-transparent">{displayName}</p>
                                        )}
                                        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Email Address</label>
                                        <p className="text-base font-medium text-neutral-900 px-1 py-3 border border-transparent">{displayEmail}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Phone Number</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="bg-white/80 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--landing-accent)]/20 focus:border-[var(--landing-accent)] w-full text-neutral-900 font-medium transition-shadow"
                                            />
                                        ) : (
                                            <p className="text-base font-medium text-neutral-900 px-1 py-3 border border-transparent">{displayPhone || '—'}</p>
                                        )}
                                        {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Primary Address</label>
                                        {primaryAddress ? (
                                            <div className="bg-white/40 border border-black/5 rounded-2xl p-6 relative overflow-hidden">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div className="min-w-0 flex-1">
                                                        {primaryAddress.label && <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">{primaryAddress.label}</p>}
                                                        <AddressWithLabels address={primaryAddress} />
                                                    </div>
                                                    <div className="flex gap-2 shrink-0">
                                                        <button type="button" onClick={() => openEditAddress(primaryAddress)} className="text-xs font-bold tracking-widest uppercase text-[var(--landing-accent)] hover:text-neutral-900 transition-colors">Edit</button>
                                                        <button type="button" onClick={() => setActiveTab('addresses')} className="text-xs font-bold tracking-widest uppercase text-neutral-400 hover:text-neutral-900 transition-colors">Manage addresses</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-white/60 border border-neutral-200 rounded-2xl p-6">
                                                <p className="text-sm text-neutral-500 mb-4">No address saved. Add one to use at checkout.</p>
                                                <button type="button" onClick={openAddAddress} className="text-[var(--landing-accent)] hover:text-neutral-900 text-xs font-bold tracking-widest uppercase transition-colors touch-target py-2 flex items-center gap-1">
                                                    <span className="text-lg leading-none">+</span> Add New
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="mt-10 flex gap-4 w-full sm:w-auto">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="flex-1 sm:flex-none bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200 rounded-xl px-8 h-12 text-xs font-bold tracking-widest uppercase transition-all touch-target active:scale-[0.98]"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1 sm:flex-none relative z-10 bg-[var(--landing-accent)] hover:bg-[var(--landing-accent-hover)] text-white border border-transparent rounded-xl px-8 h-12 text-xs font-bold tracking-widest uppercase transition-all shadow-md touch-target active:scale-[0.98] disabled:opacity-70"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </form>
                        ) : (
                            <div className="rounded-2xl sm:rounded-[2.5rem] bg-white/70 backdrop-blur-3xl border border-white shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-6 sm:p-10 relative overflow-hidden">
                                {flash?.success && (
                                    <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">
                                        {flash.success}
                                    </div>
                                )}
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-serif font-bold text-neutral-900">Saved Addresses</h2>
                                    <button type="button" onClick={openAddAddress} className="text-[var(--landing-accent)] hover:text-neutral-900 text-xs font-bold tracking-widest uppercase transition-colors touch-target py-2 flex items-center gap-1">
                                        <span className="text-lg leading-none">+</span> Add New
                                    </button>
                                </div>
                                <div className="flex flex-col gap-4 relative z-10 w-full">
                                    {addresses.length === 0 ? (
                                        <p className="text-sm text-neutral-500 py-8 text-center">No saved addresses. Add one to use at checkout.</p>
                                    ) : (
                                        addresses.map((a) => (
                                            <div key={a.id} className={`rounded-2xl p-6 relative overflow-hidden shadow-sm ${a.is_default ? 'bg-white/60 border-2 border-[var(--landing-accent)]/20' : 'bg-white/40 border border-black/5 hover:border-black/10 transition-colors'}`}>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-bold text-neutral-900">{a.label}</h3>
                                                        {a.is_default && <span className="bg-[var(--landing-accent)]/10 text-[var(--landing-accent)] text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Default</span>}
                                                    </div>
                                                    <div className="flex gap-3">
                                                        {!a.is_default && (
                                                            <button type="button" onClick={() => setDefaultAddress(a)} className="text-xs font-bold tracking-widest uppercase text-neutral-400 hover:text-[var(--landing-accent)] transition-colors">Set default</button>
                                                        )}
                                                        <button type="button" onClick={() => openEditAddress(a)} className="text-xs font-bold tracking-widest uppercase text-neutral-400 hover:text-[var(--landing-accent)] transition-colors">Edit</button>
                                                        <button type="button" onClick={() => deleteAddress(a)} className="text-xs font-bold tracking-widest uppercase text-neutral-400 hover:text-red-500 transition-colors">Delete</button>
                                                    </div>
                                                </div>
                                                <AddressWithLabels address={a} />
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {addressModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={closeAddressModal}>
                    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-bold text-neutral-900 mb-6">{addressModal.editing ? 'Edit address' : 'Add address'}</h3>
                        <form onSubmit={submitAddress} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Label (e.g. Home, Office)</label>
                                <input type="text" value={addressForm.data.label} onChange={(e) => addressForm.setData('label', e.target.value)} className="block w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:ring-2 focus:ring-[var(--landing-accent)]/20 focus:border-[var(--landing-accent)]" required />
                                {addressForm.errors.label && <p className="text-sm text-red-600 mt-1">{addressForm.errors.label}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Address line 1</label>
                                <input type="text" value={addressForm.data.line_1} onChange={(e) => addressForm.setData('line_1', e.target.value)} className="block w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:ring-2 focus:ring-[var(--landing-accent)]/20 focus:border-[var(--landing-accent)]" required />
                                {addressForm.errors.line_1 && <p className="text-sm text-red-600 mt-1">{addressForm.errors.line_1}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Address line 2 (optional)</label>
                                <input type="text" value={addressForm.data.line_2} onChange={(e) => addressForm.setData('line_2', e.target.value)} className="block w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:ring-2 focus:ring-[var(--landing-accent)]/20 focus:border-[var(--landing-accent)]" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">City</label>
                                    <input type="text" value={addressForm.data.city} onChange={(e) => addressForm.setData('city', e.target.value)} className="block w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:ring-2 focus:ring-[var(--landing-accent)]/20 focus:border-[var(--landing-accent)]" required />
                                    {addressForm.errors.city && <p className="text-sm text-red-600 mt-1">{addressForm.errors.city}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">State / Region</label>
                                    <input type="text" value={addressForm.data.state} onChange={(e) => addressForm.setData('state', e.target.value)} className="block w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:ring-2 focus:ring-[var(--landing-accent)]/20 focus:border-[var(--landing-accent)]" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Postal code</label>
                                    <input type="text" value={addressForm.data.postal_code} onChange={(e) => addressForm.setData('postal_code', e.target.value)} className="block w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:ring-2 focus:ring-[var(--landing-accent)]/20 focus:border-[var(--landing-accent)]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1">Country</label>
                                    <input type="text" value={addressForm.data.country} onChange={(e) => addressForm.setData('country', e.target.value)} className="block w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:ring-2 focus:ring-[var(--landing-accent)]/20 focus:border-[var(--landing-accent)]" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="addr_default" checked={addressForm.data.is_default} onChange={(e) => addressForm.setData('is_default', e.target.checked)} className="rounded border-neutral-300 text-[var(--landing-accent)] focus:ring-[var(--landing-accent)]" />
                                <label htmlFor="addr_default" className="text-sm font-medium text-neutral-700">Set as default address</label>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={closeAddressModal} className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 font-bold text-sm uppercase tracking-wider">Cancel</button>
                                <button type="submit" disabled={addressForm.processing} className="flex-1 py-2.5 rounded-xl bg-[var(--landing-accent)] text-white font-bold text-sm uppercase tracking-wider disabled:opacity-70">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <footer className="relative z-10 border-t border-black/5 bg-transparent pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-12 text-center md:text-left mt-auto">
                <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
                    <div>
                        <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-2 touch-target py-2">
                            <Logo logo={logo} name={name} iconClassName="text-neutral-900" />
                            <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
                                {name}
                            </span>
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
