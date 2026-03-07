<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Hampers', 'slug' => 'hampers', 'description' => 'Curated gift hampers', 'sort_order' => 1],
            ['name' => 'Flowers', 'slug' => 'flowers', 'description' => 'Fresh floral arrangements', 'sort_order' => 2],
            ['name' => 'Cakes', 'slug' => 'cakes', 'description' => 'Premium cakes & patisserie', 'sort_order' => 3],
            ['name' => 'Personalized', 'slug' => 'personalized', 'description' => 'Personalized photo gifts', 'sort_order' => 4],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(
                ['slug' => $cat['slug']],
                $cat
            );
        }
    }
}
