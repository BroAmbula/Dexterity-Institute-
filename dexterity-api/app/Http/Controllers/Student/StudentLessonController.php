<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\LessonProgress;
use Illuminate\Support\Facades\Auth;

class StudentLessonController extends Controller
{
    public function lessons($courseId)
    {
        $userId = Auth::id();

        $course = Course::with(['lessons'])->find($courseId);
        if (! $course) {
            return response()->json(['message' => 'Course not found.'], 404);
        }

        $lessonIds = $course->lessons->pluck('id')->toArray();
        $completed = LessonProgress::where('user_id', $userId)
            ->whereIn('lesson_id', $lessonIds)
            ->whereNotNull('completed_at')
            ->pluck('lesson_id')
            ->toArray();

        $lessons = $course->lessons->map(function ($lesson) use ($completed) {
            return [
                'id' => $lesson->id,
                'title' => $lesson->title,
                'content' => $lesson->content,
                'video_url' => $lesson->video_url,
                'completed' => in_array($lesson->id, $completed),
            ];
        });

        $total = $lessons->count();
        $done = count($completed);
        $percent = $total > 0 ? round(($done / $total) * 100) : 0;

        return response()->json([
            'course' => [ 'id' => $course->id, 'title' => $course->title ],
            'lessons' => $lessons,
            'progress_percent' => $percent,
        ]);
    }

    public function toggleComplete($lessonId)
    {
        $userId = Auth::id();
        $lesson = Lesson::find($lessonId);
        if (! $lesson) {
            return response()->json(['message' => 'Lesson not found.'], 404);
        }

        $record = LessonProgress::firstOrNew(['user_id' => $userId, 'lesson_id' => $lesson->id]);
        if ($record->completed_at) {
            $record->completed_at = null;
            $record->save();
            return response()->json(['message' => 'Lesson marked as incomplete.']);
        }

        $record->completed_at = now();
        $record->save();
        return response()->json(['message' => 'Lesson marked complete.']);
    }
}
