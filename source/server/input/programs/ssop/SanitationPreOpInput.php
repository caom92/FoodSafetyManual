<?php

// Import external classes
require_once realpath(
    "./../../../dao/programs/ssop/SanitationPreOpLogsInfo.php");
require_once realpath(
    "./../../../dao/programs/ssop/SanitationPreOpHardwareLogs.php");
require_once realpath(
    "./../../../dao/programs/ssop/SanitationPreOpLog.php");
    
// Alias the namespaces for ease of writing
use espresso as core;
use espresso\dao as dao;
use espresso\dao\ssop as ssop;

// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     user_profile_id:[uint]
//     date:[date]
//     time:[time]
//     logs:[array<hardware_log>]
// }
// where hardware_log is:
// {
//     hardware_id:[uint]
//     status:[bool]
//     corrective_action_id:[uint]
//     comment:[string]
// }

// attempt to connect to the data base and insert the input data, which 
// is read using the HTTP GET method

try {
    // attempt to connect to the data base
    $dataBaseConnection = dao\connectToDataBase();
    $logsInfoTable = new ssop\SanitationPreOpLogsInfo($dataBaseConnection);
    $hardwareLogsTable = 
        new ssop\SanitationPreOpHardwareLogs($dataBaseConnection);
    $sanitationPreOpLog = new ssop\SanitationPreOpLog($dataBaseConnection);
    
    // decode the input json
    $inputJSON = json_decode($_POST["data"]);
    
    // first, save the date and user profile and store its ID
    $id = $logsInfoTable->saveItems([
        "user_profile_id" => $inputJSON->user_profile_id,
        "date" => $inputJSON->date
    ]);
    
    // store the data read from the json to their corresponding data base tables
    foreach ($inputJSON["logs"] as $log) {
        $sanitationPreOpLog->saveItems([
            "log_info_id" => $id,
            "hardware_log_id" => $hardwareLogsTable->saveItems([
                "time" => $inputJSON->time,
                "hardware_id" => $log->hardware_id,
                "status" => $log->status,
                "corrective_action_id" => $log->corrective_action_id,
                "comment" => $log->comment
            ])
        ]);
    }
}
catch (PDOException $e) {
    core\displayErrorPageAndExit(1, $e->getMessage());
}
/*catch (Exception $e) {
    core\displayErrorPageAndExit($e->getCode(), $e->getMessage());
}*/

// return a success code just to let the client know
echo json_encode([
    "error_code" => 0,
    "error_message" => "&Eacute;xito",
    "data" => []
]);

?>