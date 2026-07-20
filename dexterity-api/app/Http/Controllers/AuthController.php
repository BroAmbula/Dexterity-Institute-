<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\EmailVerificationCode;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

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
        // Removed 'id' => Str::uuid() so the database handles auto-incrementing IDs
        $user = User::create([
            'first_name' => $fields['first_name'],
            'last_name' => $fields['last_name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
            'role' => 'STUDENT', 
            'status' => 'ACTIVE',
        ]);

        $this->sendVerificationCode($user->email);

        return response()->json([
            'message' => 'Account created. A verification code has been sent to your email address.',
            'email' => $user->email,
        ], 201);
    }

    public function verifyEmail(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'email' => 'required|string|email',
            'otp' => 'required|string|digits:6',
        ]);

        $code = EmailVerificationCode::where('email', $fields['email'])
            ->latest()
            ->first();

        if (!$code || $code->expires_at->isPast() || !Hash::check($fields['otp'], $code->code_hash)) {
            return response()->json(['message' => 'The verification code is invalid or has expired.'], 422);
        }

        $user = User::where('email', $fields['email'])->firstOrFail();
        $user->update(['email_verified_at' => now()]);
        EmailVerificationCode::where('email', $user->email)->delete();

        $token = $user->createToken('dexterity_access_token')->plainTextToken;

        return response()->json([
            'message' => 'Email verified successfully.',
            'user' => $this->userPayload($user),
            'token' => $token,
        ]);
    }

    public function resendVerificationCode(Request $request): JsonResponse
    {
        $fields = $request->validate(['email' => 'required|string|email']);
        $user = User::where('email', $fields['email'])->first();

        if (!$user) {
            return response()->json(['message' => 'If an account exists, a new verification code has been sent.']);
        }

        $this->sendVerificationCode($user->email);

        return response()->json(['message' => 'A new verification code has been sent.']);
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

    private function sendVerificationCode(string $email): void
    {
        $code = (string) random_int(100000, 999999);

        EmailVerificationCode::where('email', $email)->delete();
        EmailVerificationCode::create([
            'email' => $email,
            'code_hash' => Hash::make($code),
            'expires_at' => now()->addMinutes(10),
        ]);

        Mail::raw(
            "Your Dexterity Initiative verification code is {$code}. It expires in 10 minutes. Do not share this code with anyone.",
            fn ($message) => $message->to($email)->subject('Your Dexterity Initiative verification code')
        );
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
        // Delete current token in use
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out.'
        ]);
    }
}