<?php

namespace App\Http\Controllers\API;

use App\Consumer;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreConsumer;
use Illuminate\Http\Request;

class ConsumerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $consumers = Consumer::all();

        return response()->json($consumers);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param StoreConsumer $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function store(StoreConsumer $request)
    {
        $consumer = Consumer::create($request->only(['name', 'age', 'city']));

        return response($consumer, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param StoreConsumer $request
     * @param Consumer $consumer
     * @return \Illuminate\Http\Response
     */
    public function update(StoreConsumer $request, Consumer $consumer)
    {
        $consumer->update($request->all());

        return response($consumer, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Request $request
     * @param Consumer $consumer
     * @return void
     */
    public function destroy(Request $request, Consumer $consumer)
    {
        $consumer->delete();

        return response('', 200);
    }
}
