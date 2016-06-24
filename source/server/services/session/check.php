<?php

// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     key:[string]
// }

// start the session API
session_start();

// initialize the output json object to be sent back to the client
$outputJSON;

// check if the user has a session initiated in the server
if (isset($_SESSION["id"])) {
    $outputJSON = [
        "meta" => [
            "return_code" => 0,
            "message" => "User is logged in."
        ],
        "data" => []
    ];
} else {
    // otherwise notify the client so that the user is redirected
    $outputJSON = [
        "meta" => [
            "return_code" => 1,
            "message" => "User has not logged in yet."
        ],
        "data" => []
    ];
}

// Send the data to the client as a JSON with the following format
// {
//     meta:[meta]
//     data:[]
// }
// where meta is:
// {
//     return_code:[int]
//     message:[string]
// }
header("Content-Type: application/json");
echo json_encode($outputJSON);

?>