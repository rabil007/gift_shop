<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feature;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeatureController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/features/index', [
            'features' => Feature::orderBy('sort_order')->orderByDesc('created_at')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/features/form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'required|string|max:255',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        Feature::create($validated);

        return redirect()->route('admin.features.index')->with('success', 'Feature created successfully.');
    }

    public function edit(Feature $feature)
    {
        return Inertia::render('admin/features/form', [
            'feature' => $feature
        ]);
    }

    public function update(Request $request, Feature $feature)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'required|string|max:255',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $feature->update($validated);

        return redirect()->route('admin.features.index')->with('success', 'Feature updated successfully.');
    }

    public function destroy(Feature $feature)
    {
        $feature->delete();
        return redirect()->route('admin.features.index')->with('success', 'Feature deleted successfully.');
    }
}
