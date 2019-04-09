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
    * @OA\Get(path="/api/price",
    *   tags={"Model: Price", "Role: Admin"},
    *   summary="Display a listing of Prices",
    *   operationId="getAllPrices",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Response(
    *       response=200,
    *       description="Prices found",
    *       @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/PriceCollection"))
    *   )
    * )
    */
    public function index()
    {
        return PriceResource::collection(Price::all());
    }

    /**
    * @OA\Post(path="/api/price",
    *   tags={"Model: Price", "Role: Admin"},
    *   summary="Store price",
    *   operationId="storePrice",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\RequestBody(
    *       required=true,
    *       @OA\JsonContent(ref="#/components/schemas/PriceStoreRequest"),
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Returns created price",
    *       @OA\JsonContent(ref="#/components/schemas/SinglePrice")
    *   )
    * )
    */
    public function store(PriceStoreRequest $request)
    {
        $price = Price::create([
            'amount' => $request->amount,
        ]);

        return new PriceResource($price);
    }

    /**
     * @OA\Get(path="/api/price/{price}",
     *   tags={"Model: Price", "Role: Admin"},
     *   summary="Get a Price by Id",
     *   operationId="getPriceById",
     *   security={
     *       {"Bearer": {}}
     *   },
     *
     *   @OA\Parameter(
     *       description="Id of price",
     *       in="path",
     *       name="price",
     *       required=true,
     *       @OA\Schema(format="int64", type="integer")
     *   ),
     *   @OA\Response(
     *       response=200,
     *       description="Price found",
     *       @OA\JsonContent(ref="#/components/schemas/SinglePrice")
     *   )
     * )
     */
    public function show(Price $price)
    {
        return new PriceResource($price);
    }

    /**
    * @OA\Put(path="/api/price/{price}",
    *   tags={"Model: Price", "Role: Admin"},
    *   summary="Update price data",
    *   operationId="updatePrice",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of price",
    *       in="path",
    *       name="price",
    *       required=true,
    *       @OA\Schema(type="integer",format="int64")
    *   ),
    *   @OA\RequestBody(
    *       required=true,
    *       @OA\JsonContent(ref="#/components/schemas/PriceUpdateRequest"),
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Returns updated price",
    *       @OA\JsonContent(ref="#/components/schemas/SinglePrice")
    *   )
    * )
    */
    public function update(PriceUpdateRequest $request, Price $price)
    {
        $price->update($request->only(['amount']));
        return  new PriceResource($price);
    }

    /**
    * @OA\Delete(path="/api/price/{price}",
    *   tags={"Model: Price", "Role: Admin"},
    *   summary="Delete price",
    *   operationId="deletePrice",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of price",
    *       in="path",
    *       name="price",
    *       required=true,
    *       @OA\Schema(type="integer", format="int64")
    *   ),
    *   @OA\Response(
    *       response=204,
    *       description="Price deleted",
    *   )
    * )
    */
    public function destroy(Price $price)
    {
        $price->delete();
        return response()->json(null, 204);
    }
}
