<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use App\HttP\Requests\CreateCustomerRequest;

class CustomerController extends Controller
{
    public function all()
    {
        $customers = Customer::paginate(10);

        return response()->json([
            "customers" => $customers
        ], 200);
    }

    public function get($id)
    {
        $customer = Customer::whereId($id)->first();

        return response()->json([
            "customer" => $customer
        ], 200);
    }

    public function new(CreateCustomerRequest $request)
    {
        $customer = Customer::create($request->only(['name', 'email', 'phone', 'website']));

        return response()->json([
            "customer" => $customer
        ], 200);
    }
}
