import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

export default function TwoFactorShow() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Settings', href: '/settings/two-factor' }, { title: 'Two-Factor Auth', href: '/settings/two-factor' }]}>
            <SettingsLayout>
                <p className="text-muted-foreground">Manage two-factor authentication. (Placeholder)</p>
            </SettingsLayout>
        </AppLayout>
    );
}
