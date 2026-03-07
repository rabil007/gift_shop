<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $logoPath = \Illuminate\Support\Facades\Schema::hasTable('settings') ? Setting::get('logo') : null;
        $logoUrl = $logoPath ? \Illuminate\Support\Facades\Storage::disk('public')->url($logoPath) : null;
        $categories = \Illuminate\Support\Facades\Schema::hasTable('categories')
            ? Category::orderBy('sort_order')->orderBy('name')->get(['id', 'name', 'slug', 'description', 'sort_order'])
            : [];
        $quickLinks = self::sharedQuickLinks();

        return [
            ...parent::share($request),
            'name' => \Illuminate\Support\Facades\Schema::hasTable('settings')
                ? (Setting::get('app_name') ?? config('app.name'))
                : config('app.name'),
            'logo' => $logoUrl,
            'categories' => $categories,
            'quickLinks' => $quickLinks,
            'cart_count' => $this->getCartCount(),
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ];
    }

    private function getCartCount(): int
    {
        if (!\Illuminate\Support\Facades\Schema::hasTable('carts')) {
            return 0;
        }
        
        if (auth()->check()) {
            $cart = \App\Models\Cart::where('user_id', auth()->id())->first();
        } else {
            $cart = \App\Models\Cart::where('session_id', session()->getId())->first();
        }

        return $cart ? $cart->items()->sum('quantity') : 0;
    }

    private static function sharedQuickLinks(): array
    {
        if (!\Illuminate\Support\Facades\Schema::hasTable('settings')) {
            return [
                'whatsapp' => ['url' => 'https://wa.me/971501234567', 'label' => 'Chat with us'],
                'instagram' => ['url' => 'https://instagram.com/auragifts', 'label' => 'Follow us'],
                'phone' => ['number' => '+971 50 123 4567', 'label' => 'Call'],
            ];
        }
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
