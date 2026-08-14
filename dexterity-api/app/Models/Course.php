<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'title',
        'school',
        'description',
        'duration',
        'delivery_mode',
        'eligibility',
        'fee_usd',
        'exchange_rate',
        'is_active',
    ];

    public function lessons()
    {
        return $this->hasMany(Lesson::class)->orderBy('sort_order');
    }
}