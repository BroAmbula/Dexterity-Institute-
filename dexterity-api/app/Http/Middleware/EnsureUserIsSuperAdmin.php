<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsSuperAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Normalize so 'SUPER_ADMIN', 'super_admin', 'super-admin', etc. all match —
        // this codebase stores the role field inconsistently across controllers.
        $normalizedRole = $user ? strtoupper(str_replace('-', '_', $user->role)) : null;

        // Hard stop: ONLY the absolute highest tier can access financial overrides
        if (!$user || $normalizedRole !== 'SUPER_ADMIN') {
            return response()->json([
                'error' => 'Critical Access Violation',
                'message' => 'This action strictly requires absolute Super Admin privileges.'
            ], 403);
        }

        return $next($request);
    }
}