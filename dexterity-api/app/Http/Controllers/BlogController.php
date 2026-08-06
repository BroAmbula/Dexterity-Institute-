<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    // Public listing for the main site's Publications page
    public function index()
    {
        $blogs = Blog::with('user:id,name')
            ->latest()
            ->get()
            ->map(function ($blog) {
                return [
                    'id' => $blog->id,
                    'title' => $blog->title,
                    'slug' => $blog->slug,
                    'content' => $blog->content,
                    'summary' => \Illuminate\Support\Str::limit(strip_tags($blog->content), 160),
                    'image' => $blog->image ? asset('storage/' . $blog->image) : null,
                    'author' => $blog->user->name ?? 'Dexterity Institute Team',
                    'created_at' => $blog->created_at,
                ];
            });

        return response()->json($blogs);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048'
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('blogs', 'public');
        }

        $blog = Blog::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . uniqid(),
            'content' => $request->content,
            'image' => $imagePath,
            'user_id' => auth()->id(),
        ]);

        return response()->json(['message' => 'Blog post published live!', 'blog' => $blog], 201);
    }

    public function update(Request $request, Blog $blog)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($blog->image) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($blog->image);
            }
            $blog->image = $request->file('image')->store('blogs', 'public');
        }

        $blog->title = $request->title;
        $blog->content = $request->content;
        $blog->slug = Str::slug($request->title) . '-' . uniqid();
        $blog->save();

        return response()->json(['message' => 'Blog post updated successfully.', 'blog' => $blog]);
    }

    public function destroy(Blog $blog)
    {
        if ($blog->image) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($blog->image);
        }
        $blog->delete();

        return response()->json(['message' => 'Blog post deleted successfully.']);
    }
}