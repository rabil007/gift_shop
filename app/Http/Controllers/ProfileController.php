<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(): Response
    {
        $user = request()->user();
        $addresses = $user->addresses()->orderByDesc('is_default')->orderBy('label')->get();
        return Inertia::render('profile', [
            'profile' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? '',
                'address' => $user->address ?? '',
            ],
            'addresses' => $addresses->map(fn (Address $a) => [
                'id' => $a->id,
                'label' => $a->label,
                'line_1' => $a->line_1,
                'line_2' => $a->line_2,
                'city' => $a->city,
                'state' => $a->state,
                'postal_code' => $a->postal_code,
                'country' => $a->country,
                'is_default' => $a->is_default,
            ]),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'address' => ['nullable', 'string', 'max:1000'],
        ]);
        $user->update($validated);
        return back()->with('success', 'Profile updated.');
    }

    public function storeAddress(Request $request): RedirectResponse
    {
        $user = $request->user();
        $validated = $request->validate([
            'label' => ['required', 'string', 'max:100'],
            'line_1' => ['required', 'string', 'max:255'],
            'line_2' => ['nullable', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:100'],
            'state' => ['nullable', 'string', 'max:100'],
            'postal_code' => ['nullable', 'string', 'max:20'],
            'country' => ['nullable', 'string', 'max:100'],
            'is_default' => ['boolean'],
        ]);
        $validated['user_id'] = $user->id;
        $validated['country'] = $validated['country'] ?? 'UAE';
        if (!empty($validated['is_default'])) {
            $user->addresses()->update(['is_default' => false]);
        } else {
            $validated['is_default'] = $user->addresses()->count() === 0;
        }
        $user->addresses()->create($validated);
        return back()->with('success', 'Address added.');
    }

    public function updateAddress(Request $request, Address $address): RedirectResponse
    {
        if ($address->user_id !== $request->user()->id) {
            abort(403);
        }
        $validated = $request->validate([
            'label' => ['required', 'string', 'max:100'],
            'line_1' => ['required', 'string', 'max:255'],
            'line_2' => ['nullable', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:100'],
            'state' => ['nullable', 'string', 'max:100'],
            'postal_code' => ['nullable', 'string', 'max:20'],
            'country' => ['nullable', 'string', 'max:100'],
            'is_default' => ['boolean'],
        ]);
        if (!empty($validated['is_default'])) {
            $request->user()->addresses()->where('id', '!=', $address->id)->update(['is_default' => false]);
        }
        $address->update($validated);
        return back()->with('success', 'Address updated.');
    }

    public function destroyAddress(Request $request, Address $address): RedirectResponse
    {
        if ($address->user_id !== $request->user()->id) {
            abort(403);
        }
        $address->delete();
        return back()->with('success', 'Address removed.');
    }

    public function setDefaultAddress(Request $request, Address $address): RedirectResponse
    {
        if ($address->user_id !== $request->user()->id) {
            abort(403);
        }
        $request->user()->addresses()->update(['is_default' => false]);
        $address->update(['is_default' => true]);
        return back()->with('success', 'Default address updated.');
    }
}
