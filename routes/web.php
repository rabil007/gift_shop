<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('landing'))->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
});