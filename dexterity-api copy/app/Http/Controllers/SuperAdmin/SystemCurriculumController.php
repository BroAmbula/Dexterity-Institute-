<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SystemCurriculumController extends Controller
{
    public function index(): JsonResponse
    {
        $courses = Course::select('id', 'title', 'school', 'fee_usd', 'exchange_rate', 'is_active')->get();
        return response()->json($courses);
    }

    // Global economic override: Sets exchange rate across ALL courses in Supabase instantly
    public function updateExchangeRate(Request $request): JsonResponse
    {
        $request->validate([
            'exchange_rate' => 'required|numeric|min:1'
        ]);

        Course::query()->update(['exchange_rate' => $request->exchange_rate]);

        return response()->json([
            'message' => "Global base exchange rate successfully adjusted to KSh {$request->exchange_rate}."
        ]);
    }

    // Toggles visibility of a school's course on the frontend dynamically
    public function toggleStatus(Course $course): JsonResponse
    {
        $course->update([
            'is_active' => !$course->is_active
        ]);

        return response()->json([
            'message' => "Visibility of '{$course->title}' has been toggled successfully.",
            'is_active' => $course->is_active
        ]);
    }
}