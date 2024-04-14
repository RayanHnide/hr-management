<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddEmployeeRequest;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EmployeeController extends Controller
{
    private function saveFile($data, $key)
    {
        $path = Storage::disk('public')->putFileAs(
            $key, $data[$key], Str::uuid() . "_" . $data['fullName']);
        throw_if($path == null, "doesn't save $key");
        return $path;
    }

    public function add(AddEmployeeRequest $request)
    {
        $data = $request->all();
        $user = \auth()->user();
        if (!$user->branch->isMain) {
            $data["branchId"] = $user->branch->id;
        }
        if ($request->has('photo')) {
            $data['photo'] = $this->saveFile($data, 'photo');
        }
        if ($request->has('pdfFile')) {
            $data['pdfFile'] = $this->saveFile($data, 'pdfFile');
        }
        Employee::create($data);

    }

    public function view()
    {
        $employees = Employee::query();
        $branch = \auth()->user()->branch()->firstOrFail();
        if (!$branch->isMain) {
            $employees = $employees->where('branchId', $branch->id);
        }
        return $employees->with('branch')->get();
    }

    public function details($employee)
    {
        return Employee::query()->where("id",$employee)->with('branch')->firstOrFail();
    }

    public function delete(Employee $employee)
    {
        if ($employee->photo != null) {
            Storage::disk('public')->delete($employee->photo);
        }
        if ($employee->pdfFile != null) {
            Storage::disk('public')->delete($employee->pdfFile);
        }
        $employee->delete();

    }

}
