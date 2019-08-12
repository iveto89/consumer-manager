<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Consumer extends Model
{
    protected $fillable = [
        'name',
        'age',
        'city',
    ];
}
