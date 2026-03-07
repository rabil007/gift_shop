<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index(): Response
    {
        return Inertia::render('admin/dashboard', [
            // Future dashboard metrics will be passed here
            'stats' => [
                'totalOrders' => 156,
                'revenue' => 'AED 45,230',
                'activeUsers' => 12,
            ]
        ]);
    }
}
