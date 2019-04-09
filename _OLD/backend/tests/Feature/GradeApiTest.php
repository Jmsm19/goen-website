<?php

namespace Tests\Feature;

use App\User;
use App\Grade;
use App\Module;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class GradeApiTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testGetGradeList()
    {
        $this->passportActingAs('instructor');

        // Test empty list
        $this->get(route('grade.index'))
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => []
            ]);

        // Test list with items
        factory(Grade::class, 10)->create();
        $this->get(route('grade.index'))
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    [
                        'id',
                        'score',
                        'user' => ['id', 'name'],
                        'module' => ['id', 'name']
                    ]
                ]
            ]);
    }

    /**
     * Test get specified Grade
     *
     * @return void
     */
    public function testGetGrade()
    {
        $this->passportActingAs('admin');
        $grade = factory(Grade::class)->create();

        $this->get(route('grade.show', ['grade' => $grade->id]))
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $grade->id,
                    'score' => $grade->score,
                    'module' => [
                        'id' => $grade->module->id,
                        'name' => $grade->module->name,
                    ],
                    'user' => [
                        'id' => $grade->user->id,
                        'name' => $grade->user->name,
                    ],
                ]
            ]);
    }

    /**
     * Test store Grade
     *
     * @return void
     */
    public function testStoreGrade()
    {
        $this->passportActingAs('admin');

        // Successful store
        $module = factory(Module::class)->create();
        $user = factory(User::class)->create();

        $this->post(route('grade.store'), [
                'score' => rand(0, 100),
                'module_id' => $module->id,
                'user_id' => $user->id
            ])
            ->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'score',
                    'module' => ['id', 'name'],
                    'user' => ['id', 'name'],
                ]
            ]);

        // Failed store, invalid arguments
        $this->json(
            'POST',
            route('grade.store'),
            [
                'score' => "999",
                'module_id' => 9999,
                'user_id' => 9999
            ],
            $this->headers
        )
        ->assertStatus(422)
        ->assertJsonValidationErrors([
            'score', 'module_id', 'user_id'
        ]);
    }

    /**
     * Test update Grade
     *
     * @return void
     */
    public function testGradeUpdate()
    {
        $this->passportActingAs('admin');
        $user = factory(User::class)->create();
        $module = factory(Module::class)->create();
        $grade = factory(Grade::class)->create();

        // Successful update
        $params = [
            'score' => rand(0, 100),
            // This will not be taken, only score will be updated
            'module_id' => $module->id,
            'user_id' => $user->id
        ];

        $this->put(route('grade.update', ['grade' => $grade->id]), $params)
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $grade->id,
                    'score' => $params['score'],
                    'module' => [
                        'id' => $grade->module->id
                    ],
                    'user' => [
                        'id' => $grade->user->id
                    ],
                ]
            ]);

        // Failed update
        $params = [
            'score' => 9000,
            'module_id' => 9000,
            'user_id' => 9000
        ];

        $this->json(
            'PUT',
            route('grade.update', ['grade' => $grade->id]),
            $params,
            $this->headers
        )
        ->assertStatus(422)
        ->assertJsonValidationErrors([
            'score'
        ]);
    }

    /**
     * Test Grade delete
     */
    public function testGradeDelete()
    {
        // Admin can delete
        $grade = factory(Grade::class)->create();

        $this->passportActingAs('admin');
        $this->delete(route('grade.destroy', ['grade' => $grade->id]))
            ->assertStatus(204);

        // Instructor can delete
        $grade = factory(Grade::class)->create();

        $this->passportActingAs('instructor');
        $this->delete(route('grade.destroy', ['grade' => $grade->id]))
            ->assertStatus(204);

        // Assistant and Student can't delete
        $grade = factory(Grade::class)->create();

        $this->passportActingAs('assistant');
        $this->delete(route('grade.destroy', ['grade' => $grade->id]))
            ->assertStatus(403);

        $this->passportActingAs('student');
        $this->delete(route('grade.destroy', ['grade' => $grade->id]))
            ->assertStatus(403);
    }
}
