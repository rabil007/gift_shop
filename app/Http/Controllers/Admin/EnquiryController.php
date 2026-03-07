<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnquiryController extends Controller
{
    public function index()
    {
        $enquiries = Enquiry::orderByDesc('created_at')->paginate(20);
        return Inertia::render('admin/enquiries/index', [
            'enquiries' => $enquiries
        ]);
    }

    public function show(Enquiry $enquiry)
    {
        if ($enquiry->status === 'new') {
            $enquiry->update(['status' => 'read']);
        }
        
        return Inertia::render('admin/enquiries/show', [
            'enquiry' => $enquiry
        ]);
    }

    public function updateStatus(Request $request, Enquiry $enquiry)
    {
        $validated = $request->validate([
            'status' => 'required|in:new,read,resolved',
        ]);

        $enquiry->update($validated);

        return back()->with('success', 'Enquiry status updated.');
    }

    public function destroy(Enquiry $enquiry)
    {
        $enquiry->delete();
        return redirect()->route('admin.enquiries.index')->with('success', 'Enquiry deleted successfully.');
    }
}
