<?php

namespace App\Listeners;

use App\Events\NewUserRegisteredEvent;
use App\Mail\ListUsersByCountryEmail;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

class SendReportUsersListener
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
        $adminUsers = User::where('is_admin', 1)->get();
        $countUsersByCountry = User::where('is_admin', 0)
            ->groupBy('country_code')
            ->select('country_code', DB::raw('count(*) as total'))
            ->get();

        //Get data
        $response = Http::get('https://restcountries.com/v3.1/subregion/South%20America');
        $countries = $response->ok() ? $response->json() : [];
        $countryList = [];
        foreach ($countries as $country) {
            $countryList[$country['cca3']] = [
                'name' => $country['name']['common'],
                'flag' => $country['flag']
            ];
        }

        $data = [];
        foreach ($countUsersByCountry as $country) {
            $countryData = $countryList[$country->country_code];
            $data[] = [
                'country' => $countryData['name'],
                'flag' => $countryData['flag'],
                'count' => $country->total
            ];
        }

        Mail::to($adminUsers)->send(new ListUsersByCountryEmail($data));
    }
}
