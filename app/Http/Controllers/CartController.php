<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    private function getCart()
    {
        if (auth()->check()) {
            $cart = Cart::where('user_id', auth()->id())->first();
            $sessionCart = Cart::where('session_id', session()->getId())->first();
            
            if (!$cart) {
                if ($sessionCart) {
                    $sessionCart->update(['user_id' => auth()->id()]);
                    $cart = $sessionCart;
                } else {
                    $cart = Cart::create(['user_id' => auth()->id()]);
                }
            } else if ($sessionCart && $sessionCart->id !== $cart->id) {
                // Merge session cart into user cart
                foreach ($sessionCart->items as $item) {
                    $existingItem = $cart->items()->where('item_id', $item->item_id)->first();
                    if ($existingItem) {
                        $existingItem->increment('quantity', $item->quantity);
                    } else {
                        $item->update(['cart_id' => $cart->id]);
                    }
                }
                $sessionCart->delete();
            }
            return $cart;
        }
        return Cart::firstOrCreate(['session_id' => session()->getId()]);
    }

    public function index()
    {
        $cart = $this->getCart();
        $cart->load('items.item');
        return Inertia::render('cart', [
            'cart' => $cart
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'item_id' => 'required|exists:items,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = $this->getCart();
        $cartItem = $cart->items()->where('item_id', $request->item_id)->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $request->quantity);
        } else {
            $cart->items()->create([
                'item_id' => $request->item_id,
                'quantity' => $request->quantity
            ]);
        }

        return redirect()->back()->with('success', 'Item added to cart');
    }

    public function update(Request $request, CartItem $cartItem)
    {
        $request->validate([
            'action' => 'required|in:increment,decrement'
        ]);

        $cart = $this->getCart();

        if ($cartItem->cart_id !== $cart->id) {
            abort(403);
        }

        if ($request->action === 'increment') {
            $cartItem->increment('quantity');
        } else {
            if ($cartItem->quantity > 1) {
                $cartItem->decrement('quantity');
            } else {
                $cartItem->delete();
            }
        }

        return redirect()->back();
    }

    public function remove(CartItem $cartItem)
    {
        $cart = $this->getCart();

        if ($cartItem->cart_id !== $cart->id) {
            abort(403);
        }

        $cartItem->delete();

        return redirect()->back()->with('success', 'Item removed from cart');
    }
}
