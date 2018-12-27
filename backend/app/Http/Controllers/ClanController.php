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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SimpleClanResource::collection(Clan::all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Clan $clan)
    {
        return new ClanResource($clan);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ClanUpdateRequest $request, Clan $clan)
    {
        $clan->update($request->only(['name', 'picture']));
        return new SimpleClanResource($clan);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Clan $clan)
    {
        $clan->delete();
        return response()->json(null, 204);
    }
}
