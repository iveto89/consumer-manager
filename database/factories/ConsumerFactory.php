<?php

use Faker\Generator as Faker;

$factory->define(App\Consumer::class, function (Faker $faker) {
    return [
        'name' => substr($faker->name(), 0, rand(4, 40)),
        'age' => $faker->numberBetween(14, 99),
        'city' => $faker->randomElement(['Sofia', 'Plovdiv', 'Varna']),
    ];
});
