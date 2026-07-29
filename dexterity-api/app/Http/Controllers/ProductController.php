<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Purchase;

class ProductController extends Controller
{
    // Public listing for the main site's marketplace/books section
    public function index()
    {
        $products = Product::latest()->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'title' => $product->title,
                'type' => $product->type,
                'price_kes' => (float) $product->price_kes,
                'price_usd' => (float) $product->price_usd,
                'description' => $product->description,
                'created_at' => $product->created_at,
            ];
        });

        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:book,course',
            'price_kes' => 'required|numeric',
            'price_usd' => 'required|numeric',
            'file' => 'required|file|max:51200' // Max 50MB
        ]);

        $filePath = $request->file('file')->store('products', 'public');

        $product = Product::create([
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
            'price_kes' => $request->price_kes,
            'price_usd' => $request->price_usd,
            'file_path' => $filePath,
        ]);

        return response()->json(['message' => 'Product uploaded to marketplace successfully', 'product' => $product], 201);
    }

    public function download(Request $request, Product $product)
    {
        $hasPurchased = Purchase::where('user_id', auth()->id())
            ->where('product_id', $product->id)
            ->where('is_paid', true)
            ->exists();

        if (!$hasPurchased && auth()->user()->role !== 'super-admin') {
            return response()->json(['message' => 'Access denied. Verified purchase required to download this asset.'], 403);
        }

        $path = storage_path('app/public/' . $product->file_path);
        if (!file_exists($path)) {
            return response()->json(['message' => 'File asset missing from server storage.'], 404);
        }

        return response()->download($path);
    }
    public function destroy(Product $product)
    {
        if ($product->file_path) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($product->file_path);
        }
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully.']);
    }
}