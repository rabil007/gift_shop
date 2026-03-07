import { useState, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ShoppingCart, ArrowLeft, Package, User as UserIcon, LogOut, MapPin, Phone, Mail, Camera } from 'lucide-react';
import { Logo } from '@/components/Logo';

export default function Profile() {
    const { name, logo } = usePage().props as { name: string, logo: string | null };
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [activeTab, setActiveTab] = useState<'account' | 'addresses'>('account');
    const [userDetails, setUserDetails] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+971 50 123 4567',
        address: 'Dubai Marina, Tower A\nApartment 402\nDubai, UAE'
    });

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically make an API call to save the user details
    };

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
                                <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-1">{userDetails.name}</h2>
                                <p className="text-sm font-medium text-neutral-500">{userDetails.email}</p>
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
                            <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 font-bold text-sm transition-all touch-target">
                                <LogOut className="h-4 w-4 shrink-0" />
                                Sign Out
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full lg:col-span-8 flex flex-col gap-6 sm:gap-8">
                        {activeTab === 'account' ? (
                            <div className="rounded-2xl sm:rounded-[2.5rem] bg-white/70 backdrop-blur-3xl border border-white shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-6 sm:p-10 relative overflow-hidden">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-serif font-bold text-neutral-900">Personal Information</h2>
                                    {!isEditing && (
                                        <button 
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
                                                value={userDetails.name}
                                                onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                                                className="bg-white/80 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--landing-accent)]/20 focus:border-[var(--landing-accent)] w-full text-neutral-900 font-medium transition-shadow"
                                            />
                                        ) : (
                                            <p className="text-base font-medium text-neutral-900 px-1 py-3 border border-transparent">{userDetails.name}</p>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Email Address</label>
                                        {isEditing ? (
                                            <input 
                                                type="email" 
                                                value={userDetails.email}
                                                onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                                                className="bg-white/80 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--landing-accent)]/20 focus:border-[var(--landing-accent)] w-full text-neutral-900 font-medium transition-shadow"
                                            />
                                        ) : (
                                            <p className="text-base font-medium text-neutral-900 px-1 py-3 border border-transparent">{userDetails.email}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Phone Number</label>
                                        {isEditing ? (
                                            <div className="flex">
                                                <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-neutral-200 bg-neutral-50 text-neutral-500 font-medium text-sm">
                                                    UAE
                                                </span>
                                                <input 
                                                    type="tel" 
                                                    value={userDetails.phone}
                                                    onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                                                    className="bg-white/80 border border-neutral-200 rounded-r-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--landing-accent)]/20 focus:border-[var(--landing-accent)] w-full text-neutral-900 font-medium transition-shadow"
                                                />
                                            </div>
                                        ) : (
                                            <p className="text-base font-medium text-neutral-900 px-1 py-3 border border-transparent">{userDetails.phone}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Primary Address</label>
                                        {isEditing ? (
                                            <textarea 
                                                value={userDetails.address}
                                                onChange={(e) => setUserDetails({...userDetails, address: e.target.value})}
                                                rows={3}
                                                className="bg-white/80 border border-neutral-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--landing-accent)]/20 focus:border-[var(--landing-accent)] w-full text-neutral-900 font-medium resize-none transition-shadow"
                                            />
                                        ) : (
                                            <div className="bg-white/40 border border-black/5 rounded-2xl p-6 relative group overflow-hidden">
                                                <p className="whitespace-pre-line text-sm text-neutral-600 leading-relaxed font-medium">
                                                    {userDetails.address}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="mt-10 flex gap-4 w-full sm:w-auto">
                                        <button 
                                            onClick={() => setIsEditing(false)}
                                            className="flex-1 sm:flex-none bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200 rounded-xl px-8 h-12 text-xs font-bold tracking-widest uppercase transition-all touch-target active:scale-[0.98]"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            onClick={handleSave}
                                            className="flex-1 sm:flex-none relative z-10 bg-[var(--landing-accent)] hover:bg-[var(--landing-accent-hover)] text-white border border-transparent rounded-xl px-8 h-12 text-xs font-bold tracking-widest uppercase transition-all shadow-md touch-target active:scale-[0.98]"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="rounded-2xl sm:rounded-[2.5rem] bg-white/70 backdrop-blur-3xl border border-white shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-6 sm:p-10 relative overflow-hidden">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-serif font-bold text-neutral-900">Saved Addresses</h2>
                                    <button className="text-[var(--landing-accent)] hover:text-neutral-900 text-xs font-bold tracking-widest uppercase transition-colors touch-target py-2 flex items-center gap-1">
                                        <span className="text-lg leading-none">+</span> Add New
                                    </button>
                                </div>
                                <div className="flex flex-col gap-4 relative z-10 w-full">
                                    <div className="bg-white/60 border-2 border-[var(--landing-accent)]/20 rounded-2xl p-6 relative group overflow-hidden shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-neutral-900">Home</h3>
                                                <span className="bg-[var(--landing-accent)]/10 text-[var(--landing-accent)] text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Default</span>
                                            </div>
                                            <div className="flex gap-3">
                                                <button className="text-xs font-bold tracking-widest uppercase text-neutral-400 hover:text-[var(--landing-accent)] transition-colors">Edit</button>
                                                <button className="text-xs font-bold tracking-widest uppercase text-neutral-400 hover:text-red-500 transition-colors">Delete</button>
                                            </div>
                                        </div>
                                        <p className="whitespace-pre-line text-sm text-neutral-600 leading-relaxed font-medium">
                                            Dubai Marina, Tower A{'\n'}Apartment 402{'\n'}Dubai, UAE
                                        </p>
                                    </div>
                                    <div className="bg-white/40 border border-black/5 hover:border-black/10 transition-colors rounded-2xl p-6 relative group overflow-hidden">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-neutral-900">Office</h3>
                                            </div>
                                            <div className="flex gap-3">
                                                <button className="text-xs font-bold tracking-widest uppercase text-neutral-400 hover:text-[var(--landing-accent)] transition-colors">Edit</button>
                                                <button className="text-xs font-bold tracking-widest uppercase text-neutral-400 hover:text-red-500 transition-colors">Delete</button>
                                            </div>
                                        </div>
                                        <p className="whitespace-pre-line text-sm text-neutral-600 leading-relaxed font-medium">
                                            Downtown Dubai, Boulevard Plaza{'\n'}Tower 1, Level 14{'\n'}Dubai, UAE
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

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
