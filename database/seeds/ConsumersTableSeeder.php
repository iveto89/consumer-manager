<?php

use Illuminate\Database\Seeder;

class ConsumersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Consumer::class, 10)->create();
    }
}
