<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Enrollment;
use App\Models\Course;

class SuperAdminDashboardController extends Controller
{
    public function getMetrics(Request $request)
    {
        // Calculate your metrics dynamically from your database models
        $totalStudents = User::where('role', 'student')->count();
        $pendingReviews = Enrollment::where('status', 'pending')->count();
        
        // Example mock or dynamic distribution array for schools/tracks
        $distribution = [
            ['name' => 'Career Tracks', 'students' => max(0, intval($totalStudents * 0.4))],
            ['name' => 'Leadership Tracks', 'students' => max(0, intval($totalStudents * 0.3))],
            ['name' => 'Personal Development', 'students' => max(0, intval($totalStudents * 0.3))],
        ];

        return response()->json([
            'metrics' => [
                'revenue_usd' => 12500,
                'revenue_kes' => 1625000,
                'total_students' => $totalStudents,
                'pending_reviews' => $pendingReviews,
                'conversion_rate' => 68,
            ],
            'distribution' => $distribution
        ]);
    }

    public function storeAdmin(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $admin = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'admin', // or super-admin depending on your schema
        ]);

        return response()->json([
            'message' => 'Staff account created successfully!',
            'admin' => $admin
        ], 201);
    }
}