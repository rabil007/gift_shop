<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Testimonial;
use App\Models\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function landing(): Response
    {
        $featuredItems = Item::with('category:id,name,slug')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->limit(8)
            ->get()
            ->map(fn ($item) => $this->formatItem($item));

        $heroItems = Item::with('category:id,name,slug')
            ->where('is_hero', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(fn ($item) => $this->formatItem($item));

        $testimonials = Testimonial::where('is_active', true)
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->get();

        $features = Feature::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('landing', [
            'featuredItems' => $featuredItems,
            'heroItems' => $heroItems,
            'testimonials' => $testimonials,
            'features' => $features,
        ]);
    }

    public function shop(): Response
    {
        $items = Item::with('category:id,name,slug')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get()
            ->map(fn ($item) => $this->formatItem($item));

        return Inertia::render('shop', [
            'items' => $items,
        ]);
    }

    public function item(Request $request, int $id): Response|\Illuminate\Http\RedirectResponse
    {
        $item = Item::with('category:id,name,slug')->find($id);
        if (!$item) {
            abort(404);
        }

        $related = Item::with('category:id,name,slug')
            ->where('id', '!=', $item->id)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->limit(4)
            ->get()
            ->map(fn ($i) => $this->formatItem($i));

        return Inertia::render('item', [
            'item' => $this->formatItem($item),
            'relatedItems' => $related,
        ]);
    }

    private function formatItem(Item $item): array
    {
        $image = $item->image;
        if ($image && !str_starts_with($image, 'http')) {
            $image = Storage::disk('public')->url($image);
        }
        return [
            'id' => $item->id,
            'name' => $item->name,
            'description' => $item->description,
            'price' => (float) $item->price,
            'price_formatted' => 'AED ' . number_format($item->price, 2),
            'image' => $image,
            'tag' => $item->tag,
            'category' => $item->category ? ['id' => $item->category->id, 'name' => $item->category->name, 'slug' => $item->category->slug] : null,
        ];
    }
}
