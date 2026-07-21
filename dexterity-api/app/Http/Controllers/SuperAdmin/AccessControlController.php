<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AccessControlController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = User::query();

        // Search feature matching frontend search input
        if ($request->has('search') && $request->input('search') !== '') {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->get();
        return response()->json($users, 200);
    }

    // Direct creation of staff/admin accounts by Super Admin
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|string|in:student,admin,super-admin,STUDENT,ADMIN,SUPER_ADMIN',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => strtolower($request->role),
            'email_verified_at' => now(),
        ]);

        return response()->json([
            'message' => 'Staff/Admin account created successfully!',
            'user' => $user
        ], 201);
    }

    // Changes system role securely
    public function changeRole(Request $request, User $user): JsonResponse
    {
        $request->validate([
            'role' => 'required|string|in:student,admin,super-admin,STUDENT,ADMIN,SUPER_ADMIN'
        ]);

        $user->update(['role' => strtolower($request->role)]);

        return response()->json([
            'message' => 'User role updated successfully!',
            'user' => $user
        ], 200);
    }

    // Toggle ban or user status instantly
    public function toggleBan(User $user): JsonResponse
    {
        if (array_key_exists('is_banned', $user->getAttributes())) {
            $user->is_banned = !$user->is_banned;
            $user->save();
        } else {
            $newStatus = ($user->status ?? 'ACTIVE') === 'ACTIVE' ? 'BANNED' : 'ACTIVE';
            $user->update(['status' => $newStatus]);
        }

        return response()->json([
            'message' => 'User status updated successfully!',
            'user' => $user
        ], 200);
    }
}