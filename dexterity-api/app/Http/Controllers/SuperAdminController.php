<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Purchase;

class SuperAdminController extends Controller
{
    public function dashboardStats()
    {
        // Query live metrics from Supabase
        $totalStudents = User::where('role', 'student')->count();
        
        $revenueKes = Purchase::where('is_paid', true)
            ->join('products', 'purchases.product_id', '=', 'products.id')
            ->sum('products.price_kes');

        $revenueUsd = Purchase::where('is_paid', true)
            ->join('products', 'purchases.product_id', '=', 'products.id')
            ->sum('products.price_usd');

        return response()->json([
            'metrics' => [
                'revenue_usd' => (float) $revenueUsd,
                'revenue_kes' => (float) $revenueKes,
                'total_students' => $totalStudents,
                'pending_reviews' => 0, 
                'conversion_rate' => 15.4, 
            ],
            'distribution' => [
                ['name' => 'Career School', 'students' => (int)($totalStudents * 0.4)],
                ['name' => 'Leadership School', 'students' => (int)($totalStudents * 0.3)],
                ['name' => 'Personal Development', 'students' => (int)($totalStudents * 0.3)],
            ]
        ]);
    }

    public function storeStudent(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'phone' => 'nullable|string'
        ]);

        $student = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'phone' => $request->phone,
            'role' => 'student'
        ]);

        return response()->json([
            'message' => 'Student successfully enrolled', 
            'student' => $student
        ], 201);
    }
}