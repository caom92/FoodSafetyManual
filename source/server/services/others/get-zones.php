<?php

// Import external classes
require_once realpath(dirname(__FILE__)."/../../dao/Zones.php");

// Alias the namespaces for ease of writing
use espresso as core;
use espresso\dao as dao;

// This script returns all the zones stored in the data base without
// requiring any input from the user, so we start by creating a temporal
// variable where to store this list
$zones;

try {
    // attempt to connect to the database
    $dataBaseConnection = dao\connectToDataBase();
    $zonesTable = new dao\Zones($dataBaseConnection);

    // get the list of elements from the table
    $zones = $zonesTable->getAll();
} catch (Exception $e) {
    core\displayErrorPageAndExit($e->getCode(), $e->getMessage());
}


// The json that is going to be sent back to the client
$outputJSON = [
    "meta" => [
        "return_code" => 0,
        "message" => "Zones where listed successfully."
    ],
    "data" => [
        "zones" => []
    ]
];

// store each element read from the table in the resulting JSON
foreach ($zones as $zone) {
    array_push($outputJSON["data"]["zones"], [
        "id" => $zone["id"],
        "name" => $zone["name"]
    ]);
}

// Send the data to the client as a JSON with the following format
// {
//     meta:[meta]
//     data:[data]
// }
// where meta is:
// {
//     return_code:[int]
//     message:[string]
// }
// where data is:
// {
//     zones:[array<zone>]
// }
// where zone is:
// {
//     id:[uint]
//     name:[string]
// }
header("Content-Type: application/json");
echo json_encode($outputJSON);

?>