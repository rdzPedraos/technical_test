<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('users.index');
});

Route::group([
    'as' => 'profile.',
    'middleware' => 'auth',
    'prefix' => '/profile',
    'controller' => ProfileController::class
], function () {
    Route::get('/', 'edit')->name('edit');
    Route::patch('/', 'update')->name('update');
    Route::delete('/', 'destroy')->name('destroy');
});

Route::group([
    'middleware' => ['auth'],
    'controller' => UserController::class,
    'prefix' => '/users',
    'as' => 'users.'
], function () {
    Route::get('/', 'index')->name('index');
    Route::post('/', 'get');

    Route::get('/create', 'create')->name('create');
    Route::post('/create', 'store')->name('store');

    Route::get('/show/{user}', 'show')->name('show');
    Route::put('/edit/{user}', 'update')->name('update');

    Route::delete('/delete/{user}', 'destroy')->name('destroy');
});

require __DIR__ . '/auth.php';
