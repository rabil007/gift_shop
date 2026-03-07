<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function index(): Response
    {
        $appName = Setting::get('app_name') ?? config('app.name');

        return Inertia::render('admin/settings', [
            'appName' => $appName,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'app_name' => ['required', 'string', 'max:255'],
        ]);

        Setting::set('app_name', $validated['app_name']);

        return redirect()->route('admin.settings')->with('success', 'Settings saved.');
    }
}
