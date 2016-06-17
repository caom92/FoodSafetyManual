<?php

// Import external classes
require_once realpath(dirname(__FILE__)."/../../dao/UsersProfileInfo.php");

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
    $usersProfileTable = new dao\UsersProfileInfo($dataBaseConnection);

    // modify the password of the user in the data base
    $result = $usersProfileTable->changeLogInPasswordOfUserWithID(
        $_POST["user_id"], 
        $_POST["new_password"]
    );  

    // check if the password was changed successfully
    if ($result != 0) {
        // get the user profile data
        $userProfile = $usersProfileTable->searchItemsByID(
            $_POST["user_id"], 
            $_POST["new_password"]
        );

        $userData = [
            "id" => $userProfile[0]["id"],
            "employee_id_num" => $userProfile[0]["employee_id_num"],
            "full_name" => $userProfile[0]["full_name"],
            "email" => $userProfile[0]["email"],
            "login_name" => $userProfile[0]["login_name"],
            "login_password" => $userProfile[0]["login_password"],
            "key" => hash("sha256", rand())
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
//     employee_id_num:[uint],
//     full_name:[string]
//     email:[string]
//     login_name:[string]
//     login_password:[string]
//     key:[int]
// }
header("Content-Type: application/json");
echo json_encode($outputJSON);

?>