import { Link, useForm, Head, usePage } from '@inertiajs/react';
import { Gift, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { name } = usePage().props as { name: string };
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="landing-theme min-h-screen bg-[var(--landing-bg)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-[var(--landing-text)] selection:bg-[var(--landing-accent)] selection:text-white relative overflow-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300;400;500;600&display=swap');
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-sans { font-family: 'Inter', sans-serif; }
            `}</style>
            <Head title="Sign Up" />
            
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.08] mix-blend-multiply z-[1]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
            <div className="absolute top-0 left-0 w-[80vw] h-[80vh] rounded-[100%] bg-gradient-to-b from-[var(--landing-accent)]/10 to-transparent blur-[80px] -z-10 pointer-events-none" />
            
            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <Link href="/" className="flex items-center justify-center gap-2 mb-6 transition-transform hover:scale-105 active:scale-95 touch-target">
                    <Gift className="h-8 w-8 text-[var(--landing-text)]" />
                    <span className="text-3xl font-bold tracking-tight text-[var(--landing-text)]">
                        {name}
                    </span>
                </Link>
                <h2 className="mt-2 text-center text-4xl sm:text-5xl font-serif text-[var(--landing-accent)] italic tracking-tight mb-2">
                    Create an account
                </h2>
                <p className="mt-2 text-center text-sm font-medium text-neutral-600">
                    Join us to explore our premium collections
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-white/80 py-8 px-4 shadow-[var(--landing-shadow)] sm:rounded-none sm:px-10 border border-black/5 backdrop-blur-md">
                    <form className="space-y-5" onSubmit={submit}>
                        <div>
                            <label htmlFor="name" className="block text-xs font-bold tracking-widest uppercase text-neutral-700">
                                Full Name
                            </label>
                            <div className="mt-2 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-4 w-4 text-neutral-400 gap-2" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`block w-full pl-10 pr-3 h-12 sm:text-sm border-b-2 border-t-0 border-x-0 bg-transparent ${errors.name ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-0 focus:border-red-500' : 'border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:ring-0 focus:border-[var(--landing-accent)] hover:border-neutral-300'} transition-colors focus:bg-white/50`}
                                    placeholder="John Doe"
                                    required
                                    autoFocus
                                    autoComplete="name"
                                />
                                {errors.name && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                    </div>
                                )}
                            </div>
                            {errors.name && (
                                <p className="mt-2 text-sm text-red-600 font-medium" id="name-error">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-xs font-bold tracking-widest uppercase text-neutral-700">
                                Email
                            </label>
                            <div className="mt-2 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-neutral-400 gap-2" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`block w-full pl-10 pr-3 h-12 sm:text-sm border-b-2 border-t-0 border-x-0 bg-transparent ${errors.email ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-0 focus:border-red-500' : 'border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:ring-0 focus:border-[var(--landing-accent)] hover:border-neutral-300'} transition-colors focus:bg-white/50`}
                                    placeholder="you@example.com"
                                    required
                                    autoComplete="username"
                                />
                                {errors.email && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                    </div>
                                )}
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600 font-medium" id="email-error">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-bold tracking-widest uppercase text-neutral-700">
                                Password
                            </label>
                            <div className="mt-2 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-neutral-400 gap-2" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`block w-full pl-10 pr-3 h-12 sm:text-sm border-b-2 border-t-0 border-x-0 bg-transparent ${errors.password ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-0 focus:border-red-500' : 'border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:ring-0 focus:border-[var(--landing-accent)] hover:border-neutral-300'} transition-colors focus:bg-white/50`}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="new-password"
                                />
                                {errors.password && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                    </div>
                                )}
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 font-medium" id="password-error">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-xs font-bold tracking-widest uppercase text-neutral-700">
                                Confirm Password
                            </label>
                            <div className="mt-2 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-neutral-400 gap-2" />
                                </div>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className={`block w-full pl-10 pr-3 h-12 sm:text-sm border-b-2 border-t-0 border-x-0 bg-transparent ${errors.password_confirmation ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-0 focus:border-red-500' : 'border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:ring-0 focus:border-[var(--landing-accent)] hover:border-neutral-300'} transition-colors focus:bg-white/50`}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="new-password"
                                />
                                {errors.password_confirmation && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                    </div>
                                )}
                            </div>
                            {errors.password_confirmation && (
                                <p className="mt-2 text-sm text-red-600 font-medium" id="password_confirmation-error">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full h-14 flex items-center justify-center bg-[var(--landing-accent)] hover:bg-[var(--landing-accent-hover)] text-white text-xs font-bold tracking-widest uppercase transition-all touch-target active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                Create Account
                            </button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-neutral-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-neutral-500 text-xs tracking-wider uppercase bg-transparent">
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                href="/login"
                                className="w-full h-14 border-2 border-neutral-200 hover:border-neutral-900 bg-transparent text-neutral-900 flex items-center justify-center text-xs font-bold tracking-widest uppercase transition-all touch-target active:scale-[0.98]"
                            >
                                Sign in instead
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Added a subtle gradient animation to make it dynamic */}
            <style>{`
                @keyframes shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </div>
    );
}
