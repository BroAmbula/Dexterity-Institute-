<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class PurchaseMail extends Mailable
{
    public $product;
    public $downloadUrl;

    public function __construct(array $product, string $downloadUrl)
    {
        $this->product = $product;
        $this->downloadUrl = $downloadUrl;
    }

    public function build()
    {
        return $this
            ->subject("Your Dexterity Institute purchase: {$this->product['title']}")
            ->view('emails.purchase_confirm')
            ->with([
                'product' => $this->product,
                'downloadUrl' => $this->downloadUrl,
            ]);
    }
}
