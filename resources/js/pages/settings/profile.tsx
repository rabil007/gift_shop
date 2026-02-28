import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

export default function ProfileEdit() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Settings', href: '/settings/profile' }, { title: 'Profile', href: '/settings/profile' }]}>
            <SettingsLayout>
                <p className="text-muted-foreground">Manage your profile. (Placeholder)</p>
            </SettingsLayout>
        </AppLayout>
    );
}
