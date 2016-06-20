<?php

// Import external classes
require_once realpath(dirname(__FILE__)."/../../dao/Procedures.php");

// Alias the namespaces for ease of writing
use espresso as core;
use espresso\dao as dao;

// This script returns all the procedures stored in the data base without
// requiring any input from the user, so we start by creating a temporal
// variable where to store this list
$procedures;

try {
    // attempt to connect to the database
    $dataBaseConnection = dao\connectToDataBase();
    $proceduresTable = new dao\Procedures($dataBaseConnection);

    // get the list of elements from the table
    $procedures = $proceduresTable->getAll();
} catch (Exception $e) {
    core\displayErrorPageAndExit($e->getCode(), $e->getMessage());
}


// The json that is going to be sent back to the client
$outputJSON = [
    "meta" => [
        "return_code" => 0,
        "message" => "Procedures where listed successfully."
    ],
    "data" => [
        "procedures" => []
    ]
];

// store each element read from the table in the resulting JSON
foreach ($procedures as $procedure) {
    array_push($outputJSON["data"]["procedures"], [
        "id" => $procedure["id"],
        "name" => $procedure["name"]
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
//     procedures:[array<procedure>]
// }
// where procedure is:
// {
//     id:[uint]
//     name:[string]
// }
header("Content-Type: application/json");
echo json_encode($outputJSON);

?>