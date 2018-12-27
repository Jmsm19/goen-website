<?php

use App\Clan;
use Illuminate\Database\Seeder;

class ClanTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Clan::create([
            'name' => 'Kani',
            'picture' => 'Kani picture'
        ]);

        Clan::create([
            'name' => 'Saru',
            'picture' => 'Saru picture'
        ]);

        Clan::create([
            'name' => 'Kotori',
            'picture' => 'Kotori picture'
        ]);

        Clan::create([
            'name' => 'Buta',
            'picture' => 'Buta picture'
        ]);

        Clan::create([
            'name' => 'Usagi',
            'picture' => 'Usagi picture'
        ]);

        Clan::create([
            'name' => 'Kame',
            'picture' => 'Kame picture'
        ]);

        Clan::create([
            'name' => 'Tanuki',
            'picture' => 'Tanuki picture'
        ]);

        Clan::create([
            'name' => 'Kitsune',
            'picture' => 'Kitsune picture'
        ]);
    }
}
