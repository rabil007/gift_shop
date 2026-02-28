<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('landing'))->name('home');

Route::post('/enquiry', function () {
    $v = Validator::make(request()->all(), [
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'email'],
        'subject' => ['required', 'string', 'max:255'],
        'message' => ['required', 'string', 'max:5000'],
    ]);
    if ($v->fails()) {
        return back()->withErrors($v)->withInput();
    }
    return back()->with('success', 'Thank you. We will get back to you soon.');
})->name('enquiry.store');

Route::get('/login', fn () => redirect()->route('home'))->name('login');
Route::get('/register', fn () => redirect()->route('home'))->name('register');
Route::get('/dashboard', fn () => redirect()->route('home'))->name('dashboard');
Route::any('/settings/{any?}', fn () => redirect()->route('home'))->where('any', '.*');
Route::get('/password/reset/{token}', fn () => redirect()->route('home'));
Route::get('/email/verify/{id}/{hash}', fn () => redirect()->route('home'));
Route::get('/two-factor-challenge', fn () => redirect()->route('home'));
Route::get('/user/confirm-password', fn () => redirect()->route('home'));
Route::get('/forgot-password', fn () => redirect()->route('home'));
Route::get('/reset-password', fn () => redirect()->route('home'));
Route::get('/email/verify', fn () => redirect()->route('home'));