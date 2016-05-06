<?php

// Importing external classes
require_once realpath(dirname(__FILE__)."/../dao/Users.php");

// Alias the namespaces for ease of writing
use espresso as core;
use espresso\dao as dao;

// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     user_name:[string]
//     password:[string]
// }
// we must decode it
$inputJSON = $_POST;

// list of elements read from the data base
$userInfoList = [];

try {
    // attempt to connect to the database
    $dataBaseConnection = dao\connectToDataBase();
    $usersTable = new dao\Users($dataBaseConnection);

    // we need to know if the requested user exists in the data base
    // so we simply look it up in the table and if nothing is returned
    // then it means that the user has not signed up yet
    $userInfoList = $usersTable->searchItemsByUserNameAndPassword(
        $inputJSON["user_name"], $inputJSON["password"]
    );
}
catch (Exception $e) {
    core\displayErrorPageAndExit($e->getCode(), $e->getMessage());
}

// initialize the output json with the proper data 
$outputJSON = [];

if (count($userInfoList) > 0)
{
    // initialize the json that will be sent to the client
    $outputJSON = [
        "error_code" => 0,
        "error_message" => "&Eacute;xito",
        "data" => []
    ];
    
    // auxiliary json where the profile data and zone permissions of the user 
    // will be stored
    $finalUserInfoJSON = [];
    
    // auxiliary json where the information of the zones is stored
    $zoneInfoJSON = [];
    
    // the zone that we want to process for this iteration
    $zoneToProcess = "";
    
    // read each element from the data array
    foreach ($userInfoList as $userInfo) {
        // we need to store the permission that the user have for every program
        // that is associated to every zone that is associated to the user
        // so first we group together the programs of each zone
        if ($zoneToProcess == $userInfo["zone_name"]) {
            array_push($zoneInfoJSON["program_permissions"], [
                "certification_program_id" => $userInfo["program_id"],
                "certification_program_name" => 
                    $userInfo["certification_program_name"],
                "access_permission_id" => $userInfo["permission_id"],
                "access_permission_name" => $userInfo["permission_name"]
            ]);
        }
        else {
            // if the zone that is being processed changed, we store all the
            // permissions that we saved so far in the user json
            if (count($finalUserInfoJSON) != 0) {
                array_push($finalUserInfoJSON["zone_permissions"], 
                $zoneInfoJSON);
            }
            else {
                // if the user json is empty, it means that this is the first 
                // iteration and we need to first save the user data before
                // reading the zones and permissions data
                $finalUserInfoJSON = [
                    "profile_id" => $userInfo["user_profile_id"],
                    "employee_id_num" => $userInfo["employee_id_num"],
                    "full_name" => $userInfo["full_name"],
                    "email" => $userInfo["email"],
                    "login_name" => $userInfo["login_name"],
                    "login_password" => $userInfo["login_password"],
                    "zone_permissions" => []
                ];
            }
        }
        
        // we change the zone...
        $zoneToProcess = $userInfo["zone_id"];
        
        // and store the first entry related to it
        $zoneInfoJSON = [
            "company_zone_id" => $userInfo["zone_id"],
            "company_zone_name" => $userInfo["zone_name"],
            "program_permissions" => []
        ];
        
        // and save the first permission associated with it
        array_push($zoneInfoJSON["program_permissions"], [
            "certification_program_id" => $userInfo["program_id"],
            "certification_program_name" => 
                $userInfo["certification_program_name"],
            "access_permission_id" => $userInfo["permission_id"],
            "access_permission_name" => $userInfo["permission_name"]
        ]);
    }
    
    // don't forget to save the last data entry in the final user JSON
    array_push($finalUserInfoJSON["zone_permissions"], $zoneInfoJSON);
    
    // finally, we store everything in the json to be send to the user
    $outputJSON["data"] = $finalUserInfoJSON;
}
else {
    $outputJSON = [
        "error_code" => 1,
        "error_message" => 
            "El nombre de usuario o la contraseña son incorrectos",
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
//     profile_id:[uint]
//     employee_id_num:[uint]
//     full_name:[string]
//     email:[string]
//     login_name:[string]
//     login_password:[string]
//     zone_permissions:[array<zone>]     
// }  
// where zone is:
// {
//     company_zone_id:[uint]
//     company_zone_name:[string]
//     program_permissions:[array<program>]
// }
// where program is:
// {
//     certification_program_id:[uint]
//     certification_program_name:[string]
//     access_permission_id:[uint]
//     access_permission_name:[string]
// }
echo json_encode($outputJSON);

?>