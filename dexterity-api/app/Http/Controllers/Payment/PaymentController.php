<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Enrollment;
use Illuminate\Http\JsonResponse;

class PaymentController extends Controller
{
    public function confirmPayment(Request $request): JsonResponse
    {
        // 1. Validate that course_id is provided and exists
        $request->validate([
            'course_id' => 'required|exists:courses,id',
        ]);

        // 2. Prevent duplicate active enrollments for the same course
        $existingEnrollment = Enrollment::where('user_id', auth()->id())
            ->where('course_id', $request->course_id)
            ->first();

        if ($existingEnrollment) {
            return response()->json([
                'message' => 'You are already enrolled in this course.'
            ], 400);
        }

        // 3. Create the enrollment record so it instantly reflects on the student dashboard
        Enrollment::create([
            'user_id' => auth()->id(),
            'course_id' => $request->course_id,
            'status' => 'active',
            'payment_status' => 'paid'
        ]);

        return response()->json([
            'message' => 'Enrollment and payment successful!'
        ], 200);
    }
}