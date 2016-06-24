<?php

// Import the data base config file
require_once realpath(dirname(__FILE__)."/../../espresso.php");

// Alias the namespaces for ease of writing
use espresso as core;
use espresso\dao as dao;

// This service does not receive any data from the client

// the output json containing the data to be sent to the client
$outputJSON;

// try to connect to the database
try {
    // if the connection was successful, let the client know
    dao\connectToDataBase();
    $outputJSON = [
        "meta" => [
            "return_code" => 0,
            "message" => "Data base server is available"
        ],
        "data" => []
    ];
} catch (Exception $e) {
    // otherwise send an error message
    core\displayErrorPageAndExit($e->getCode(), $e->getMessage());
}

// Send the data to the client as a JSON with the following format
// {
//     meta:[meta]
//     response_data:[]
// }
// where meta is:
// {
//     return_code:[int]
//     message:[string]
// }
header("Content-Type: application/json");
echo json_encode($outputJSON);

?>