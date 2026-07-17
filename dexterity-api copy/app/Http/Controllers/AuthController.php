<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    // 1. Secure Registration
    public function register(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Guard against registration exploits: standard signups ALWAYS default to STUDENT
        $user = User::create([
            'id' => Str::uuid(),
            'first_name' => $fields['first_name'],
            'last_name' => $fields['last_name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
            'role' => 'STUDENT', 
            'status' => 'ACTIVE',
        ]);

        // Generate Sanctum access token
        $token = $user->createToken('dexterity_access_token')->plainTextToken;

        return response()->json([
            'message' => 'Account successfully created!',
            'user' => [
                'id' => $user->id,
                'name' => "{$user->first_name} {$user->last_name}",
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $token
        ], 201);
    }

    // 2. Token Issuance / Login
    public function login(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Attempt to find user
        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json([
                'message' => 'The credentials provided do not match our records.'
            ], 401);
        }

        // Hard stop check for banned users
        if ($user->status === 'BANNED') {
            return response()->json([
                'error' => 'Account Suspended',
                'message' => 'This account has been banned. Please contact administrator support.'
            ], 403);
        }

        // Generate Sanctum access token
        $token = $user->createToken('dexterity_access_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'id' => $user->id,
                'name' => "{$user->first_name} {$user->last_name}",
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $token
        ]);
    }

    // 3. Token Revocation / Logout
    public function logout(Request $request): JsonResponse
    {
        // Delete current token in use
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out.'
        ]);
    }
}