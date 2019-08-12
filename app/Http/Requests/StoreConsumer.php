<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreConsumer extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'sometimes|required|string|min:4|max:40',
            'age'  => 'sometimes|required|integer|min:14|max:99',
            'city' => 'sometimes|required|in:Sofia,Plovdiv,Varna',
        ];
    }

}
