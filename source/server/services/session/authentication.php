<?php

// Import external classes
require_once realpath(dirname(__FILE__)."/../../dao/UsersProfileInfo.php");

// Alias the namespaces for ease of writing
use espresso as core;
use espresso\dao as dao;


// This function recieves the profile data of the user from the database as an
// associative array and creates a new user session, where it stores 
// this very same data; it also returns the resulting json object for the client
// [in]     userProfile: the user profile info which was retrieved as an 
//          associative array from the data base
// [out]    return: a JSON object with the user profile data which is going to
//          be sent back to the client in response
function startSessionWithUserProfileData($userProfile)
{
    // retrieve the user data from the data base
    $userData = [
        "id" => $userProfile["id"],
        "employee_id_num" => $userProfile["employee_id_num"],
        "full_name" => $userProfile["full_name"],
        "email" => $userProfile["email"],
        "login_name" => $userProfile["login_name"],
        "login_password" => $userProfile["login_password"]
    ];
    
    // start a session and store this data
    session_start();
    $_SESSION = $userData;
    
    // return the json to be sent to the client
    return [
        "error_code" => 0,
        "error_message" => "",
        "data" => $userData
    ];
}


// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     username:[string]
//     password:[string]
// }
// we must decode it
$inputJSON = $_POST;

// Temporal variables where to store the number of results returned by the 
// data base queries
$byLogin = 0;
$byID = 0;
$byEmail = 0;

// The json that is going to be sent back to the client
$outputJSON;

try {
    // attempt to connect to the database
    $dataBaseConnection = dao\connectToDataBase();
    $usersProfileTable = new dao\UsersProfileInfo($dataBaseConnection);
    
    // since we do not know if the user is attempting to login with her user 
    // name, email or employee ID, lets search in the table for all these
    // combinations and store it in a temporal variable
    $byLogin = $usersProfileTable->searchItemsByLogInNameAndPassword(
        $inputJSON["username"], $inputJSON["password"]
    );
    
    $byID = $usersProfileTable->searchItemsByEmployeeIDAndPassword(
        $inputJSON["username"], $inputJSON["password"]
    );
    
    $byEmail = $usersProfileTable->searchItemsByEmailAndPassword(
        $inputJSON["username"], $inputJSON["password"]
    );
} catch (Exception $e) {
    core\displayErrorPageAndExit($e->getCode(), $e->getMessage());
}

// if any of these validations where correct, then the authentication succeeded
// so we create the resulting json to be sent to the client and start a 
// session
if (count($byLogin) > 0) {
    $outputJSON = startSessionWithUserProfileData($byLogin[0]);
} else if (count($byID) > 0) {
    $outputJSON = startSessionWithUserProfileData($byID[0]);
} else if (count($byEmail) > 0) {
    $outputJSON = startSessionWithUserProfileData($byEmail[0]);
} else {
    // otherwise, the authentication failed and we must notify the client
    $outputJSON = [
        "error_code" => 1,
        "error_message" => "User authentication failed",
        "data" => []
    ];
}

// Send the data to the client as a JSON with the following format
// {
//     error_code:[int],
//     error_message:[string],
//     data:[data]
// }
// where data is:
// {
//     id:[uint],
//     employee_id_num:[uint],
//     full_name:[string]
//     email:[string]
//     login_name:[string]
//     login_password:[string]
// }
echo json_encode($outputJSON);

?>