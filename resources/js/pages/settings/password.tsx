import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

export default function PasswordEdit() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Settings', href: '/settings/password' }, { title: 'Password', href: '/settings/password' }]}>
            <SettingsLayout>
                <p className="text-muted-foreground">Update your password. (Placeholder)</p>
            </SettingsLayout>
        </AppLayout>
    );
}
