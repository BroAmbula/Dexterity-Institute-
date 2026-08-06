<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class FreeDownloadMail extends Mailable
{
    public array $download;
    public string $downloadUrl;

    public function __construct(array $download, string $downloadUrl)
    {
        $this->download = $download;
        $this->downloadUrl = $downloadUrl;
    }

    public function build()
    {
        return $this
            ->subject("Your requested Dexterity Institute resource: {$this->download['title']}")
            ->view('emails.free_download')
            ->with([
                'download' => $this->download,
                'downloadUrl' => $this->downloadUrl,
            ]);
    }
}
