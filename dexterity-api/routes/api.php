<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminEnrollmentController;
use App\Http\Controllers\Student\EnrollmentApplicationController;
use App\Http\Controllers\Student\StudentDashboardController;
use App\Http\Controllers\SuperAdmin\AccessControlController;
use App\Http\Controllers\SuperAdmin\ForensicAuditLogsController;
use App\Http\Controllers\SuperAdmin\SuperAdminDashboardController;
use App\Http\Controllers\SuperAdmin\SystemCurriculumController;
use App\Http\Controllers\SuperAdmin\CourseController;
use App\Http\Controllers\Payment\PaymentController;
use Illuminate\Support\Facades\Route;

// ==========================================
// 1. PUBLIC AUTHENTICATION PIPELINE
// ==========================================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/verify-email', [AuthController::class, 'verifyEmail']);
Route::post('/resend-verification-code', [AuthController::class, 'resendVerificationCode']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

// ==========================================
// 2. STUDENT PROTECTED PIPELINE
// ==========================================
Route::middleware('auth:sanctum')->prefix('student')->group(function () {
    Route::get('/my-tracks', [StudentDashboardController::class, 'getMyTracks']);
    Route::get('/active-courses', [EnrollmentApplicationController::class, 'activeCourses']);
    Route::post('/apply', [EnrollmentApplicationController::class, 'apply']);
    Route::post('/pay-and-enroll', [PaymentController::class, 'confirmPayment']);
});

// ==========================================
// 3. OPERATIONS ADMIN ENDPOINTS
// ==========================================
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard/stats', [AdminDashboardController::class, 'getStats']);
    Route::get('/enrollments', [AdminEnrollmentController::class, 'index']);
    Route::patch('/enrollments/{enrollment}/status', [AdminEnrollmentController::class, 'updateStatus']);
    
    // Scoped student view: Admins only see students enrolled in their courses
    Route::get('/enrolled-students', [AdminEnrollmentController::class, 'getAssignedStudents']);

    // Allow regular admins to also add courses and attach PDFs
    Route::post('/courses', [CourseController::class, 'store']);
});

// ==========================================
// 4. ABSOLUTE SYSTEM SECURITY (SUPER ADMIN)
// ==========================================
Route::middleware(['auth:sanctum', 'super-admin'])->prefix('super-admin')->group(function () {
    Route::get('/dashboard/stats', [SuperAdminDashboardController::class, 'getMetrics']);
    Route::get('/curriculum', [SystemCurriculumController::class, 'index']);
    Route::patch('/global/exchange-rate', [SystemCurriculumController::class, 'updateExchangeRate']);
    Route::patch('/courses/{course}/toggle-active', [SystemCurriculumController::class, 'toggleStatus']);
    
    // Course & PDF Management for Super Admin
    Route::post('/courses', [CourseController::class, 'store']);
    
    // User & Staff Access Control
    Route::get('/users', [AccessControlController::class, 'index']);
    Route::post('/users', [AccessControlController::class, 'store']);
    Route::patch('/users/{user}/role', [AccessControlController::class, 'changeRole']);
    Route::patch('/users/{user}/toggle-ban', [AccessControlController::class, 'toggleBan']);
    
    Route::get('/audit-logs', [ForensicAuditLogsController::class, 'index']);
});