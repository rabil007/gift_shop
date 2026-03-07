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

        return Inertia::render('admin/settings', [
            'appName' => $appName,
            'logoUrl' => $logoUrl,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'app_name' => ['required', 'string', 'max:255'],
            'logo' => ['nullable', 'image', 'max:2048'],
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

        return redirect()->route('admin.settings')->with('success', 'Settings saved.');
    }
}
