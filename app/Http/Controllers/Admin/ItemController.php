<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ItemController extends Controller
{
    public function index(): Response
    {
        $items = Item::with('category:id,name,slug')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/items/index', [
            'items' => $items->map(fn (Item $item) => [
                'id' => $item->id,
                'name' => $item->name,
                'description' => $item->description,
                'price' => $item->price,
                'image' => $this->imageUrl($item),
                'tag' => $item->tag,
                'is_hero' => $item->is_hero,
                'sort_order' => $item->sort_order,
                'category' => $item->category ? ['id' => $item->category->id, 'name' => $item->category->name, 'slug' => $item->category->slug] : null,
            ]),
        ]);
    }

    public function create(): Response
    {
        $categories = Category::orderBy('sort_order')->orderBy('name')->get(['id', 'name', 'slug']);

        return Inertia::render('admin/items/form', [
            'item' => null,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'description' => ['nullable', 'string', 'max:5000'],
            'price' => ['required', 'numeric', 'min:0'],
            'image' => ['nullable', 'image', 'max:2048'],
            'tag' => ['nullable', 'string', 'max:50'],
            'is_hero' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $validated['is_hero'] = $validated['is_hero'] ?? false;
        $validated['sort_order'] = $validated['sort_order'] ?? 0;
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('items', 'public');
        } else {
            $validated['image'] = null;
        }
        Item::create($validated);

        return redirect()->route('admin.items.index')->with('success', 'Item created.');
    }

    public function edit(Item $item): Response
    {
        $item->load('category:id,name,slug');
        $categories = Category::orderBy('sort_order')->orderBy('name')->get(['id', 'name', 'slug']);

        return Inertia::render('admin/items/form', [
            'item' => [
                'id' => $item->id,
                'name' => $item->name,
                'category_id' => $item->category_id,
                'description' => $item->description,
                'price' => $item->price,
                'image' => $this->imageUrl($item),
                'tag' => $item->tag,
                'is_hero' => $item->is_hero,
                'sort_order' => $item->sort_order,
            ],
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Item $item): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'description' => ['nullable', 'string', 'max:5000'],
            'price' => ['required', 'numeric', 'min:0'],
            'image' => ['nullable', 'image', 'max:2048'],
            'tag' => ['nullable', 'string', 'max:50'],
            'is_hero' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $validated['is_hero'] = $validated['is_hero'] ?? false;
        $validated['sort_order'] = $validated['sort_order'] ?? 0;
        if ($request->hasFile('image')) {
            if ($item->image && Storage::disk('public')->exists($item->image)) {
                Storage::disk('public')->delete($item->image);
            }
            $validated['image'] = $request->file('image')->store('items', 'public');
        } else {
            unset($validated['image']);
        }
        $item->update($validated);

        return redirect()->route('admin.items.index')->with('success', 'Item updated.');
    }

    public function destroy(Item $item): RedirectResponse
    {
        if ($item->image && Storage::disk('public')->exists($item->image)) {
            Storage::disk('public')->delete($item->image);
        }
        $item->delete();

        return redirect()->route('admin.items.index')->with('success', 'Item deleted.');
    }

    private function imageUrl(Item $item): ?string
    {
        if (!$item->image) {
            return null;
        }
        if (str_starts_with($item->image, 'http')) {
            return $item->image;
        }
        return Storage::disk('public')->url($item->image);
    }
}
