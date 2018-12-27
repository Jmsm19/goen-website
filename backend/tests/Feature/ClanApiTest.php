<?php

namespace Tests\Feature;

use App\Clan;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ClanApiTest extends TestCase
{
    /**
     * Test get list of Clans
     *
     * @return void
     */
    public function testGetAllClans()
    {
        $this->passportActingAs('admin');

        $this->get(route('clan.index'))
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    [
                        'id', 'name', 'picture'
                    ]
                ]
            ]);
    }

    /**
     * Test get specified Clan
     *
     * @return void
     */
    public function testGetClan()
    {
        $this->passportActingAs('admin');
        $clan = factory(Clan::class)->create();

        $this->get(route('clan.show', ['clan' => $clan->id]))
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $clan->id,
                    'picture' => $clan->picture,
                    'users' => []
                ]
            ]);
    }

    /**
     * Test update Clan
     *
     * @return void
     */
    public function testClanUpdate()
    {
        $this->passportActingAs('admin');
        $clan = factory(Clan::class)->create();

        // Successful update
        $params = [
            'name' => $this->faker->word,
            'picture' => $this->faker->url()
        ];

        $this->put(route('clan.update', ['clan' => $clan->id]), $params)
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'name' => $params['name'],
                    'picture' => $params['picture']
                ]
            ]);

        // Failed update
        $params = [
            'name' => 123,
            'picture' => 123
        ];

        $this->json(
            'PUT',
            route('clan.update', ['clan' => $clan->id]),
            $params,
            $this->headers
        )
        ->assertStatus(422)
        ->assertJsonValidationErrors([
            'name', 'picture'
        ]);
    }

    /**
     * Test Clan delete
     */
    public function testClanDelete()
    {
        $this->passportActingAs('admin');
        $clan = factory(Clan::class)->create();

        $this->delete(route('clan.destroy', ['clan' => $clan->id]))
            ->assertStatus(204);
    }
}
