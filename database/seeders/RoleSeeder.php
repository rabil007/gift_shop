<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $now = now();
        DB::table('roles')->updateOrInsert(
            ['id' => 1],
            ['name' => 'admin', 'created_at' => $now, 'updated_at' => $now]
        );
        DB::table('roles')->updateOrInsert(
            ['id' => 2],
            ['name' => 'customer', 'created_at' => $now, 'updated_at' => $now]
        );
    }
}
