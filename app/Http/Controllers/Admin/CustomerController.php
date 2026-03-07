<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function index(): Response
    {
        $customers = User::where('role_id', Role::CUSTOMER_ID)
            ->orderByDesc('created_at')
            ->get(['id', 'name', 'email', 'phone', 'created_at'])
            ->map(fn (User $u) => [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'phone' => $u->phone ?? '—',
                'created_at' => $u->created_at->format('M j, Y'),
            ]);

        return Inertia::render('admin/customers/index', [
            'customers' => $customers,
        ]);
    }
}
