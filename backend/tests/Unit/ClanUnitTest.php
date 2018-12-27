<?php

namespace Tests\Unit;

use App\Clan;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ClanUnitTest extends TestCase
{
    /**
     * Test can create Clan
     *
     * @return void
     */
    public function testCanCreateClan()
    {
        $name = $this->faker->word;
        $picture = $this->faker->url();

        $clan = Clan::create([
            'name' => $name,
            'picture' => $picture,
        ]);

        $this->assertEquals(
            [$name, $picture],
            [$clan->name, $clan->picture]
        );
    }

    /**
     * Test Clan relationship with Users
     *
     * @return void
     */
    public function testClanUserRelationship()
    {
        $clan = factory(Clan::class)->create();
        $user = factory(User::class)->create([
            'clan_id' => $clan->id
        ]);

        $this->assertEquals(
            $user->clan->name,
            $clan->name
        );
    }
}
