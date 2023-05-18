<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;


class NewUserRegisteredNotification extends Notification
{
    use Queueable;

    private $userRegistered;
    /**
     * Create a new notification instance.
     */
    public function __construct(User $userRegistered)
    {
        $this->userRegistered = $userRegistered;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via($notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Has sido registrado!')
            ->line('Has sido registrado por parte de un Administrador con los siguientes credenciales:')
            ->line('Número de identificación: ' . $this->userRegistered->document_number)
            ->line('Nombre: ' . $this->userRegistered->name)
            ->line('Telefono: ' . $this->userRegistered->phone_number);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
