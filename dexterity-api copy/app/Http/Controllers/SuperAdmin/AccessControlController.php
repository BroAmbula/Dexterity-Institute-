<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AccessControlController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = User::query();

        // Search feature matching our frontend search input
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->select('id', 'first_name', 'last_name', 'email', 'role', 'status')->get();
        return response()->json($users);
    }

    // Changes system role (STUDENT, ADMIN, SUPER_ADMIN)
    public function changeRole(Request $request, User $user): JsonResponse
    {
        $request->validate([
            'role' => 'required|string|in:STUDENT,ADMIN,SUPER_ADMIN'
        ]);

        $user->update(['role' => $request->role]);

        return response()->json([
            'message' => "User role for {$user->first_name} has been updated to {$request->role}."
        ]);
    }

    // Bans or reinstates an account instantly
    public function toggleBan(User $user): JsonResponse
    {
        $newStatus = $user->status === 'ACTIVE' ? 'BANNED' : 'ACTIVE';
        $user->update(['status' => $newStatus]);

        return response()->json([
            'message' => "User status updated to {$newStatus}.",
            'status' => $newStatus
        ]);
    }
}