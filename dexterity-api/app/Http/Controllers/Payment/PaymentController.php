<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Enrollment;
use App\Models\Payment;
use App\Models\Course;
use Illuminate\Http\JsonResponse;

class PaymentController extends Controller
{
    // Business paybill details money is simulated as being sent to.
    // Replace with real Daraja API credentials when going live.
    private const PAYBILL_NUMBER = '718444';
    private const ACCOUNT_NUMBER = '478607';

    public function confirmPayment(Request $request): JsonResponse
    {
        // Kenyan phone format: exactly 10 digits, starting with 01 or 07 (e.g. 0712345678)
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'phone_number' => ['required', 'regex:/^0[17][0-9]{8}$/'],
        ], [
            'phone_number.regex' => 'Enter a valid M-Pesa number: 10 digits starting with 07 or 01 (e.g. 0712345678).',
        ]);

        $course = Course::findOrFail($request->course_id);

        $existingEnrollment = Enrollment::where('user_id', auth()->id())
            ->where('course_id', $request->course_id)
            ->first();

        if ($existingEnrollment && $existingEnrollment->payment_status === 'paid') {
            return response()->json(['message' => 'You are already enrolled in this course.'], 400);
        }

        // Simulate sending an STK push to paybill 718444 / account 478607,
        // then simulate an immediate successful confirmation (no real Daraja call yet).
        $amount = $course->fee_usd * $course->exchange_rate;

        $payment = Payment::create([
            'user_id' => auth()->id(),
            'course_id' => $course->id,
            'phone_number' => $request->phone_number,
            'amount_paid' => $amount,
            'currency' => 'KES',
            'status' => 'completed',
            'mpesa_receipt' => 'SIM' . strtoupper(uniqid()),
        ]);

        if ($existingEnrollment) {
            $existingEnrollment->update(['status' => 'active', 'payment_status' => 'paid']);
            $enrollment = $existingEnrollment;
        } else {
            $enrollment = Enrollment::create([
                'user_id' => auth()->id(),
                'course_id' => $course->id,
                'status' => 'active',
                'payment_status' => 'paid',
            ]);
        }

        return response()->json([
            'message' => "STK push sent to {$request->phone_number} and payment confirmed via paybill " . self::PAYBILL_NUMBER . ".",
            'payment' => $payment,
            'enrollment' => $enrollment,
        ], 200);
    }
}