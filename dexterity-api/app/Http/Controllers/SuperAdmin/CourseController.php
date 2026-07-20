<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Store a newly created course.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'         => 'required|string|max:255',
            'school'        => 'required|string|max:255',
            'description'   => 'required|string',
            'duration'      => 'required|string|max:100',
            'delivery_mode' => 'required|string|max:100',
            'eligibility'   => 'required|string',
            'fee_usd'       => 'required|numeric',
            'exchange_rate' => 'required|numeric',
            'is_active'     => 'boolean'
        ]);

        $course = Course::create($validated);

        return response()->json([
            'message' => 'Course created successfully',
            'course' => $course
        ], 201);
    }
}