<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\FreeDownloadMail;
use App\Models\FreeDownloadLog;

class FreeDownloadController extends Controller
{
    protected function downloads(): array
    {
        return config('free-downloads', []);
    }

    public function index()
    {
        $downloads = collect($this->downloads())->map(function ($download) {
            return [
                'id' => $download['id'],
                'title' => $download['title'],
                'description' => $download['description'],
            ];
        })->values();

        return response()->json($downloads);
    }

    public function send(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'download_id' => 'required|string',
        ]);

        $download = collect($this->downloads())->firstWhere('id', $request->input('download_id'));

        if (! $download) {
            return response()->json(['message' => 'The selected document was not found.'], 404);
        }

        $storagePath = storage_path('app/public/' . $download['file_path']);
        $downloadUrl = asset('storage/' . $download['file_path']);

        $mail = new FreeDownloadMail($download, $downloadUrl);

        if (file_exists($storagePath)) {
            $mail->attach($storagePath, [
                'as' => $download['download_name'] ?? basename($storagePath),
                'mime' => 'application/pdf',
            ]);
        }

        try {
            Mail::to($request->input('email'))->queue($mail);
        } catch (\Exception $e) {
            // Fallback to synchronous send if queueing fails
            try {
                Mail::to($request->input('email'))->send($mail);
            } catch (\Exception $e) {
                // swallow
            }
        }

        // Log the free download request for reporting
        try {
            FreeDownloadLog::create([
                'download_id' => $download['id'],
                'email' => $request->input('email'),
                'user_id' => optional($request->user())->id,
                'ip_address' => $request->ip(),
                'user_agent' => $request->header('User-Agent'),
            ]);
        } catch (\Exception $e) {
            // Don't fail the request if logging fails
        }

        return response()->json([
            'message' => 'Thanks! The download link has been sent to your email.',
        ]);
    }
}
