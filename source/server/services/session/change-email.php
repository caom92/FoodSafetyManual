<?php

// Import external classes
require_once realpath(dirname(__FILE__)."/../../dao/UserProfiles.php");

// Alias the namespaces for ease of writing
use espresso as core;
use espresso\dao as dao;

// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     user_id:[uint]
//     new_email:[string]
// }

// the output JSON object to be sent back to the client
$outputJSON;

try {
    // attempt to connect to the database
    $dataBaseConnection = dao\connectToDataBase();
    $userProfilesTable = new dao\UserProfiles($dataBaseConnection);

    // modify the password of the user in the data base
    $result = $userProfilesTable->changeEmailOfUserWithID(
        $_POST["user_id"], 
        $_POST["new_email"]
    );  

    // check if the password was changed successfully
    if ($result != 0) {
        $_SESSION["email"] = $_POST["new_email"];

        // return the json to be sent to the client
        $outputJSON = [
            "meta" => [
                "return_code" => 0,
                "message" => "Email changed successfully."
            ],
            "data" => []
        ];
    } else {
        // if not, notify the user
        $outputJSON = [
            "meta" => [
                "return_code" => 1,
                "message" => "The given user ID was not recognized."
            ],
            "data" => []
        ];
    }
} catch (Exception $e) {
    core\displayErrorPageAndExit($e->getCode(), $e->getMessage());
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
header("Content-Type: application/json");
echo json_encode($outputJSON);


?>