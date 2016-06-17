<?php

// Import external classes
require_once realpath(dirname(__FILE__)."/../../dao/UsersProfileInfo.php");

require_once realpath(dirname(__FILE__)."/../../dao/RecoveringPasswords.php");

// Alias the namespaces for ease of writing
use espresso as core;
use espresso\dao as dao;


// For this script, the client sends only the password recovery token and we 
// need to first verify if it is valid by comparing it with the one in the
// data base

// the json object to be sent to the client in response
$outputJSON;

try {
    // attempt to connect to the database
    $dataBaseConnection = dao\connectToDataBase();
    $usersProfileTable = new dao\UsersProfileInfo($dataBaseConnection);
    $recoveringPasswordsTable = 
        new dao\RecoveringPasswords($dataBaseConnection);

    // search the token in the data base
    $result = 
        $recoveringPasswordsTable->searchItemsByRecoveryToken($_POST["token"]);

    // if the token was found, check if it has not expired yet
    if (count($result) > 0) {
        // get the timestamp that was stored with the token and convert it to
        // date
        $tokenTimestamp = new DateTime($result[0]["timestamp"]);

        // add one day to it to obtain the deadline
        $deadline = $tokenTimestamp->modify("+1 day");  

        // check if the token has not expired
        if (new DateTime(date("Y-m-d H:i:s")) <= $deadline) {
            // the token is still valid
            $outputJSON = [
                "meta" => [
                    "return_code" => 0,
                    "message" => "Password recovery token is valid."
                ],
                "data" => [
                    "user_id" => $result[0]["user_id"]
                ]
            ];
        } else {
            // the token is no longer valid
            $outputJSON = [
                "meta" => [
                    "return_code" => 1,
                    "message" => 
                        "Password recovery token has expired or is invalid."
                ],
                "data" => []
            ];
        }

        // delete the token from the data base
        $recoveringPasswordsTable->deleteItemsByID($result[0]["id"]);
    } else {
        // the token is no longer valid
        $outputJSON = [
            "meta" => [
                "return_code" => 1,
                "message" => "The user did not requested password recovery."
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