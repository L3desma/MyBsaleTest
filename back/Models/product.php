<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    use HasFactory;
    protected $primarykey = 'id';
    protected $table = 'product';
    protected $fillable = [
          'id','name','url_image','price','discount','category'
      ];

}
