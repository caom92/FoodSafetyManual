<?php

require_once(__FILE__)."\\dao\\dailyHandWashingLog.php";
require_once(__FILE__)."\\dao\\workdayPeriodHandWashingLog.php";

// initialize all the variables related with the data base
$dataBaseConnection = null;

// attempt to connect to the data base and insert the input data, which 
// is read using the HTTP GET method
try {
    $dataBaseConnection = connectToDataBase();
    $dailyLog = new DailyHandWashingLog($dataBaseConnection);
    $periodLog = new WorkdayPeriodHandWashingLog($dataBaseConnection);
    $newRows = json_encode($_GET);
    
    foreach ($newRows as $row) {
        $id = $periodLog->addItems([
            "workday_period_id" => $row["workday_period_id"],
            "washed_hands" => $row["washed_hands"] 
        ]);
        
        $dailyLog->addItems([
            "date" => $row["date"],
            "workplace_area_id" => $row["workplace_area_id"],
            "user_id" => $row["user_id"],
            "comment" => $row["comment"],
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