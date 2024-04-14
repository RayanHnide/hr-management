<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddAdminRequest extends FormRequest
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
            'fullName'=>['required','string'],
            'userName'=>['required','string'],
            'password'=>['required','string','min:8','confirmed'],
            'branchId'=>['required','exists:branches,id'],
            'isAdmin'=>['required','boolean']
        ];
    }
}
