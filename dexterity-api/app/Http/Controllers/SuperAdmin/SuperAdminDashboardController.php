<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class SuperAdminDashboardController extends Controller
{
    public function getMetrics(): JsonResponse
    {
        // 1. Calculate Multi-Currency Revenue Totals from Supabase
        $revenueUSD = Payment::where('currency', 'USD')->sum('amount_paid');
        $revenueKES = Payment::where('currency', 'KES')->sum('amount_paid');

        // 2. Active Student Metrics
        $totalStudents = User::where('role', 'STUDENT')->count();
        $pendingReviews = Enrollment::where('application_status', 'PENDING')->count();

        // 3. Conversion Rates
        $totalEnrollments = Enrollment::count();
        $paidEnrollments = Enrollment::where('payment_status', 'PAID')->count();
        $conversionRate = $totalEnrollments > 0 ? round(($paidEnrollments / $totalEnrollments) * 100, 1) : 0;

        // 4. Student distribution breakdown across the 4 schools
        $schoolDistribution = Course::withCount('enrollments')
            ->get()
            ->map(function ($course) {
                return [
                    'name' => $course->school,
                    'students' => $course->enrollments_count,
                ];
            });

        return response()->json([
            'metrics' => [
                'revenue_usd' => (float)$revenueUSD,
                'revenue_kes' => (float)$revenueKES,
                'total_students' => $totalStudents,
                'pending_reviews' => $pendingReviews,
                'conversion_rate' => $conversionRate
            ],
            'distribution' => $schoolDistribution
        ]);
    }
}