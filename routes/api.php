<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\AdminController;
use \App\Http\Controllers\BranchController;
use \App\Http\Controllers\EmployeeController;


Route::post('/login',[AdminController::class,'login']);

Route::middleware('auth:sanctum')->group(function (){
    Route::post('/logout',[AdminController::class,'logout']);

    Route::post('/admin/add',[AdminController::class,'add'])->middleware('role:admin');

    Route::post('/change-password',[AdminController::class,'changePassword']);
    Route::get('/view/branches',[BranchController::class,'view']);

    Route::controller(EmployeeController::class)->prefix('/employee')->group(function (){
       Route::post('/add','add')->middleware('role:admin');
       Route::get('/view','view');
       Route::get('/details/{employee}','details');
       Route::delete('/delete/{employee}','delete');
    });
});

