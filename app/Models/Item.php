<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'price',
        'image',
        'tag',
        'sort_order',
        'is_hero',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_hero' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
