<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    private function getCart(): Cart
    {
        $cart = Cart::where('user_id', auth()->id())->first();
        if (!$cart) {
            $cart = Cart::create(['user_id' => auth()->id()]);
        }
        return $cart;
    }

    public function index(): Response|RedirectResponse
    {
        $cart = $this->getCart();
        $cart->load('items.item');
        if ($cart->items->isEmpty()) {
            return redirect()->route('cart')->with('message', 'Your cart is empty.');
        }
        $user = auth()->user();
        $addresses = $user->addresses()->orderByDesc('is_default')->orderBy('label')->get();
        return Inertia::render('checkout', [
            'cart' => $cart,
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

    public function store(Request $request): RedirectResponse
    {
        $cart = $this->getCart();
        $cart->load('items.item');
        if ($cart->items->isEmpty()) {
            return redirect()->route('cart')->with('message', 'Your cart is empty.');
        }

        $validated = $request->validate([
            'address_id' => ['nullable', 'exists:addresses,id'],
            'shipping_name' => ['required_without:address_id', 'string', 'max:255'],
            'shipping_line_1' => ['required_without:address_id', 'string', 'max:255'],
            'shipping_line_2' => ['nullable', 'string', 'max:255'],
            'shipping_city' => ['required_without:address_id', 'string', 'max:255'],
            'shipping_state' => ['nullable', 'string', 'max:100'],
            'shipping_postal_code' => ['nullable', 'string', 'max:20'],
            'shipping_country' => ['nullable', 'string', 'max:100'],
            'shipping_phone' => ['nullable', 'string', 'max:50'],
        ]);

        $user = auth()->user();
        if (!empty($validated['address_id'])) {
            $address = $user->addresses()->findOrFail($validated['address_id']);
            $shipping = [
                'shipping_name' => $user->name,
                'shipping_line_1' => $address->line_1,
                'shipping_line_2' => $address->line_2,
                'shipping_city' => $address->city,
                'shipping_state' => $address->state,
                'shipping_postal_code' => $address->postal_code,
                'shipping_country' => $address->country ?? 'UAE',
                'shipping_phone' => $user->phone,
            ];
        } else {
            $shipping = [
                'shipping_name' => $validated['shipping_name'],
                'shipping_line_1' => $validated['shipping_line_1'],
                'shipping_line_2' => $validated['shipping_line_2'] ?? null,
                'shipping_city' => $validated['shipping_city'],
                'shipping_state' => $validated['shipping_state'] ?? null,
                'shipping_postal_code' => $validated['shipping_postal_code'] ?? null,
                'shipping_country' => $validated['shipping_country'] ?? 'UAE',
                'shipping_phone' => $validated['shipping_phone'] ?? null,
            ];
        }

        $total = $cart->items->sum(fn ($ci) => (float) $ci->item->price * $ci->quantity);
        $order = Order::create([
            'user_id' => $user->id,
            'status' => 'confirmed',
            'total' => $total,
            ...$shipping,
        ]);

        foreach ($cart->items as $cartItem) {
            OrderItem::create([
                'order_id' => $order->id,
                'item_id' => $cartItem->item_id,
                'item_name' => $cartItem->item->name,
                'price' => $cartItem->item->price,
                'quantity' => $cartItem->quantity,
            ]);
        }

        $cart->items()->delete();

        return redirect()->route('checkout.success', $order)->with('success', 'Order placed successfully.');
    }

    public function success(Order $order): Response|RedirectResponse
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }
        return Inertia::render('checkout-success', [
            'order' => [
                'id' => $order->id,
                'total' => $order->total,
                'status' => $order->status,
            ],
        ]);
    }
}
