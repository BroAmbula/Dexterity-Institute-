<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\LessonProgress;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class StudentDashboardController extends Controller
{
    public function getMyTracks(): JsonResponse
    {
        // Fetch only active student records scoped tightly to the logged-in student
        $userId = Auth::id();

        $enrollments = Enrollment::with('course.lessons')
            ->where('user_id', $userId)
            ->whereNotNull('course_id')
            ->orderByDesc('created_at')
            ->get()
            ->filter(fn($enrollment) => $enrollment->course)
            ->map(function ($enrollment) use ($userId) {
                $course = $enrollment->course;
                $totalLessons = $course->lessons->count();
                $completedLessons = $totalLessons > 0
                    ? LessonProgress::where('user_id', $userId)
                        ->whereIn('lesson_id', $course->lessons->pluck('id'))
                        ->whereNotNull('completed_at')
                        ->count()
                    : 0;

                $progress = $totalLessons > 0 ? round(($completedLessons / $totalLessons) * 100) : 0;

                return [
                    'id' => $enrollment->id,
                    'course_id' => $course->id,
                    'course_title' => $course->title,
                    'school' => $course->school,
                    'status' => $progress >= 100 ? 'COMPLETED' : $enrollment->status,
                    'payment_status' => $enrollment->payment_status,
                    'fee_usd' => (float) $course->fee_usd,
                    'exchange_rate' => (float) $course->exchange_rate,
                    'progress' => $progress,
                    'lessons_completed' => $completedLessons,
                    'total_lessons' => $totalLessons,
                ];
            })
            ->values();

        return response()->json($enrollments);
    }
}