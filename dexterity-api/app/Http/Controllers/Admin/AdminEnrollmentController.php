<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminEnrollmentController extends Controller
{
    public function index(): JsonResponse
    {
        // Load operational pipeline for standard reviews (only pending ones)
        $applications = Enrollment::with(['user', 'course'])
            ->where('status', 'pending')
            ->orderBy('created_at')
            ->get();

        return response()->json($applications);
    }

    public function updateStatus(Request $request, Enrollment $enrollment): JsonResponse
    {
        $request->validate([
            'status' => 'required|string|in:pending,approved,active,rejected'
        ]);

        // Normalize 'approved' to 'active' so it matches the same convention
        // used everywhere else in the app (e.g. the direct payment flow)
        $normalized = strtolower($request->status) === 'approved' ? 'active' : strtolower($request->status);

        $enrollment->update([
            'status' => $normalized,
            'payment_status' => $normalized === 'active' ? 'paid' : $enrollment->payment_status,
        ]);

        return response()->json([
            'message' => "Application state successfully updated to {$normalized}.",
            'enrollment' => $enrollment
        ]);
    }

    public function getAssignedStudents(): JsonResponse
    {
        $students = Enrollment::with(['user', 'course'])
            ->where('status', 'active')
            ->get();

        return response()->json($students);
    }
}