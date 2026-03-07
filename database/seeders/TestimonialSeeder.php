<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Testimonial;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Testimonial::create([
            'name' => 'Sarah M.',
            'role' => 'Abu Dhabi',
            'quote' => 'The presentation was breathtaking. It felt like receiving a royal gift. The quality of the products is unmatched.',
            'rating' => 5,
            'is_active' => true,
        ]);

        Testimonial::create([
            'name' => 'Ahmad K.',
            'role' => 'Dubai',
            'quote' => 'Perfect for corporate gifting. The level of detail and luxury exceeded our expectations completely.',
            'rating' => 5,
            'is_active' => true,
        ]);

        Testimonial::create([
            'name' => 'Fatima R.',
            'role' => 'Sharjah',
            'quote' => 'I have never seen such beautiful packaging. The recipient was absolutely thrilled with the hamper.',
            'rating' => 5,
            'is_active' => true,
        ]);
        
        Testimonial::create([
            'name' => 'Omar H.',
            'role' => 'Ajman',
            'quote' => 'Exceptional service and exquisite gifts. They are my go-to for all special occasions now.',
            'rating' => 5,
            'is_active' => true,
        ]);
    }
}
