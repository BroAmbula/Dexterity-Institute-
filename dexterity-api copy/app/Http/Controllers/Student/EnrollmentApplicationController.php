<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class EnrollmentApplicationController extends Controller
{
    // Retrieve all ACTIVE courses for registration matching the React frontend view
    public function activeCourses(): JsonResponse
    {
        $courses = Course::where('is_active', true)
            ->select('id', 'title', 'school', 'description', 'duration', 'delivery_mode', 'eligibility', 'fee_usd', 'exchange_rate')
            ->get();

        return response()->json($courses);
    }

    // Process new enrollment application
    public function apply(Request $request): JsonResponse
    {
        $request->validate([
            'course_id' => 'required|uuid|exists:courses,id'
        ]);

        $userId = Auth::id();

        // Prevent double applications for the same course
        $alreadyApplied = Enrollment::where('user_id', $userId)
            ->where('course_id', $request->course_id)
            ->exists();

        if ($alreadyApplied) {
            return response()->json([
                'error' => 'Duplicate Entry',
                'message' => 'You have already submitted an application for this course.'
            ], 422);
        }

        $enrollment = Enrollment::create([
            'id' => Str::uuid(),
            'user_id' => $userId,
            'course_id' => $request->course_id,
            'application_status' => 'PENDING',
            'payment_status' => 'UNPAID'
        ]);

        return response()->json([
            'message' => 'Application filed successfully. Your profile has been sent to admissions review.',
            'enrollment' => $enrollment
        ], 210);
    }
}