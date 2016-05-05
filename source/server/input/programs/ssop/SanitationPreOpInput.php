<?php

require_once realpath(dirname(__FILE__).
    "/../../../dao/programs/ssop/SSOPSanitationPreOpLogsInfo.php");
require_once realpath(dirname(__FILE__).
    "/../../../dao/programs/ssop/SSOPSanitationPreOpHardwareLogs.php");
require_once realpath(dirname(__FILE__).
    "/../../../dao/programs/ssop/SSOPSanitationPreOpLog.php");

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
    $dataBaseConnection = connectToDataBase();
    $logsInfoTable = new SSOPSanitationPreOpLogsInfo($dataBaseConnection);
    $hardwareLogsTable = 
        new SSOPSanitationPreOpHardwareLogs($dataBaseConnection);
    $sanitationPreOpLog = new SSOPSanitationPreOpLog($dataBaseConnection);
    
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
catch (Exception $e) {
    displayErrorPageAndExit($e->getCode(), $e->getMessage());
}

// return a success code just to let the client know
echo json_encode([
    "error_code" => 0,
    "error_message" => "&Eacute;xito",
    "data" => []
]);

?>