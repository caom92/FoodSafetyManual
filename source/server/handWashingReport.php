<?php

require_once dirname(__FILE__)."\\dao\\dailyHandWashingLog.php";

// initialize all the variables related with the data base
$dataBaseConnection = null;
$log = null;
$logEntries = [];

// decode the JSON with the data that we are going to use to search the data 
// base
$inputData = json_decode($_GET);

// attempt to connect to the data base and query the data from the hand washing
// log
try {
    $dataBaseConnection = connectToDataBase();
    $log = new DailyHandWashingLog($dataBaseConnection);
    $logEntries = $log->findItemsByDateInterval($inputData["area_id"], 
        $inputData["start_date"], $inputData["end_date"]);
}
catch (Exception $e) {
    displayErrorPageAndExit($e->getCode(), $e->getMessage());
}

// Initialize the JSON to be sent to the client
$outputJSON = [
    "error_code" => 0,
    "error_message" => "",
    "data" => []
];

// create a temporal json where to store repetitive data read from the data base
// just once
$date = "";
$handWashingLogJSON = [];
$dailyLogs = [];

// read each entry from the data base
foreach ($logEntries as $entry) {
    // after the temporal json was filled with the initial data, we simply push
    // the log per workday period into the array 
    if (count($handWashingLogJSON) != 0) {
        if ($date == $entry["date"]) {
            array_push($dailyLogs["period_logs"], [
                "start_time" => $entry["start_time"],
                "end_time" => $entry["end_time"],
                "period_name" => $entry["period_name"],
                "washed_hands" => $entry["washed_hands"]
            ]);
        }
        else {
            $date = $entry["date"];
            array_push($handWashingLogJSON["daily_logs"], $dailyLogs);
            $dailyLogs = [
                "date" => $entry["date"],
                "comment" => $entry["comment"],
                "period_logs" => []
            ];
        }
        
        /*array_push($handWashingLogJSON["period_logs"], [
            "date" => $entry["date"],
            "start_time" => $entry["start_time"],
            "end_time" => $entry["end_time"],
            "period_name" => $entry["period_name"],
            "washed_hands" => $entry["washed_hands"]
        ]);*/
    }
    else {
        // when we run the loop for the first time, we know that the entries 
        // read from the data base have a lot of repeated data, so we just store
        // it once in our temporal json, also, we save our first non-repetitive
        // data in an array
        $handWashingLogJSON = [
            "start_date" => /*$_GET["start_date"]*/"2016-03-07",
            "end_date" => /*$_GET["end_date"]*/"2016-03-13",
            "zone_name" => $entry["zone_name"],
            "department_name" => $entry["department_name"],
            "area_name" => $entry["area_name"],
            "employee_id" => $entry["employee_id"],
            "full_name" => $entry["full_name"],
            "daily_logs" => []
        ];
        
        $dailyLogs = [
            "date" => $entry["date"],
            "comment" => $entry["comment"],
            "period_logs" => []
        ];
        
        array_push($dailyLogs["period_logs"], [
            "start_time" => $entry["start_time"],
            "end_time" => $entry["end_time"],
            "period_name" => $entry["period_name"],
            "washed_hands" => $entry["washed_hands"]
        ]);
        
        $date = $entry["date"];
    }
}

// finally, we save the temporal json, now finalized
array_push($outputJSON["data"], $handWashingLogJSON);

// Send the data to the client as a JSON with the following format
/*{
    error_code:[int],
    error_message:[string],
    data:[handWashingLog]
}
where handWashingLog is:
{
    start_date:[date]
    end_date:[date]
    zone_name:[string]
    department_name:[string]
    area_name:[string]
    employee_id:[uint]
    full_name:[string]
    daily_logs:[array<daily_log>]
}
where daily_logs is: {
    date:[date]
    comment:[string]
    period_logs:[array<period_log>]
}
where period_log is: {
    start_time:[time]
    end_time:[time]
    period_name:[string]
    washed_hands:[bool]
}*/
echo json_encode($outputJSON);

?>