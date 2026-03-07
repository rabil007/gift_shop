<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('landing'))->name('home');
Route::get('/shop', fn () => Inertia::render('shop'))->name('shop');
Route::get('/cart', fn () => Inertia::render('cart'))->name('cart');
Route::get('/profile', fn () => Inertia::render('profile'))->name('profile');
Route::get('/item/{id}', fn () => Inertia::render('item'))->name('item.show');

// Auth routes (placeholders for auth views)
Route::get('/login', fn () => Inertia::render('auth/login'))->name('login');
Route::get('/register', fn () => Inertia::render('auth/register'))->name('register');

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

// Admin Routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::get('/settings', [App\Http\Controllers\Admin\SettingsController::class, 'index'])->name('settings');
    Route::match(['put', 'post'], '/settings', [App\Http\Controllers\Admin\SettingsController::class, 'update'])->name('settings.update');

    Route::prefix('categories')->name('categories.')->group(function () {
        Route::get('/', [App\Http\Controllers\Admin\CategoryController::class, 'index'])->name('index');
        Route::get('/create', [App\Http\Controllers\Admin\CategoryController::class, 'create'])->name('create');
        Route::post('/', [App\Http\Controllers\Admin\CategoryController::class, 'store'])->name('store');
        Route::get('/{category}/edit', [App\Http\Controllers\Admin\CategoryController::class, 'edit'])->name('edit');
        Route::put('/{category}', [App\Http\Controllers\Admin\CategoryController::class, 'update'])->name('update');
        Route::delete('/{category}', [App\Http\Controllers\Admin\CategoryController::class, 'destroy'])->name('destroy');
    });
});
