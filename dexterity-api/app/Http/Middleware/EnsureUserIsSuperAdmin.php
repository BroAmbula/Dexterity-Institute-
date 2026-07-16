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

        // Hard stop: ONLY the absolute highest tier can access financial overrides
        if (!$user || $user->role !== 'SUPER_ADMIN') {
            return response()->json([
                'error' => 'Critical Access Violation',
                'message' => 'This action strictly requires absolute Super Admin privileges.'
            ], 403);
        }

        return $next($request);
    }
}