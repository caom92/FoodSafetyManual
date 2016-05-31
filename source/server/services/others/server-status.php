<?php

// Import the data base config file
require_once realpath(dirname(__FILE__)."/../../config.php");

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
        "error_code" => 0,
        "error_message" => "",
        "data" => []
    ];
} catch (Exception $e) {
    // otherwise send an error message
    core\displayErrorPageAndExit($e->getCode(), $e->getMessage());
}

// Send the data to the client as a JSON with the following format
// {
//     error_code:[int],
//     error_message:[string],
//     data:[]
// }
echo json_encode($outputJSON);

?>