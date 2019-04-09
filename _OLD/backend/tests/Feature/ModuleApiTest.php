<?php

namespace Tests\Feature;

use App\Price;
use App\Module;
use App\Period;
use App\Schedule;
use Carbon\Carbon;
use Tests\TestCase;
use Illuminate\Support\Facades\Config;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ModuleApiTest extends TestCase
{
    /**
     * Test get module list
     *
     * @return void
     */
    public function testModuleGetList()
    {
        $this->passportActingAs('admin');

        $this->get(route('module.index'))
            ->assertStatus(200)
            ->assertJsonStructure(['data' => []]);
    }

    /**
     * Test error to get module list because unauthorized user
     *
     * @return void
     */
    public function testModuleGetListNoAuth()
    {
        $this->passportActingAs('student');

        $this->get(route('module.index'))
            ->assertStatus(403)
            ->assertJson([
                'error' => trans('auth.no_privilages')
            ]);
    }

    /**
     * Test create new module
     *
     * @return void
     */
    public function testModuleStore()
    {
        $this->passportActingAs('admin');
        $period = factory(Period::class)->create();
        $schedule = factory(Schedule::class)->create();

        // Module creation
        $number = $this->faker->randomNumber();
        $params = [
            'name' => 'M-' . $number,
            'section' => strtoupper($this->faker->randomLetter),
            'clan_id' => $number == 0 ? 1 : null,
            'period_id' => $period->id,
            'schedule_id' => $schedule->id,
        ];

        $this->json('POST', route('module.store'), $params)
            ->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'section',
                    'schedule',
                    'registeredStudents',
                    'availableSpaces',
                ]
            ]);

        // Failed period creation, module exists
        $this->json('POST', route('module.store'), $params, $this->headers)
            ->assertStatus(400)
            ->assertJson([
                'error' => trans('messages.module_exists')
            ]);

        // Failed period creation, invalid argument
        $params = [
            'name' => 999,
            'period' => 999,
            'section' => 12,
            'schedule_id' => 999,
        ];
        $this->json('POST', route('module.store'), $params, $this->headers)
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'name', 'section', 'period_id', 'schedule_id'
            ]);

        // Require clan_id when module name is M-0
        $params = [
            'name' => 'M-0',
            'section' => strtoupper($this->faker->randomLetter),
            'period_id' => $period->id,
            'schedule_id' => $schedule->id
        ];

        $this->json('POST', route('module.store'), $params, $this->headers)
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'clan_id'
            ]);
    }

    /**
     * Test get specified module
     *
     * @return void
     */
    public function testModuleShow()
    {
        $this->passportActingAs('admin');
        $module = factory(Module::class)->create();

        // Successfully Get module
        $this->get(route('module.show', ['module' => $module->id]))
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $module->id,
                    'name' => $module->name,
                    'section' => $module->section,
                    'price' => $module->price->amount,
                    'registeredStudents' => $module->getRegisteredStudents(),
                    'availableSpaces' => $module->getRemainingSpaces(),
                    'schedule' => [
                        'id' => $module->schedule->id,
                        'day' => $module->schedule->day,
                        'from' => $module->schedule->from,
                        'until' => $module->schedule->until
                    ]
                ]
            ]);

        // Failed to Get module
        $this->get(route('module.show', ['module' => 9999]))
            ->assertStatus(404)
            ->assertJson([
                'error' => trans('messages.resource_not_found')
            ]);
    }

    /**
    * Test update module
    *
    * @return void
    */
    public function testModuleUpdate()
    {
        $this->passportActingAs('admin');
        $module = factory(Module::class)->create();
        $schedule = factory(Schedule::class)->create();
        $new_period = factory(Period::class)->create();

        // Successful module update
        $params = [
            'name' => 'Test-' . $this->faker->randomNumber(),
            'period_id' => $new_period->id,
            'section' => 'Z',
            'schedule_id' => $schedule->id,
        ];
        $this->put(route('module.update', ['module' => $module->id]), $params)
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $module->id,
                    'name' => $params['name'],
                    'section' => $params['section'],
                    'registeredStudents' => $module->getRegisteredStudents(),
                    'availableSpaces' => $module->getRemainingSpaces(),
                    'schedule' => [
                        'id' => $params['schedule_id']
                    ]
                ]
            ]);

        // Get updated model
        $module = Module::where('id', $module->id)->first();
        // Compare correct update of period
        $this->assertEquals($new_period->id, $module->period->id);

        // Failed module update, invalid argument
        $module = factory(Module::class)->create();
        $params = [
            'name' => 1,
            'period_id' => 99,
            'section' => 121,
            'schedule_id' => 9999
        ];
        $this->json(
            'PUT',
            route('module.update', ['module' => $module->id]),
            $params,
            $this->headers
        )
        ->assertStatus(422)
        ->assertJsonValidationErrors([
            'name', 'section', 'period_id', 'schedule_id'
        ]);
    }

    /**
     * Test delete module
     *
     * @return void
     */
    public function testModuleDelete()
    {
        $this->passportActingAs('admin');
        $module = factory(Module::class)->create();

        $this->delete(route('module.destroy', ['module' => $module->id]))
            ->assertStatus(204);
    }

    /**
     * Test get available sections for module
     *
     * @return void
     */
    public function testGetAvailableSectionsFor()
    {
        $this->passportActingAs('admin');

        $period = factory(Period::class)->create();
        $name = $this->faker->word;

        factory(Module::class)->create([
            'name' => $name,
            'period_id' => $period->id,
            'section' => 'A'
        ]);

        $params = [
            'name' => $name,
            'period_id' => $period->id
        ];

        $sections  = Config::get('constants.section_letters');

        // Section A should not appear
        $available_sections = array_diff($sections, ['A']);
        $this->get(route('module.availableSections', $params))
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    // Removed 'A' from array
                    'available_sections' => array_values($available_sections)
                ]
            ]);
    }
}
