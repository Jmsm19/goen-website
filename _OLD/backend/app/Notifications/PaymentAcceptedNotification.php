<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class PaymentAcceptedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $module;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($module)
    {
        $this->module = $module;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $module = $this->module;
        $schedule = $module->schedule;
        $date = Carbon::parse($schedule->day);

        return (new MailMessage())
            ->subject(trans('emails.payment_accepted', [], 'es'))
            ->greeting(trans('emails.greetings_user', ['user' => $notifiable->name], 'es'))
            ->line(trans('emails.registered_in_module_contratulation', [
                'module_name' => "{$module->name} - {$module->section}"
            ], 'es'))
            ->line(trans('emails.waiting_for_you_in_class', [], 'es'))
            ->salutation(trans('emails.salutation', [], 'es'));
        ;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
