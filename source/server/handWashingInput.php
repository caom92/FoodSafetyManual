<?php

require_once(__FILE__)."\\dao\\dailyHandWashingLog.php";
require_once(__FILE__)."\\dao\\workdayPeriodHandWashingLog.php";

// attempt to connect to the data base and insert the input data, which 
// is read from the client using the HTTP GET method
try {
    $dataBaseConnection = connectToDataBase();
    $dailyLog = new DailyHandWashingLog($dataBaseConnection);
    $periodLog = new WorkdayPeriodHandWashingLog($dataBaseConnection);
    $inputJSON = json_decode($_GET);
    
    foreach ($inputJSON as $newEntry) {
        $id = $periodLog->addItems([
            "workday_period_id" => $newEntry["workday_period_id"],
            "washed_hands" => $newEntry["washed_hands"] 
        ]);
        
        $dailyLog->addItems([
            "date" => $newEntry["date"],
            "workplace_area_id" => $newEntry["workplace_area_id"],
            "user_id" => $newEntry["user_id"],
            "comment" => $newEntry["comment"],
            "period_log_id" => $id
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