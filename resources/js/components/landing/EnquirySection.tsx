import { ChevronRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { WhatsAppIcon, InstagramIcon } from './icons';

type EnquiryForm = {
    data: { name: string; email: string; subject: string; message: string };
    setData: (key: string, value: string) => void;
    post: (url: string, options?: { preserveScroll?: boolean, onSuccess?: () => void }) => void;
    processing: boolean;
    errors: Record<string, string | undefined>;
    reset: (...fields: string[]) => void;
};

type Props = {
    flashSuccess?: string;
    form: EnquiryForm;
};

const defaultQuickLinks = {
    whatsapp: { url: 'https://wa.me/971501234567', label: 'Chat with us' },
    instagram: { url: 'https://instagram.com/auragifts', label: 'Follow us' },
    phone: { number: '+971 50 123 4567', label: 'Call' },
};

export function EnquirySection({ flashSuccess, form }: Props) {
    const { quickLinks: q } = usePage().props as {
        quickLinks?: { whatsapp: { url: string; label: string }; instagram: { url: string; label: string }; phone: { number: string; label: string } };
    };
    const quickLinks = q ?? defaultQuickLinks;

    return (
        <section className="mt-20 sm:mt-24 md:mt-32 px-4 sm:px-6 max-w-6xl mx-auto">
            <div className="rounded-2xl sm:rounded-[2.5rem] bg-white/60 backdrop-blur-3xl border border-white shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-6 sm:p-10 md:p-16 relative overflow-hidden">
                <div className="absolute -top-[50%] -left-[50%] w-[150%] h-[150%] bg-gradient-to-br from-white via-white/40 to-transparent -z-10 pointer-events-none transform -rotate-12" />
                <div className="mb-8 sm:mb-10">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="h-px w-6 sm:w-8 bg-[var(--landing-accent)]" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--landing-accent)]">Get in touch</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-neutral-900 mb-2">Enquiry</h2>
                    <p className="text-base sm:text-lg text-neutral-600 font-medium max-w-xl">
                        Share your requirements and we'll get back to you.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">
                    <div className="min-w-0">
                        {flashSuccess ? (
                            <div className="flex flex-col items-center justify-center text-center py-12 sm:py-20 h-full bg-white/40 backdrop-blur-sm rounded-3xl border border-white animate-in fade-in zoom-in duration-700">
                                <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-sm ring-8 ring-emerald-50 mb-8">
                                    <svg className="h-10 w-10 text-emerald-500 animate-[bounce_2s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-neutral-900 mb-3">Received!</h3>
                                <p className="text-neutral-600 font-medium max-w-sm text-base leading-relaxed">
                                    {flashSuccess}
                                </p>
                            </div>
                        ) : (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    form.post('/enquiry', { preserveScroll: true, onSuccess: () => form.reset() });
                                }}
                                className="space-y-5 sm:space-y-6"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="enquiry-name" className="text-sm font-bold text-neutral-900">Name</Label>
                                    <Input
                                        id="enquiry-name"
                                        type="text"
                                        name="name"
                                        value={form.data.name}
                                        onChange={(e) => form.setData('name', e.target.value)}
                                        placeholder="Your name"
                                        className="rounded-2xl border-white bg-white/70 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border focus-visible:border-[var(--landing-accent)] focus-visible:ring-[var(--landing-accent)]/30 focus-visible:ring-[3px] placeholder:text-neutral-400 min-h-[48px] h-12 px-4 text-base"
                                    />
                                    <InputError message={form.errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="enquiry-email" className="text-sm font-bold text-neutral-900">Email</Label>
                                    <Input
                                        id="enquiry-email"
                                        type="email"
                                        name="email"
                                        value={form.data.email}
                                        onChange={(e) => form.setData('email', e.target.value)}
                                        placeholder="you@example.com"
                                        className="rounded-2xl border-white bg-white/70 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border focus-visible:border-[var(--landing-accent)] focus-visible:ring-[var(--landing-accent)]/30 focus-visible:ring-[3px] placeholder:text-neutral-400 min-h-[48px] h-12 px-4 text-base"
                                    />
                                    <InputError message={form.errors.email} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="enquiry-subject" className="text-sm font-bold text-neutral-900">Subject</Label>
                                    <Input
                                        id="enquiry-subject"
                                        type="text"
                                        name="subject"
                                        value={form.data.subject}
                                        onChange={(e) => form.setData('subject', e.target.value)}
                                        placeholder="What is this regarding?"
                                        className="rounded-2xl border-white bg-white/70 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border focus-visible:border-[var(--landing-accent)] focus-visible:ring-[var(--landing-accent)]/30 focus-visible:ring-[3px] placeholder:text-neutral-400 min-h-[48px] h-12 px-4 text-base"
                                    />
                                    <InputError message={form.errors.subject} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="enquiry-message" className="text-sm font-bold text-neutral-900">Message</Label>
                                    <textarea
                                        id="enquiry-message"
                                        name="message"
                                        rows={4}
                                        value={form.data.message}
                                        onChange={(e) => form.setData('message', e.target.value)}
                                        placeholder="Tell us more..."
                                        className={cn(
                                            'w-full min-h-[120px] rounded-2xl border border-white bg-white/70 backdrop-blur-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] px-4 py-3 text-base transition-[color,box-shadow] outline-none placeholder:text-neutral-400 resize-y',
                                            'focus-visible:border-[var(--landing-accent)] focus-visible:ring-[var(--landing-accent)]/30 focus-visible:ring-[3px]',
                                            'aria-invalid:ring-destructive/20 aria-invalid:border-destructive'
                                        )}
                                    />
                                    <InputError message={form.errors.message} />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                    className="bg-[var(--landing-accent)] hover:bg-[var(--landing-accent-hover)] text-white rounded-none px-6 sm:px-8 min-h-[48px] h-12 text-xs font-bold tracking-widest uppercase transition-all touch-target active:scale-[0.98]"
                                >
                                    {form.processing ? 'Sending…' : 'Send enquiry'}
                                </Button>
                            </form>
                        )}
                    </div>
                    <div className="lg:pl-4 border-t border-neutral-200/60 pt-8 sm:pt-10 lg:border-t-0 lg:pt-0 lg:border-l lg:border-l-neutral-200/60 lg:pl-16">
                        <p className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 mb-4 sm:mb-6">Quick links</p>
                        <div className="flex flex-col gap-3 sm:gap-4">
                            {quickLinks.whatsapp.url && (
                                <a
                                    href={quickLinks.whatsapp.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] active:scale-[0.99] group min-h-[56px] touch-target"
                                >
                                    <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                                        <WhatsAppIcon className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-neutral-900">WhatsApp</p>
                                        <p className="text-sm text-neutral-500">{quickLinks.whatsapp.label}</p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-[var(--landing-accent)] ml-auto transition-colors" />
                                </a>
                            )}
                            {quickLinks.instagram.url && (
                                <a
                                    href={quickLinks.instagram.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] active:scale-[0.99] group min-h-[56px] touch-target"
                                >
                                    <div className="h-12 w-12 rounded-full bg-pink-500/10 flex items-center justify-center shrink-0 group-hover:bg-pink-500/20 transition-colors">
                                        <InstagramIcon className="h-6 w-6 text-pink-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-neutral-900">Instagram</p>
                                        <p className="text-sm text-neutral-500">{quickLinks.instagram.label}</p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-[var(--landing-accent)] ml-auto transition-colors" />
                                </a>
                            )}
                            {quickLinks.phone.number && (
                                <a
                                    href={`tel:${quickLinks.phone.number.replace(/\s/g, '')}`}
                                    className="flex items-center gap-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] p-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] active:scale-[0.99] group min-h-[56px] touch-target"
                                >
                                    <div className="h-12 w-12 rounded-full bg-[var(--landing-accent)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--landing-accent)]/20 transition-colors">
                                        <Phone className="h-6 w-6 text-[var(--landing-accent)]" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-neutral-900">{quickLinks.phone.label}</p>
                                        <p className="text-sm text-neutral-500">{quickLinks.phone.number}</p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-[var(--landing-accent)] ml-auto transition-colors" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
