<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function index(): Response
    {
        $appName = Setting::get('app_name') ?? config('app.name');
        $logoPath = Setting::get('logo');
        $logoUrl = $logoPath ? Storage::disk('public')->url($logoPath) : null;
        $quickLinks = $this->getQuickLinks();

        return Inertia::render('admin/settings', [
            'appName' => $appName,
            'logoUrl' => $logoUrl,
            'quickLinks' => $quickLinks,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'app_name' => ['required', 'string', 'max:255'],
            'logo' => ['nullable', 'image', 'max:2048'],
            'whatsapp_url' => ['nullable', 'string', 'max:500'],
            'whatsapp_label' => ['nullable', 'string', 'max:100'],
            'instagram_url' => ['nullable', 'string', 'max:500'],
            'instagram_label' => ['nullable', 'string', 'max:100'],
            'phone_number' => ['nullable', 'string', 'max:50'],
            'phone_label' => ['nullable', 'string', 'max:100'],
        ]);

        Setting::set('app_name', $validated['app_name']);

        if ($request->hasFile('logo')) {
            $oldPath = Setting::get('logo');
            if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('logo')->store('logos', 'public');
            Setting::set('logo', $path);
        }

        $payload = [
            'whatsapp' => [
                'url' => $validated['whatsapp_url'] ?? '',
                'label' => $validated['whatsapp_label'] ?? 'Chat with us',
            ],
            'instagram' => [
                'url' => $validated['instagram_url'] ?? '',
                'label' => $validated['instagram_label'] ?? 'Follow us',
            ],
            'phone' => [
                'number' => $validated['phone_number'] ?? '',
                'label' => $validated['phone_label'] ?? 'Call',
            ],
        ];
        Setting::set('quick_links', json_encode($payload));

        return redirect()->route('admin.settings')->with('success', 'Settings saved.');
    }

    private function getQuickLinks(): array
    {
        $raw = Setting::get('quick_links');
        if (!$raw) {
            return [
                'whatsapp' => ['url' => 'https://wa.me/971501234567', 'label' => 'Chat with us'],
                'instagram' => ['url' => 'https://instagram.com/auragifts', 'label' => 'Follow us'],
                'phone' => ['number' => '+971 50 123 4567', 'label' => 'Call'],
            ];
        }
        $decoded = json_decode($raw, true);
        return [
            'whatsapp' => [
                'url' => $decoded['whatsapp']['url'] ?? 'https://wa.me/971501234567',
                'label' => $decoded['whatsapp']['label'] ?? 'Chat with us',
            ],
            'instagram' => [
                'url' => $decoded['instagram']['url'] ?? 'https://instagram.com/auragifts',
                'label' => $decoded['instagram']['label'] ?? 'Follow us',
            ],
            'phone' => [
                'number' => $decoded['phone']['number'] ?? '+971 50 123 4567',
                'label' => $decoded['phone']['label'] ?? 'Call',
            ],
        ];
    }
}
