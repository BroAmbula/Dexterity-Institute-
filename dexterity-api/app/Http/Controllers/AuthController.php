<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    // 1. Registration (Auto-verified & Auto-login)
    public function register(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'first_name' => $fields['first_name'],
            'last_name' => $fields['last_name'],
            'name' => $fields['first_name'] . ' ' . $fields['last_name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
            'role' => 'STUDENT', 
            'status' => 'ACTIVE',
            'email_verified_at' => now(), // Automatically mark as verified
        ]);

        // Generate Sanctum access token for immediate login
        $token = $user->createToken('dexterity_access_token')->plainTextToken;

        return response()->json([
            'message' => 'Account created successfully.',
            'user' => $this->userPayload($user),
            'token' => $token,
        ], 201);
    }

    // 2. Token Issuance / Login
    public function login(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $fields['email'])->first();

        // Logging for debugging
        if ($user) {
            $isMatch = Hash::check($fields['password'], $user->password);
            Log::info('Login Attempt', [
                'email' => $fields['email'],
                'password_match' => $isMatch,
            ]);
        } else {
            Log::info('Login Attempt: User not found', ['email' => $fields['email']]);
        }

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json([
                'message' => 'The credentials provided do not match our records.'
            ], 401);
        }

        if ($user->status === 'BANNED') {
            return response()->json([
                'error' => 'Account Suspended',
                'message' => 'This account has been banned. Please contact administrator support.'
            ], 403);
        }

        $token = $user->createToken('dexterity_access_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $this->userPayload($user),
            'token' => $token
        ]);
    }

    private function userPayload(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => trim("{$user->first_name} {$user->last_name}") ?: $user->name,
            'email' => $user->email,
            'role' => $user->role,
        ];
    }

    // 3. Token Revocation / Logout
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out.'
        ]);
    }
}