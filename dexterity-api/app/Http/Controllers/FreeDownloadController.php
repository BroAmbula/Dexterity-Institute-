<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\FreeDownloadMail;

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

        Mail::to($request->input('email'))->send($mail);

        return response()->json([
            'message' => 'Thanks! The download link has been sent to your email.',
        ]);
    }
}
