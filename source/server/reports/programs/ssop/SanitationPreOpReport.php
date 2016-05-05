<?php

require_once realpath(dirname(__FILE__).
    "/../../../dao/programs/ssop/SSOPSanitationPreOpLog.php");

// array of data entries read from the data base table
$logEntries = [];

// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     zone_id:[uint]
//     start_date:[date]
//     end_date:[date]
// }
// we must decode it
$inputJSON = $_POST;


// attempt to connect to the data base and query the data from the sanitation
// pre op log
try {
    $dataBaseConnection = connectToDataBase();
    $logTable = new SSOPSanitationPreOpLog($dataBaseConnection);
    $logEntries = $logTable->searchItemsByZoneIDAndDateInterval(
        $inputJSON["zone_id"], 
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

// for this table we need to group together all hardware log entries by
// area, and then group all area groups together by date for display; all
// log data belongs to the same zone

// the JSON where the employee, date and zone data of the log is going to
// be stored; this data might change by date (except for the zone)
$dateLogInfoJSON = [];

// the JSON where the log data about the area is going to be stored; this
// will hold all the hardware logs that belong to the same area
$areaLogInfoJSON = [];

// the date of the data base entries that we wish to process
$dateToProcess = "";

// the area which data we which to group together
$areaToProcess = "";

// process each entry from the data base
foreach ($logEntries as $entry) {
    if ($dateToProcess == $entry["date"]) {
        if ($areaToProcess == $entry["area_name"]) {
            // if the current entry has the same date and area name that we
            // wish to process, then we store the hardware log into the area
            // json
            array_push($areaLogInfoJSON["hardware_logs"], [
                "hardware_name" => $entry["hardware_name"],
                "status" => $entry["status"],
                "corrective_action" => $entry["action_name"],
                "comment" => $entry["comment"]
            ]);
        }
        else {
            // we save the area data that was completed so far to the date json
            array_push(
                $dateLogInfoJSON["area_logs"],
                $areaLogInfoJSON
            );
            
            // we store the new area in order to process the hardware that '
            // belong to it
            $areaToProcess = $entry["area_name"];
            
            // then, we prepare a new json to store the info of this new area
            $areaLogInfoJSON = [
                "time" => $entry["time"],
                "area_name" => $entry["area_name"],
                "hardware_logs" => []
            ];
            
            // and we save the first hardware entry that belongs to this new 
            // area
            array_push($areaLogInfoJSON["hardware_logs"], [
                "hardware_name" => $entry["hardware_name"],
                "status" => $entry["status"],
                "corrective_action" => $entry["action_name"],
                "comment" => $entry["comment"]
            ]);
        }
    }
    else {
        if (count($areaLogInfoJSON) != 0) {
            // if the date changed, save the area data that was completed
            array_push(
                $dateLogInfoJSON["area_logs"],
                $areaLogInfoJSON
            );
        }
        
        if (count($dateLogInfoJSON) != 0) {
            // if the date changed, we save the log group that was completed
            array_push(
                $outputJSON["data"],
                $dateLogInfoJSON
            );
        }
        
        // we store the new date in order to process the areas that belong to
        // it
        $dateToProcess = $entry["date"];
        $areaToProcess = $entry["area_name"];
        
        // then, we prepare a new json to store the info of this new date
        $dateLogInfoJSON = [
            "date" => $entry["date"],
            "zone_name" => $entry["zone_name"],
            "employee_id" => $entry["employee_id_num"],
            "full_name" => $entry["full_name"],
            "area_logs" => []
        ];
        
        // and save the first area entry that belongs to this new date
        $areaLogInfoJSON = [
            "time" => $entry["time"],
            "area_name" => $entry["area_name"],
            "hardware_logs" => []
        ];
        
        array_push($areaLogInfoJSON["hardware_logs"], [
            "hardware_name" => $entry["hardware_name"],
            "status" => $entry["status"],
            "corrective_action" => $entry["action_name"],
            "comment" => $entry["comment"]
        ]);
    }
}

// don't forget to push the last entry when we are finished
array_push($dateLogInfoJSON["area_logs"], $areaLogInfoJSON);
array_push($outputJSON["data"], $dateLogInfoJSON);

// Send the data to the client as a JSON with the following format
// {
//     error_code:[int],
//     error_message:[string],
//     data:[array<log_info>]
// }
// where log_info is
// {
//     date:[date]
//     zone_name:[string]
//     employee_id:[uint]
//     full_name:[string]
//     area_logs:[array<area_log>]
// }
// where area_log is:
// {
//     time:[time]
//     area_name:[string]
//     hardware_logs:[array<hardware_log>]
// }
// where hardware_log is: 
// {
//     hardware_name:[string]
//     status:[bool]
//     corrective_action:[string]
//     comment:[strig]
// }
echo json_encode($outputJSON);

?>