<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'bvoryadmin@gmail.com'],
            [
                'name' => 'Admin',
                'password' => 'bvoryadmin@2255',
                'role_id' => Role::ADMIN_ID,
            ]
        );
    }
}
