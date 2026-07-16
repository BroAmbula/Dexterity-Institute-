<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ApplicationStatus;
use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminEnrollmentController extends Controller
{
    public function index(): JsonResponse
    {
        // Load operational pipeline for standard reviews
        $applications = Enrollment::with(['user', 'course'])
            ->whereIn('application_status', [ApplicationStatus::PENDING, ApplicationStatus::REVIEWING])
            ->orderBy('created_at')
            ->get();

        return response()->json($applications);
    }

    public function updateStatus(Request $request, Enrollment $enrollment): JsonResponse
    {
        $request->validate([
            'status' => 'required|string|in:PENDING,REVIEWING,APPROVED,REJECTED'
        ]);

        $enrollment->update([
            'application_status' => $request->status
        ]);

        return response()->json([
            'message' => "Application state successfully updated to {$request->status}.",
            'enrollment' => $enrollment
        ]);
    }
}