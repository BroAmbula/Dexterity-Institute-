<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['title', 'product_type', 'price_kes', 'price_usd', 'description', 'file_path'];
}
