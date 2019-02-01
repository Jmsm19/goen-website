<?php

namespace App\Listeners;

use App\Events\PaymentAccepted;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\PaymentAcceptedNotification;

class SendPaymentAcceptedNotification implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(PaymentAccepted $event)
    {
        $user = $event->user;
        $user->notify(new PaymentAcceptedNotification($event->module));
    }
}
