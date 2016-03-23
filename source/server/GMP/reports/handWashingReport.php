<?php

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    require_once dirname(__FILE__)."\\..\\..\\dao\\gmpHandWashingLog.php";
}
else {
    require_once dirname(__FILE__)."/../../dao/gmpHandWashingLog.php";
}

// array of data entries read from the data base table
$logEntries = [];

// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     area_id:[uint]
//     start_date:[date]
//     end_date:[date]
// }
// we must decode it
$inputJSON = json_decode($_GET);

// attempt to connect to the data base and query the data from the hand washing
// log
try {
    $dataBaseConnection = connectToDataBase();
    $logTable = new GMPHandWashingLog($dataBaseConnection);
    $logEntries = $logTable->searchItemsByAreaIDAndDateInterval(
        $inputJSON["area_id"], 
        $inputJSON["start_date"], 
        $inputJSON["end_date"]
    );
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

// some data read from the data base will be repeated between several entries,
// so we create a temporal JSON where we are going to store this data so we
// send it only once to the client

// the JSON where the hand washing log data that is the same among all the 
// entries inside the especified date interval is stored and organized
$dateIntervalLogInfoJSON = [];

// the JSON where the hand washing log data which differs for each date in the
// especified interval is stored and organized
$dailyLogInfoJSON = [];

// the date of the data base entries that we wish to process
$dateToProcess = "";

// process each entry from the data base
foreach ($logEntries as $entry) {
    if ($dateToProcess == $entry["date"]) {
        // there can be several entries per workday periods for the same 
        // date, so we store all these entries before changing date to 
        // process
        array_push($dailyLogInfoJSON["period_logs"], [
            "start_time" => $entry["start_time"],
            "end_time" => $entry["end_time"],
            "period_name" => $entry["period_name"],
            "washed_hands" => $entry["washed_hands"]
        ]);
    }
    else {
        if (count($dateIntervalLogInfoJSON) != 0) {
            // if the date was changed, we prepare a new daily log info JSON 
            // for storing the data of the new date
            array_push(
                $dateIntervalLogInfoJSON["daily_logs"], 
                $dailyLogInfoJSON
            );
        }
        else {
            // when we run the loop for the first time, we know that the 
            // entries read from the data base have a lot of repeated data, so 
            // we just store it once in our temporal json
            $dateIntervalLogInfoJSON = [
                "zone_name" => $entry["zone_name"],
                "area_name" => $entry["area_name"],
                "daily_logs" => []
            ];
        }
        
        // we store this date in order to process the rest of the daily entries 
        // on subsequent loops
        $dateToProcess = $entry["date"];
        
        // prepare a new daily log info JSON for storing the data of the new 
        // date
        $dailyLogInfoJSON = [
            "employee_id_num" => $entry["employee_id_num"],
            "full_name" => $entry["full_name"],
            "date" => $entry["date"],
            "time" => $entry["time"],
            "comment" => $entry["comment"],
            "period_logs" => []
        ];
        
        // we save the first daily log info entry in the corresponding 
        // of this new date
        array_push($dailyLogInfoJSON["period_logs"], [
            "start_time" => $entry["start_time"],
            "end_time" => $entry["end_time"],
            "period_name" => $entry["period_name"],
            "washed_hands" => $entry["washed_hands"]
        ]);
    }
}

// we push the last daily entry that was processed by the loop
array_push(
    $dateIntervalLogInfoJSON["daily_logs"], 
    $dailyLogInfoJSON
);

// finally, we save the temporal json, now finalized
array_push($outputJSON["data"], $dateIntervalLogInfoJSON);

// Send the data to the client as a JSON with the following format
// {
//     error_code:[int],
//     error_message:[string],
//     data:[date_interval_log_info]
// }
// where date_interval_log_info is:
// {
//     zone_name:[string]
//     area_name:[string]
//     daily_logs:[array<daily_log_info>]
// }
// where daily_log_info is: {
//     employee_id_num:[uint]
//     full_name:[string]
//     date:[date]
//     time:[time]
//     comment:[string]
//     period_logs:[array<per_period_log_info>]
// }
// where per_period_log_info is: {
//     start_time:[time]
//     end_time:[time]
//     period_name:[string]
//     washed_hands:[bool]
// }
echo json_encode($outputJSON);

?>