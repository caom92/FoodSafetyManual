<?php

// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     key:[int]
// }
// we must decode it
$inputJSON = $_POST;

// start the session API
session_start();

// initialize the output json object to be sent back to the client
$outputJSON;

// check if the key of the user is set and if it is the same that we
// have stored for this session
if (isset($_SESSION["key"]) && $_SESSION["key"] == $inputJSON["key"]) {
    // if the client's key is the same than ours, then the session
    // was properly initialized
    $outputJSON = [
        "error_code" => 0,
        "error_message" => "",
        "data" => []
    ];
} else {
    // otherwise notify the client so that the user is redirected
    $outputJSON = [
        "error_code" => 1,
        "error_message" => "User has not logged in yet",
        "data" => []
    ];
}

// Send the data to the client as a JSON with the following format
// {
//     error_code:[int],
//     error_message:[string],
//     data:[]
// }
echo json_encode($outputJSON);

?>