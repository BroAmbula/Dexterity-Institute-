<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AdminDashboardController extends Controller
{
    public function getStats(): JsonResponse
    {
        // General admins only see operational telemetry.
        // Role/status values are case-insensitive here since they've been
        // stored with inconsistent casing across different parts of the app.
        $activeStudents = User::whereRaw('LOWER(role) = ?', ['student'])
            ->whereRaw('LOWER(status) = ?', ['active'])
            ->count();

        $pendingApplications = Enrollment::where('status', 'pending')->count();

        $completedCourses = Enrollment::where('status', 'active')
            ->where('payment_status', 'paid')
            ->count(); // In a live setting, this would join with a certificate/completion metric

        return response()->json([
            'active_students' => $activeStudents,
            'pending_applications' => $pendingApplications,
            'completed_courses' => $completedCourses
        ]);
    }
}