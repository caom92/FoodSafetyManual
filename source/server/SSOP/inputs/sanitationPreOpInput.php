<?php

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    require_once dirname(__FILE__)."\\..\\..\\dao\\ssopSanitationPreOpLogsInfo.php";
    require_once dirname(__FILE__)."\\..\\..\\dao\\ssopSanitationPreOpHardwareLogs.php";
    require_once dirname(__FILE__)."\\..\\..\\dao\\ssopSanitationPreOpLog.php";
}
else {
    require_once dirname(__FILE__)."/../../dao/ssopSanitationPreOpLogsInfo.php";
    require_once dirname(__FILE__)."/../../dao/ssopSanitationPreOpHardwareLogs.php";
    require_once dirname(__FILE__)."/../../dao/ssopSanitationPreOpLog.php";
}

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
$inputJSON = [
    "user_profile_id" => "1",
    "date" => "2016-03-22",
    "time" => "18:00:00",
    "logs" => [
        [
            "hardware_id" => "7",
            "status" => "0",
            "corrective_action_id" => "2",
            "comment" => "hola mundo"
        ],
        [
            "hardware_id" => "8",
            "status" => "1",
            "corrective_action_id" => "3",
            "comment" => "todo perfecto"
        ]
    ]
];

try {
    // attempt to connect to the data base
    $dataBaseConnection = connectToDataBase();
    $logsInfoTable = new SSOPSanitationPreOpLogsInfo($dataBaseConnection);
    $hardwareLogsTable = 
        new SSOPSanitationPreOpHardwareLogs($dataBaseConnection);
    $sanitationPreOpLog = new SSOPSanitationPreOpLog($dataBaseConnection);
    
    // decode the input json
    // $inputJSON = json_decode($_GET);
    
    // first, save the date and user profile and store its ID
    $id = $logsInfoTable->saveItems([
        "user_profile_id" => $inputJSON["user_profile_id"],
        "date" => $inputJSON["date"],
        "time" => $inputJSON["time"]
    ]);
    
    // store the data read from the json to their corresponding data base tables
    foreach ($inputJSON["logs"] as $log) {
        $sanitationPreOpLog->saveItems([
            "log_info_id" => $id,
            "hardware_log_id" => $hardwareLogsTable->saveItems([
                "hardware_id" => $log["hardware_id"],
                "status" => $log["status"],
                "corrective_action_id" => $log["corrective_action_id"],
                "comment" => $log["comment"]
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
    "error_message" => "",
    "data" => []
]);

?>