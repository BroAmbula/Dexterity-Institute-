<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FreeDownloadLog extends Model
{
    protected $table = 'free_download_logs';

    protected $fillable = [
        'download_id',
        'email',
        'user_id',
        'ip_address',
        'user_agent',
    ];
}
