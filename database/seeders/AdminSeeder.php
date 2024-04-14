<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
        $role1 = Role::create(['name'=>'admin']);
        $role2 = Role::create(['name'=>'user']);
        $user = User::create([
            'fullName'=>'Shaza Al Hamad',
            'userName'=>'shaza123',
            'password'=>Hash::make('123123123'),
            'branchId'=>Branch::where('name','الرقة')->first()->id
        ]);
        $user->assignRole($role1);
    }
}
