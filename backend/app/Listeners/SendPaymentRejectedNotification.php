<?php

namespace App\Listeners;

use App\Events\PaymentRejected;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\PaymentRejectedNotification;

class SendPaymentRejectedNotification implements ShouldQueue
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
    public function handle(PaymentRejected $event)
    {
        $user = $event->user;
        $user->notify(new PaymentRejectedNotification());
    }
}
