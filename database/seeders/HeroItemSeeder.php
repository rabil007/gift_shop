<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Seeder;

class HeroItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // First 3 items get the hero tag to match previous static view
        Item::orderBy('id')->limit(3)->update(['is_hero' => true]);
    }
}
