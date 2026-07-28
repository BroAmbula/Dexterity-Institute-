<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Enrollment;
use App\Models\Course;
use Illuminate\Support\Facades\Hash;

class SuperAdminDashboardController extends Controller
{
    public function getMetrics(Request $request)
    {
        $totalStudents = User::where('role', 'student')->count();
        $pendingReviews = Enrollment::where('status', 'pending')->count();
        
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

    public function dashboardStats(Request $request)
    {
        return $this->getMetrics($request);
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
            'password' => Hash::make($request->password),
            'role' => 'admin',
        ]);

        return response()->json([
            'message' => 'Staff account created successfully!',
            'admin' => $admin
        ], 201);
    }

    public function storeStudent(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'phone' => 'nullable|string',
        ]);

        $student = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'role' => 'student',
            'status' => 'active',
        ]);

        return response()->json([
            'message' => 'Student account created successfully!',
            'student' => $student
        ], 201);
    }

    public function index()
    {
        $enrollments = Enrollment::where('status', 'pending')->get();
        return response()->json($enrollments);
    }

    public function updateEnrollmentStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:approved,rejected,pending'
        ]);

        $enrollment = Enrollment::findOrFail($id);
        $enrollment->status = $request->status;
        $enrollment->save();

        return response()->json([
            'message' => 'Enrollment status updated successfully',
            'enrollment' => $enrollment
        ]);
    }
}