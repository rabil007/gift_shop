import { Gift } from 'lucide-react';

interface LogoProps {
    logo: string | null;
    name: string;
    className?: string;
    iconClassName?: string;
}

export function Logo({ logo, name, className = 'h-10 w-auto shrink-0 sm:h-11', iconClassName = 'text-neutral-900' }: LogoProps) {
    if (logo) {
        return (
            <img
                src={logo}
                alt={name}
                className={`${className} w-auto object-contain`}
            />
        );
    }
    return <Gift className={`${className} ${iconClassName}`} />;
}
