<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    protected $table='employees';
    protected $fillable =
        [
            'code',
            'fullName',
            'motherName',
            'birthDate',
            'placeOfBirth',

            'Constraint',  // القيد
            'nationalId',
            'education',
            'specialization',
            'mainSalary',

            'phone',
            'email',
            'photo',
            'pdfFile',
            'salary',

            'vacation',
            'position',  //المنصب الوظيفي
            'department',
            'startDate',
            'endDate',

            'experience',
            'rate',
            'changeSalary',
            'note',
            'lastWork',

            'branchId'
        ];

    public function branch(){
        return $this->belongsTo(Branch::class,'branchId','id');
    }
}
