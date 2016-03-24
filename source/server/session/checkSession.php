<?php

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    require_once dirname(__FILE__)."\\..\\dao\\users.php";
}
else {
    require_once dirname(__FILE__)."/../dao/users.php";
}

// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     user_name:[string]
//     password:[string]
// }
// we must decode it
$inputJSON = decode($_GET);
/*$inputJSON = [
    "user_name" => "coliva",
    "password" => "password"
];*/

// list of elements read from the data base
$userInfoList = [];

try {
    // attempt to connect to the database
    $dataBaseConnection = connectToDataBase();
    $usersTable = new UsersProfileInfo($dataBaseConnection);

    // we need to know if the requested user exists in the data base
    // so we simply look it up in the table and if nothing is returned
    // then it means that the user has not signed up yet
    $userInfoList = $usersTable->searchItemsByUserNameAndPassword(
        $inputJSON["user_name"], $inputJSON["password"]
    );
}
catch (Exception $e) {
    displayErrorPageAndExit($e->getCode(), $e->getMessage());
}

// initialize the output json with the proper data 
$outputJSON = [];


if (count($userInfoList) > 0)
{
    // initialize the json that will be sent to the client
    $outputJSON = [
        "error_code" => 0,
        "error_message" => "Éxito",
        "data" => []
    ];
    
    $finalUserInfo = [];
    $zoneInfo = [];
    $zoneToProcess = "";
    
    foreach ($userInfoList as $userInfo) {
        if ($zoneToProcess == $userInfo["zone_name"]) {
            array_push($zoneInfo["program_permissions"], [
                "certification_program_id" => $userInfo["program_id"],
                "certification_program_name" => 
                    $userInfo["certification_program_name"],
                "access_permission_id" => $userInfo["permission_id"],
                "access_permission_name" => $userInfo["permission_name"]
            ]);
        }
        else {
            if (count($finalUserInfo) != 0) {
                array_push($finalUserInfo["zone_permissions"], $zoneInfo);
            }
            else {
                $finalUserInfo = [
                    "employee_id_num" => $userInfo["employee_id_num"],
                    "full_name" => $userInfo["full_name"],
                    "email" => $userInfo["email"],
                    "login_name" => $userInfo["login_name"],
                    "login_password" => $userInfo["login_password"],
                    "zone_permissions" => []
                ];
            }
        }
        
        $zoneToProcess = $userInfo["zone_id"];
        
        $zoneInfo = [
            "company_zone_id" => $userInfo["zone_id"],
            "company_zone_name" => $userInfo["zone_name"],
            "program_permissios" => []
        ];
        
        array_push($zoneInfo["program_permissions"], [
            "certification_program_id" => $userInfo["program_id"],
            "certification_program_name" => 
                $userInfo["certification_program_name"],
            "access_permission_id" => $userInfo["permission_id"],
            "access_permission_name" => $userInfo["permission_name"]
        ]);
    }
    
    array_push($finalUserInfo["zone_permissions"], $zoneInfo);
    
    array_push($outputJSON["data"], $finalUserInfo);
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
//     data:[array<data>]
// }
// where data is:
// {
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