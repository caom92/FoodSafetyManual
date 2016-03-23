<?php

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
    require_once dirname(__FILE__)."\\..\\..\\dao\\ssopSanitationPreOpLog.php";
}
else {
    require_once dirname(__FILE__)."/../../dao/ssopSanitationPreOpLog.php";
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


// attempt to connect to the data base and query the data from the sanitation
// pre op log
try {
    $dataBaseConnection = connectToDataBase();
    $logTable = new SSOPSanitationPreOpLog($dataBaseConnection);
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

// for this table, we want to display its data grouped by workplace area
// so we create temporal variables needed to reorganized the data 

// the JSON where the information for each processed workplace area is 
// going to be stored
$areaInfoJSON = [];

// the date of the data base entries that we wish to process
$dateToProcess = "";

// read each element from the data array
foreach ($logEntries as $entry) {
    // there can be several entries per hardware for the same date, so we store
    // all the hardware entries before changing date to process
    if ($dateToProcess == $entry["date"]) {
        array_push($areaInfoJSON["hardware"], [
            "hardware_name" => $entry["hardware_name"],
            "status" => $entry["status"],
            "corrective_action" => $entry["action_name"],
            "comment" => $entry["comment"]
        ]);
    }
    else {
        // if the date changed and the temporal JSON is not empty,
        // then we keep the temporal JSON
        if (count($areaInfoJSON) != 0) {
            array_push($outputJSON["data"], $areaInfoJSON);
        }
        
        // then we store the new date and create a new temporal JSON
        $dateToProcess = $entry["date"];
        $areaInfoJSON = [
            "date" => $entry["date"],
            "zone_name" => $entry["zone_name"],
            "area_name" => $entry["area_name"],
            "employee_id" => $entry["employee_id_num"],
            "full_name" => $entry["full_name"],
            "hardware" => []
        ];
        
        // we save the first log info entry in the corresponding 
        // of this new date
        array_push($areaInfoJSON["hardware"], [
            "hardware_name" => $entry["hardware_name"],
            "status" => $entry["status"],
            "corrective_action" => $entry["action_name"],
            "comment" => $entry["comment"]
        ]);
    }
}

// don't forget to save the last data entry to the final JSON
array_push($outputJSON["data"], $areaInfoJSON);

// Send the data to the client as a JSON with the following format
// {
//     error_code:[int],
//     error_message:[string],
//     data:[array<area_log_info>]
// }
// where area_log_info is
// {
//     date:[date]
//     zone_name:[string]
//     area_name:[string]
//     employee_id:[uint]
//     full_name:[string]
//     hardware:[array<hardware>]
// }
// where hardware is: {
//     hardware_name:[string]
//     status:[bool]
//     corrective_action:[string]
//     comment:[strig]
// }
echo json_encode($outputJSON);

?>