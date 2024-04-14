<?php

namespace Database\Seeders;

use App\Models\Branch;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BranchesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'الطبقة',
            'القامشلي',
            'كوباني',
            'الحسكة',
            'ديريك',
            'منبج',
            'دير الزور'
        ];
        Branch::create(['name'=>'الرقة','isMain'=>true]);
        foreach ($data as $item){
            Branch::create(['name'=>$item]);
        }
    }
}
