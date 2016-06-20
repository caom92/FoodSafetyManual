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
//     new_password:[string]
// }

// the output JSON object to be sent back to the client
$outputJSON;

try {
    // attempt to connect to the database
    $dataBaseConnection = dao\connectToDataBase();
    $userProfilesTable = new dao\UserProfiles($dataBaseConnection);

    // modify the password of the user in the data base
    $result = $userProfilesTable->changeLogInPasswordOfUserWithID(
        $_POST["user_id"], 
        $_POST["new_password"]
    );  

    // check if the password was changed successfully
    if ($result != 0) {
        // get the user profile data
        $userProfile = $userProfilesTable->searchItemsByIdentifierAndPassword(
            $_POST["user_id"], 
            $_POST["new_password"]
        );

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
                "message" => "Password changed successfully. Logging In."
            ],
            "data" => $userData
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
// where data is:
// {
//     id:[uint],
//     employee_num:[uint],
//     first_name:[string],
//     last_name:[string],
//     email:[string]
//     account_nickname:[string]
//     login_password:[string]
// }
header("Content-Type: application/json");
echo json_encode($outputJSON);

?>