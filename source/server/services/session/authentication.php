<?php

// Import external classes
require_once realpath(dirname(__FILE__)."/../../dao/UserProfiles.php");

// Alias the namespaces for ease of writing
use espresso as core;
use espresso\dao as dao;


// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     username:[string]
//     password:[string]
// }


// Temporal variable where to store the response from the data base
$userProfile;

try {
    // attempt to connect to the database
    $dataBaseConnection = dao\connectToDataBase();
    $userProfileTable = new dao\UserProfiles($dataBaseConnection);

    // since we do not know if the user is attempting to login with her user 
    // name, email or employee ID, lets search in the table for all these
    // combinations and store it in a temporal variable, we can now do it
    // with a single function call
    $userProfile = $userProfileTable->searchItemsByIdentifierAndPassword(
        $_POST["username"], $_POST["password"]);
} catch (Exception $e) {
    core\displayErrorPageAndExit($e->getCode(), $e->getMessage());
}


// The json that is going to be sent back to the client
$outputJSON;

// check if the user could be found in the data base
if (count($userProfile) > 0) {
    // retrieve the user data from the data base
    $userData = [
        "id" => $userProfile[0]["id"],
        "employee_num" => $userProfile[0]["employee_num"],
        "first_name" => $userProfile[0]["first_name"],
        "last_name" => $userProfile[0]["last_name"],
        "email" => $userProfile[0]["email"],
        "account_nickname" => $userProfile[0]["account_nickname"],
        "login_password" => $userProfile[0]["login_password"]
    ];

    // start a session and store this data
    session_start();
    $_SESSION = $userData;

    // return the json to be sent to the client
    $outputJSON = [
        "meta" => [
            "return_code" => 0,
            "message" => "User authentication succeeded."
        ],
        "data" => $userData
    ];
} else {
    // otherwise, the authentication failed and we must notify the client
    $outputJSON = [
        "meta" => [
            "return_code" => 1,
            "message" => "User authentication failed"
        ],
        "data" => []
    ];
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
//     id:[uint],
//     employee_id_num:[uint],
//     full_name:[string]
//     email:[string]
//     account_nickname:[string]
//     login_password:[string]
//     key:[int]
// }
header("Content-Type: application/json");
echo json_encode($outputJSON);

?>