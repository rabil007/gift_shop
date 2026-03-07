<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = ['name'];

    public const ADMIN_ID = 1;
    public const CUSTOMER_ID = 2;
}
