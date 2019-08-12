<?php

namespace App\Http\Controllers\API;

use App\Consumer;
use App\Http\Controllers\Controller;
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'sometimes|required|string|min:4|max:40',
            'age'  => 'sometimes|required|integer|min:14|max:99',
            'city' => 'sometimes|required|in:Sofia,Plovdiv,Varna',
        ]);

        $consumer = Consumer::where('id', $id)->firstOrFail();

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
