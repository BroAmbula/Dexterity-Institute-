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
        // General admins only see operational telemetry
        $activeStudents = User::where('role', 'STUDENT')->where('status', 'ACTIVE')->count();
        $pendingApplications = Enrollment::where('application_status', 'PENDING')->count();
        
        $completedCourses = Enrollment::where('application_status', 'APPROVED')
            ->where('payment_status', 'PAID')
            ->count(); // In a live setting, this would join with a certificate/completion metric

        return response()->json([
            'active_students' => $activeStudents,
            'pending_applications' => $pendingApplications,
            'completed_courses' => $completedCourses
        ]);
    }
}