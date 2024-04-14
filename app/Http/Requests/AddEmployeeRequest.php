<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'code'=>['required','string'],
            'fullName'=>['required','string'],
            'motherName'=>['required','string'],
            'birthDate'=>['required','date'],
            'placeOfBirth'=>['required','string'],
            'Constraint'=>['required','string'],  // القيد
            'nationalId'=>['required','string'],
            'education'=>['string'],
            'specialization'=>['string'],
            'mainSalary'=>['required','numeric'],
            'phone'=>['required','string'],
            'email'=>['required','email','unique:employees'],
            'photo'=>['file'],
            'pdfFile'=>['file'],
            'salary'=>['required','numeric'],
            'vacation'=>['string'],
            'position'=>['required','string'],  //المنصب الوظيفي
            'department'=>['required','string'],
            'startDate'=>['required','date'],
            'endDate'=>['date'],
            'experience'=>['string'],
            'rate'=>['numeric'],
            'changeSalary'=>['string'],
            'note'=>['string'],
            'lastWork'=>['string'],
            'branchId'=>['numeric']
        ];
    }
}
