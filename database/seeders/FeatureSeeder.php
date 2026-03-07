<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Feature;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $features = [
            ['title' => 'Priority Delivery', 'description' => 'Abu Dhabi & Dubai covered with care. Your gift arrives on time, every time.', 'icon' => 'Clock', 'sort_order' => 1],
            ['title' => 'Same Day Concierge', 'description' => "Order before 4 PM for same-day hand delivery. We handle the details so you don't have to.", 'icon' => 'Truck', 'sort_order' => 2],
            ['title' => 'Impeccable Sourcing', 'description' => 'Premium materials sourced globally. Every piece meets our exacting standards.', 'icon' => 'Sparkles', 'sort_order' => 3],
            ['title' => 'White-Glove Service', 'description' => 'From curation to packaging and delivery—every detail handled with care.', 'icon' => 'ShieldCheck', 'sort_order' => 4],
        ];

        foreach ($features as $feature) {
            Feature::create($feature);
        }
    }
}
