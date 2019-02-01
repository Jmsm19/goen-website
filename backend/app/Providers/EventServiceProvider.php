<?php

namespace App\Providers;

use App\Events\PaymentAccepted;
use App\Events\PaymentRejected;
use App\Listeners\AssignStudentRole;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Event;
use Illuminate\Auth\Events\Registered;
use App\Listeners\SendPaymentAcceptedNotification;
use App\Listeners\SendPaymentRejectedNotification;
use App\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        Verified::class => [
            AssignStudentRole::class,
        ],
        PaymentAccepted::class => [
            SendPaymentAcceptedNotification::class,
        ],
        PaymentRejected::class => [
            SendPaymentRejectedNotification::class,
        ]
    ];

    /**
     * Register any events for your application.
     */
    public function boot()
    {
        parent::boot();
    }
}
