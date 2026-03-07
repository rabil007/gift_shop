<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Item;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        $hampers = Category::where('slug', 'hampers')->first();
        $flowers = Category::where('slug', 'flowers')->first();
        $cakes = Category::where('slug', 'cakes')->first();
        $personalized = Category::where('slug', 'personalized')->first();

        $items = [
            ['name' => 'The Royal Orchids', 'category_id' => $flowers?->id, 'price' => 399, 'tag' => 'Bestseller', 'image' => 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800', 'description' => 'Elegant orchid arrangement.', 'sort_order' => 1],
            ['name' => 'Signature Saffron Cake', 'category_id' => $cakes?->id, 'price' => 299, 'tag' => 'New', 'image' => 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800', 'description' => 'Premium saffron-infused cake.', 'sort_order' => 2],
            ['name' => 'Desert Rose Arrangement', 'category_id' => $flowers?->id, 'price' => 189, 'image' => 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800', 'description' => 'Desert rose floral arrangement.', 'sort_order' => 3],
            ['name' => 'Luxury Date Collection', 'category_id' => $hampers?->id, 'price' => 449, 'tag' => 'Limited', 'image' => 'https://images.unsplash.com/photo-1609501676725-7186f017a4b0?w=800', 'description' => 'Premium dates in elegant packaging.', 'sort_order' => 4],
            ['name' => 'Oud & Amber Gift Set', 'category_id' => $personalized?->id, 'price' => 249, 'image' => 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800', 'description' => 'Luxury fragrance gift set.', 'sort_order' => 5],
            ['name' => 'Vanilla Bean Blanc', 'category_id' => $cakes?->id, 'price' => 229, 'image' => 'https://images.unsplash.com/photo-1563729784474-3e0d2e5c3b3e?w=800', 'description' => 'Vanilla bean white cake.', 'sort_order' => 6],
            ['name' => 'The Platinum Hamper', 'category_id' => $hampers?->id, 'price' => 899, 'tag' => 'Premium', 'image' => 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800', 'description' => 'Premium curated hamper.', 'sort_order' => 7],
            ['name' => 'Opulent Peonies', 'category_id' => $flowers?->id, 'price' => 499, 'image' => 'https://images.unsplash.com/photo-1576402830856-12c80145c3b1?w=800', 'description' => 'Luxury peony bouquet.', 'sort_order' => 8],
        ];

        foreach ($items as $data) {
            Item::updateOrCreate(
                ['name' => $data['name']],
                $data
            );
        }
    }
}
