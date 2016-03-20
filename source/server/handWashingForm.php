<?php

require_once dirname(__FILE__)."\\dao\\workplaceAreas.php";
require_once dirname(__FILE__)."\\dao\\workdayPeriods.php";

// create the variables where the data read from the data base is going to be
// stored
$periodsList = [];
$areasList = [];

// attempt to connect to the data base and query the data from the workplace
// areas and the workday periods tables
try {
    $dataBaseConnection = connectToDataBase();
    $areasTable = new WorkplaceAreas($dataBaseConnection);
    $periodsTable = new WorkdayPeriods($dataBaseConnection);
    $periodsList = $periodsTable->getAllItems();
    $areasList = $areasTable->getAllItems();
}
catch (Exception $e) {
    displayErrorPageAndExit($e->getCode(), $e->getMessage());
}

// Initialize the JSON to be sent to the client
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
/*{
    error_code:[int],
    error_message:[string],
    data:[array<area>]
}
where data is:
{
    areas:[array<area>],
    workday_periods:[array<period>]
} 
where area is:
{
    area_id:[uint],
    area_name:[string]
}
and period is: {
    id:[uint],
    start_time:[time],
    end_time:[time],
    period_name:[string]
}*/
echo json_encode($outputJSON);

?>