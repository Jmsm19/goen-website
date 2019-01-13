<?php

namespace App\Http\Controllers;

use App\Price;
use Illuminate\Http\Request;
use App\Http\Resources\PriceResource;
use App\Http\Requests\PriceStoreRequest;
use App\Http\Requests\PriceUpdateRequest;

class PriceController extends Controller
{
    /**
     * Display a listing of the Price.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PriceResource::collection(Price::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PriceStoreRequest $request)
    {
        $price = Price::create([
            'amount' => $request->amount,
        ]);

        return new PriceResource($price);
    }

    /**
     * Display the specified Price.
     *
     * @param  Price  $price
     * @return \Illuminate\Http\Response
     */
    public function show(Price $price)
    {
        return new PriceResource($price);
    }

    /**
     * Update the specified Price in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Price  $price
     * @return \Illuminate\Http\Response
     */
    public function update(PriceUpdateRequest $request, Price $price)
    {
        $price->update($request->only(['amount']));
        return  new PriceResource($price);
    }

    /**
     * Remove the specified Price from storage.
     *
     * @param  Price  $price
     * @return \Illuminate\Http\Response
     */
    public function destroy(Price $price)
    {
        $price->delete();
        return response()->json(null, 204);
    }
}
