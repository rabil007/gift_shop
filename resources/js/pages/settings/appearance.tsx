import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

export default function AppearanceEdit() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Settings', href: '/settings/appearance' }, { title: 'Appearance', href: '/settings/appearance' }]}>
            <SettingsLayout>
                <p className="text-muted-foreground">Customize appearance. (Placeholder)</p>
            </SettingsLayout>
        </AppLayout>
    );
}
