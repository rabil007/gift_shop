<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('landing'))->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
    Route::get('/settings/profile', fn () => Inertia::render('settings/profile'))->name('profile.edit');
    Route::patch('/settings/profile', fn () => redirect()->route('profile.edit'))->name('profile.update');
    Route::delete('/settings/profile', fn () => redirect()->route('home'))->name('profile.destroy');
    Route::get('/settings/password', fn () => Inertia::render('settings/password'))->name('user-password.edit');
    Route::put('/settings/password', fn () => redirect()->route('user-password.edit'))->name('user-password.update');
    Route::get('/settings/appearance', fn () => Inertia::render('settings/appearance'))->name('appearance.edit');
    Route::get('/settings/two-factor', fn () => Inertia::render('settings/two-factor'))->name('two-factor.show');
});