<?php

namespace App\Listeners;

use App\Events\NewUserRegisteredEvent;
use App\Notifications\NewUserRegisteredNotification;
use Illuminate\Support\Facades\Notification;

class SendEmailWelcomeListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(NewUserRegisteredEvent $event): void
    {
        $userRegistered = $event->userRegistered;

        Notification::route('mail', $userRegistered->email)->notify(
            new NewUserRegisteredNotification($userRegistered)
        );
    }
}
