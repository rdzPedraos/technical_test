<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $response = Http::get('https://restcountries.com/v3.1/subregion/South%20America');
        $countryCodesList = $response->ok() ? $response->json() : [];

        return [
            'document_number' => ['required', Rule::unique(User::class)->ignore($this->user()->id)],
            'name' => ['required', 'string', 'min:5', 'max:100', 'regex:/^[A-Za-z\s]+$/'],
            'last_name' => ['nullable', 'string', 'max:100', 'regex:/^[A-Za-z\s]+$/'],
            'email' => ['required', 'email', 'max:150', Rule::unique(User::class)->ignore($this->user()->id)],

            'phone_number' => ['required', 'regex:/^[0-9]{10}$/'],
            'residence_address' => ['required', 'string', 'max:180', 'regex:/^[a-zA-Z0-9\s\.,#-]+$/'],
            'country_code' => [
                'required',
                Rule::in(collect($countryCodesList)->pluck('cca3')->all())
            ],
        ];
    }
}
