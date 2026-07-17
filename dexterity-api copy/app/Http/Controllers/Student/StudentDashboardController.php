<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class StudentDashboardController extends Controller
{
    public function getMyTracks(): JsonResponse
    {
        // Fetch only active student records scoped tightly to the logged-in student
        $userId = Auth::id();

        $enrollments = Enrollment::with('course')
            ->where('user_id', $userId)
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($enrollment) {
                return [
                    'id' => $enrollment->id,
                    'course_title' => $enrollment->course->title,
                    'school' => $enrollment->course->school,
                    'application_status' => $enrollment->application_status,
                    'payment_status' => $enrollment->payment_status,
                    'fee_usd' => (float)$enrollment->course->fee_usd,
                    'exchange_rate' => (float)$enrollment->course->exchange_rate
                ];
            });

        return response()->json($enrollments);
    }
}