<?php

namespace App\Enums;

enum ApplicationStatus: string
{
    case PENDING = 'PENDING';
    case REVIEWING = 'REVIEWING';
    case APPROVED = 'APPROVED';
    case REJECTED = 'REJECTED';
}