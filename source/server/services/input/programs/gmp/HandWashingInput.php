<?php

// Import external classes
require_once realpath(
    dirname(__FILE__)."/../../../dao/programs/gmp/HandWashingLog.php");
require_once realpath(
    dirname(__FILE__)."/../../../dao/programs/gmp/HandWashingDailyLog.php");
require_once realpath(
    dirname(__FILE__).
    "/../../../dao/programs/gmp/HandWashingWorkdayPeriodLog.php");
    
// Alias the namespaces for ease of writing
use espresso as core;
use espresso\dao as dao;
use espresso\dao\gmp as gmp;

// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     user_profile_id:[uint]
//     date:[date]
//     time:[time]
//     workplace_area_id:[uint]
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
    $dataBaseConnection = dao\connectToDataBase();
    $dailyLog = new gmp\HandWashingDailyLog($dataBaseConnection);
    $periodLog = new gmp\HandWashingWorkdayPeriodLog($dataBaseConnection);
    $finalLog = new gmp\HandWashingLog($dataBaseConnection);
    
    // decode the input json
    $inputJSON = json_decode($_GET);
    
    // first, save the daily data and store its ID
    $id = $dailyLog->saveItems([
        "user_profile_id" => $inputJSON["user_profile_id"],
        "date" => $inputJSON["date"],
        "time" => $inputJSON["time"],
        "workplace_area_id" => $inputJSON["workplace_area_id"],
        "comment" => $inputJSON["comment"]
    ]);
    
    // store the data read from the json to their corresponding data base tables
    foreach ($inputJSON["period_logs"] as $log) {
        $finalLog->saveItems([
            "daily_log_id" => $id,
            "period_log_id" => $periodLog->saveItems([
                "workday_period_id" => $log["workday_period_id"],
                "washed_hands" => $log["washed_hands"] 
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