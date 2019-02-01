<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class PaymentAccepted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $module;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user, $module)
    {
        $this->user = $user;
        $this->module = $module;
    }
}
