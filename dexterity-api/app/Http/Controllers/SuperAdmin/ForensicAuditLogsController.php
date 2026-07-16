<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ForensicAuditLogsController extends Controller
{
    public function index(): JsonResponse
    {
        // Pull logs dynamically from our audit_logs migration table joined with user metadata
        $logs = DB::table('audit_logs')
            ->join('users', 'audit_logs.user_id', '=', 'users.id')
            ->select(
                'audit_logs.id',
                'audit_logs.action',
                'audit_logs.details',
                'audit_logs.created_at as timestamp',
                DB::raw("CONCAT(users.first_name, ' ', users.last_name, ' (', users.role, ')') as admin")
            )
            ->orderByDesc('audit_logs.created_at')
            ->get();

        return response()->json($logs);
    }
}