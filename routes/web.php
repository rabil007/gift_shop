<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('landing'))->name('home');
Route::get('/cart', fn () => Inertia::render('cart'))->name('cart');
Route::get('/item/{id}', fn () => Inertia::render('item'))->name('item.show');

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
