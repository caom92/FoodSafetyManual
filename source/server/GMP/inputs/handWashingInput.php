<?php

require_once realpath("../../dao/dailyHandWashingLog.php");
require_once realpath("../../dao/workdayPeriodHandWashingLog.php");

// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     date:[date]
//     time:[time]
//     workplace_area_id:[uint]
//     user_id:[uint]
//     comment:[string]
//     period_logs:[array<period_log>]
// }
// where period_log is:
// {
//     workday_period_id:[uint]
//     washed_hands:[bool]
// }

try {
    // attempt to connect to the data base 
    $dataBaseConnection = connectToDataBase();
    $dailyLog = new DailyHandWashingLog($dataBaseConnection);
    $periodLog = new WorkdayPeriodHandWashingLog($dataBaseConnection);
    
    // decode the input json
    $inputJSON = json_decode($_GET);
    
    // store the data read from the json to their corresponding data base tables
    foreach ($inputJSON["period_logs"] as $log) {
        $dailyLog->saveItems([
            "date" => $inputJSON["date"],
            "time" => $inputJSON["time"],
            "workplace_area_id" => $inputJSON["workplace_area_id"],
            "user_id" => $inputJSON["user_id"],
            "comment" => $inputJSON["comment"],
            "period_log_id" => $periodLog->saveItems([
                "workday_period_id" => $log["workday_period_id"],
                "washed_hands" => $log["washed_hands"] 
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