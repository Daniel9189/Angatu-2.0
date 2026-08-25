<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
            'endereco' => ['required', 'array'],
            'endereco.cep' => ['required', 'string'],
            'endereco.rua' => ['required', 'string'], 
            'endereco.numero' => ['required', 'string'],
            'endereco.cidade' => ['required', 'string'],
            'pagamento' => ['required', 'string', 'in:pix,cartao,boleto'],
            'itens' => ['required', 'array', 'min:1'],
            'itens.*.id' => ['required', 'exists:products,id'],
            'itens.*.quantity' => ['required', 'integer', 'min:1']
        ];
    }
}
