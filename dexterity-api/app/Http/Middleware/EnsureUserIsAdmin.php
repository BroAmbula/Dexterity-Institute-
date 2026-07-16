<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Allow both regular Admins and Super Admins into operational routes
        if (!$user || !in_array($user->role, ['ADMIN', 'SUPER_ADMIN'])) {
            return response()->json([
                'error' => 'Unauthorized Access',
                'message' => 'This area requires administrative privileges.'
            ], 403);
        }

        return $next($request);
    }
}