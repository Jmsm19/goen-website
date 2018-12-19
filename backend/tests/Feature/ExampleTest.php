<?php

namespace Tests\Feature;

use Tests\TestCase;

/**
 * @internal
 * @coversNothing
 */
final class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function testBasicTest()
    {
        $response = $this->get('/api/');

        $response
            ->assertStatus(200)
            ->assertJson(['greeting' => 'Hello from the API']);
    }
}
