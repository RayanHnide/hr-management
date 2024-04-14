<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddAdminRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\LoginAdminRequest;
use App\Models\Branch;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function login(LoginAdminRequest $request)
    {
        $data = $request->only(['userName', 'password']);
        if (!Auth::attempt($data)) {
            throw new \Exception("wrong email or password");
        }
        $user = \auth()->user();
        return [
            'token' => $user->createToken($request->ip())->plainTextToken,
            'role' => $user->getRoleNames()[0],
            'branch' => $user->branch,
        ];
    }

    public function add(AddAdminRequest $request)
    {
        $data = $request->only('fullName', 'userName', 'password', 'branchId', 'isAdmin');
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        if ($data['isAdmin']) {
            $user->assignRole('admin');
        } else {
            $user->assignRole('user');
        }
        return [
            'userName'=>$data['userName'],
            'role'=>$user->getRoleNames()
        ];
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $data = $request->only(['password', 'oldPassword', 'password_confirmation']);
        if (!password_verify($data['oldPassword'], \auth()->user()->password)) {
            throw new \Exception('wrong password');
        }
        User::find(\auth()->user()->id)->update(['password' => $data['password']]);
    }

    public function logout() {
        \auth()->user()->tokens()->delete();
        return "success";
    }
}
