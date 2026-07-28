<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Normalize so 'ADMIN'/'admin'/'super-admin'/'SUPER_ADMIN' etc. all match —
        // this codebase stores the role field inconsistently across controllers.
        $normalizedRole = $user ? strtoupper(str_replace('-', '_', $user->role)) : null;

        // Allow both regular Admins and Super Admins into operational routes
        if (!$user || !in_array($normalizedRole, ['ADMIN', 'SUPER_ADMIN'])) {
            return response()->json([
                'error' => 'Unauthorized Access',
                'message' => 'This area requires administrative privileges.'
            ], 403);
        }

        return $next($request);
    }
}