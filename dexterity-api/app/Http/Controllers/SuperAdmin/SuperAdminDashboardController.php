namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class SuperAdminDashboardController extends Controller
{
    public function getMetrics(): JsonResponse
    {
        // 1. Calculate Multi-Currency Revenue Totals from Supabase
        $revenueUSD = Payment::where('currency', 'USD')->sum('amount_paid');
        $revenueKES = Payment::where('currency', 'KES')->sum('amount_paid');

        // 2. Active Student Metrics (Using case-insensitive checks to prevent 0 mismatches)
        $totalStudents = User::whereRaw('LOWER(role) = ?', ['student'])->count();
        
        $pendingReviews = Enrollment::whereRaw('LOWER(application_status) = ?', ['pending'])
            ->orWhereNull('application_status')
            ->count();

        // 3. Conversion Rates (Using case-insensitive payment status check)
        $totalEnrollments = Enrollment::count();
        $paidEnrollments = Enrollment::whereRaw('LOWER(payment_status) = ?', ['paid'])->count();
        $conversionRate = $totalEnrollments > 0 ? round(($paidEnrollments / $totalEnrollments) * 100, 1) : 0;

        // 4. Student distribution breakdown across the 4 schools
        $schoolDistribution = Course::withCount('enrollments')
            ->get()
            ->map(function ($course) {
                return [
                    'name' => $course->school,
                    'students' => $course->enrollments_count,
                ];
            });

        return response()->json([
            'metrics' => [
                'revenue_usd' => (float)$revenueUSD,
                'revenue_kes' => (float)$revenueKES,
                'total_students' => $totalStudents,
                'pending_reviews' => $pendingReviews,
                'conversion_rate' => $conversionRate
            ],
            'distribution' => $schoolDistribution
        ]);
    }

    public function storeAdmin(Request $request): JsonResponse 
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'required|in:admin,super-admin'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'is_admin' => true,
            'is_super_admin' => $request->role === 'super-admin'
        ]);

        return response()->json([
            'message' => 'Staff account created successfully!',
            'admin' => $user
        ], 201);
    }
}