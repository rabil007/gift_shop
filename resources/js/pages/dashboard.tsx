import AppLayout from '@/layouts/app-layout';

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
            <div className="p-6">
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                <p className="mt-2 text-muted-foreground">Welcome back.</p>
            </div>
        </AppLayout>
    );
}
