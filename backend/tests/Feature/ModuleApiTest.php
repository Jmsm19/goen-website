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
        $price = $this->faker->randomFloat(2, 1000);

        // Module creation
        $params = [
            'name' => 'M-0',
            'period_id' => $period->id,
            'price' => $price,
            'schedule_id' => $schedule->id,
        ];

        $this->json('POST', route('module.store'), $params)
            ->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'price',
                    'schedule'
                ]
            ]);

        // Module creation section limit reached
        $params = [
            'name' => 'M-1',
            'period_id' => $period->id,
            'price' => $price,
            'schedule_id' => $schedule->id,
        ];
        $section_limit = count(Config::get('constants.module_section_order'));
        for ($i=0; $i <= $section_limit; $i++) {
            $this->json('POST', route('module.store'), $params);
        }
        $this->json('POST', route('module.store'), $params)
            ->assertStatus(400)
            ->assertJson([
                'error' => trans('messages.section_limit_reached')
            ]);

        // Failed period creation, invalid argument
        $params = ['name' => 999, 'period' => 999, 'schedule_id' => 999, 'price' => "not a number"];
        $this->json('POST', route('module.store'), $params, $this->headers)
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'name', 'period_id', 'schedule_id', 'price'
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
                    'price' => $module->price->amount,
                    'schedule' => [
                        'id' => $module->schedule->id,
                        'start_date' => $module->schedule->start_date,
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
            'name' => 'M-0',
            'period_id' => $new_period->id,
            'price' => $this->faker->randomFloat(2, 1000),
            'schedule_id' => $schedule->id,
        ];
        $this->put(route('module.update', ['module' => $module->id]), $params)
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $module->id,
                    'name' => $params['name'],
                    'price' => $params['price'],
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
            'price' => 'Not a number',
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
            'name', 'period_id', 'price', 'schedule_id'
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
}
