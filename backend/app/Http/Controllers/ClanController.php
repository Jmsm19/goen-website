<?php

namespace App\Http\Controllers;

use App\Clan;
use Illuminate\Http\Request;
use App\Http\Resources\ClanResource;
use App\Http\Requests\ClanUpdateRequest;
use App\Http\Resources\SimpleClanResource;

class ClanController extends Controller
{
    /**
    * @OA\Get(path="/api/clan",
    *   tags={"Model: Clan"},
    *   summary="Display a listing of Clans",
    *   operationId="getAllClans",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Response(
    *       response=200,
    *       description="Clans found",
    *       @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/ClanCollection"))
    *   )
    * )
    */
    public function index()
    {
        return SimpleClanResource::collection(Clan::all());
    }

    /**
    * @OA\Get(path="/api/clan/{clan}",
    *   tags={"Model: Clan"},
    *   summary="Get a Clan by Id",
    *   operationId="getClanById",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of clan",
    *       in="path",
    *       name="clan",
    *       required=true,
    *       @OA\Schema(format="int64", type="integer")
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Clan found",
    *       @OA\JsonContent(ref="#/components/schemas/SingleClan")
    *   )
    * )
    */
    public function show(Clan $clan)
    {
        return new ClanResource($clan);
    }

    /**
    * @OA\Put(path="/api/clan/{clan}",
    *   tags={"Model: Clan"},
    *   summary="Update clan data",
    *   operationId="updateClan",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of clan",
    *       in="path",
    *       name="clan",
    *       required=true,
    *       @OA\Schema(format="int64", type="integer")
    *   ),
    *   @OA\RequestBody(
    *       required=true,
    *       @OA\JsonContent(ref="#/components/schemas/ClanUpdateRequest"),
    *   ),
    *   @OA\Response(
    *       response=200,
    *       description="Returns updated clan",
    *       @OA\JsonContent(ref="#/components/schemas/SingleClan")
    *   )
    * )
    */
    public function update(ClanUpdateRequest $request, Clan $clan)
    {
        $clan->update($request->only(['name', 'picture']));
        return new SimpleClanResource($clan);
    }

    /**
    * @OA\Delete(path="/api/clan/{clan}",
    *   tags={"Model: Clan"},
    *   summary="Delete clan",
    *   operationId="deleteClan",
    *   security={
    *       {"Bearer": {}}
    *   },
    *
    *   @OA\Parameter(
    *       description="Id of clan",
    *       in="path",
    *       name="clan",
    *       required=true,
    *       @OA\Schema(format="int64", type="integer")
    *   ),
    *   @OA\Response(
    *       response=204,
    *       description="Clan deleted",
    *   )
    * )
    */
    public function destroy(Clan $clan)
    {
        $clan->delete();
        return response()->json(null, 204);
    }
}
