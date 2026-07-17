<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

// Your existing route
Route::get('/', function () {
    return view('frontend');
});

// New test route to check database connectivity
Route::get('/test-db', function () {
    try {
        DB::connection()->getPdo();
        return "✅ Successfully connected to the database: " . DB::connection()->getDatabaseName();
    } catch (\Exception $e) {
        return "❌ Could not connect to the database. Error: " . $e->getMessage();
    }
});