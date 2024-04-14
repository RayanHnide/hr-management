<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;
    protected $table = 'branches';
    protected $fillable=[
        'name',
        'isMain'
    ];

    public function users(){
        return $this->hasMany(User::class,'branchId','id');
    }
    public function employees(){
        return $this->hasMany(Employee::class,'branchId','id');
    }
}
