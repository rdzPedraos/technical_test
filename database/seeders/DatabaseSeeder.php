<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'admin',
            'is_admin' => true
        ]);

        $users = User::factory(10)->create();
        $categories = Category::all();
        foreach ($users as $user) {
            $user->categories()->sync(
                $categories->random(rand(1, 3))
            );
        }
    }
}
