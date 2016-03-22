<?php

require_once dirname(__FILE__)."\\..\\..\\dao\\workplaceAreas.php";
require_once dirname(__FILE__)."\\..\\..\\dao\\workdayPeriods.php";

// Data is sent to the server from the client in the form of a JSON with
// the following format:
// {
//     zone_id:[uint]
// }
// we must decode it
$inputJSON = json_decode($_GET);

// arrays of elements read from the data base tables
$periodsList = [];
$areasList = [];

try {
    // attempt to connect to the data base
    $dataBaseConnection = connectToDataBase();
    $areasTable = new WorkplaceAreas($dataBaseConnection);
    $periodsTable = new WorkdayPeriods($dataBaseConnection);
    
    // attempt to read the data from the data base tables
    $periodsList = $periodsTable->searchItemsByZoneID($inputJSON["zone_id"]);
    $areasList = $areasTable->searchItemsByZoneID($inputJSON["zone_id"]);
}
catch (Exception $e) {
    displayErrorPageAndExit($e->getCode(), $e->getMessage());
}

// initialize the JSON to be sent to the client
$outputJSON = [
    "error_code" => 0,
    "error_message" => "",
    "data" => [
        "areas" => [],
        "workday_periods" => []
    ]
];

// add the info of each area to the json
foreach ($areasList as $area) {
    array_push($outputJSON["data"]["areas"], [
        "id" => $area["id"],
        "area_name" => $area["area_name"]
    ]);
}

// add the info of each workday period to the json
foreach ($periodsList as $period) {
    array_push($outputJSON["data"]["workday_periods"], [
        "id" => $period["id"],
        "start_time" => $period["start_time"],
        "end_time" => $period["end_time"],
        "period_name" => $period["period_name"]
    ]);
}

// Send the data to the client as a JSON with the following format
// {
//     error_code:[int],
//     error_message:[string],
//     data:[array<data>]
// }
// where data is:
// {
//     areas:[array<area>],
//     workday_periods:[array<period>]
// } 
// where area is:
// {
//     area_id:[uint],
//     area_name:[string]
// }
// and period is: {
//     id:[uint],
//     start_time:[time],
//     end_time:[time],
//     period_name:[string]
// }
echo json_encode($outputJSON);

?>